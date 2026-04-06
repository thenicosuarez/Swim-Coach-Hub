"use client";

import { useState, useEffect } from "react";

interface YogaInquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  eventType?: string;
  groupSize?: string;
  eventDate?: string;
  location?: string;
  message?: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function YogaLeadsPage() {
  const [inquiries, setInquiries] = useState<YogaInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch(`${basePath}/api/coach/yoga`)
      .then(r => r.json())
      .then(data => { setInquiries(Array.isArray(data) ? data : []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? inquiries : inquiries.filter(i => i.status === filter);
  const counts = {
    all: inquiries.length,
    pending: inquiries.filter(i => i.status === "pending").length,
    approved: inquiries.filter(i => i.status === "approved").length,
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Yoga Leads</h1>
        <p className="text-muted-foreground mt-1">Incoming yoga &amp; wellness session inquiries</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "pending", "approved"] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p>No {filter === "all" ? "" : filter} yoga inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(inquiry => {
            const isExpanded = expandedId === inquiry.id;
            const name = `${inquiry.firstName} ${inquiry.lastName}`;
            return (
              <div key={inquiry.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-5 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setExpandedId(isExpanded ? null : inquiry.id)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground text-lg">{name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[inquiry.status] ?? STATUS_COLORS.pending}`}>
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </span>
                        {inquiry.eventType && (
                          <span className="px-2 py-0.5 rounded text-xs bg-[#f0f5f1] text-[#3d7444] border border-[#b8d4bc]">
                            {inquiry.eventType}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>{inquiry.email}</span>
                        {inquiry.phone && <span>{inquiry.phone}</span>}
                        {inquiry.groupSize && <span>{inquiry.groupSize}</span>}
                        {inquiry.location && <span>{inquiry.location}</span>}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border p-5 bg-muted/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {inquiry.eventType && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Event Type</span><p className="text-foreground mt-0.5">{inquiry.eventType}</p></div>}
                      {inquiry.groupSize && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Group Size</span><p className="text-foreground mt-0.5">{inquiry.groupSize}</p></div>}
                      {inquiry.eventDate && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preferred Date</span><p className="text-foreground mt-0.5">{inquiry.eventDate}</p></div>}
                      {inquiry.location && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location / City</span><p className="text-foreground mt-0.5">{inquiry.location}</p></div>}
                      <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</span><p className="text-foreground mt-0.5">{inquiry.email}</p></div>
                      {inquiry.phone && <div><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone</span><p className="text-foreground mt-0.5">{inquiry.phone}</p></div>}
                    </div>
                    {inquiry.message && (
                      <div className="mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</span>
                        <p className="text-foreground mt-0.5 whitespace-pre-wrap">{inquiry.message}</p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <a href={`mailto:${inquiry.email}`}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                        Reply by Email
                      </a>
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
