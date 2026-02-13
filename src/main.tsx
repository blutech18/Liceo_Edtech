import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global IntersectionObserver: adds .is-visible to .animate-fade-up / .animate-fade-in / .animate-scale-in
// when they scroll into the viewport, triggering their CSS animations per-card instead of per-section.
if (
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  const observe = () => {
    document
      .querySelectorAll(".animate-fade-up, .animate-fade-in, .animate-scale-in")
      .forEach((el) => {
        if (!el.classList.contains("is-visible")) observer.observe(el);
      });
  };

  // Initial pass + re-observe after React renders new elements
  const mo = new MutationObserver(observe);
  document.addEventListener("DOMContentLoaded", () => {
    observe();
    mo.observe(document.body, { childList: true, subtree: true });
  });
  // Fallback if DOMContentLoaded already fired
  if (document.readyState !== "loading") {
    observe();
    mo.observe(document.body, { childList: true, subtree: true });
  }
}

createRoot(document.getElementById("root")!).render(<App />);
