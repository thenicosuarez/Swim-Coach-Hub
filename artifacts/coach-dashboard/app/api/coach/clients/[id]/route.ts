import { NextResponse } from "next/server";
import { db, clientsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);
    const body = await request.json();

    const updateData: Partial<{ notes: string; status: string; neighborhood: string }> = {};
    if (body.notes !== undefined) updateData.notes = body.notes;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.neighborhood !== undefined) updateData.neighborhood = body.neighborhood;

    const [updated] = await db
      .update(clientsTable)
      .set(updateData)
      .where(eq(clientsTable.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      notes: updated.notes ?? undefined,
      status: updated.status,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
  }
}
