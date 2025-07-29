"use client";
import React, { useState, useRef } from "react";

import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: ["400"],
});

const images = [
  "/todoapp/homepage.png",
  "/todoapp/addTodo.png",
  "/todoapp/editTodo.png",
];

export default function TodoAppProject() {
  const [current, setCurrent] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    el.style.transform = `perspective(900px) scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    el.style.boxShadow = "0 16px 48px 0 rgba(0,0,0,0.18), 0 2px 24px 0 rgba(0,120,255,0.10)";
    el.style.zIndex = "2";
  }
  function handleMouseLeave() {
    const el = imageRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) scale(1) rotateX(0deg) rotateY(0deg)";
    el.style.boxShadow = "0 8px 32px 0 rgba(0,0,0,0.10)";
    el.style.zIndex = "1";
  }

  function prevImage() {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }
  function nextImage() {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        paddingBottom: "3rem",
      }}
    >
      <main className="max-w-7xl mx-auto px-4 pt-28 pb-8">
        <div className="flex flex-col md:flex-row items-start" style={{ gap: 0 }}>
          <section
            className="md:pr-0"
            style={{
              textAlign: "left",
              flexBasis: "22%",
              flexGrow: 0,
              flexShrink: 0,
              minWidth: "200px",
              maxWidth: "320px",
              width: "100%",
              marginLeft: 0,
              marginRight: "5rem", // create gap between description and 3d component
            }}
          >
            <h1
              className={`${bebasNeue.className} text-xl md:text-3xl font-extrabold tracking-widest bg-clip-text`}
              style={{
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
                userSelect: "none",
                textTransform: "uppercase",
                lineHeight: 1.05,
              }}
            >
              ToDoStack
            </h1>
            <p
              className={`${bebasNeue.className} text-xl text-gray-700 mt-2`}
              style={{
                opacity: 0.92,
                letterSpacing: "0.04em",
                fontWeight: 400,
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}
            >
              Minimal. Fast. Productive.
              <br />
              Plan by hours, organize your full week, break down tasks into subtasks, and enjoy seamless drag-and-drop for effortless time management.
            </p>
          </section>
          {/* Right: Image carousel (80% width on md+) */}
          <section
            className="flex flex-col items-center w-full md:w-auto"
            style={{
              flexBasis: "78%",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <div
              className="relative w-full"
              style={{
                minHeight: 0,
                minWidth: 0,
                margin: "0 auto",
                userSelect: "none",
                maxWidth: "900px",
              }}
            >
              <div
                ref={imageRef}
                className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200 transition-transform duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f8fafc",
                  width: "100%",
                  minHeight: "540px",
                  maxHeight: "600px",
                  cursor: "pointer",
                  transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s cubic-bezier(.22,1,.36,1)",
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
                  borderRadius: "1.5rem",
                }}
                tabIndex={0}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                aria-label="Todo app screenshot"
              >
                <img
                  src={images[current]}
                  alt={`Todo app screenshot ${current + 1}`}
                  style={{
                    width: "100%",
                    height: "520px",
                    objectFit: "contain",
                    display: "block",
                    background: "#f8fafc",
                    borderRadius: "1.5rem",
                    pointerEvents: "none",
                  }}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              {/* Carousel controls */}
              <button
                onClick={prevImage}
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-blue-100 text-blue-700 rounded-full shadow p-2 transition z-10"
                style={{
                  border: "1px solid #d1d5db",
                  fontSize: "2rem",
                  lineHeight: 1,
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                tabIndex={0}
              >
                &#8592;
              </button>
              <button
                onClick={nextImage}
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-blue-100 text-blue-700 rounded-full shadow p-2 transition z-10"
                style={{
                  border: "1px solid #d1d5db",
                  fontSize: "2rem",
                  lineHeight: 1,
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                tabIndex={0}
              >
                &#8594;
              </button>
              {/* Image index indicator */}
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 rounded-full px-3 py-1 text-base text-gray-700 shadow"
                style={{
                  fontFamily: "monospace, monospace",
                  letterSpacing: "0.04em",
                  userSelect: "none",
                }}
              >
                {current + 1} / {images.length}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
