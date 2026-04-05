import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db, clientsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const clients = await db
      .select()
      .from(clientsTable)
      .orderBy(desc(clientsTable.createdAt));

    return NextResponse.json(
      clients.map(c => ({
        id: c.id,
        bookingId: c.bookingId ?? undefined,
        name: c.name,
        email: c.email,
        phone: c.phone ?? undefined,
        neighborhood: c.neighborhood ?? undefined,
        service: c.service ?? undefined,
        notes: c.notes ?? undefined,
        status: c.status,
        createdAt: c.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}
