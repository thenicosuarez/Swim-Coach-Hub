import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db, bookingsTable, clientsTable, coachingPlansTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import crypto from "crypto";

const router: IRouter = Router();

function coachAuth(req: Request, res: Response, next: NextFunction) {
  const password = req.headers["x-coach-password"] as string;
  if (!process.env.COACH_PASSWORD) {
    res.status(500).json({ error: "COACH_PASSWORD not configured" });
    return;
  }
  if (!password || password !== process.env.COACH_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/coach/bookings", coachAuth, async (_req, res) => {
  try {
    const bookings = await db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt));
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

router.patch("/coach/bookings/:id/approve", coachAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [booking] = await db.update(bookingsTable)
      .set({ status: "approved" })
      .where(eq(bookingsTable.id, id))
      .returning();

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    const existing = await db.select().from(clientsTable).where(eq(clientsTable.bookingId, id));
    if (existing.length === 0) {
      let parsedNotes: Record<string, unknown> = {};
      try {
        if (booking.notes) parsedNotes = JSON.parse(booking.notes);
      } catch {}

      await db.insert(clientsTable).values({
        bookingId: booking.id,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        neighborhood: (parsedNotes.neighborhood as string) || null,
        service: booking.service,
        status: "active",
      });
    }

    res.json({
      id: booking.id,
      name: booking.name,
      email: booking.email,
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to approve booking" });
  }
});

router.patch("/coach/bookings/:id/reject", coachAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rejectionNote = req.body?.note;

    const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    let existingNotes: Record<string, unknown> = {};
    try {
      if (booking.notes) existingNotes = JSON.parse(booking.notes);
    } catch {
      existingNotes = { original: booking.notes };
    }

    if (rejectionNote) {
      existingNotes._rejectionNote = rejectionNote;
    }

    const [updated] = await db.update(bookingsTable)
      .set({ status: "rejected", notes: JSON.stringify(existingNotes) })
      .where(eq(bookingsTable.id, id))
      .returning();

    res.json({
      id: updated.id,
      name: updated.name,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reject booking" });
  }
});

router.get("/coach/clients", coachAuth, async (_req, res) => {
  try {
    const clients = await db.select().from(clientsTable).orderBy(desc(clientsTable.createdAt));
    res.json(clients.map(c => ({
      id: c.id,
      bookingId: c.bookingId,
      name: c.name,
      email: c.email,
      phone: c.phone ?? undefined,
      neighborhood: c.neighborhood ?? undefined,
      service: c.service ?? undefined,
      notes: c.notes ?? undefined,
      status: c.status,
      createdAt: c.createdAt.toISOString(),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

router.patch("/coach/clients/:id", coachAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { notes, status } = req.body;

    const updates: Record<string, unknown> = {};
    if (notes !== undefined) updates.notes = notes;
    if (status !== undefined) updates.status = status;

    const [client] = await db.update(clientsTable)
      .set(updates)
      .where(eq(clientsTable.id, id))
      .returning();

    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    res.json({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone ?? undefined,
      neighborhood: client.neighborhood ?? undefined,
      service: client.service ?? undefined,
      notes: client.notes ?? undefined,
      status: client.status,
      createdAt: client.createdAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update client" });
  }
});

router.get("/coach/plans", coachAuth, async (_req, res) => {
  try {
    const plans = await db.select().from(coachingPlansTable).orderBy(desc(coachingPlansTable.createdAt));
    res.json(plans.map(p => ({
      id: p.id,
      clientId: p.clientId ?? undefined,
      title: p.title,
      goal: p.goal ?? undefined,
      drills: p.drills ?? undefined,
      notes: p.notes ?? undefined,
      shareToken: p.shareToken,
      isPublic: p.isPublic,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

router.post("/coach/plans", coachAuth, async (req, res) => {
  try {
    const { title, goal, drills, notes, clientId, isPublic } = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const shareToken = crypto.randomUUID();
    const [plan] = await db.insert(coachingPlansTable).values({
      title,
      goal: goal || null,
      drills: drills || null,
      notes: notes || null,
      clientId: clientId || null,
      shareToken,
      isPublic: isPublic ?? true,
    }).returning();

    res.status(201).json({
      id: plan.id,
      clientId: plan.clientId ?? undefined,
      title: plan.title,
      goal: plan.goal ?? undefined,
      drills: plan.drills ?? undefined,
      notes: plan.notes ?? undefined,
      shareToken: plan.shareToken,
      isPublic: plan.isPublic,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create plan" });
  }
});

router.patch("/coach/plans/:id", coachAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, goal, drills, notes, clientId, isPublic } = req.body;

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (title !== undefined) updates.title = title;
    if (goal !== undefined) updates.goal = goal;
    if (drills !== undefined) updates.drills = drills;
    if (notes !== undefined) updates.notes = notes;
    if (clientId !== undefined) updates.clientId = clientId;
    if (isPublic !== undefined) updates.isPublic = isPublic;

    const [plan] = await db.update(coachingPlansTable)
      .set(updates)
      .where(eq(coachingPlansTable.id, id))
      .returning();

    if (!plan) {
      res.status(404).json({ error: "Plan not found" });
      return;
    }

    res.json({
      id: plan.id,
      clientId: plan.clientId ?? undefined,
      title: plan.title,
      goal: plan.goal ?? undefined,
      drills: plan.drills ?? undefined,
      notes: plan.notes ?? undefined,
      shareToken: plan.shareToken,
      isPublic: plan.isPublic,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update plan" });
  }
});

router.get("/plans/share/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const [plan] = await db.select().from(coachingPlansTable)
      .where(eq(coachingPlansTable.shareToken, token));

    if (!plan || !plan.isPublic) {
      res.status(404).json({ error: "Plan not found" });
      return;
    }

    let clientName: string | undefined;
    if (plan.clientId) {
      const [client] = await db.select().from(clientsTable)
        .where(eq(clientsTable.id, plan.clientId));
      if (client) clientName = client.name;
    }

    res.json({
      title: plan.title,
      goal: plan.goal ?? undefined,
      drills: plan.drills ?? undefined,
      notes: plan.notes ?? undefined,
      clientName,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch plan" });
  }
});

export default router;
