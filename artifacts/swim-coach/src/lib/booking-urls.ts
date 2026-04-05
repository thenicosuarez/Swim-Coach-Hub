export const TALLY_INTAKE_URL =
  import.meta.env.VITE_TALLY_FORM_URL || "https://tally.so/r/placeholder";

export const CALENDLY_BASE_URL =
  import.meta.env.VITE_COACH_CALENDLY_URL || "https://calendly.com/[your-handle]";

export function calendlyUrl(slug?: string) {
  const base = CALENDLY_BASE_URL.replace(/\/$/, "");
  return slug ? `${base}/${slug}` : base;
}
