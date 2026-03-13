import { Router, type IRouter } from "express";
import { db, bookingsTable } from "@workspace/db";
import { CreateBookingBody } from "@workspace/api-zod";
import { coachAuth } from "../middleware/coach-auth";

const router: IRouter = Router();

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
    res.status(201).json({
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
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid booking data" });
  }
});

export default router;
