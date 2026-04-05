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
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden shadow-xl aspect-[3/4]">
                <img 
                  src={`${import.meta.env.BASE_URL}images/nikki-portrait.png`}
                  alt="Nikki Hubbard" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden shadow-xl aspect-square">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/nikki-michigan-team.png`}
                    alt="Nikki with Michigan swimming teammates" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-xl aspect-square">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/nikki-personal.png`}
                    alt="Nikki Hubbard" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
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
            
            <div className="space-y-5 text-lg text-muted-foreground">
              <p>
                I'm a former Division I swimmer at the University of Michigan, where I spent four years training and competing, with a passion for helping people feel confident and capable in the water.
              </p>
              <p>
                Since graduating, I've continued coaching through swim camps, clinics, and private instruction, working with swimmers of all ages — from infants just getting comfortable in the water to those looking to refine technique and build endurance.
              </p>
              <p>
                In addition to swim coaching, I'm a registered yoga teacher and hold a Master of Public Health degree. I currently work in clinical research at Northwestern Memorial Hospital, where I focus on patient-centered research and care.
              </p>
              <p>
                My coaching style is supportive, structured, and tailored to each individual swimmer. I focus on building strong fundamentals, water safety, and confidence first, because that's what sets swimmers up for long-term success.
              </p>
              <p>
                I'm flexible with scheduling because I know life is busy. Let's find times that work for both of us!
              </p>
            </div>

            <div className="mt-8 py-6 border-t border-border">
              <p className="text-lg text-muted-foreground italic">Best,</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">Nikki Hubbard</p>
              <p className="text-muted-foreground mt-1">Looking forward to coaching you soon!</p>
            </div>
            
            <ul className="space-y-4 mt-6 pt-6 border-t border-border">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <span className="font-semibold text-foreground">4-Year NCAA D1 Swimmer — University of Michigan</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <span className="font-semibold text-foreground">Registered Yoga Teacher</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <span className="font-semibold text-foreground">Master of Public Health</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <span className="font-semibold text-foreground">Chicago-Based Private & Group Lessons</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
