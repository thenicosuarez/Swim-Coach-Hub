import { NextResponse } from "next/server";
import crypto from "crypto";
import { db, bookingsTable, sessionsTable, clientsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

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
): Promise<{ bookingId: number }> {
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
    return { bookingId: existing[0].id };
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
  return { bookingId: newBooking.id };
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.CALENDLY_WEBHOOK_SECRET;
  const signature = request.headers.get("calendly-webhook-signature");

  if (secret) {
    if (!signature || !verifyCalendlySignature(rawBody, signature, secret)) {
      return NextResponse.json({ error: "Invalid Calendly signature" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn("CALENDLY_WEBHOOK_SECRET not set — rejecting in production");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 401 });
  }

  let event: {
    event?: string;
    payload?: {
      email?: string;
      name?: string;
      uri?: string;
      old_event?: { uri?: string; start_time?: string; end_time?: string };
      new_event?: { uri?: string; name?: string; start_time?: string; end_time?: string };
      scheduled_event?: { uri?: string; name?: string; start_time?: string; end_time?: string };
    };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { event: eventType, payload } = event;
  const email = payload?.email ?? "";
  const name = payload?.name ?? "";
  const eventUri = payload?.scheduled_event?.uri ?? payload?.new_event?.uri ?? payload?.uri ?? "";
  const eventName = payload?.scheduled_event?.name ?? payload?.new_event?.name ?? "";
  const startTime = payload?.scheduled_event?.start_time ?? payload?.new_event?.start_time ?? "";
  const endTime = payload?.scheduled_event?.end_time ?? payload?.new_event?.end_time ?? "";

  if (eventType === "invitee.created") {
    const durationMinutes =
      startTime && endTime
        ? Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000)
        : 60;

    try {
      const { bookingId } = await resolveOrCreateBooking(email, name, eventName);
      const clientId = await resolveClientId(email);

      await db.insert(sessionsTable).values({
        bookingId,
        clientId,
        scheduledAt: startTime ? new Date(startTime) : null,
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

      return NextResponse.json({ success: true, bookingId });
    } catch (err) {
      console.error("Calendly invitee.created error:", err);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
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
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("Calendly invitee.canceled error:", err);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }

  if (eventType === "invitee.rescheduled") {
    const oldEventUri = payload?.old_event?.uri ?? "";
    const newStartTime = payload?.new_event?.start_time ?? "";
    const newEndTime = payload?.new_event?.end_time ?? "";
    const newDuration =
      newStartTime && newEndTime
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
          scheduledAt: newStartTime ? new Date(newStartTime) : null,
          durationMinutes: newDuration,
          service: eventName || "private_lesson",
          status: "scheduled",
          calendlyEventId: eventUri,
          notes: `Rescheduled from Calendly`,
        });
      }
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("Calendly invitee.rescheduled error:", err);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
