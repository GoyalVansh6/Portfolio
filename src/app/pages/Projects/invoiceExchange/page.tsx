"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: ["400"],
});

const images = [
  "/invoiceexchange/dashboard_and_navbar.png",
  "/invoiceexchange/stockComponent.png",
  "/invoiceexchange/recipientComponent.png",
  "/invoiceexchange/invoiceComponent.png",
  "/invoiceexchange/creditComponent.png",
  "/invoiceexchange/paymentsComponent.png",
  "/invoiceexchange/quotationsComponent.png",
];

export default function InvoiceExchangeProject() {
  const [current, setCurrent] = useState(0);
  const [imageSizes, setImageSizes] = useState<
    { width: number; height: number; aspect: number }[]
  >([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgTagRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageSizes.length === images.length) return;
    let isMounted = true;
    const promises = images.map(
      (src) =>
        new Promise<{ width: number; height: number; aspect: number }>(
          (resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
              if (img.naturalWidth && img.naturalHeight) {
                resolve({
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  aspect: img.naturalWidth / img.naturalHeight,
                });
              } else {
                resolve({ width: 16, height: 9, aspect: 16 / 9 });
              }
            };
            img.onerror = () => resolve({ width: 16, height: 9, aspect: 16 / 9 });
          }
        )
    );
    Promise.all(promises).then((sizes) => {
      if (isMounted) setImageSizes(sizes);
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  const currentAspect =
    imageSizes.length === images.length
      ? imageSizes[current].aspect
      : 16 / 9;

  // LESSENED HEIGHT: changed from 600 to 380
  const carouselHeight = 380;
  const fitImageWidth = "100%";
  const fitImageHeight = carouselHeight;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    el.style.transform = `perspective(900px) scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    el.style.boxShadow =
      "0 16px 48px 0 rgba(0,0,0,0.18), 0 2px 24px 0 rgba(0,120,255,0.10)";
    el.style.zIndex = "2";
  }
  function handleMouseLeave() {
    const el = imageRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) scale(1) rotateX(0deg) rotateY(0deg)";
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
        <div className="flex flex-col md:flex-row mr-5rem items-start">
          <section
            className="flex flex-col items-center w-full md:w-auto md:pr-20"
            style={{
              flexBasis: "75%",
              flexGrow: 1,
              minWidth: 0,
              order: 1,
            }}
          >
            <div
              className="relative w-full"
              style={{
                minHeight: 0,
                minWidth: 0,
                margin: "0 auto",
                userSelect: "none",
                maxWidth: "1400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: carouselHeight,
                transition: "height 0.3s",
                position: "relative",
              }}
            >
              <div
                ref={imageRef}
                className="overflow-hidden shadow-2xl bg-white transition-transform duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f8fafc",
                  width: fitImageWidth,
                  cursor: "pointer",
                  transition:
                    "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s cubic-bezier(.22,1,.36,1), width 0.3s, height 0.3s",
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
                  borderRadius: "0.75rem",
                  border: "none",
                  padding: "0",
                  minHeight: "0",
                  maxHeight: carouselHeight,
                  maxWidth: "100%",
                  position: "relative",
                  overflow: "visible",
                }}
                tabIndex={0}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                aria-label="Stock & Invoice Management screenshot"
              >
                <img
                  ref={imgTagRef}
                  src={images[current]}
                  alt={`Stock & Invoice Management screenshot ${current + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    background: "#f8fafc",
                    borderRadius: "0.75rem",
                    pointerEvents: "none",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  loading="lazy"
                  draggable={false}
                />
              </div>
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
          <section
            className="md:pl-20"
            style={{
              textAlign: "left",
              flexBasis: "25%",
              flexGrow: 0,
              flexShrink: 0,
              minWidth: "220px",
              maxWidth: "480px",
              width: "100%",
              order: 2,
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
              Stock & Invoice Manager
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
              Modern platform for stock and invoice management.
              <br />
              Track inventory, manage invoices, handle recipients, credits, payments, and quotations—all in one seamless, desktop-optimized interface.
            </p>
            <ul
              className="mt-6 text-base text-gray-600"
              style={{
                lineHeight: 1.2,
                fontSize: "1.08rem",
                paddingLeft: "1.2em",
                listStyle: "disc",
              }}
            >
              <li>Comprehensive stock and inventory tracking</li>
              <li>Invoice creation, listing and editing</li>
              <li>Recipient and payment management modules</li>
              <li>Credit and quotation handling</li>
              <li>Secure user authentication and admin dashboard</li>
              <li>Modern, responsive design for desktop</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
