import { motion } from "framer-motion";

const CALENDLY_URL = import.meta.env.VITE_COACH_CALENDLY_URL ?? "https://calendly.com/[your-handle]";
const TALLY_FORM_URL = import.meta.env.VITE_TALLY_FORM_URL ?? "";

const quickServices = [
  { label: "Private Lesson", sub: "from $60 / 30 min", slug: "30min" },
  { label: "Advanced / Team Prep", sub: "from $65 / 30 min", slug: "advanced" },
  { label: "Baby & Toddler", sub: "from $40 / session", slug: "baby" },
  { label: "Group / Family", sub: "$50 / 45 min", slug: "group" },
  { label: "Video Review", sub: "$20 / video", slug: "video" },
];

export function Booking() {
  const tallyUrl = TALLY_FORM_URL || "https://tally.so/r/placeholder";

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
            Pick a service to book directly — or fill out the intake form so I can
            reach out with a customized plan.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-14">

          <div>
            <h3 className="font-display font-bold text-xl text-foreground mb-5 text-center">
              Book directly on Calendly
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickServices.map((svc, i) => (
                <motion.a
                  key={svc.slug}
                  href={`${CALENDLY_URL}/${svc.slug}`}
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

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm font-medium px-2">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-foreground mb-3 text-center">
              Tell me about your swimmer
            </h3>
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Not sure which session to book? Fill out the intake form — I'll review
              your goals and reach out within 24 hours with a personalized recommendation.
            </p>

            <div className="bg-card rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden">
              {TALLY_FORM_URL ? (
                <iframe
                  data-tally-src={TALLY_FORM_URL}
                  src={TALLY_FORM_URL}
                  title="Swim Coaching Intake Form"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="block"
                  allow="camera; microphone; autoplay; encrypted-media;"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-6 py-16 px-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-foreground mb-2">
                      Intake Form
                    </h4>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                      The intake form will appear here once configured. Click below to open it in a new tab.
                    </p>
                  </div>
                  <a
                    href={tallyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open Intake Form
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
