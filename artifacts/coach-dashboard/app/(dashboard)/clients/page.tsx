"use client";

import { useState, useEffect } from "react";
import { getClients, updateClient, getPlans, getBookings } from "@/lib/api";

interface ClientData { id: number; bookingId?: number; name: string; email: string; phone?: string; neighborhood?: string; service?: string; notes?: string; status: string; createdAt: string; }
interface BookingData { id: number; name: string; email: string; phone?: string; service: string; preferredDate?: string; preferredTime?: string; notes?: string; status: string; createdAt: string; }
interface Plan { id: number; clientId?: number; title: string; shareToken: string; }
interface ParsedIntake { swimmerName?: string; email?: string; phone?: string; neighborhood?: string; goal?: string; allFourStrokes?: string; poolAccess?: string; preferredDays?: string[]; preferredTime?: string; experience?: string; additionalNotes?: string; [key: string]: unknown; }

function parseIntakeNotes(notes?: string): ParsedIntake {
  if (!notes) return {};
  try { return JSON.parse(notes); } catch { return { additionalNotes: notes }; }
}

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editNotes, setEditNotes] = useState<Record<number, string>>({});
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([getClients(), getPlans(), getBookings()])
      .then(([c, p, b]) => {
        setClients(c); setPlans(p); setBookings(b);
        const nm: Record<number, string> = {};
        c.forEach((cl: ClientData) => { nm[cl.id] = cl.notes || ""; });
        setEditNotes(nm);
      }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSaveNotes = async (id: number) => {
    setSavingId(id);
    try {
      await updateClient(id, { notes: editNotes[id] });
      setClients(prev => prev.map(c => c.id === id ? { ...c, notes: editNotes[id] } : c));
    } catch (err) { console.error(err); }
    setSavingId(null);
  };

  const selectedClient = clients.find(c => c.id === selectedId);
  const clientPlans = plans.filter(p => p.clientId === selectedId);
  const clientBooking = selectedClient?.bookingId ? bookings.find(b => b.id === selectedClient.bookingId) : null;
  const intakeData = clientBooking ? parseIntakeNotes(clientBooking.notes) : {};

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Clients</h1>
        <p className="text-muted-foreground mt-1">Manage your active swimmers</p>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p>No clients yet. Approve leads to add clients.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-2">
            {clients.map(client => (
              <button key={client.id} onClick={() => setSelectedId(client.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${selectedId === client.id ? "bg-primary/10 border-primary/30" : "bg-card border-border hover:bg-muted/30"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${client.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{client.status}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedClient ? (
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{selectedClient.name}</h2>
                    <p className="text-muted-foreground">{selectedClient.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedClient.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{selectedClient.status}</span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Contact Info</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedClient.phone && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone</span><p className="text-foreground mt-0.5">{selectedClient.phone}</p></div>}
                    {(selectedClient.neighborhood || intakeData.neighborhood) && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Neighborhood</span><p className="text-foreground mt-0.5">{selectedClient.neighborhood || intakeData.neighborhood as string}</p></div>}
                    {selectedClient.service && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Service</span><p className="text-foreground mt-0.5 capitalize">{selectedClient.service.replace(/_/g, " ")}</p></div>}
                    <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Client Since</span><p className="text-foreground mt-0.5">{new Date(selectedClient.createdAt).toLocaleDateString()}</p></div>
                  </div>
                </div>

                {Object.keys(intakeData).length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Intake Profile</h3>
                    <div className="grid grid-cols-2 gap-4 bg-muted/20 rounded-lg p-4">
                      {intakeData.goal && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Goal</span><p className="text-foreground mt-0.5 capitalize">{intakeData.goal as string}</p></div>}
                      {intakeData.allFourStrokes && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">All Four Strokes</span><p className="text-foreground mt-0.5 capitalize">{intakeData.allFourStrokes as string}</p></div>}
                      {intakeData.poolAccess && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pool Access</span><p className="text-foreground mt-0.5 capitalize">{intakeData.poolAccess as string}</p></div>}
                      {intakeData.preferredDays && (intakeData.preferredDays as string[]).length > 0 && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preferred Days</span><p className="text-foreground mt-0.5">{Array.isArray(intakeData.preferredDays) ? (intakeData.preferredDays as string[]).join(", ") : intakeData.preferredDays as string}</p></div>}
                      {intakeData.experience && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experience</span><p className="text-foreground mt-0.5">{intakeData.experience as string}</p></div>}
                      {clientBooking?.preferredDate && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preferred Date</span><p className="text-foreground mt-0.5">{clientBooking.preferredDate}</p></div>}
                      {(clientBooking?.preferredTime || intakeData.preferredTime) && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preferred Time</span><p className="text-foreground mt-0.5">{clientBooking?.preferredTime || intakeData.preferredTime as string}</p></div>}
                      {intakeData.additionalNotes && <div className="col-span-2"><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Additional Notes</span><p className="text-foreground mt-0.5 whitespace-pre-wrap">{intakeData.additionalNotes as string}</p></div>}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2 uppercase tracking-wide">Private Session Notes</label>
                  <textarea
                    value={editNotes[selectedClient.id] || ""}
                    onChange={e => setEditNotes(prev => ({ ...prev, [selectedClient.id]: e.target.value }))}
                    onBlur={() => { if (editNotes[selectedClient.id] !== (selectedClient.notes || "")) handleSaveNotes(selectedClient.id); }}
                    placeholder="Add private notes about sessions, progress, etc..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base resize-y"
                  />
                  {savingId === selectedClient.id && <p className="text-xs text-muted-foreground mt-1">Saving...</p>}
                </div>

                {clientPlans.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Coaching Plans</h3>
                    <div className="space-y-2">
                      {clientPlans.map(plan => (
                        <div key={plan.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm font-medium">{plan.title}</span>
                          <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/plans/${plan.shareToken}`)} className="text-xs text-primary hover:underline">Copy Share Link</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-card rounded-xl border border-border text-muted-foreground">
                Select a client to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
