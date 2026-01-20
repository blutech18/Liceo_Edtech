import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Hotline", href: "/hotline" },
  { label: "Google Classroom", href: "/google-classroom" },
  { label: "Resources", href: "/resources" },
  { label: "Trainings", href: "/trainings" },
];

const aboutLinks = [
  { label: "EdTech Team", href: "/edtech-team" },
  { label: "About Us", href: "/about-us" },
  { label: "Feedback", href: "/feedback" },
  { label: "Forms", href: "/forms" },
];

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary-dark via-primary to-primary overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/edtech_logo.png"
                alt="Liceo EdTech Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="font-bold text-primary-foreground text-lg block">
                  Liceo EdTech
                </span>
                <span className="text-primary-foreground/70 text-xs">
                  Educational Technology Center
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mt-4">
              Empowering education through technology. Providing innovative solutions for 21st-century learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-foreground/40 rounded-full group-hover:bg-primary-foreground transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              About
            </h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-foreground/40 rounded-full group-hover:bg-primary-foreground transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:edtech@liceo.edu.ph"
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors duration-300 flex items-start gap-3"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  edtech@liceo.edu.ph
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Liceo de Cagayan University, Cagayan de Oro City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Liceo Educational Technology Center. All rights reserved.
            </p>
            <p className="text-primary-foreground/40 text-xs">
              Empowering Education Through Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
