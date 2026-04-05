"use client";

import { useState, useEffect } from "react";
import { getSessions, createSession, updateSession, getClients } from "@/lib/api";

interface Session { id: number; clientId?: number; bookingId?: number; scheduledAt?: string; durationMinutes?: number; service?: string; notes?: string; status: string; createdAt: string; updatedAt: string; }
interface Client { id: number; name: string; email: string; service?: string; }

const STATUS_COLORS: Record<string, string> = { scheduled: "bg-blue-100 text-blue-800 border-blue-200", completed: "bg-green-100 text-green-800 border-green-200", cancelled: "bg-red-100 text-red-800 border-red-200" };
const STATUS_LABELS: Record<string, string> = { scheduled: "Scheduled", completed: "Completed", cancelled: "Cancelled" };
const SERVICE_LABELS: Record<string, string> = { private_lesson: "Private Lesson", group_session: "Group Session", advanced_team_prep: "Advanced / Team Prep", baby_toddler: "Baby & Toddler", group_family: "Group / Family", video_review: "Video Review", package_5: "5-Session Package", package_10: "10-Session Package" };
const emptyForm = { clientId: "", scheduledAt: "", durationMinutes: "60", service: "private_lesson", notes: "", status: "scheduled" };

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [groupByClient, setGroupByClient] = useState(false);
  const [editNotesId, setEditNotesId] = useState<number | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const load = async () => {
    try { const [s, c] = await Promise.all([getSessions(), getClients()]); setSessions(s); setClients(c); } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const clientName = (clientId?: number) => !clientId ? "Walk-in / No client" : (clients.find(c => c.id === clientId)?.name ?? `Client #${clientId}`);

  const handleMarkComplete = async (id: number) => { setActionLoading(id); try { await updateSession(id, { status: "completed" }); await load(); } catch (err) { console.error(err); } setActionLoading(null); };
  const handleMarkCancelled = async (id: number) => { setActionLoading(id); try { await updateSession(id, { status: "cancelled" }); await load(); } catch (err) { console.error(err); } setActionLoading(null); };

  const handleSaveNotes = async (id: number) => {
    setSaving(true);
    try { await updateSession(id, { notes: editNotes }); await load(); setEditNotesId(null); } catch (err) { console.error(err); }
    setSaving(false);
  };

  const handleCreate = async () => {
    setSaving(true);
    try {
      await createSession({ clientId: form.clientId ? parseInt(form.clientId) : undefined, scheduledAt: form.scheduledAt || undefined, durationMinutes: parseInt(form.durationMinutes) || 60, service: form.service || undefined, notes: form.notes || undefined, status: form.status });
      setForm(emptyForm); setShowCreate(false); await load();
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const filtered = sessions.filter(s => filter === "all" || s.status === filter);
  const counts = { all: sessions.length, scheduled: sessions.filter(s => s.status === "scheduled").length, completed: sessions.filter(s => s.status === "completed").length, cancelled: sessions.filter(s => s.status === "cancelled").length };

  const groupedByClient: { clientLabel: string; clientId?: number; sessions: Session[] }[] = [];
  const seen = new Set<string>();
  for (const s of filtered) {
    const key = s.clientId != null ? `client-${s.clientId}` : "no-client";
    if (!seen.has(key)) {
      seen.add(key);
      groupedByClient.push({ clientLabel: clientName(s.clientId), clientId: s.clientId, sessions: filtered.filter(fs => s.clientId != null ? fs.clientId === s.clientId : fs.clientId == null) });
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  const SessionCard = ({ session }: { session: Session }) => (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              {!groupByClient && <h3 className="font-semibold text-foreground">{clientName(session.clientId)}</h3>}
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[session.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>{STATUS_LABELS[session.status] || session.status}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {session.scheduledAt && <span>{new Date(session.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })} at {new Date(session.scheduledAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>}
              {session.durationMinutes && <span>{session.durationMinutes} min</span>}
              {session.service && <span>{SERVICE_LABELS[session.service] || session.service}</span>}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
            {session.status === "scheduled" && (
              <>
                <button onClick={() => handleMarkComplete(session.id)} disabled={actionLoading === session.id} className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 disabled:opacity-50">{actionLoading === session.id ? "..." : "Mark Complete"}</button>
                <button onClick={() => handleMarkCancelled(session.id)} disabled={actionLoading === session.id} className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20">Cancel</button>
              </>
            )}
            <button onClick={() => { if (editNotesId === session.id) { setEditNotesId(null); } else { setEditNotesId(session.id); setEditNotes(session.notes || ""); } }} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-muted">{editNotesId === session.id ? "Close" : "Notes"}</button>
          </div>
        </div>
        {session.notes && editNotesId !== session.id && <p className="mt-3 text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 whitespace-pre-wrap">{session.notes}</p>}
        {editNotesId === session.id && (
          <div className="mt-3 space-y-2">
            <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="Session notes..." rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" autoFocus />
            <div className="flex gap-2">
              <button onClick={() => handleSaveNotes(session.id)} disabled={saving} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
              <button onClick={() => setEditNotesId(null)} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-muted">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sessions</h1>
          <p className="text-muted-foreground mt-1">Track booked and completed swim lessons</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">+ New Session</button>
      </div>

      {showCreate && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Create Session</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Client</label><select value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"><option value="">No specific client</option>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Service</label><select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">{Object.entries(SERVICE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date & Time</label><input type="datetime-local" value={form.scheduledAt} onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration (min)</label><input type="number" value={form.durationMinutes} onChange={e => setForm(f => ({ ...f, durationMinutes: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</label><input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Optional notes..." className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleCreate} disabled={saving} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">{saving ? "Creating..." : "Create Session"}</button>
            <button onClick={() => { setShowCreate(false); setForm(emptyForm); }} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {(["all", "scheduled", "completed", "cancelled"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
              {s === "all" ? "All" : STATUS_LABELS[s]} ({counts[s]})
            </button>
          ))}
        </div>
        <button onClick={() => setGroupByClient(g => !g)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${groupByClient ? "bg-primary/10 text-primary border-primary/30" : "bg-background text-muted-foreground border-border hover:text-foreground"}`}>
          {groupByClient ? "Sort by Date" : "Group by Client"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <p>No {filter === "all" ? "" : filter} sessions yet</p>
          <button onClick={() => setShowCreate(true)} className="mt-3 text-primary text-sm hover:underline">Create your first session</button>
        </div>
      ) : groupByClient ? (
        <div className="space-y-6">
          {groupedByClient.map(group => (
            <div key={group.clientId ?? "no-client"}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                <h3 className="font-semibold text-foreground">{group.clientLabel}</h3>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{group.sessions.length} session{group.sessions.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="space-y-2 pl-11">{group.sessions.map(session => <SessionCard key={session.id} session={session} />)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">{filtered.map(session => <SessionCard key={session.id} session={session} />)}</div>
      )}
    </div>
  );
}
