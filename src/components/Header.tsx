import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

// Navigation structure - flat links (no Home, logo clicks to home)
const navLinks = [
  { label: "Trainings", href: "#trainings", sectionKey: "trainings" },
  { label: "Resources", href: "#resources", sectionKey: "resources" },
  { label: "About Us", href: "#about-us", sectionKey: "about_us" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const rafRef = useRef<number>();
  const lastScrollY = useRef(0);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  const scrollToHome = () => {
    const home = document.getElementById("home");
    if (home) {
      home.scrollIntoView({ behavior: "smooth" });
      setActiveSection("home");
    }
  };

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) > 3) {
        setScrolled(currentScrollY > 20);

        // Scroll spy - optimized with early exit
        if (currentScrollY < 100) {
          setActiveSection("home");
        } else {
          const sections = navLinks.map((link) => ({
            id: link.href.replace("#", ""),
            el: document.getElementById(link.href.replace("#", "")),
          }));

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section.el && section.el.offsetTop <= currentScrollY + 150) {
              setActiveSection(section.id);
              break;
            }
          }
        }

        lastScrollY.current = currentScrollY;
      }

      rafRef.current = undefined;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          "w-full max-w-4xl transition-all duration-300 rounded-full backdrop-blur-xl backdrop-saturate-150",
        )}
        style={{
          backgroundColor: scrolled
            ? "rgba(15, 15, 15, 0.85)"
            : "rgba(15, 15, 15, 0.6)",
          border: scrolled
            ? "1px solid rgba(128, 0, 0, 0.3)"
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            : "none",
        }}
      >
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          {/* Logo - clicks to scroll to home */}
          <button
            onClick={scrollToHome}
            className="flex items-center group cursor-pointer"
          >
            <img
              src="/edtech_logo.png"
              alt="Liceo EdTech Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
                style={{
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "#A01010"
                      : "#CCCCCC",
                  backgroundColor:
                    activeSection === link.href.replace("#", "")
                      ? "rgba(160, 16, 16, 0.15)"
                      : "transparent",
                  fontWeight:
                    activeSection === link.href.replace("#", "") ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.href.replace("#", "")) {
                    e.currentTarget.style.color = "#A01010";
                    e.currentTarget.style.backgroundColor =
                      "rgba(160, 16, 16, 0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.href.replace("#", "")) {
                    e.currentTarget.style.color = "#CCCCCC";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full transition-all duration-200"
            style={{ color: "#FFFFFF" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown - Separate from main navbar */}
      <div
        className={cn(
          "absolute top-20 left-0 right-0 px-4 md:hidden overflow-hidden transition-all duration-300 ease-in-out z-40",
          mobileMenuOpen
            ? "max-h-[300px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        <div className="bg-[#0F0F0F]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-w-4xl mx-auto">
          <nav className="p-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-left hover:bg-white/5 active:scale-[0.98]"
                  style={{
                    color:
                      activeSection === link.href.replace("#", "")
                        ? "#A01010"
                        : "#CCCCCC",
                    backgroundColor:
                      activeSection === link.href.replace("#", "")
                        ? "rgba(160, 16, 16, 0.15)"
                        : "transparent",
                    fontWeight:
                      activeSection === link.href.replace("#", "") ? 600 : 500,
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    {link.label}
                    {activeSection === link.href.replace("#", "") && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A01010]" />
                    )}
                  </div>
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
