export const CALENDLY_BASE_URL =
  process.env.NEXT_PUBLIC_COACH_CALENDLY_URL || "https://calendly.com/[your-handle]";

export function calendlyUrl(slug?: string) {
  const base = CALENDLY_BASE_URL.replace(/\/$/, "");
  return slug ? `${base}/${slug}` : base;
}
