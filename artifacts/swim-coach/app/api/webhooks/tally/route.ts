import { NextResponse } from "next/server";
import crypto from "crypto";
import { db, bookingsTable } from "@workspace/db";

function verifyTallyHmac(rawBody: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.TALLY_WEBHOOK_SECRET;
  const signature = request.headers.get("tally-signature");

  if (secret) {
    if (!signature || !verifyTallyHmac(rawBody, signature, secret)) {
      return NextResponse.json({ error: "Invalid Tally signature" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn("TALLY_WEBHOOK_SECRET not set — rejecting in production");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 401 });
  }

  let event: { eventType?: string; data?: { fields?: { key: string; label: string; value: unknown }[] } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event?.eventType !== "FORM_RESPONSE") {
    return NextResponse.json({ received: true });
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

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (err) {
    console.error("Tally webhook DB error:", err);
    return NextResponse.json({ error: "Failed to store booking" }, { status: 500 });
  }
}
