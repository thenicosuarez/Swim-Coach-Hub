import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "private",
    title: "Private Lesson",
    duration: "45-60 Min",
    price: 60,
    desc: "One-on-one, fully tailored to your level. Beginners learn water comfort, floating, and three foundational strokes. Intermediate swimmers refine mechanics, breathing, and timing. We go at your pace.",
    featured: false
  },
  {
    id: "advanced",
    title: "Advanced / Team Prep",
    duration: "60 Min",
    price: 65,
    desc: "For competitive swimmers and team athletes looking for refined, technical coaching. Stroke analysis, flip turns, race strategy — the same level of detail I got training D1 at Michigan.",
    featured: true
  },
  {
    id: "baby",
    title: "Baby & Toddler",
    duration: "20-45 Min",
    price: 40,
    desc: "Gentle water introduction for the littlest swimmers. Babies (20-30 min, $45) and toddlers (up to 45 min, $40) learn comfort and safety skills in a fun, supportive environment.",
    featured: false
  },
  {
    id: "group",
    title: "Group / Family",
    duration: "45 Min",
    price: 50,
    desc: "Perfect for siblings or small groups. Bring the family! I'll work with each swimmer's level while keeping it fun and engaging for everyone in the water.",
    featured: false
  }
];

const packages = [
  { title: "5-Session Package", price: 360, save: 40 },
  { title: "10-Session Package", price: 680, save: 120 },
];

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
            Transparent pricing built on the standard my Michigan coaches set: quality instruction at fair, sustainable rates. Book multiple sessions for package discounts!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`
                bg-card rounded-2xl p-8 relative flex flex-col
                shadow-lg shadow-black/5 border transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:border-primary/30
                ${svc.featured ? 'border-primary ring-1 ring-primary' : 'border-border/50'}
              `}
            >
              {svc.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Elite Level
                </span>
              )}
              
              <div className="mb-4">
                <h4 className="font-display text-xl font-bold text-foreground">{svc.title}</h4>
                <p className="text-primary font-semibold text-sm">{svc.duration}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-black text-foreground">from ${svc.price}</span>
              </div>
              
              <p className="text-muted-foreground text-sm flex-grow mb-8 leading-relaxed">
                {svc.desc}
              </p>
              
              <Button 
                variant={svc.featured ? "default" : "outline"} 
                className="w-full mt-auto"
                asChild
              >
                <a href="#booking">Book Now</a>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-300 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4" />
          
          <h4 className="font-display text-2xl md:text-3xl font-bold mb-4 relative z-10">Commit to the Process</h4>
          <p className="text-white/70 mb-8 relative z-10 max-w-lg mx-auto">Book multiple sessions or consecutive weeks and save. I'm flexible with scheduling — let's find what works for you!</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
            {packages.map((pkg, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-sm">
                <h5 className="font-display font-bold text-xl mb-2">{pkg.title}</h5>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-3xl font-black">${pkg.price}</span>
                </div>
                <p className="text-white/80 text-sm font-medium bg-white/20 inline-block px-3 py-1 rounded-full">
                  Save ${pkg.save}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Lessons available at <strong className="text-foreground">Skinner Park Pool</strong> (Whitney Young HS), <strong className="text-foreground">Sheridan Park Pool</strong> (near UIC), or your building's pool in the West Loop area. Travel fee of $5-10 may apply for locations 30+ min away.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
