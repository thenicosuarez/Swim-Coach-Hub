import { NextResponse } from "next/server";
import { db, yogaInquiriesTable } from "@workspace/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, eventType, groupSize, eventDate, location, message } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 });
    }

    const [inquiry] = await db.insert(yogaInquiriesTable).values({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      eventType: eventType ? String(eventType) : undefined,
      groupSize: groupSize ? String(groupSize) : undefined,
      eventDate: eventDate ? String(eventDate) : undefined,
      location: location ? String(location).trim() : undefined,
      message: message ? String(message).trim() : undefined,
    }).returning();

    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[yoga-inquiry]", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
