import { Instagram, Twitter, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a3a3a] text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo.png`} 
                alt="Logo" 
                className="w-10 h-10 rounded-full bg-white p-1"
              />
              <span className="font-display font-bold text-2xl tracking-tight">
                [Your<span className="text-accent"> Name]</span>
              </span>
            </div>
            <p className="text-white/70 max-w-sm">
              Train hard. Swim smart. Love the water. University of Michigan D1 swimmer bringing elite coaching to Chicago swimmers of all levels.
            </p>
            <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
              <MapPin className="w-4 h-4" />
              <span>West Loop, Chicago</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 tracking-wide uppercase text-white/50">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-accent transition-colors">About Me</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Services & Rates</a></li>
              <li><a href="#booking" className="hover:text-accent transition-colors">Book a Session</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 tracking-wide uppercase text-white/50">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:your.email@example.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-white/70">
              your.email@example.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} [Your Name] Swimming. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
