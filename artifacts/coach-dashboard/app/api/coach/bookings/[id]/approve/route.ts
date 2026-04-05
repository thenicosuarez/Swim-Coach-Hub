import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db, bookingsTable, clientsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);

    const [booking] = await db
      .update(bookingsTable)
      .set({ status: "approved" })
      .where(eq(bookingsTable.id, id))
      .returning();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const existing = await db
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.bookingId, id));

    if (existing.length === 0) {
      let parsedNotes: Record<string, unknown> = {};
      try { if (booking.notes) parsedNotes = JSON.parse(booking.notes); } catch {}

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

    return NextResponse.json({
      id: booking.id,
      name: booking.name,
      email: booking.email,
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to approve booking" }, { status: 500 });
  }
}
