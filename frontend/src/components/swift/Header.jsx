import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSwift, APP_LOGIN_URL } from "./SwiftContext";

const NAV = [
  { label: "For Individuals", anchor: "#dual-track" },
  { label: "For Enterprises", anchor: "#enterprise-sectors" },
  { label: "Resolution Tiers", anchor: "#tiers" },
  { label: "Panel of Neutrals", anchor: "#panel" },
];

export default function Header() {
  const [showCta, setShowCta] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openSchedule } = useSwift();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show header CTA only AFTER the hero "Schedule a 30 mins Consultation"
  // button has scrolled out of view (above the viewport).
  useEffect(() => {
    if (location.pathname !== "/") {
      setShowCta(true);
      return undefined;
    }
    let raf;
    let target = null;
    const check = () => {
      target = document.querySelector('[data-testid="hero-schedule-cta"]');
      if (!target) {
        raf = requestAnimationFrame(check);
      }
    };
    check();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Visible -> hide header CTA. Out of view (above) -> show.
          setShowCta(!e.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10px 0px" }
    );
    const attach = () => {
      const el = document.querySelector('[data-testid="hero-schedule-cta"]');
      if (el) io.observe(el);
      else raf = requestAnimationFrame(attach);
    };
    attach();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [location.pathname]);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/75 border-b border-[color:var(--border-soft)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between gap-6">
        <Link to="/" className="group flex items-center" data-testid="brand-home-link">
          <img src="/logo.webp" alt="SwiftResolwe" className="h-11 sm:h-14 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.anchor}
              onClick={(e) => handleAnchor(e, n.anchor)}
              data-testid={`nav-${n.anchor.slice(1)}`}
              className="text-[15px] font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--accent-deep)] transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={APP_LOGIN_URL}
            data-testid="login-link"
            className="hidden sm:inline-flex text-[14px] font-medium text-[color:var(--text-primary)] hover:text-[color:var(--accent-deep)] px-3 py-2 rounded-lg transition-colors"
          >
            Log In
          </a>

          <button
            data-testid="schedule-consultation-btn"
            onClick={openSchedule}
            className={`cta-primary hidden md:inline-flex items-center px-4 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
              showCta ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
            }`}
            style={{ transition: "opacity .3s ease, transform .3s ease, background .25s ease, box-shadow .25s ease" }}
          >
            Schedule a Consultation
          </button>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[color:var(--bg-surface-2)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        } bg-white border-b border-[color:var(--border-soft)]`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.anchor}
              onClick={(e) => handleAnchor(e, n.anchor)}
              className="py-3 px-2 text-[15px] font-medium text-[color:var(--text-primary)] rounded-lg hover:bg-[color:var(--bg-surface-2)]"
            >
              {n.label}
            </a>
          ))}
          <a
            href={APP_LOGIN_URL}
            className="py-3 px-2 text-[15px] font-medium text-[color:var(--text-primary)] rounded-lg hover:bg-[color:var(--bg-surface-2)]"
            onClick={() => setMobileOpen(false)}
          >
            Log In
          </a>
          <button
            data-testid="mobile-schedule-btn"
            onClick={() => {
              openSchedule();
              setMobileOpen(false);
            }}
            className="cta-primary mt-2 w-full inline-flex justify-center items-center px-4 py-3 rounded-full text-[14px] font-semibold"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </header>
  );
}
