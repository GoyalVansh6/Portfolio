"use client";
import React, { useState } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function easeInOutCubic(t: number) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;

  const startY = window.scrollY;
  const rect = target.getBoundingClientRect();
  const navHeight = 64;
  const targetY = rect.top + window.scrollY - navHeight;

  const duration = 2500;
  let startTime: number | null = null;

  function animateScroll(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, startY + (targetY - startY) * eased);

    if (t < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      (target as HTMLElement).focus?.();
    }
  }

  requestAnimationFrame(animateScroll);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToHash(href);
      window.history.replaceState(null, "", href);
      setMenuOpen(false); // Close menu on mobile after click
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 shadow-md backdrop-blur-md opacity-60`}
      style={{
        background: "rgba(17, 24, 39, 0.45)",
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className={`font-bold text-white text-xl md:text-2xl tracking-widest`}>
            VANSH
            <span className="font-light italic ml-1">folio</span>
          </span>
          {/* Desktop nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-md text-md font-medium transition-colors text-gray-200 hover:text-blue-400`}
                tabIndex={0}
                style={{ opacity: 0.92 }}
              >
                {link.name}
              </a>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400"
            >
              {menuOpen ? (
                // Close (X) icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile nav menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-gray-900 bg-opacity-90 backdrop-blur-md`}
        style={{
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex flex-col items-center py-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={e => handleNavClick(e, link.href)}
              className="block w-full text-center px-3 py-2 rounded-md text-md font-medium text-gray-200 hover:text-blue-400 transition-colors"
              tabIndex={0}
              style={{ opacity: 0.92 }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}