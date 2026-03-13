import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "private",
    title: "Private Lesson",
    duration: "1 Hour",
    price: 80,
    desc: "1-on-1 highly focused session tailored exactly to your goals. Perfect for technique overhauls and detailed feedback.",
    featured: false
  },
  {
    id: "clinic",
    title: "Stroke Clinic",
    duration: "2 Hours",
    price: 95,
    desc: "Deep dive into a specific stroke. We break down the mechanics, run drills, and rebuild your efficiency.",
    featured: true
  },
  {
    id: "analysis",
    title: "Video Analysis",
    duration: "45 Mins",
    price: 60,
    desc: "Underwater recording with immediate iPad review. See exactly what you're doing wrong and how to fix it instantly.",
    featured: false
  },
  {
    id: "group",
    title: "Group Session",
    duration: "1 Hour",
    price: 40,
    desc: "Bring up to 3 friends (max 4 swimmers). Great for triathletes training together or competitive peers.",
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
            Training Options
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
            Transparent pricing. Elite coaching. Choose the format that fits your learning style and goals.
          </motion.p>
        </div>

        {/* Main Services Grid */}
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
                hover:-translate-y-1 hover:shadow-xl hover:border-accent/30
                ${svc.featured ? 'border-accent ring-1 ring-accent' : 'border-border/50'}
              `}
            >
              {svc.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </span>
              )}
              
              <div className="mb-4">
                <h4 className="font-display text-xl font-bold text-foreground">{svc.title}</h4>
                <p className="text-accent font-semibold text-sm">{svc.duration}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-black text-foreground">${svc.price}</span>
                <span className="text-muted-foreground">/session</span>
              </div>
              
              <p className="text-muted-foreground text-sm flex-grow mb-8 leading-relaxed">
                {svc.desc}
              </p>
              
              <Button 
                variant={svc.featured ? "accent" : "outline"} 
                className="w-full mt-auto"
                asChild
              >
                <a href="#booking">Select</a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Packages Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4" />
          
          <h4 className="font-display text-2xl md:text-3xl font-bold mb-8 relative z-10">Commit to the Process with Packages</h4>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
            {packages.map((pkg, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-sm">
                <h5 className="font-display font-bold text-xl mb-2">{pkg.title}</h5>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-3xl font-black">${pkg.price}</span>
                </div>
                <p className="text-accent-foreground/80 text-sm font-medium bg-white/20 inline-block px-3 py-1 rounded-full">
                  Save ${pkg.save}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
