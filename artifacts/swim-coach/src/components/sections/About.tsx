import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-secondary rounded-3xl -z-10 transform rotate-3" />
            <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* portrait of athletic male swimmer looking confident at edge of pool */}
              <img 
                src="https://pixabay.com/get/g59daca6183d043db65f274d4ebbeaf182147c48bbcbbe79b345e01750cb6aea6aa2d2b642269f37c0f32e72f30e050c58b9cc726859ef9cce1c9adf251c44fa7_1280.jpg" 
                alt="Coach Alex Rios" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
                <p className="text-white font-display font-bold tracking-widest uppercase text-sm">Head Coach</p>
                <h3 className="text-white text-2xl font-bold">Alex Rios</h3>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute top-8 -right-8 lg:-right-12 glass-panel p-4 rounded-xl max-w-[200px] animate-in fade-in zoom-in duration-700 delay-500 hidden sm:block">
              <p className="font-display font-bold text-primary text-xl">10+ Years</p>
              <p className="text-muted-foreground text-sm font-medium">Competitive Experience</p>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-3">About The Coach</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              Train hard. <br />
              Swim smart. <br />
              Love the water.
            </h3>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Swimming isn't just about logging yards; it's about efficiency, physics, and mindset. As a former Division 1 athlete, I've spent thousands of hours analyzing strokes, breaking down mechanics, and pushing the limits of human performance in the water.
              </p>
              <p>
                My coaching philosophy blends elite-level technical instruction with a deep passion for the sport. Whether you're a triathlete trying to survive the swim, a high schooler chasing a scholarship, or an adult learning to breathe bilaterally, I break down complex mechanics into actionable, intuitive steps.
              </p>
              
              <ul className="space-y-4 mt-8 pt-6 border-t border-border">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="font-semibold text-foreground">NCAA Division 1 Swimmer (100m/200m Free)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="font-semibold text-foreground">Certified USMS Level 3 Coach</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="font-semibold text-foreground">Specialist in Underwater Video Analysis</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
