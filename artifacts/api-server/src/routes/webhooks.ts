import { Router } from "express";
import crypto from "crypto";
import { db } from "@workspace/db";
import { bookingsTable, sessionsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

function verifyHmac(payload: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

function verifyCalendlySignature(payload: string, headerValue: string, secret: string): boolean {
  const expected = `sha256=${crypto.createHmac("sha256", secret).update(payload).digest("hex")}`;
  try {
    return crypto.timingSafeEqual(Buffer.from(headerValue), Buffer.from(expected));
  } catch {
    return false;
  }
}

function getRawBody(req: unknown): string {
  return (req as Record<string, unknown>).rawBody as string ?? JSON.stringify((req as { body: unknown }).body);
}

router.post("/webhooks/tally", async (req, res) => {
  const secret = process.env.TALLY_WEBHOOK_SECRET;
  if (secret) {
    const signature = req.headers["tally-signature"] as string | undefined;
    if (!signature || !verifyHmac(getRawBody(req), signature, secret)) {
      return res.status(401).json({ error: "Invalid Tally signature" });
    }
  }

  const event = req.body as { eventType?: string; data?: { fields?: { key: string; label: string; value: unknown }[] } };
  if (event?.eventType !== "FORM_RESPONSE") {
    return res.status(200).json({ received: true });
  }

  const fields = event.data?.fields ?? [];
  const find = (keys: string[]) => {
    for (const key of keys) {
      const match = fields.find((f) => f.key === key || f.label?.toLowerCase().includes(key.toLowerCase()));
      if (match?.value !== undefined && match.value !== "") return String(match.value);
    }
    return "";
  };

  const name = find(["name", "full name", "your name"]);
  const email = find(["email", "email address"]);
  const phone = find(["phone", "phone number", "mobile"]);
  const rawService = find(["service", "serviceInterest", "service interest", "what type"]);
  const validServices = ["private_lesson", "group_session", "stroke_clinic", "video_analysis", "package_5", "package_10"];
  const service = validServices.includes(rawService.toLowerCase().replace(/\s+/g, "_"))
    ? rawService.toLowerCase().replace(/\s+/g, "_")
    : "private_lesson";
  const notes = JSON.stringify({ source: "tally", fields });

  try {
    const [booking] = await db
      .insert(bookingsTable)
      .values({ name, email, phone, service: service as "private_lesson", notes, status: "pending" })
      .returning();

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "tally", booking }),
      }).catch(() => {});
    }

    return res.status(200).json({ success: true, bookingId: booking.id });
  } catch (err) {
    console.error("Tally webhook DB error:", err);
    return res.status(500).json({ error: "Failed to store booking" });
  }
});

router.post("/webhooks/calendly", async (req, res) => {
  const secret = process.env.CALENDLY_WEBHOOK_SECRET;
  if (secret) {
    const signature = req.headers["calendly-webhook-signature"] as string | undefined;
    if (!signature || !verifyCalendlySignature(getRawBody(req), signature, secret)) {
      return res.status(401).json({ error: "Invalid Calendly signature" });
    }
  }

  const event = req.body as {
    event?: string;
    payload?: {
      email?: string;
      name?: string;
      uri?: string;
      scheduled_event?: {
        uri?: string;
        name?: string;
        start_time?: string;
        end_time?: string;
      };
    };
  };
  const { event: eventType, payload } = event;
  const email = payload?.email ?? "";
  const name = payload?.name ?? "";
  const startTime = payload?.scheduled_event?.start_time ?? "";
  const endTime = payload?.scheduled_event?.end_time ?? "";
  const eventUri = payload?.scheduled_event?.uri ?? payload?.uri ?? "";
  const eventName = payload?.scheduled_event?.name ?? "";

  if (eventType === "invitee.created") {
    const durationMinutes = startTime && endTime
      ? Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000)
      : 60;

    try {
      const existing = await db
        .select()
        .from(bookingsTable)
        .where(eq(bookingsTable.email, email))
        .limit(1);

      let bookingId: number | undefined;
      if (existing.length > 0) {
        await db.update(bookingsTable).set({ status: "confirmed" }).where(eq(bookingsTable.id, existing[0].id));
        bookingId = existing[0].id;
      } else {
        const [newBooking] = await db
          .insert(bookingsTable)
          .values({ name, email, service: "private_lesson", notes: `Booked via Calendly: ${eventName}`, status: "confirmed" })
          .returning();
        bookingId = newBooking.id;
      }

      await db.insert(sessionsTable).values({
        bookingId,
        scheduledAt: startTime ? new Date(startTime) : undefined,
        durationMinutes,
        service: eventName || "private_lesson",
        status: "scheduled",
        calendlyEventId: eventUri,
        notes: `Auto-created from Calendly booking`,
      });

      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "calendly", eventType, name, email, startTime }),
        }).catch(() => {});
      }

      return res.status(200).json({ success: true, bookingId });
    } catch (err) {
      console.error("Calendly invitee.created error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  if (eventType === "invitee.canceled") {
    try {
      if (eventUri) {
        await db
          .update(sessionsTable)
          .set({ status: "cancelled" })
          .where(eq(sessionsTable.calendlyEventId, eventUri));
      }
      if (email) {
        const existing = await db
          .select()
          .from(bookingsTable)
          .where(eq(bookingsTable.email, email))
          .limit(1);
        if (existing.length > 0) {
          await db.update(bookingsTable).set({ status: "cancelled" }).where(eq(bookingsTable.id, existing[0].id));
        }
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Calendly invitee.canceled error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  return res.status(200).json({ received: true });
});

export default router;
