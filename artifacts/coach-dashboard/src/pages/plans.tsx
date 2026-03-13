import { useState, useEffect } from "react";
import { getPlans, createPlan, updatePlan, getClients } from "@/lib/api";

interface Plan {
  id: number;
  clientId?: number;
  title: string;
  goal?: string;
  drills?: string;
  notes?: string;
  shareToken: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ClientData {
  id: number;
  name: string;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [saving, setSaving] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    goal: "",
    drills: "",
    notes: "",
    clientId: "",
    isPublic: true,
  });

  const fetchData = async () => {
    try {
      const [p, c] = await Promise.all([getPlans(), getClients()]);
      setPlans(p);
      setClients(c);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNewPlan = () => {
    setEditingPlan(null);
    setForm({ title: "", goal: "", drills: "", notes: "", clientId: "", isPublic: true });
    setShowEditor(true);
  };

  const openEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setForm({
      title: plan.title,
      goal: plan.goal || "",
      drills: plan.drills || "",
      notes: plan.notes || "",
      clientId: plan.clientId ? String(plan.clientId) : "",
      isPublic: plan.isPublic,
    });
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const data = {
        title: form.title,
        goal: form.goal || undefined,
        drills: form.drills || undefined,
        notes: form.notes || undefined,
        clientId: form.clientId ? parseInt(form.clientId) : undefined,
        isPublic: form.isPublic,
      };

      if (editingPlan) {
        await updatePlan(editingPlan.id, data);
      } else {
        await createPlan(data);
      }
      setShowEditor(false);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const copyShareLink = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/coach/plans/${token}`);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const getClientName = (clientId?: number) => {
    if (!clientId) return null;
    const c = clients.find((cl) => cl.id === clientId);
    return c?.name;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (showEditor) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {editingPlan ? "Edit Plan" : "New Coaching Plan"}
          </h1>
          <button
            onClick={() => setShowEditor(false)}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Cancel
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Plan Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Freestyle Fundamentals - 8 Week Program"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Assign to Client (optional)</label>
            <select
              value={form.clientId}
              onChange={(e) => setForm({ ...form, clientId: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base"
            >
              <option value="">Unassigned</option>
              {clients.map((c) => (
                <option key={c.id} value={String(c.id)}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Goals</label>
            <textarea
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              placeholder="What this swimmer should achieve..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base resize-y"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Weekly Drills & Assignments</label>
            <textarea
              value={form.drills}
              onChange={(e) => setForm({ ...form, drills: e.target.value })}
              placeholder="Week 1: 4x50 freestyle drill, focus on catch...&#10;Week 2: Backstroke rotation drills..."
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base resize-y font-mono text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Coach Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Additional guidance, tips, encouragement..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base resize-y"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublic}
                onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
                className="w-4 h-4 rounded border-input text-primary focus:ring-ring"
              />
              <span className="text-sm text-foreground">Make shareable (anyone with the link can view)</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
            </button>
            <button
              onClick={() => setShowEditor(false)}
              className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Coaching Plans</h1>
          <p className="text-muted-foreground mt-1">Create and share personalized training plans</p>
        </div>
        <button
          onClick={openNewPlan}
          className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No coaching plans yet</p>
          <button onClick={openNewPlan} className="mt-3 text-primary hover:underline text-sm font-medium">
            Create your first plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan) => {
            const clientName = getClientName(plan.clientId);
            return (
              <div key={plan.id} className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg truncate">{plan.title}</h3>
                    {clientName && (
                      <p className="text-sm text-muted-foreground mt-0.5">Assigned to {clientName}</p>
                    )}
                  </div>
                  {plan.isPublic && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 ml-2 whitespace-nowrap">
                      Shareable
                    </span>
                  )}
                </div>

                {plan.goal && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{plan.goal}</p>
                )}

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <button
                    onClick={() => openEditPlan(plan)}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Edit
                  </button>
                  {plan.isPublic && (
                    <>
                      <span className="text-border">|</span>
                      <button
                        onClick={() => copyShareLink(plan.shareToken)}
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        {copiedToken === plan.shareToken ? "Copied!" : "Copy Share Link"}
                      </button>
                    </>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {new Date(plan.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
