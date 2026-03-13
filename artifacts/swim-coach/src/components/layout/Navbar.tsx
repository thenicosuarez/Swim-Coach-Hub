import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Coach Logo" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <span className={cn(
            "font-display font-bold text-xl tracking-tight transition-colors",
            isScrolled ? "text-primary" : "text-white drop-shadow-md"
          )}>
            [Your<span className="text-accent"> Name]</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold uppercase tracking-wider transition-colors hover:text-accent",
                isScrolled ? "text-foreground/80" : "text-white/90 drop-shadow-sm"
              )}
            >
              {link.name}
            </a>
          ))}
          <Button 
            asChild 
            variant={isScrolled ? "default" : "default"}
            className={cn(!isScrolled && "shadow-none border border-white/20 backdrop-blur-sm bg-white/10 hover:bg-white hover:text-primary")}
          >
            <a href="#booking">Book a Session</a>
          </Button>
        </nav>

        <button 
          className="md:hidden p-2 text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
          )}
        </button>
      </div>

      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "max-h-80 border-t" : "max-h-0"
      )}>
        <nav className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-display font-semibold text-foreground p-2 border-b border-border/50"
            >
              {link.name}
            </a>
          ))}
          <Button asChild className="mt-2 w-full">
            <a href="#booking" onClick={() => setMobileMenuOpen(false)}>Book a Session</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
