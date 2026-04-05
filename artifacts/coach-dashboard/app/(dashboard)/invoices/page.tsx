"use client";

import { useState, useEffect } from "react";
import { getInvoices, createInvoice, updateInvoice, deleteInvoice, getClients, getSessions } from "@/lib/api";

interface Invoice { id: number; clientId?: number; sessionId?: number; amountCents: number; status: string; dueDate?: string; paymentMethod?: string; notes?: string; createdAt: string; updatedAt: string; }
interface Client { id: number; name: string; }
interface Session { id: number; clientId?: number; scheduledAt?: string; service?: string; }

const STATUS_COLORS: Record<string, string> = { draft: "bg-gray-100 text-gray-800 border-gray-200", sent: "bg-yellow-100 text-yellow-800 border-yellow-200", paid: "bg-green-100 text-green-800 border-green-200" };
const STATUS_LABELS: Record<string, string> = { draft: "Draft", sent: "Sent", paid: "Paid" };
const PAYMENT_METHODS = ["Cash", "Venmo", "Zelle", "Check", "Other"];
const emptyForm = { clientId: "", sessionId: "", amountDollars: "", status: "draft", dueDate: "", paymentMethod: "", notes: "" };

function formatDollars(cents: number) { return `$${(cents / 100).toFixed(2)}`; }

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const load = async () => {
    try { const [inv, c, s] = await Promise.all([getInvoices(), getClients(), getSessions()]); setInvoices(inv); setClients(c); setSessions(s); } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const clientName = (id?: number) => clients.find(c => c.id === id)?.name ?? (id ? `Client #${id}` : "—");
  const sessionLabel = (id?: number) => { if (!id) return "—"; const s = sessions.find(s => s.id === id); if (!s) return `Session #${id}`; return `${s.scheduledAt ? new Date(s.scheduledAt).toLocaleDateString() : "Unscheduled"}${s.service ? ` · ${s.service}` : ""}`; };

  const handleMarkPaid = async (id: number, method?: string) => { setActionLoading(id); try { await updateInvoice(id, { status: "paid", paymentMethod: method }); await load(); } catch (err) { console.error(err); } setActionLoading(null); };
  const handleMarkSent = async (id: number) => { setActionLoading(id); try { await updateInvoice(id, { status: "sent" }); await load(); } catch (err) { console.error(err); } setActionLoading(null); };
  const handleDelete = async (id: number) => { setActionLoading(id); try { await deleteInvoice(id); setDeleteConfirm(null); await load(); } catch (err) { console.error(err); } setActionLoading(null); };

  const handleCreate = async () => {
    if (!form.amountDollars) return;
    setSaving(true);
    try {
      await createInvoice({ clientId: form.clientId ? parseInt(form.clientId) : undefined, sessionId: form.sessionId ? parseInt(form.sessionId) : undefined, amountCents: Math.round(parseFloat(form.amountDollars) * 100), status: form.status, dueDate: form.dueDate || undefined, paymentMethod: form.paymentMethod || undefined, notes: form.notes || undefined });
      setForm(emptyForm); setShowCreate(false); await load();
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const filtered = invoices.filter(i => filter === "all" || i.status === filter);
  const counts = { all: invoices.length, draft: invoices.filter(i => i.status === "draft").length, sent: invoices.filter(i => i.status === "sent").length, paid: invoices.filter(i => i.status === "paid").length };
  const totalOutstanding = invoices.filter(i => i.status !== "paid").reduce((s, i) => s + i.amountCents, 0);
  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amountCents, 0);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-foreground">Invoices</h1><p className="text-muted-foreground mt-1">Track payments — cash, Venmo, Zelle</p></div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">+ New Invoice</button>
      </div>

      {invoices.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm"><p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Outstanding</p><p className="text-2xl font-bold text-foreground">{formatDollars(totalOutstanding)}</p></div>
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm"><p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Paid</p><p className="text-2xl font-bold text-green-600">{formatDollars(totalPaid)}</p></div>
        </div>
      )}

      {showCreate && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Create Invoice</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Client</label><select value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"><option value="">No specific client</option>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount ($)</label><input type="number" value={form.amountDollars} onChange={e => setForm(f => ({ ...f, amountDollars: e.target.value }))} placeholder="60.00" min="0" step="0.01" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Linked Session</label><select value={form.sessionId} onChange={e => setForm(f => ({ ...f, sessionId: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"><option value="">No linked session</option>{sessions.map(s => <option key={s.id} value={s.id}>{sessionLabel(s.id)}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"><option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option></select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Due Date</label><input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Payment Method</label><select value={form.paymentMethod} onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"><option value="">Not specified</option>{PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
            <div className="space-y-1.5 md:col-span-2"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</label><input type="text" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="e.g. 3-session package discount applied" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleCreate} disabled={saving || !form.amountDollars} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">{saving ? "Saving..." : "Create Invoice"}</button>
            <button onClick={() => { setShowCreate(false); setForm(emptyForm); }} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "draft", "sent", "paid"] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
            {s === "all" ? "All" : STATUS_LABELS[s]} ({counts[s]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M12 14h.01M15 14h.01M9 14h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" /></svg>
          <p>No {filter === "all" ? "" : filter} invoices yet</p>
          <button onClick={() => setShowCreate(true)} className="mt-3 text-primary text-sm hover:underline">Create your first invoice</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(invoice => (
            <div key={invoice.id} className="bg-card rounded-xl border border-border shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-bold text-foreground text-lg">{formatDollars(invoice.amountCents)}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[invoice.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>{STATUS_LABELS[invoice.status] || invoice.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>{clientName(invoice.clientId)}</span>
                    {invoice.sessionId && <span>Session: {sessionLabel(invoice.sessionId)}</span>}
                    {invoice.dueDate && <span>Due {new Date(invoice.dueDate + "T12:00:00").toLocaleDateString()}</span>}
                    {invoice.paymentMethod && <span>via {invoice.paymentMethod}</span>}
                  </div>
                  {invoice.notes && <p className="text-sm text-muted-foreground mt-1.5 italic">{invoice.notes}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
                  {invoice.status === "draft" && <button onClick={() => handleMarkSent(invoice.id)} disabled={actionLoading === invoice.id} className="px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-800 text-xs font-medium hover:bg-yellow-200 disabled:opacity-50">{actionLoading === invoice.id ? "..." : "Mark Sent"}</button>}
                  {invoice.status !== "paid" && <button onClick={() => handleMarkPaid(invoice.id)} disabled={actionLoading === invoice.id} className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 disabled:opacity-50">{actionLoading === invoice.id ? "..." : "Mark Paid"}</button>}
                  {deleteConfirm === invoice.id ? (
                    <>
                      <button onClick={() => handleDelete(invoice.id)} disabled={actionLoading === invoice.id} className="px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-medium hover:opacity-90 disabled:opacity-50">Confirm Delete</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-muted">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(invoice.id)} className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20">Delete</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
