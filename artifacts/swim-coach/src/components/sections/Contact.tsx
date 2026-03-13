import { motion } from "framer-motion";
import { Instagram, Twitter, Mail, Linkedin, MessageCircle } from "lucide-react";

export function Contact() {
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
              Let's Connect
            </h3>
            <p className="text-white/70 mb-10">
              Have questions about lessons, scheduling, or pool locations? Reach out anytime — I'd love to hear from you!
            </p>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-accent" />
                <h4 className="font-display font-bold text-xl text-white">Live Chat Coming Soon</h4>
              </div>
              <p className="text-white/60 text-sm max-w-md mx-auto">
                I'm setting up a live chat assistant so you can get answers instantly. In the meantime, feel free to email me or connect on social!
              </p>
            </div>

            <div className="space-y-6">
              <a 
                href="mailto:your.email@example.com" 
                className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors font-semibold text-lg"
              >
                <Mail className="w-5 h-5" />
                your.email@example.com
              </a>

              <div className="flex justify-center gap-4">
                <a
                  href="https://instagram.com/[your-handle]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/[your-handle]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/[your-handle]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
