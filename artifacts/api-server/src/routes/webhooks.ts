import { Router } from "express";
import crypto from "crypto";
import { db } from "@workspace/db";
import { bookingsTable, sessionsTable, clientsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

function getRawBody(req: unknown): string {
  return (req as Record<string, unknown>).rawBody as string ?? JSON.stringify((req as { body: unknown }).body);
}

function verifyTallyHmac(rawBody: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

function verifyCalendlySignature(rawBody: string, headerValue: string, secret: string): boolean {
  const parts: Record<string, string> = {};
  for (const part of headerValue.split(",")) {
    const [k, v] = part.split("=", 2);
    if (k && v) parts[k.trim()] = v.trim();
  }
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;
  const payload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

async function resolveClientId(email: string): Promise<number | undefined> {
  if (!email) return undefined;
  const rows = await db
    .select({ id: clientsTable.id })
    .from(clientsTable)
    .where(eq(clientsTable.email, email))
    .limit(1);
  return rows[0]?.id;
}

async function resolveOrCreateBooking(
  email: string,
  name: string,
  eventName: string
): Promise<{ bookingId: number; newlyCreated: boolean }> {
  const existing = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.email, email))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(bookingsTable)
      .set({ status: "confirmed" })
      .where(eq(bookingsTable.id, existing[0].id));
    return { bookingId: existing[0].id, newlyCreated: false };
  }

  const [newBooking] = await db
    .insert(bookingsTable)
    .values({
      name,
      email,
      service: "private_lesson",
      notes: `Auto-created from Calendly: ${eventName}`,
      status: "confirmed",
    })
    .returning();
  return { bookingId: newBooking.id, newlyCreated: true };
}

router.post("/webhooks/tally", async (req, res) => {
  const secret = process.env.TALLY_WEBHOOK_SECRET;
  const signature = req.headers["tally-signature"] as string | undefined;
  const rawBody = getRawBody(req);

  if (secret) {
    if (!signature || !verifyTallyHmac(rawBody, signature, secret)) {
      return res.status(401).json({ error: "Invalid Tally signature" });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn("TALLY_WEBHOOK_SECRET not set — rejecting in production");
    return res.status(401).json({ error: "Webhook secret not configured" });
  }

  const event = req.body as { eventType?: string; data?: { fields?: { key: string; label: string; value: unknown }[] } };
  if (event?.eventType !== "FORM_RESPONSE") {
    return res.status(200).json({ received: true });
  }

  const fields = event.data?.fields ?? [];
  const find = (...keys: string[]): string => {
    for (const key of keys) {
      const m = fields.find(
        (f) => f.key === key || f.label?.toLowerCase().replace(/\s+/g, "_") === key.toLowerCase()
      );
      if (m?.value !== undefined && m.value !== "") return String(m.value);
    }
    return "";
  };

  const name = find("name", "full_name", "your_name", "Full Name");
  const email = find("email", "email_address", "Email");
  const phone = find("phone", "phone_number", "mobile", "Phone");
  const neighborhood = find("neighborhood", "area", "location");
  const swimmerAge = find("swimmer_age", "age", "swimmer's_age");
  const serviceRaw = find("service", "serviceinterest", "service_interest", "what_type", "Service");
  const goal = find("goal", "main_goal", "Goal");
  const allFourStrokes = find("all_four_strokes", "strokes");
  const poolAccess = find("pool_access", "pool");
  const experience = find("experience", "experience_level");
  const notes = find("notes", "additional_notes", "anything_else");

  const validServices = ["private_lesson", "group_session", "stroke_clinic", "video_analysis", "package_5", "package_10"];
  const normalized = serviceRaw.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z_0-9]/g, "");
  const service = validServices.includes(normalized) ? normalized : "private_lesson";

  const notesJson = JSON.stringify({
    source: "tally",
    neighborhood,
    swimmerAge,
    goal,
    allFourStrokes,
    poolAccess,
    experience,
    additionalNotes: notes,
    rawFields: fields,
  });

  try {
    const [booking] = await db
      .insert(bookingsTable)
      .values({ name, email, phone, service: service as "private_lesson", notes: notesJson, status: "pending" })
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
  const signature = req.headers["calendly-webhook-signature"] as string | undefined;
  const rawBody = getRawBody(req);

  if (secret) {
    if (!signature || !verifyCalendlySignature(rawBody, signature, secret)) {
      return res.status(401).json({ error: "Invalid Calendly signature" });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn("CALENDLY_WEBHOOK_SECRET not set — rejecting in production");
    return res.status(401).json({ error: "Webhook secret not configured" });
  }

  const event = req.body as {
    event?: string;
    payload?: {
      email?: string;
      name?: string;
      uri?: string;
      old_event?: { uri?: string; start_time?: string; end_time?: string };
      new_event?: { uri?: string; name?: string; start_time?: string; end_time?: string };
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
  const eventUri = payload?.scheduled_event?.uri ?? payload?.new_event?.uri ?? payload?.uri ?? "";
  const eventName = payload?.scheduled_event?.name ?? payload?.new_event?.name ?? "";
  const startTime = payload?.scheduled_event?.start_time ?? payload?.new_event?.start_time ?? "";
  const endTime = payload?.scheduled_event?.end_time ?? payload?.new_event?.end_time ?? "";

  if (eventType === "invitee.created") {
    const durationMinutes = startTime && endTime
      ? Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000)
      : 60;

    try {
      const { bookingId } = await resolveOrCreateBooking(email, name, eventName);
      const clientId = await resolveClientId(email);

      await db.insert(sessionsTable).values({
        bookingId,
        clientId,
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
          await db
            .update(bookingsTable)
            .set({ status: "cancelled" })
            .where(eq(bookingsTable.id, existing[0].id));
        }
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Calendly invitee.canceled error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  if (eventType === "invitee.rescheduled") {
    const oldEventUri = payload?.old_event?.uri ?? "";
    const newStartTime = payload?.new_event?.start_time ?? "";
    const newEndTime = payload?.new_event?.end_time ?? "";
    const newDuration = newStartTime && newEndTime
      ? Math.round((new Date(newEndTime).getTime() - new Date(newStartTime).getTime()) / 60000)
      : 60;

    try {
      if (oldEventUri) {
        await db
          .update(sessionsTable)
          .set({ status: "cancelled" })
          .where(eq(sessionsTable.calendlyEventId, oldEventUri));
      }

      if (eventUri && email) {
        const { bookingId } = await resolveOrCreateBooking(email, name, eventName);
        const clientId = await resolveClientId(email);
        await db.insert(sessionsTable).values({
          bookingId,
          clientId,
          scheduledAt: newStartTime ? new Date(newStartTime) : undefined,
          durationMinutes: newDuration,
          service: eventName || "private_lesson",
          status: "scheduled",
          calendlyEventId: eventUri,
          notes: `Rescheduled from Calendly`,
        });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Calendly invitee.rescheduled error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  return res.status(200).json({ received: true });
});

export default router;
