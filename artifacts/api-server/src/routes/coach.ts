import { Router, type IRouter } from "express";
import { db, bookingsTable, clientsTable, coachingPlansTable, sessionsTable, invoicesTable } from "@workspace/db";
import { eq, desc, and } from "drizzle-orm";
import crypto from "crypto";
import { coachAuth } from "../middleware/coach-auth";

function parseId(param: string | string[] | undefined): number {
  const raw = Array.isArray(param) ? param[0] : param;
  return parseInt(raw || "0", 10);
}

function parseToken(param: string | string[] | undefined): string {
  const raw = Array.isArray(param) ? param[0] : param;
  return raw || "";
}

const router: IRouter = Router();

router.get("/coach/auth-check", coachAuth, (_req, res) => {
  res.json({ authenticated: true });
});

router.get("/coach/config", coachAuth, (_req, res) => {
  res.json({
    calendlyUrl: process.env.COACH_CALENDLY_URL || "https://calendly.com/[your-handle]",
  });
});

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
    const id = parseId(req.params.id);
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
    const id = parseId(req.params.id);
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
    const id = parseId(req.params.id);
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
    const id = parseId(req.params.id);
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
    const token = parseToken(req.params.token);
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

// ─── Sessions ──────────────────────────────────────────────────────────────

router.get("/coach/sessions", coachAuth, async (req, res) => {
  try {
    const clientIdFilter = req.query.clientId ? parseInt(req.query.clientId as string) : undefined;
    const query = db.select().from(sessionsTable);
    const rows = await (clientIdFilter
      ? query.where(eq(sessionsTable.clientId, clientIdFilter)).orderBy(desc(sessionsTable.scheduledAt))
      : query.orderBy(desc(sessionsTable.scheduledAt)));
    res.json(rows.map(s => ({
      id: s.id,
      clientId: s.clientId ?? undefined,
      bookingId: s.bookingId ?? undefined,
      scheduledAt: s.scheduledAt?.toISOString() ?? undefined,
      durationMinutes: s.durationMinutes ?? undefined,
      service: s.service ?? undefined,
      notes: s.notes ?? undefined,
      status: s.status,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

router.post("/coach/sessions", coachAuth, async (req, res) => {
  try {
    const { clientId, bookingId, scheduledAt, durationMinutes, service, notes, status } = req.body;
    const [session] = await db.insert(sessionsTable).values({
      clientId: clientId ?? null,
      bookingId: bookingId ?? null,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      durationMinutes: durationMinutes ?? null,
      service: service ?? null,
      notes: notes ?? null,
      status: status || "scheduled",
    }).returning();

    res.status(201).json({
      id: session.id,
      clientId: session.clientId ?? undefined,
      bookingId: session.bookingId ?? undefined,
      scheduledAt: session.scheduledAt?.toISOString() ?? undefined,
      durationMinutes: session.durationMinutes ?? undefined,
      service: session.service ?? undefined,
      notes: session.notes ?? undefined,
      status: session.status,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create session" });
  }
});

router.patch("/coach/sessions/:id", coachAuth, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    const { scheduledAt, durationMinutes, service, notes, status, clientId } = req.body;

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (scheduledAt !== undefined) updates.scheduledAt = scheduledAt ? new Date(scheduledAt) : null;
    if (durationMinutes !== undefined) updates.durationMinutes = durationMinutes;
    if (service !== undefined) updates.service = service;
    if (notes !== undefined) updates.notes = notes;
    if (status !== undefined) updates.status = status;
    if (clientId !== undefined) updates.clientId = clientId;

    const [session] = await db.update(sessionsTable)
      .set(updates)
      .where(eq(sessionsTable.id, id))
      .returning();

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.json({
      id: session.id,
      clientId: session.clientId ?? undefined,
      bookingId: session.bookingId ?? undefined,
      scheduledAt: session.scheduledAt?.toISOString() ?? undefined,
      durationMinutes: session.durationMinutes ?? undefined,
      service: session.service ?? undefined,
      notes: session.notes ?? undefined,
      status: session.status,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update session" });
  }
});

// ─── Invoices ──────────────────────────────────────────────────────────────

router.get("/coach/invoices", coachAuth, async (req, res) => {
  try {
    const clientIdFilter = req.query.clientId ? parseInt(req.query.clientId as string) : undefined;
    const statusFilter = req.query.status as string | undefined;
    const conditions = [];
    if (clientIdFilter) conditions.push(eq(invoicesTable.clientId, clientIdFilter));
    if (statusFilter) conditions.push(eq(invoicesTable.status, statusFilter));
    const rows = await (conditions.length > 0
      ? db.select().from(invoicesTable).where(and(...conditions)).orderBy(desc(invoicesTable.createdAt))
      : db.select().from(invoicesTable).orderBy(desc(invoicesTable.createdAt)));
    res.json(rows.map(i => ({
      id: i.id,
      clientId: i.clientId ?? undefined,
      sessionId: i.sessionId ?? undefined,
      amountCents: i.amountCents,
      status: i.status,
      dueDate: i.dueDate ?? undefined,
      paymentMethod: i.paymentMethod ?? undefined,
      notes: i.notes ?? undefined,
      createdAt: i.createdAt.toISOString(),
      updatedAt: i.updatedAt.toISOString(),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

router.post("/coach/invoices", coachAuth, async (req, res) => {
  try {
    const { clientId, sessionId, amountCents, status, dueDate, paymentMethod, notes } = req.body;
    if (!amountCents) {
      res.status(400).json({ error: "amountCents is required" });
      return;
    }
    const [invoice] = await db.insert(invoicesTable).values({
      clientId: clientId ?? null,
      sessionId: sessionId ?? null,
      amountCents,
      status: status || "draft",
      dueDate: dueDate ?? null,
      paymentMethod: paymentMethod ?? null,
      notes: notes ?? null,
    }).returning();

    res.status(201).json({
      id: invoice.id,
      clientId: invoice.clientId ?? undefined,
      sessionId: invoice.sessionId ?? undefined,
      amountCents: invoice.amountCents,
      status: invoice.status,
      dueDate: invoice.dueDate ?? undefined,
      paymentMethod: invoice.paymentMethod ?? undefined,
      notes: invoice.notes ?? undefined,
      createdAt: invoice.createdAt.toISOString(),
      updatedAt: invoice.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create invoice" });
  }
});

router.patch("/coach/invoices/:id", coachAuth, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    const { amountCents, status, dueDate, paymentMethod, notes, clientId, sessionId } = req.body;

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (amountCents !== undefined) updates.amountCents = amountCents;
    if (status !== undefined) updates.status = status;
    if (dueDate !== undefined) updates.dueDate = dueDate;
    if (paymentMethod !== undefined) updates.paymentMethod = paymentMethod;
    if (notes !== undefined) updates.notes = notes;
    if (clientId !== undefined) updates.clientId = clientId;
    if (sessionId !== undefined) updates.sessionId = sessionId;

    const [invoice] = await db.update(invoicesTable)
      .set(updates)
      .where(eq(invoicesTable.id, id))
      .returning();

    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }

    res.json({
      id: invoice.id,
      clientId: invoice.clientId ?? undefined,
      sessionId: invoice.sessionId ?? undefined,
      amountCents: invoice.amountCents,
      status: invoice.status,
      dueDate: invoice.dueDate ?? undefined,
      paymentMethod: invoice.paymentMethod ?? undefined,
      notes: invoice.notes ?? undefined,
      createdAt: invoice.createdAt.toISOString(),
      updatedAt: invoice.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update invoice" });
  }
});

router.delete("/coach/invoices/:id", coachAuth, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    const [deleted] = await db.delete(invoicesTable).where(eq(invoicesTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete invoice" });
  }
});

export default router;
