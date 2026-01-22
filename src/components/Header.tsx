import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Navigation structure - flat links (no dropdowns)
const navLinks = [
  { label: "Home", href: "#home", sectionKey: "hero" },
  { label: "Resources", href: "#resources", sectionKey: "resources" },
  { label: "About Us", href: "#about-us", sectionKey: "about_us" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  // Get all section IDs for scroll spy
  const allSectionIds = navLinks.map(link => link.href.replace('#', ''));

  // Track active section on scroll
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = allSectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(allSectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(allSectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          "w-full max-w-4xl transition-all duration-500 rounded-full",
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg border border-border/50"
            : "bg-background/60 backdrop-blur-md border border-transparent"
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/edtech_logo.png"
                alt="Liceo EdTech Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-foreground text-base tracking-tight">
                Liceo EdTech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  activeSection === link.href.replace('#', '')
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/5 rounded-full transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
            mobileMenuOpen ? "max-h-[300px] opacity-100 pb-4" : "max-h-0 opacity-0"
          )}
        >
          <nav className="px-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 text-left",
                    activeSection === link.href.replace('#', '')
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
