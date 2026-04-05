import { NextResponse } from "next/server";
import { db, coachingPlansTable, clientsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const [plan] = await db
      .select()
      .from(coachingPlansTable)
      .where(eq(coachingPlansTable.shareToken, token));

    if (!plan || !plan.isPublic) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    let clientName: string | undefined;
    if (plan.clientId) {
      const [client] = await db
        .select()
        .from(clientsTable)
        .where(eq(clientsTable.id, plan.clientId));
      if (client) clientName = client.name;
    }

    return NextResponse.json({
      id: plan.id,
      title: plan.title,
      goal: plan.goal ?? undefined,
      drills: plan.drills ?? undefined,
      notes: plan.notes ?? undefined,
      clientName,
      updatedAt: plan.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch plan" }, { status: 500 });
  }
}
