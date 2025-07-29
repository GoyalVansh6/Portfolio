"use client";
import React from "react";
import { Montserrat, Roboto_Condensed } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '700', '900'],
});
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  display: 'swap',
  weight: ['400', '700'],
});

export default function AboutMe() {
  return (
    <main
      className={`min-h-screen flex flex-col justify-center items-center px-4 py-24 transition-colors duration-300 ${montserrat.className}`}
      style={{
        color: "#f3f3f3",
        background: "transparent",
      }}
    >
      <section className="w-full max-w-3xl flex flex-col items-center">
        <span
          className={`text-xs mb-4 opacity-70 ${robotoCondensed.className} text-gray-300`}
        >
          (About. ᐧ)
        </span>
        <div
          className={`text-center font-extrabold uppercase tracking-wide text-lg md:text-2xl leading-snug md:leading-snug mb-12 ${robotoCondensed.className} text-white`}
          style={{ letterSpacing: "0.02em" }}
        >
          I&apos;M VANSH, AN APP DEVELOPER, WEB DEVELOPER, AND COMPETITIVE PROGRAMMER. I BUILD MODERN APPLICATIONS FOR DESKTOP AND WEB, CRAFTING USER-CENTRIC EXPERIENCES WITH REACT, TYPESCRIPT, AND CUTTING-EDGE TOOLS. I ALSO ENJOY SOLVING ALGORITHMIC CHALLENGES AND OPTIMIZING CODE FOR PERFORMANCE AND ELEGANCE.
        </div>
      </section>

      <section className="w-full max-w-5xl flex flex-wrap justify-center items-center gap-8 mt-16">
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-2xl md:text-3xl font-extrabold text-blue-400">2+</span>
          <span className="mt-1 text-xs md:text-sm uppercase tracking-wider opacity-70 text-gray-300">Years<br />Coding</span>
        </div>
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-2xl md:text-3xl font-extrabold text-blue-400">5+</span>
          <span className="mt-1 text-xs md:text-sm uppercase tracking-wider opacity-70 text-gray-300">Apps &<br />Websites</span>
        </div>
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-2xl md:text-3xl font-extrabold text-blue-400">400+</span>
          <span className="mt-1 text-xs md:text-sm uppercase tracking-wider opacity-70 text-gray-300">Problems<br />Solved</span>
        </div>
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-2xl md:text-3xl font-extrabold text-blue-400">∞</span>
          <span className="mt-1 text-xs md:text-sm uppercase tracking-wider opacity-70 text-gray-300">Learning<br />Never Stops</span>
        </div>
      </section>
    </main>
  );
}
