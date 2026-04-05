import { Router, type IRouter } from "express";
import { db, bookingsTable } from "@workspace/db";
import { CreateBookingBody } from "@workspace/api-zod";
import { coachAuth } from "../middleware/coach-auth";

const router: IRouter = Router();

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
    console.warn("[Google Sheets webhook] Failed to forward booking:", err);
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
    console.warn("[Email notification] Failed to send:", err);
  }
}

router.get("/bookings", coachAuth, async (_req, res) => {
  try {
    const bookings = await db.select().from(bookingsTable).orderBy(bookingsTable.createdAt);
    res.json(bookings.map(b => ({
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
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.post("/bookings", async (req, res) => {
  try {
    const body = CreateBookingBody.parse(req.body);
    const [booking] = await db.insert(bookingsTable).values({
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      service: body.service,
      preferredDate: body.preferredDate ?? null,
      preferredTime: body.preferredTime ?? null,
      notes: body.notes ?? null,
      status: "pending",
    }).returning();

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
    void sendEmailNotification({ name: booking.name, email: booking.email, service: booking.service });

    res.status(201).json(payload);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid booking data" });
  }
});

export default router;
