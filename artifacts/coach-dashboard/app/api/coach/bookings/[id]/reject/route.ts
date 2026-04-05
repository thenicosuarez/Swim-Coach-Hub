import { NextResponse } from "next/server";
import { db, bookingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);
    const body = await request.json().catch(() => ({}));
    const rejectionNote = body?.note;

    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, id));

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    let existingNotes: Record<string, unknown> = {};
    try { if (booking.notes) existingNotes = JSON.parse(booking.notes); } catch { existingNotes = { original: booking.notes }; }
    if (rejectionNote) existingNotes._rejectionNote = rejectionNote;

    const [updated] = await db
      .update(bookingsTable)
      .set({ status: "rejected", notes: JSON.stringify(existingNotes) })
      .where(eq(bookingsTable.id, id))
      .returning();

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to reject booking" }, { status: 500 });
  }
}
