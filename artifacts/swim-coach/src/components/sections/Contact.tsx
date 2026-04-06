"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const coachEmail = process.env.NEXT_PUBLIC_COACH_EMAIL || "hello@coachnikki.com";

  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none">
        LET'S SWIM
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-3">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Ready to dive in?
            </h3>
            <p className="text-white/70 mb-4 text-lg">
              Let's connect! Whether you have questions about lessons, scheduling, or pool locations — I'd love to hear from you.
            </p>
            <p className="text-white/60 mb-10 text-sm">
              I'm usually available <strong className="text-white/80">Mondays, Thursday afternoons, Fridays,</strong> and <strong className="text-white/80">weekends</strong>. Let's find a time that works!
            </p>

            <div className="flex items-center justify-center mb-10">
              <Button size="lg" variant="accent" asChild className="text-lg px-8">
                <a href="#booking">
                  Fill out my intake form
                </a>
              </Button>
            </div>

            <a
              href={`mailto:${coachEmail}`}
              className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors font-semibold text-lg"
            >
              <Mail className="w-5 h-5" />
              {coachEmail}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
