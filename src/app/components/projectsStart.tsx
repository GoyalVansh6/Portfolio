"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: ["400"],
});

function easeInOutCubic(t: number) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Custom hook for smooth, professional scroll progress
function useProfessionalScrollProgressPx(startPx: number, endPx: number, smoothing: number = 0.16) {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      let prog = (scrollY - startPx) / (endPx - startPx);
      prog = Math.max(0, Math.min(1, prog));
      targetProgress.current = prog;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let running = true;
    function animate() {
      setProgress(prev => {
        // Use a higher smoothing for a more responsive, professional feel
        const diff = targetProgress.current - prev;
        if (Math.abs(diff) < 0.0005) return targetProgress.current;
        return prev + diff * smoothing;
      });
      if (running) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    }
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [startPx, endPx, smoothing]);

  // Apply professional cubic easing
  return easeInOutCubic(progress);
}

export default function ProjectsStartStrip() {
  const headline =
    "WE BUILD IDEAS INTO EXPERIENCES THAT INSPIRE AND CONNECT.";

  // For measuring text width
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxOffset, setMaxOffset] = useState(0);

  useEffect(() => {
    function updateOffset() {
      if (textRef.current && containerRef.current) {
        const textWidth = textRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        setMaxOffset(Math.max(0, textWidth - containerWidth));
      }
    }
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // Prepare the background: fallback color, overlay, and image
  // Use the correct relative path for the background image in the current directory
  const backgroundStyle = {
    backgroundColor: "#181c24", // dark fallback
    backgroundImage: `linear-gradient(90deg, rgba(133, 133, 133, 0.92) 0%, rgba(255, 255, 255, 0.88) 100%), URL("/background.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative" as const,
    transition: "background 0.5s cubic-bezier(.4,0,.2,1)",
  };

  // Use pixel values for scroll progress for more reliability
  // Start after 10vh, end after 70vh
  const [scrollRange, setScrollRange] = useState({ start: 0, end: 0 });
  useEffect(() => {
    function updateScrollRange() {
      const vh = window.innerHeight;
      setScrollRange({
        start: vh * 0.10,
        end: vh * 0.70,
      });
    }
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  function getScrollProgressPx(start: number, end: number) {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    if (end === start) return 0;
    return Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
  }
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      setProgress(getScrollProgressPx(scrollRange.start, scrollRange.end));
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollRange.start, scrollRange.end]);

  return (
    <div
      ref={containerRef}
      style={{
        ...backgroundStyle,
        width: "100vw",
        maxWidth: "100%",
        overflow: "hidden",
        zIndex: 10,
        height: "400px",
        pointerEvents: "none",
        marginTop: "3.5rem",
        marginBottom: "2.5rem",
        borderRadius: "0",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.13)",
        border: "1px solid #23272e",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        filter: "contrast(1.04) brightness(0.98)",
        position: "relative",
      }}
      aria-hidden="true"
    >
      <div
        ref={textRef}
        className={bebasNeue.className}
        style={{
          transform: `translateX(-${progress * maxOffset}px)`,
          transition: "transform 0.7s cubic-bezier(.22,1,.36,1)", // much slower and smoother
          color: "rgba(57, 58, 75, 0.97)",
          fontWeight: 900,
          fontSize: "8.2rem",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          padding: "0 2.5rem",
          width: "max-content",
          pointerEvents: "auto",
          textTransform: "uppercase",
          lineHeight: 1.05,
          fontVariationSettings: "'wght' 400",
          fontStretch: "expanded",
          textRendering: "geometricPrecision",
          userSelect: "none",
          textShadow: "0 2px 16px rgba(24,28,36,0.18), 0 1px 0 #23272e",
        }}
      >
        {headline}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontFamily: "monospace, monospace",
          fontSize: "0.95rem",
          color: "rgba(70, 71, 75, 0.97)",
          opacity: 0.7,
          letterSpacing: "0.04em",
          pointerEvents: "none",
          userSelect: "none",
          textShadow: "0 1px 8px #181c24",
        }}
      >
        This is React made real through Next.
      </div>
    </div>
  );
}
