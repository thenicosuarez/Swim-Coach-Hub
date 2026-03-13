import { useState, useEffect } from "react";
import { getBookings, approveBooking, rejectBooking, getConfig } from "@/lib/api";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: string;
  createdAt: string;
}

interface ParsedNotes {
  swimmerName?: string;
  email?: string;
  phone?: string;
  neighborhood?: string;
  goal?: string;
  allFourStrokes?: string;
  poolAccess?: string;
  preferredDays?: string[];
  experience?: string;
  additionalNotes?: string;
  [key: string]: unknown;
}

const SERVICE_LABELS: Record<string, string> = {
  private_lesson: "Private Lesson",
  group_session: "Group Session",
  stroke_clinic: "Stroke Clinic",
  video_analysis: "Video Analysis",
  package_5: "5-Session Package",
  package_10: "10-Session Package",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-gray-100 text-gray-800 border-gray-200",
};

function parseNotes(notes?: string): ParsedNotes {
  if (!notes) return {};
  try {
    return JSON.parse(notes);
  } catch {
    return { additionalNotes: notes };
  }
}

export default function LeadsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rejectNoteId, setRejectNoteId] = useState<number | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/[your-handle]");

  useEffect(() => {
    getConfig().then(c => setCalendlyUrl(c.calendlyUrl)).catch(console.error);
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    try {
      await approveBooking(id);
      await fetchBookings();
    } catch (err) {
      console.error(err);
    }
    setActionLoading(null);
  };

  const handleReject = async (id: number) => {
    setActionLoading(id);
    try {
      await rejectBooking(id, rejectNote || undefined);
      setRejectNoteId(null);
      setRejectNote("");
      await fetchBookings();
    } catch (err) {
      console.error(err);
    }
    setActionLoading(null);
  };

  const copyCalendlyLink = (id: number) => {
    navigator.clipboard.writeText(calendlyUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Lead Funnel</h1>
        <p className="text-muted-foreground mt-1">Review and manage incoming swimmer inquiries</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === s
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p>No {filter === "all" ? "" : filter} leads yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const parsed = parseNotes(booking.notes);
            const isExpanded = expandedId === booking.id;

            return (
              <div key={booking.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div
                  className="p-5 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground text-lg">{booking.name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[booking.status] || STATUS_COLORS.cancelled}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>{booking.email}</span>
                        {booking.phone && <span>{booking.phone}</span>}
                        <span>{SERVICE_LABELS[booking.service] || booking.service}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border p-5 bg-muted/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {parsed.neighborhood && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Neighborhood</span>
                          <p className="text-foreground mt-0.5">{parsed.neighborhood}</p>
                        </div>
                      )}
                      {parsed.goal && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Goal</span>
                          <p className="text-foreground mt-0.5 capitalize">{parsed.goal}</p>
                        </div>
                      )}
                      {parsed.allFourStrokes && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">All Four Strokes</span>
                          <p className="text-foreground mt-0.5 capitalize">{parsed.allFourStrokes}</p>
                        </div>
                      )}
                      {parsed.poolAccess && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pool Access</span>
                          <p className="text-foreground mt-0.5 capitalize">{parsed.poolAccess}</p>
                        </div>
                      )}
                      {parsed.preferredDays && parsed.preferredDays.length > 0 && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preferred Days</span>
                          <p className="text-foreground mt-0.5">{Array.isArray(parsed.preferredDays) ? parsed.preferredDays.join(", ") : parsed.preferredDays}</p>
                        </div>
                      )}
                      {parsed.experience && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experience</span>
                          <p className="text-foreground mt-0.5">{parsed.experience}</p>
                        </div>
                      )}
                      {booking.preferredDate && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preferred Date</span>
                          <p className="text-foreground mt-0.5">{booking.preferredDate}</p>
                        </div>
                      )}
                      {booking.preferredTime && (
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preferred Time</span>
                          <p className="text-foreground mt-0.5">{booking.preferredTime}</p>
                        </div>
                      )}
                    </div>

                    {parsed.additionalNotes && (
                      <div className="mb-4">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</span>
                        <p className="text-foreground mt-0.5 whitespace-pre-wrap">{parsed.additionalNotes}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(booking.id)}
                            disabled={actionLoading === booking.id}
                            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === booking.id ? "..." : "Approve"}
                          </button>
                          {rejectNoteId === booking.id ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="text"
                                value={rejectNote}
                                onChange={(e) => setRejectNote(e.target.value)}
                                placeholder="Rejection reason (optional)"
                                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                autoFocus
                              />
                              <button
                                onClick={() => handleReject(booking.id)}
                                disabled={actionLoading === booking.id}
                                className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => { setRejectNoteId(null); setRejectNote(""); }}
                                className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setRejectNoteId(booking.id)}
                              className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors"
                            >
                              Reject
                            </button>
                          )}
                        </>
                      )}
                      {booking.status === "approved" && (
                        <button
                          onClick={() => copyCalendlyLink(booking.id)}
                          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          {copiedId === booking.id ? "Copied!" : "Copy Calendly Link"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
