import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-overlay-dark text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-10 h-10 rounded-full bg-white p-1"
              />
              <span className="font-display font-bold text-2xl tracking-tight">
                Coach<span className="text-accent"> Nikki</span>
              </span>
            </div>
            <p className="text-white/70 max-w-sm">
              Train hard. Swim smart. Love the water. University of Michigan swimmer bringing elite coaching to Chicago swimmers of all levels.
            </p>
            <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
              <MapPin className="w-4 h-4" />
              <span>West Loop + West Town, Chicago</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 tracking-wide uppercase text-white/50">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-accent transition-colors">About Me</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Services & Rates</a></li>
              <li><a href="#booking" className="hover:text-accent transition-colors">Book a Session</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 tracking-wide uppercase text-white/50">
              Contact
            </h4>
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors mb-2"
            >
              <Mail className="w-4 h-4" />
              your.email@example.com
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-sm">
          <span>&copy; {new Date().getFullYear()} Hubbard Wellness LLC. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
