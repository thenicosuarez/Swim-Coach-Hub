import { notFound } from "next/navigation";
import { db, coachingPlansTable, clientsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const [plan] = await db
    .select()
    .from(coachingPlansTable)
    .where(eq(coachingPlansTable.shareToken, token));
  if (!plan || !plan.isPublic) return { title: "Plan not found" };
  return { title: `${plan.title} | Coach Nikki` };
}

export default async function SharedPlanPage({ params }: Props) {
  const { token } = await params;

  const [plan] = await db
    .select()
    .from(coachingPlansTable)
    .where(eq(coachingPlansTable.shareToken, token));

  if (!plan || !plan.isPublic) notFound();

  let clientName: string | undefined;
  if (plan.clientId) {
    const [client] = await db
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.id, plan.clientId));
    if (client) clientName = client.name;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-display font-bold text-primary">Coach Nikki</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{plan.title}</h1>
          {clientName && <p className="text-muted-foreground">Created for {clientName}</p>}
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: {new Date(plan.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <div className="space-y-8">
          {plan.goal && (
            <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Goals</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{plan.goal}</p>
            </section>
          )}

          {plan.drills && (
            <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Drills & Weekly Plan</h2>
              <pre className="text-foreground leading-relaxed whitespace-pre-wrap font-sans text-sm">{plan.drills}</pre>
            </section>
          )}

          {plan.notes && (
            <section className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Coach Notes</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{plan.notes}</p>
            </section>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Plan shared by <strong className="text-foreground">Coach Nikki Hubbard</strong></p>
          <p className="mt-1">University of Michigan D1 Swimmer · Chicago, IL</p>
        </div>
      </div>
    </div>
  );
}
