"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CALENDLY_BASE_URL } from "@/lib/booking-urls";

const SERVICE_OPTIONS = [
  { value: "Private Lesson (1:1)", label: "Private Lesson (1:1)" },
  { value: "Semi-Private (2 swimmers)", label: "Semi-Private (2 swimmers)" },
  { value: "Semi-Private (3 swimmers)", label: "Semi-Private (3 swimmers)" },
  { value: "Baby & Toddler (under 2)", label: "Baby & Toddler (under 2)" },
  { value: "Video Analysis", label: "Video Analysis / Stroke Review" },
  { value: "Other / Not sure", label: "Other / Not sure yet" },
];

const GOAL_OPTIONS = [
  "Water safety & comfort",
  "Learn to swim",
  "Improve technique",
  "Competitive prep / team",
  "Fitness swimming",
  "Fun & recreation",
];

const AGE_OPTIONS = [
  "Under 2",
  "2–4",
  "5–7",
  "8–12",
  "13–17",
  "18+",
];

const EXPERIENCE_OPTIONS = [
  "Complete beginner",
  "Some basics (can float/kick)",
  "Comfortable in water",
  "Intermediate",
  "Advanced / competitive",
];

const FOUR_STROKES_OPTIONS = ["Yes", "No", "Working on it"];
const POOL_ACCESS_OPTIONS = ["Yes — building or private pool", "No — need pool suggestion"];

const quickServices = [
  { label: "Private Lesson", sub: "from $60 / 30 min", slug: "30min" },
  { label: "Advanced / Team Prep", sub: "from $65 / 30 min", slug: "advanced" },
  { label: "Baby & Toddler", sub: "from $40 / session", slug: "baby" },
  { label: "Group / Family", sub: "$50 / 45 min", slug: "group" },
  { label: "Video Review", sub: "$20 / video", slug: "video" },
];

type FormState = "idle" | "submitting" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  swimmerAge: string;
  experience: string;
  allFourStrokes: string;
  poolAccess: string;
  service: string;
  goal: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

const empty: FormFields = {
  name: "",
  email: "",
  phone: "",
  neighborhood: "",
  swimmerAge: "",
  experience: "",
  allFourStrokes: "",
  poolAccess: "",
  service: "",
  goal: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};

function PillSelect({
  options,
  value,
  onChange,
  disabled,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          disabled={disabled}
          onClick={() => onChange(value === opt ? "" : opt)}
          className={[
            "px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-150 cursor-pointer",
            value === opt
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-primary/5",
            disabled ? "opacity-50 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function Booking() {
  const [fields, setFields] = useState<FormFields>(empty);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(key: keyof FormFields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function buildNotes(): string {
    const parts: string[] = [];
    if (fields.swimmerAge) parts.push(`Swimmer age: ${fields.swimmerAge}`);
    if (fields.experience) parts.push(`Experience: ${fields.experience}`);
    if (fields.allFourStrokes) parts.push(`All four strokes: ${fields.allFourStrokes}`);
    if (fields.poolAccess) parts.push(`Pool access: ${fields.poolAccess}`);
    if (fields.neighborhood) parts.push(`Neighborhood: ${fields.neighborhood}`);
    if (fields.goal) parts.push(`Goal: ${fields.goal}`);
    if (fields.notes.trim()) parts.push(`Additional notes: ${fields.notes.trim()}`);
    return parts.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim() || undefined,
          service: fields.service,
          preferredDate: fields.preferredDate || undefined,
          preferredTime: fields.preferredTime || undefined,
          notes: buildNotes() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "Something went wrong");
      }

      setFormState("success");
      setFields(empty);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setFormState("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";
  const labelClass = "block text-sm font-semibold text-foreground mb-2";
  const sectionHeadingClass = "text-xs font-bold uppercase tracking-widest text-primary mb-4 pb-2 border-b border-border";
  const isSubmitting = formState === "submitting";

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Book a Session
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fill out the intake form below — I'll review your goals and reach out within 24 hours with a personalized recommendation and scheduling link.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-14">

          <div className="bg-card rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-5 py-20 px-8 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-2xl text-foreground mb-2">
                      You're all set!
                    </h4>
                    <p className="text-muted-foreground max-w-sm">
                      Thanks for reaching out. I'll review your goals and follow up within 24 hours with a personalized plan and scheduling link.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState("idle")}
                    className="text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-8 md:p-10 space-y-10"
                >
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-1">
                      Swimmer Intake Form
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Tell me about your swimmer — goals, experience, and availability. Fields marked <span className="text-destructive">*</span> are required.
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-5">
                    <p className={sectionHeadingClass}>Contact Information</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelClass}>Full Name <span className="text-destructive">*</span></label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={fields.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Jane Smith"
                          className={inputClass}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>Email <span className="text-destructive">*</span></label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={fields.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="jane@example.com"
                          className={inputClass}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <input
                          id="phone"
                          type="tel"
                          value={fields.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="(312) 555-0100"
                          className={inputClass}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="neighborhood" className={labelClass}>Neighborhood / Area <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <input
                          id="neighborhood"
                          type="text"
                          value={fields.neighborhood}
                          onChange={(e) => update("neighborhood", e.target.value)}
                          placeholder="West Loop, River North, Oak Park…"
                          className={inputClass}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* About the Swimmer */}
                  <div className="space-y-6">
                    <p className={sectionHeadingClass}>About the Swimmer</p>

                    <div>
                      <label className={labelClass}>Swimmer's Age</label>
                      <PillSelect
                        options={AGE_OPTIONS}
                        value={fields.swimmerAge}
                        onChange={(v) => update("swimmerAge", v)}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Experience Level</label>
                      <PillSelect
                        options={EXPERIENCE_OPTIONS}
                        value={fields.experience}
                        onChange={(v) => update("experience", v)}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Can the swimmer do all four strokes?</label>
                      <PillSelect
                        options={FOUR_STROKES_OPTIONS}
                        value={fields.allFourStrokes}
                        onChange={(v) => update("allFourStrokes", v)}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Do you have access to a pool?</label>
                      <PillSelect
                        options={POOL_ACCESS_OPTIONS}
                        value={fields.poolAccess}
                        onChange={(v) => update("poolAccess", v)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Session Preferences */}
                  <div className="space-y-5">
                    <p className={sectionHeadingClass}>Session Preferences</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="service" className={labelClass}>Service Interest <span className="text-destructive">*</span></label>
                        <select
                          id="service"
                          required
                          value={fields.service}
                          onChange={(e) => update("service", e.target.value)}
                          className={inputClass}
                          disabled={isSubmitting}
                        >
                          <option value="" disabled>Select a service…</option>
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="goal" className={labelClass}>Main Goal</label>
                        <select
                          id="goal"
                          value={fields.goal}
                          onChange={(e) => update("goal", e.target.value)}
                          className={inputClass}
                          disabled={isSubmitting}
                        >
                          <option value="">Select a goal…</option>
                          {GOAL_OPTIONS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="preferredDate" className={labelClass}>Preferred Start Date <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <input
                          id="preferredDate"
                          type="date"
                          value={fields.preferredDate}
                          onChange={(e) => update("preferredDate", e.target.value)}
                          className={inputClass}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="preferredTime" className={labelClass}>Preferred Time of Day <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <select
                          id="preferredTime"
                          value={fields.preferredTime}
                          onChange={(e) => update("preferredTime", e.target.value)}
                          className={inputClass}
                          disabled={isSubmitting}
                        >
                          <option value="">No preference</option>
                          <option value="Early morning (6–9 am)">Early morning (6–9 am)</option>
                          <option value="Morning (9 am–12 pm)">Morning (9 am–12 pm)</option>
                          <option value="Afternoon (12–4 pm)">Afternoon (12–4 pm)</option>
                          <option value="Evening (4–8 pm)">Evening (4–8 pm)</option>
                          <option value="Weekends only">Weekends only</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-5">
                    <p className={sectionHeadingClass}>Anything Else?</p>
                    <div>
                      <label htmlFor="notes" className={labelClass}>Additional Notes <span className="text-muted-foreground font-normal">(optional)</span></label>
                      <textarea
                        id="notes"
                        rows={4}
                        value={fields.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder="Injuries, scheduling constraints, special needs, questions — anything I should know before reaching out…"
                        className={`${inputClass} resize-none`}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {formState === "error" && (
                    <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-10 py-4 rounded-xl hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Send My Request"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm font-medium px-2">Already know what you need?</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2 text-center">
              Book directly on Calendly
            </h3>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Skip the intake form and book a specific service right now.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickServices.map((svc, i) => (
                <motion.a
                  key={svc.slug}
                  href={`${CALENDLY_BASE_URL.replace(/\/$/, "")}/${svc.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex flex-col items-start gap-1.5 p-5 rounded-2xl border-2 border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-1 group-hover:bg-primary/20 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {svc.label}
                  </span>
                  <span className="text-sm text-muted-foreground">{svc.sub}</span>
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
