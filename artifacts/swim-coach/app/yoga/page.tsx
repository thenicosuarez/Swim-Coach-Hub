"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";

const Y = {
  sage: "#7a9e7e",
  sageLight: "#b8d4bc",
  sagePale: "#f0f5f1",
  terra: "#c27a5b",
  terraLight: "#e8c4b0",
  cream: "#faf8f3",
  warmWhite: "#fffef9",
  charcoal: "#2e2e2b",
  muted: "#6e6d6a",
  border: "#ddd8cf",
};

const cormorant: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), Georgia, serif",
};

export default function YogaPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "var(--font-sans), sans-serif", backgroundColor: Y.cream, color: Y.charcoal, lineHeight: 1.7 }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: Y.warmWhite,
          position: "relative",
          overflow: "hidden",
          padding: "8rem 4rem 5rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 70% 60% at 80% 50%, #e8f0e9 0%, transparent 70%),
                         radial-gradient(ellipse 40% 40% at 10% 80%, #f5ebe4 0%, transparent 60%)`,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "640px" }}>
          <p
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: Y.sage,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "block", width: "32px", height: "1px", backgroundColor: Y.sage, flexShrink: 0 }} />
            Private Yoga &amp; Wellness
          </p>

          <h1
            style={{
              ...cormorant,
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: Y.charcoal,
              marginBottom: "1.75rem",
            }}
          >
            Move together.<br />
            <em style={{ fontStyle: "italic", color: Y.terra }}>Celebrate</em><br />
            intentionally.
          </h1>

          <p style={{ fontSize: "1.05rem", fontWeight: 300, color: Y.muted, lineHeight: 1.8, maxWidth: "480px", marginBottom: "2.5rem" }}>
            Bespoke yoga experiences designed for your group — whether you&apos;re toasting a bride-to-be, rewarding your team, or simply gathering the people you love for something meaningful.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="#book"
              style={{
                display: "inline-block",
                backgroundColor: Y.charcoal,
                color: Y.cream,
                padding: "0.9rem 2rem",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "background 0.25s",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = Y.sage)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = Y.charcoal)}
            >
              Request a Session
            </a>
            <a
              href="#offerings"
              style={{
                display: "inline-block",
                color: Y.charcoal,
                padding: "0.9rem 1.5rem",
                fontSize: "0.85rem",
                fontWeight: 400,
                letterSpacing: "0.06em",
                textDecoration: "none",
                borderBottom: `1px solid ${Y.border}`,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = Y.charcoal)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = Y.border)}
            >
              See offerings →
            </a>
          </div>
        </div>

        {/* Decorative pill / arch visual */}
        <div
          className="hidden lg:flex"
          style={{
            position: "absolute",
            right: "4rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: "360px",
            height: "460px",
            borderRadius: "200px 200px 0 0",
            overflow: "hidden",
            backgroundColor: Y.sagePale,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="220" height="260" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.55 }}>
            <ellipse cx="90" cy="30" rx="18" ry="18" fill={Y.sage} opacity="0.7" />
            <line x1="90" y1="48" x2="90" y2="130" stroke={Y.sage} strokeWidth="4" strokeLinecap="round" />
            <line x1="90" y1="75" x2="40" y2="110" stroke={Y.sage} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="90" y1="75" x2="140" y2="110" stroke={Y.sage} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="90" y1="130" x2="50" y2="200" stroke={Y.sage} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="90" y1="130" x2="130" y2="200" stroke={Y.sage} strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="90" cy="240" rx="35" ry="12" fill={Y.terra} opacity="0.2" />
            <ellipse cx="62" cy="232" rx="22" ry="9" fill={Y.terra} opacity="0.15" transform="rotate(-20 62 232)" />
            <ellipse cx="118" cy="232" rx="22" ry="9" fill={Y.terra} opacity="0.15" transform="rotate(20 118 232)" />
          </svg>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section id="offerings" style={{ padding: "6rem 4rem", backgroundColor: Y.cream }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: Y.terra, marginBottom: "0.75rem" }}>
          What We Offer
        </p>
        <h2 style={{ ...cormorant, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.15, color: Y.charcoal, marginBottom: "1.25rem" }}>
          Every occasion deserves<br />its own practice
        </h2>
        <p style={{ fontSize: "1rem", fontWeight: 300, color: Y.muted, maxWidth: "500px", lineHeight: 1.8, marginBottom: "3.5rem" }}>
          Each session is thoughtfully crafted around your group&apos;s energy, experience level, and intentions.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5px", backgroundColor: Y.border }} className="offerings-grid">
          {/* Card 1 — Bachelorette */}
          <OfferingCard
            iconBg="#fce8ef"
            icon={
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 22, height: 22 }}>
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#d4537e" opacity="0.8" />
              </svg>
            }
            title={<>Bachelorette<br />&amp; Celebrations</>}
            description="Honor the bride-to-be with a feel-good flow that loosens up the group, brings laughter, and leaves everyone glowing before the festivities begin."
            tags={[
              { label: "Bachelorette", style: { background: "#fce8ef", color: "#9c3d5e" } },
              { label: "Birthdays", style: { background: "#fce8ef", color: "#9c3d5e" } },
              { label: "Bridal Showers", style: { background: "#fce8ef", color: "#9c3d5e" } },
            ]}
          />

          {/* Card 2 — Corporate */}
          <OfferingCard
            iconBg="#e5f0e7"
            icon={
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 22, height: 22 }}>
                <rect x="3" y="6" width="18" height="13" rx="2" fill="#3d7444" opacity="0.7" />
                <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" stroke="#3d7444" strokeWidth="1.5" fill="none" />
                <line x1="8" y1="13" x2="16" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
            title={<>Corporate<br />Wellness</>}
            description="A restorative break for your team — breathwork, mobility, and mindfulness that re-energizes your people and fosters connection beyond the conference room."
            tags={[
              { label: "Team Retreats", style: { background: "#e5f0e7", color: "#3d7444" } },
              { label: "Offsites", style: { background: "#e5f0e7", color: "#3d7444" } },
              { label: "Workshops", style: { background: "#e5f0e7", color: "#3d7444" } },
            ]}
          />

          {/* Card 3 — Private Group */}
          <OfferingCard
            iconBg="#f5e9e2"
            icon={
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 22, height: 22 }}>
                <circle cx="12" cy="7" r="4" fill={Y.terra} opacity="0.8" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={Y.terra} strokeWidth="1.8" strokeLinecap="round" fill="none" />
              </svg>
            }
            title={<>Private Group<br />Classes</>}
            description="One-off or recurring sessions for you and your people. Friends, family, a neighborhood crew — any gathering becomes a ritual when you move together."
            tags={[
              { label: "One-Off Classes", style: { background: "#f5e9e2", color: "#8f4a2e" } },
              { label: "Group Sessions", style: { background: "#f5e9e2", color: "#8f4a2e" } },
              { label: "Custom Events", style: { background: "#f5e9e2", color: "#8f4a2e" } },
            ]}
          />
        </div>

        <style>{`
          @media (max-width: 900px) {
            .offerings-grid { grid-template-columns: 1fr !important; }
            .yoga-steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .yoga-form-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .yoga-hero-section { padding: 7rem 1.5rem 4rem !important; }
            .yoga-section { padding: 4rem 1.5rem !important; }
          }
        `}</style>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how"
        className="yoga-section"
        style={{ backgroundColor: Y.charcoal, padding: "6rem 4rem", color: Y.cream }}
      >
        <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: Y.sageLight, marginBottom: "0.75rem" }}>
          The Process
        </p>
        <h2 style={{ ...cormorant, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.15, color: Y.cream, marginBottom: "1.25rem" }}>
          From inquiry to<br /><em style={{ fontStyle: "italic", color: Y.sageLight }}>savasana</em>
        </h2>
        <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(250,248,243,0.6)", maxWidth: "500px", lineHeight: 1.8, marginBottom: "3.5rem" }}>
          Booking is simple. We handle everything so you can just show up and breathe.
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3rem" }}
          className="yoga-steps-grid"
        >
          {[
            { num: "01", title: "Tell us about your event", desc: "Fill out the form below with your date, group size, and vision. No detail is too small." },
            { num: "02", title: "We craft your session", desc: "We'll reach out within 24 hours to finalize the style, location, and any special requests." },
            { num: "03", title: "Confirm & reserve", desc: "A simple agreement and deposit locks in your date. Everything else is taken care of." },
            { num: "04", title: "Show up & flow", desc: "Arrive ready to breathe, move, and connect. We bring everything — you bring your crew." },
          ].map((step) => (
            <div key={step.num}>
              <div style={{ ...cormorant, fontSize: "3.5rem", fontWeight: 300, color: "rgba(122,158,126,0.3)", lineHeight: 1, marginBottom: "1rem" }}>
                {step.num}
              </div>
              <h4 style={{ ...cormorant, fontSize: "1.25rem", fontWeight: 300, color: Y.cream, marginBottom: "0.6rem" }}>
                {step.title}
              </h4>
              <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "rgba(250,248,243,0.55)", lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section
        id="book"
        className="yoga-section"
        style={{ padding: "6rem 4rem", backgroundColor: Y.warmWhite }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "5rem", alignItems: "start" }}
          className="yoga-form-layout"
        >
          {/* Left — info */}
          <div style={{ paddingTop: "0.5rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: Y.terra, marginBottom: "0.75rem" }}>
              Get in Touch
            </p>
            <h2 style={{ ...cormorant, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.15, color: Y.charcoal, marginBottom: "1rem" }}>
              Let&apos;s plan your<br /><em style={{ fontStyle: "italic", color: Y.terra }}>perfect session</em>
            </h2>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: Y.muted, lineHeight: 1.8, marginBottom: "2rem" }}>
              Tell us about your event and we&apos;ll be in touch within one business day with availability and pricing.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "All experience levels welcome — beginner-friendly options available",
                "Indoor & outdoor venues — we come to you",
                "Groups from 4 to 40+ participants",
                "Props, mats, and music provided upon request",
                "Custom themes and intentions for your occasion",
              ].map((perk) => (
                <li
                  key={perk}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    color: Y.muted,
                    padding: "0.65rem 0",
                    borderBottom: `1px solid ${Y.border}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: Y.sage, flexShrink: 0 }} />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 2rem",
                  backgroundColor: Y.sagePale,
                  borderRadius: "4px",
                  border: `1px solid ${Y.sageLight}`,
                }}
              >
                <h3 style={{ ...cormorant, fontSize: "1.8rem", fontWeight: 300, color: Y.charcoal, marginBottom: "0.5rem" }}>
                  Thank you, we&apos;ll be in touch!
                </h3>
                <p style={{ fontSize: "0.9rem", fontWeight: 300, color: Y.muted }}>
                  Your inquiry has been received. Expect a reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="First Name">
                    <input type="text" name="firstName" placeholder="Jane" required style={inputStyle} />
                  </Field>
                  <Field label="Last Name">
                    <input type="text" name="lastName" placeholder="Smith" required style={inputStyle} />
                  </Field>
                </div>

                <Field label="Email Address">
                  <input type="email" name="email" placeholder="jane@email.com" required style={inputStyle} />
                </Field>

                <Field label="Phone Number">
                  <input type="tel" name="phone" placeholder="(312) 555-0100" style={inputStyle} />
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="Event Type">
                    <select name="eventType" required style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236e6d6a' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", paddingRight: "2.5rem", cursor: "pointer", appearance: "none" }}>
                      <option value="" disabled>Select one...</option>
                      <option>Bachelorette Party</option>
                      <option>Birthday Celebration</option>
                      <option>Bridal Shower</option>
                      <option>Corporate Wellness</option>
                      <option>Team Retreat / Offsite</option>
                      <option>Private Group Class</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="Group Size">
                    <select name="groupSize" required style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236e6d6a' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", paddingRight: "2.5rem", cursor: "pointer", appearance: "none" }}>
                      <option value="" disabled>Approx. headcount</option>
                      <option>4–8 people</option>
                      <option>9–15 people</option>
                      <option>16–25 people</option>
                      <option>26–40 people</option>
                      <option>40+ people</option>
                    </select>
                  </Field>
                </div>

                <Field label="Preferred Date(s)">
                  <input type="date" name="eventDate" style={inputStyle} />
                </Field>

                <Field label="Event Location / City">
                  <input type="text" name="location" placeholder="e.g. Chicago, IL — or we can suggest a venue" style={inputStyle} />
                </Field>

                <Field label="Anything else we should know?">
                  <textarea
                    name="message"
                    placeholder="Experience levels, special intentions, theme ideas, accessibility needs..."
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px", lineHeight: 1.6 }}
                  />
                </Field>

                <button
                  type="submit"
                  style={{
                    marginTop: "0.5rem",
                    backgroundColor: Y.charcoal,
                    color: Y.cream,
                    border: "none",
                    padding: "1rem 2rem",
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    cursor: "pointer",
                    width: "100%",
                    transition: "background 0.25s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = Y.sage)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = Y.charcoal)}
                >
                  Send My Inquiry →
                </button>
                <p style={{ fontSize: "0.8rem", color: Y.muted, fontWeight: 300, textAlign: "center", marginTop: "-0.5rem" }}>
                  We respond within 24 hours. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: Y.charcoal,
          padding: "2.5rem 4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span style={{ ...cormorant, fontSize: "1.3rem", fontWeight: 300, color: "rgba(250,248,243,0.7)" }}>
          Hubbard <span style={{ color: Y.sageLight }}>Wellness</span>
        </span>
        <p style={{ fontSize: "0.8rem", fontWeight: 300, color: "rgba(250,248,243,0.35)" }}>
          © Hubbard Wellness LLC
        </p>
      </footer>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans), sans-serif",
  fontSize: "0.95rem",
  fontWeight: 300,
  color: "#2e2e2b",
  backgroundColor: "#faf8f3",
  border: "1px solid #ddd8cf",
  borderRadius: "3px",
  padding: "0.75rem 1rem",
  width: "100%",
  outline: "none",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6e6d6a" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function OfferingCard({
  iconBg,
  icon,
  title,
  description,
  tags,
}: {
  iconBg: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  description: string;
  tags: { label: string; style: React.CSSProperties }[];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: hovered ? "#f0f5f1" : "#fffef9",
        padding: "2.5rem 2rem",
        transition: "background 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.6rem",
          fontWeight: 300,
          color: "#2e2e2b",
          marginBottom: "0.75rem",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#6e6d6a", lineHeight: 1.75, marginBottom: "1.5rem" }}>
        {description}
      </p>
      <div>
        {tags.map((tag) => (
          <span
            key={tag.label}
            style={{
              display: "inline-block",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.3rem 0.85rem",
              borderRadius: "20px",
              marginRight: "0.4rem",
              marginBottom: "0.4rem",
              ...tag.style,
            }}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
