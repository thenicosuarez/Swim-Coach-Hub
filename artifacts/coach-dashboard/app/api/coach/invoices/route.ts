import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db, invoicesTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const status = searchParams.get("status");

    let query = db.select().from(invoicesTable);

    const invoices = clientId
      ? await query.where(eq(invoicesTable.clientId, parseInt(clientId))).orderBy(desc(invoicesTable.createdAt))
      : await query.orderBy(desc(invoicesTable.createdAt));

    const filtered = status ? invoices.filter(i => i.status === status) : invoices;

    return NextResponse.json(
      filtered.map(i => ({
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
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { clientId, sessionId, amountCents, status, dueDate, paymentMethod, notes } = body;

    if (!amountCents || amountCents <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const [invoice] = await db
      .insert(invoicesTable)
      .values({
        clientId: clientId ?? null,
        sessionId: sessionId ?? null,
        amountCents,
        status: status ?? "draft",
        dueDate: dueDate ?? null,
        paymentMethod: paymentMethod ?? null,
        notes: notes ?? null,
      })
      .returning();

    return NextResponse.json({
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
    }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
