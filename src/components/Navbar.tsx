import { useState, useEffect } from "react";
import { Compass, Menu, X, PhoneCall, Globe } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent on top, solid on scroll
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Destinations", href: "#packages" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Inquire", href: "#contact" },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" id="nav-logo" className="flex items-center gap-3 group text-white">
          <div className="p-2.5 bg-secondary/90 rounded-full text-primary group-hover:bg-secondary group-hover:scale-105 transition-all duration-300 shadow-md">
            <Compass className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="font-display text-lg lg:text-xl font-bold tracking-wider block uppercase text-white group-hover:text-secondary-light transition-colors duration-300">
              Voyage Adventures
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-luxury-gold font-light block -mt-1 leading-none">
              VOYAGE ADVENTURES LLP
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-link-${link.name.toLowerCase()}`}
              href={link.href}
              className="font-sans text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:text-secondary text-white/95 relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Header Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            id="nav-cta-button"
            href="#contact"
            className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-primary hover:text-white font-sans text-xs tracking-widest font-semibold uppercase px-5 py-3 rounded-none transition-all duration-300 border border-secondary shadow-md hover:shadow-lg"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            Plan Passage
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-secondary p-1 focus:outline-none transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[73px] z-40 w-full bg-primary/98 backdrop-blur-lg flex flex-col md:hidden transition-all duration-500 ease-in-out border-t border-white/5 ${
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
        style={{ height: "calc(100vh - 73px)" }}
      >
        <div className="flex flex-col items-center justify-center space-y-8 flex-1 px-8 py-12 scrollbar-none overflow-y-auto">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              id={`mobile-nav-link-${link.name.toLowerCase()}`}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-2xl font-semibold text-white/90 hover:text-secondary tracking-wide uppercase transition-all duration-300 block transform hover:scale-105"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </a>
          ))}

          <a
            id="mobile-nav-cta"
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full max-w-xs flex items-center justify-center gap-3 bg-secondary hover:bg-secondary-dark text-primary py-4 px-6 text-sm tracking-widest uppercase font-semibold text-center hover:text-white transition-all duration-300 mt-4"
          >
            <PhoneCall className="h-4 w-4" />
            Inquire Now
          </a>
        </div>
        
        {/* Mobile Footer Area inside Drawer */}
        <div className="border-t border-white/10 p-6 text-center bg-primary-dark">
          <p className="text-xs text-white/50 tracking-wider flex items-center justify-center gap-2">
            <Globe className="h-3.5 w-3.5 text-secondary animate-pulse" />
            Curating Luxury Worldwide
          </p>
        </div>
      </div>
    </nav>
  );
}
