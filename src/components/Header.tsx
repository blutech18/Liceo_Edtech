import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { searchData } from "@/lib/searchData";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Hotline", href: "/hotline" },
  { label: "Google Classroom", href: "/google-classroom" },
  { label: "Resources", href: "/resources" },
  { label: "Trainings", href: "/trainings" },
  { label: "EdTech Team", href: "/edtech-team" },
  { label: "Feedback", href: "/feedback" },
  { label: "About Us", href: "/about-us" },
  { label: "Forms", href: "/forms" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredResults = searchData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.keywords?.some((keyword) => keyword.toLowerCase().includes(query))
    );
  });

  const handleSearchItemClick = (url: string) => {
    navigate(url);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Page":
        return "bg-primary/10 text-primary";
      case "Team":
        return "bg-blue-500/10 text-blue-600";
      case "Resource":
        return "bg-green-500/10 text-green-600";
      case "Contact":
        return "bg-orange-500/10 text-orange-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50"
        : "bg-background border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/sitesv/AAzXCkeyaH-HLwRp3GlQ7RtgCVM2em6-g-gNcIkfuDDJTFV15UA2qB3FAt08AQR0ITJIzWWduCexBWhWIs8owfXMq0k9fc8pzJIhNZAP79xglXH1iqOxbvwP-N0t9jPQ3pojvUHOjO_MK3pSiOL_IzkwoGZtxcNIg4TVMfGNauW3W2JlhTNx3aXSDl7moWdUM=w16383"
                alt="Liceo EdTech Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-foreground text-lg tracking-tight">
                Liceo EdTech
              </span>
              <span className="block text-xs text-muted-foreground -mt-0.5">
                Educational Technology Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? "nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              className="p-2.5 hover:bg-primary/5 rounded-xl transition-all duration-300 group"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <button
              className="lg:hidden p-2.5 hover:bg-primary/5 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="py-4 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${location.pathname === item.href
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pages, team members, resources, contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchItemClick(item.url)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground mt-0.5">{item.description}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No results found" : "Start typing to search..."}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
