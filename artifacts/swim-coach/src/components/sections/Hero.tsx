"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TALLY_INTAKE_URL } from "@/lib/booking-urls";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560089000-7433a4ebbd64?q=80&w=2070&auto=format&fit=crop"
          alt="Black female swimmer racing in competition pool"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-overlay-dark/90 via-overlay-dark/70 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 pt-20">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.1] mb-6 tracking-tight text-balance"
          >
            Michigan trained. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-300">
              Chicago coached.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 mb-4 max-w-xl font-light leading-relaxed"
          >
            Elite technique, personalized coaching, and a genuine love for the water — for swimmers of every level.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="text-white/70 text-base md:text-lg font-light mb-5 max-w-xl leading-relaxed"
          >
            From infants &amp; toddlers to high school athletes to adults — coaching for every age and stage.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: "easeOut" }}
            className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-8"
          >
            Coach Nikki · West Loop + West Town, Chicago
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" variant="accent" asChild className="text-lg px-8">
              <a href={TALLY_INTAKE_URL} target="_blank" rel="noopener noreferrer">
                Book a Session
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
            >
              <a href="#services">View Rates</a>
            </Button>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url(/images/water-texture.png)",
          backgroundSize: "cover",
        }}
      />
    </section>
  );
}
