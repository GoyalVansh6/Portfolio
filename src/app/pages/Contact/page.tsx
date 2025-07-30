"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar";

function LiveTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time === null) return null;
  return <span>India {time}</span>;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = Math.floor((width * height) / 3500); // density
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }[] = [];

    function randomBetween(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: randomBetween(-0.25, 0.25),
          vy: randomBetween(-0.25, 0.25),
          radius: randomBetween(0.7, 1.7),
          alpha: randomBetween(0.15, 0.5),
        });
      }
    }

    function drawBackground() {
      if (!ctx) return;
      ctx.fillStyle = "rgb(22,22,32)";
      ctx.fillRect(0, 0, width, height);
    }

    function drawParticles() {
      for (const p of particles) {
        if (!ctx) continue;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(180,200,255)";
        ctx.shadowColor = "rgba(120,180,255,0.5)";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }
    }

    function updateParticles() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
    }

    let animationId: number;

    function animate() {
      drawBackground();
      updateParticles();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      initParticles();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-bg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        display: "block",
        background: "rgb(22,22,32)",
        transition: "background 0.3s",
      }}
      aria-hidden="true"
    />
  );
}

const CONTACT_API_ENDPOINT = "/api/Contact";

export default function Contact() {

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message. Please try again.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fontFamily = `'Consolas', 'Liberation Mono', 'Menlo', 'Monaco', 'Courier New', monospace`;

  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main
        className="min-h-screen flex flex-col justify-between transition-colors duration-300 bg-transparent"
        style={{
          fontFamily,
          color: "#e5e7eb",
          background: "transparent",
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-8">
          <div className="w-full max-w-lg mx-auto">
            <h1
              className="text-center text-2xl md:text-3xl font-extrabold tracking-wide mb-2"
              style={{
                letterSpacing: "0.03em",
                color: "#e5e7eb",
                fontFamily,
              }}
            >
              LET&apos;S BUILD SOMETHING TOGETHER.
            </h1>
            <p
              className="text-center text-xs md:text-sm mb-8 opacity-80"
              style={{
                color: "#94a3b8",
                fontFamily,
              }}
            >
              Have a project in mind? Send me a message below or email me directly at{" "}
              <a
                href="mailto:goyalvansh9999@gmail.com"
                className="underline underline-offset-2"
                style={{
                  color: "#60a5fa",
                  fontFamily,
                }}
              >
                goyalvansh9999@gmail.com
              </a>
              .
            </p>
            <form
              className="space-y-3"
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{ fontSize: "0.95rem", fontFamily }}
            >
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 rounded border outline-none bg-transparent transition-colors duration-200 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-400"
                style={{ fontFamily }}
                disabled={submitting || submitted}
              />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 rounded border outline-none bg-transparent transition-colors duration-200 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-400"
                style={{ fontFamily }}
                disabled={submitting || submitted}
              />
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className="w-full px-3 py-2 rounded border outline-none bg-transparent transition-colors duration-200 resize-none border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-400"
                style={{ fontFamily }}
                disabled={submitting || submitted}
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 font-semibold px-4 py-2 rounded transition-colors duration-200 mt-2 bg-blue-600 text-white hover:bg-blue-700"
                disabled={submitting || submitted}
                style={{ fontFamily, opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : undefined }}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M2.94 2.94a1.5 1.5 0 012.12 0l11.5 11.5a1.5 1.5 0 010 2.12l-2.12 2.12a1.5 1.5 0 01-2.12 0l-11.5-11.5a1.5 1.5 0 010-2.12l2.12-2.12zm1.06 1.06L3.88 4.12l11.5 11.5 1.12-1.12-11.5-11.5z" />
                </svg>
                {submitting
                  ? "Sending..."
                  : submitted
                  ? "Message Sent!"
                  : "Send Message"}
              </button>
              {error && (
                <div
                  className="w-full text-center mt-3 rounded px-3 py-2 text-sm bg-red-100 text-red-800"
                  style={{ fontFamily }}
                >
                  {error}
                </div>
              )}
              {submitted && (
                <div
                  className="w-full text-center mt-3 rounded px-3 py-2 text-sm bg-green-100 text-green-800"
                  style={{ fontFamily }}
                >
                  Thank you for reaching out! I&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
        <footer
          className="w-full text-xs py-4 px-2 flex flex-col md:flex-row items-center justify-between border-t border-slate-700 text-slate-400 transition-colors duration-300"
          style={{ fontFamily }}
        >
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-2">
            <span>
              <a
                href="mailto:goyalvansh9999@gmail.com"
                className="hover:underline text-blue-400"
                style={{ fontFamily }}
              >
                goyalvansh9999@gmail.com
              </a>
            </span>
            <span className="hidden md:inline mx-2">|</span>
            <LiveTime />
            <span className="hidden md:inline mx-2">|</span>
            <span className="flex gap-2 items-center mt-1 md:mt-0">
              <a
                href="https://github.com/goyalvansh6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.578.688.48C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/vansh-goyal-9a9bb9291/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
                </svg>
              </a>
            </span>
          </div>
          <div className="mt-2 md:mt-0 text-center w-full md:w-auto">
            <span className="font-bold text-base tracking-widest" style={{ fontFamily }}>
              VANSH
              <span className="font-light italic ml-1" style={{ fontFamily }}>
                folio
              </span>
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
