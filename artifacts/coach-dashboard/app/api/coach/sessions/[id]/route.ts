import { NextResponse } from "next/server";
import { db, sessionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);
    const body = await request.json();

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (body.status !== undefined) updateData.status = body.status;
    if (body.notes !== undefined) updateData.notes = body.notes ?? null;
    if (body.scheduledAt !== undefined) updateData.scheduledAt = body.scheduledAt ? new Date(body.scheduledAt) : null;
    if (body.durationMinutes !== undefined) updateData.durationMinutes = body.durationMinutes;
    if (body.service !== undefined) updateData.service = body.service ?? null;
    if (body.clientId !== undefined) updateData.clientId = body.clientId ?? null;

    const [updated] = await db
      .update(sessionsTable)
      .set(updateData)
      .where(eq(sessionsTable.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updated.id,
      clientId: updated.clientId ?? undefined,
      bookingId: updated.bookingId ?? undefined,
      scheduledAt: updated.scheduledAt?.toISOString(),
      durationMinutes: updated.durationMinutes ?? undefined,
      service: updated.service ?? undefined,
      notes: updated.notes ?? undefined,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}
