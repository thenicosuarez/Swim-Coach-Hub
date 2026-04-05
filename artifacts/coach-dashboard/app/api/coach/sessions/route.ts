import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db, sessionsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    const sessions = clientId
      ? await db.select().from(sessionsTable).where(eq(sessionsTable.clientId, parseInt(clientId))).orderBy(desc(sessionsTable.scheduledAt))
      : await db.select().from(sessionsTable).orderBy(desc(sessionsTable.scheduledAt));

    return NextResponse.json(
      sessions.map(s => ({
        id: s.id,
        clientId: s.clientId ?? undefined,
        bookingId: s.bookingId ?? undefined,
        scheduledAt: s.scheduledAt?.toISOString(),
        durationMinutes: s.durationMinutes ?? undefined,
        service: s.service ?? undefined,
        notes: s.notes ?? undefined,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { clientId, bookingId, scheduledAt, durationMinutes, service, notes, status } = body;

    const [session] = await db
      .insert(sessionsTable)
      .values({
        clientId: clientId ?? null,
        bookingId: bookingId ?? null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        durationMinutes: durationMinutes ?? 60,
        service: service ?? null,
        notes: notes ?? null,
        status: status ?? "scheduled",
      })
      .returning();

    return NextResponse.json({
      id: session.id,
      clientId: session.clientId ?? undefined,
      bookingId: session.bookingId ?? undefined,
      scheduledAt: session.scheduledAt?.toISOString(),
      durationMinutes: session.durationMinutes ?? undefined,
      service: session.service ?? undefined,
      notes: session.notes ?? undefined,
      status: session.status,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
