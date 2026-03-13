const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_BASE = "/api";

function getPassword(): string | null {
  return localStorage.getItem("coach_password");
}

export function setPassword(pw: string) {
  localStorage.setItem("coach_password", pw);
}

export function clearPassword() {
  localStorage.removeItem("coach_password");
}

export function isAuthenticated(): boolean {
  return !!getPassword();
}

async function coachFetch(path: string, options: RequestInit = {}) {
  const pw = getPassword();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (pw) headers["x-coach-password"] = pw;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearPassword();
    window.location.reload();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }

  return res.json();
}

export async function validatePassword(pw: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/coach/bookings`, {
      headers: { "x-coach-password": pw },
    });
    return res.ok;
  } catch {
    return false;
  }
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

export async function createPlan(data: { title: string; goal?: string; drills?: string; notes?: string; clientId?: number; isPublic?: boolean }) {
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
  if (!res.ok) {
    throw new Error("Plan not found");
  }
  return res.json();
}
