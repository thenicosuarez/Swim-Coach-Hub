const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const API_BASE = `${BASE_PATH}/api`;

async function coachFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 401) {
    window.location.href = `${BASE_PATH}/login`;
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }

  return res.json();
}

export async function login(password: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function logout() {
  await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" });
  window.location.href = `${BASE_PATH}/login`;
}

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/check`, { credentials: "include" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getConfig(): Promise<{ calendlyUrl: string }> {
  return coachFetch("/coach/config");
}

export async function getBookings() {
  return coachFetch("/coach/bookings");
}

export async function approveBooking(id: number) {
  return coachFetch(`/coach/bookings/${id}/approve`, { method: "PATCH" });
}

export async function rejectBooking(id: number, note?: string) {
  return coachFetch(`/coach/bookings/${id}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ note }),
  });
}

export async function getClients() {
  return coachFetch("/coach/clients");
}

export async function getBookingById(id: number) {
  const bookings = await coachFetch("/coach/bookings");
  return bookings.find((b: { id: number }) => b.id === id);
}

export async function updateClient(id: number, data: { notes?: string; status?: string }) {
  return coachFetch(`/coach/clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function getPlans() {
  return coachFetch("/coach/plans");
}

export async function createPlan(data: {
  title: string;
  goal?: string;
  drills?: string;
  notes?: string;
  clientId?: number;
  isPublic?: boolean;
}) {
  return coachFetch("/coach/plans", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePlan(id: number, data: Record<string, unknown>) {
  return coachFetch(`/coach/plans/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function getSharedPlan(token: string) {
  const res = await fetch(`${API_BASE}/plans/share/${token}`);
  if (!res.ok) throw new Error("Plan not found");
  return res.json();
}

export async function getSessions(clientId?: number) {
  const q = clientId ? `?clientId=${clientId}` : "";
  return coachFetch(`/coach/sessions${q}`);
}

export async function createSession(data: {
  clientId?: number;
  bookingId?: number;
  scheduledAt?: string;
  durationMinutes?: number;
  service?: string;
  notes?: string;
  status?: string;
}) {
  return coachFetch("/coach/sessions", { method: "POST", body: JSON.stringify(data) });
}

export async function updateSession(id: number, data: Record<string, unknown>) {
  return coachFetch(`/coach/sessions/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function getInvoices(clientId?: number, status?: string) {
  const params = new URLSearchParams();
  if (clientId) params.set("clientId", String(clientId));
  if (status) params.set("status", status);
  const q = params.toString() ? `?${params}` : "";
  return coachFetch(`/coach/invoices${q}`);
}

export async function createInvoice(data: {
  clientId?: number;
  sessionId?: number;
  amountCents: number;
  status?: string;
  dueDate?: string;
  paymentMethod?: string;
  notes?: string;
}) {
  return coachFetch("/coach/invoices", { method: "POST", body: JSON.stringify(data) });
}

export async function updateInvoice(id: number, data: Record<string, unknown>) {
  return coachFetch(`/coach/invoices/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function deleteInvoice(id: number) {
  return coachFetch(`/coach/invoices/${id}`, { method: "DELETE" });
}
