"use client";
import React from "react";

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToHash(href);
      window.history.replaceState(null, "", href);
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
        </div>
      </div>
    </nav>
  );
}