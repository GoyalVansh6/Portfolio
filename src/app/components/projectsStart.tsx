"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: ["400"],
});

export default function ProjectsStartStrip() {
  const headline =
    "WE BUILD IDEAS INTO EXPERIENCES THAT INSPIRE AND CONNECT.";

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

  const backgroundStyle = {
    backgroundColor: "#181c24",
    backgroundImage: `linear-gradient(90deg, rgba(133, 133, 133, 0.92) 0%, rgba(255, 255, 255, 0.88) 100%), URL("/background.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative" as const,
    transition: "background 0.5s cubic-bezier(.4,0,.2,1)",
  };

  function getGlobalScrollProgress() {
    if (typeof window === "undefined" || typeof document === "undefined") return 0;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollable = docHeight - winHeight;
    if (scrollable <= 0) return 0;
    return Math.min(1, Math.max(0, scrollY / scrollable));
  }

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      setProgress(getGlobalScrollProgress());
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
          transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
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
