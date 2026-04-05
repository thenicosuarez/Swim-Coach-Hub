"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Services() {
  return (
    <section id="services" className="py-24 bg-secondary relative">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest uppercase text-sm mb-3"
          >
            Lessons For Every Level
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Services & Rates
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Thoughtfully designed lessons focused on water safety, confidence, and skill development. Each session is tailored to the swimmer's age, experience, level, and goals.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h4 className="text-xl font-display font-bold text-foreground mb-4">Lesson Options & Rates</h4>
          <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-6 py-4 font-semibold">Lesson Type</th>
                  <th className="px-6 py-4 font-semibold text-center">30 min</th>
                  <th className="px-6 py-4 font-semibold text-center">45 min</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {[
                  { label: "Private (1:1)", thirty: "$45", fortyfive: "$60" },
                  { label: "Semi-Private (2 swimmers)", thirty: "$75", fortyfive: "$105" },
                  { label: "Semi-Private (3 swimmers)", thirty: "$105", fortyfive: "$130" },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">{row.label}</td>
                    <td className="px-6 py-4 text-center font-bold text-accent text-base">{row.thirty}</td>
                    <td className="px-6 py-4 text-center font-bold text-accent text-base">{row.fortyfive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <p><em>For swimmers 24 months and under, lessons are 30 minutes — a gentle water introduction with parent participation encouraged.</em></p>
            <p><em>Semi-private cost can be split between swimmers.</em></p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h4 className="text-xl font-display font-bold text-foreground mb-1">Packages</h4>
          <p className="text-sm text-muted-foreground mb-4">Save when you book a series:</p>
          <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-6 py-4 font-semibold">Lesson Type</th>
                  <th className="px-6 py-4 font-semibold text-center">4 Lessons</th>
                  <th className="px-6 py-4 font-semibold text-center">8 Lessons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {[
                  { label: "Private (1:1) — 30 min",     four: "$170", fourSub: "$42.50/lesson", eight: "$320", eightSub: "$40/lesson" },
                  { label: "Private (1:1) — 45 min",     four: "$225", fourSub: "$56.25/lesson", eight: "$425", eightSub: "$53.13/lesson" },
                  { label: "Semi-Private (2) — 30 min",  four: "$275", fourSub: "$68.75/lesson", eight: "$524", eightSub: "$65.50/lesson" },
                  { label: "Semi-Private (2) — 45 min",  four: "$385", fourSub: "$96.25/lesson", eight: "$735", eightSub: "$91.88/lesson" },
                  { label: "Semi-Private (3) — 30 min",  four: "$405", fourSub: "$101.25/lesson", eight: "$795", eightSub: "$99.38/lesson" },
                  { label: "Semi-Private (3) — 45 min",  four: "$480", fourSub: "$120/lesson", eight: "$912", eightSub: "$114/lesson" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">{row.label}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-accent text-base block">{row.four}</span>
                      <span className="text-xs text-muted-foreground">{row.fourSub}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-accent text-base block">{row.eight}</span>
                      <span className="text-xs text-muted-foreground">{row.eightSub}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <h4 className="text-xl font-display font-bold text-foreground mb-4">More Ways to Train</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-display text-lg font-bold text-foreground">Advanced / Stroke Precision</h5>
                <span className="text-2xl font-black text-foreground whitespace-nowrap ml-4">
                  $109<span className="text-sm font-semibold text-muted-foreground"> / hr</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                For competitive swimmers looking to refine technique. Includes video analysis and take-home analysis sheets.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-display text-lg font-bold text-foreground">Video Analysis Session</h5>
                <span className="text-2xl font-black text-foreground whitespace-nowrap ml-4">$59</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Submit your video for a detailed technique breakdown with personalized recommendations and a Zoom debrief. Please send video at least 48 hours prior to your appointment.
              </p>
              <a
                href="#booking"
                className="inline-flex items-center text-xs font-semibold text-accent hover:underline"
              >
                Submit video here →
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <Button size="lg" variant="default" asChild className="text-lg px-10 py-6 rounded-2xl shadow-lg">
            <a href="#booking">
              Book a Session
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-center"
        >
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Lessons available at <strong className="text-foreground">Skinner Park Pool</strong> (Whitney Young HS), <strong className="text-foreground">Sheridan Park Pool</strong> (near UIC), your building's pool, or another location that works for you. A <strong className="text-foreground">$15 travel fee</strong> applies for locations outside the city, 30+ minutes away, or when parking costs apply.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
