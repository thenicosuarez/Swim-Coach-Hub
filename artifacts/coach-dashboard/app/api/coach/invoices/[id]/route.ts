import { NextResponse } from "next/server";
import { db, invoicesTable } from "@workspace/db";
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
    if (body.paymentMethod !== undefined) updateData.paymentMethod = body.paymentMethod ?? null;
    if (body.dueDate !== undefined) updateData.dueDate = body.dueDate ?? null;
    if (body.notes !== undefined) updateData.notes = body.notes ?? null;
    if (body.amountCents !== undefined) updateData.amountCents = body.amountCents;

    const [updated] = await db
      .update(invoicesTable)
      .set(updateData)
      .where(eq(invoicesTable.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updated.id,
      clientId: updated.clientId ?? undefined,
      sessionId: updated.sessionId ?? undefined,
      amountCents: updated.amountCents,
      status: updated.status,
      dueDate: updated.dueDate ?? undefined,
      paymentMethod: updated.paymentMethod ?? undefined,
      notes: updated.notes ?? undefined,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);

    const [deleted] = await db
      .delete(invoicesTable)
      .where(eq(invoicesTable.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}
