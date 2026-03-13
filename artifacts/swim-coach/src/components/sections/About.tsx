import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-secondary rounded-3xl -z-10 transform rotate-3" />
            <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <img 
                src="https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?q=80&w=1200&auto=format&fit=crop" 
                alt="Black female competitive swimmer at the pool" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a3a3a]/80 to-transparent p-6">
                <p className="text-white font-display font-bold tracking-widest uppercase text-sm">Head Coach</p>
                <h3 className="text-white text-2xl font-bold">[Your Name]</h3>
              </div>
            </div>
            
            <div className="absolute top-8 -right-8 lg:-right-12 glass-panel p-4 rounded-xl max-w-[200px] animate-in fade-in zoom-in duration-700 delay-500 hidden sm:block">
              <p className="font-display font-bold text-primary text-xl">4 Years</p>
              <p className="text-muted-foreground text-sm font-medium">University of Michigan D1 Swim</p>
            </div>
          </motion.div>

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
                I spent four years swimming Division 1 at the <strong className="text-foreground">University of Michigan</strong>, competing at the <strong className="text-foreground">Big Ten Championship</strong> and training under one of the best coaching staffs in college swimming. That experience shaped everything about how I coach today.
              </p>
              <p>
                Now based in <strong className="text-foreground">Chicago's West Loop</strong>, I bring that same elite-level training to swimmers of every age and ability — from babies getting comfortable in the water for the first time, to kids learning their strokes, to competitive swimmers refining technique. My Michigan coaches taught me that great coaching starts with breaking down complex mechanics into simple, intuitive steps — and that a private coach should charge at minimum <strong className="text-foreground">$1 per minute</strong>. That principle guides my fair, transparent pricing to this day.
              </p>
              <p>
                I'm also pursuing my <strong className="text-foreground">Masters of Public Health</strong> while working at Northwestern Hospital, so I get the hustle. I'm flexible with scheduling because I know life is busy — let's find times that work for both of us!
              </p>
              
              <ul className="space-y-4 mt-8 pt-6 border-t border-border">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="font-semibold text-foreground">4-Year NCAA D1 Swimmer — University of Michigan</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="font-semibold text-foreground">Big Ten Championship Competitor</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="font-semibold text-foreground">Chicago-Based Private & Group Lessons</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
