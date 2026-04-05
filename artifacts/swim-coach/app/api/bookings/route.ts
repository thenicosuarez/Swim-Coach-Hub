import { NextResponse } from "next/server";
import { z } from "zod";
import { db, bookingsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

function requireCoachAuth(request: Request): boolean {
  const password = request.headers.get("x-coach-password");
  return !!process.env.COACH_PASSWORD && password === process.env.COACH_PASSWORD;
}

async function forwardToGoogleSheets(booking: {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: string;
  createdAt: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.warn("[Google Sheets webhook] Failed:", err);
  }
}

async function sendEmailNotification(booking: {
  name: string;
  email: string;
  service: string;
}) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  if (!notificationEmail || !smtpHost) return;
  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || notificationEmail,
      to: notificationEmail,
      subject: `New intake: ${booking.name} — ${booking.service}`,
      text: `New booking request from ${booking.name} (${booking.email}) for ${booking.service}. Check your coach dashboard.`,
    });
  } catch (err) {
    console.warn("[Email notification] Failed:", err);
  }
}

const CreateBookingBody = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(request: Request) {
  if (!requireCoachAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const bookings = await db
      .select()
      .from(bookingsTable)
      .orderBy(desc(bookingsTable.createdAt));
    return NextResponse.json(
      bookings.map((b) => ({
        id: b.id,
        name: b.name,
        email: b.email,
        phone: b.phone ?? undefined,
        service: b.service,
        preferredDate: b.preferredDate ?? undefined,
        preferredTime: b.preferredTime ?? undefined,
        notes: b.notes ?? undefined,
        status: b.status,
        createdAt: b.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = CreateBookingBody.parse(await request.json());
    const [booking] = await db
      .insert(bookingsTable)
      .values({
        name: body.name,
        email: body.email,
        phone: body.phone ?? null,
        service: body.service,
        preferredDate: body.preferredDate ?? null,
        preferredTime: body.preferredTime ?? null,
        notes: body.notes ?? null,
        status: "pending",
      })
      .returning();

    const payload = {
      id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone ?? undefined,
      service: booking.service,
      preferredDate: booking.preferredDate ?? undefined,
      preferredTime: booking.preferredTime ?? undefined,
      notes: booking.notes ?? undefined,
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
    };

    void forwardToGoogleSheets(payload);
    void sendEmailNotification({
      name: booking.name,
      email: booking.email,
      service: booking.service,
    });

    return NextResponse.json(payload, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
  }
}
