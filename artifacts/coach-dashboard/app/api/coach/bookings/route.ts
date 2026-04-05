import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db, bookingsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const bookings = await db
      .select()
      .from(bookingsTable)
      .orderBy(desc(bookingsTable.createdAt));
    return NextResponse.json(
      bookings.map(b => ({
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
