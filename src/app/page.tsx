import React from "react";
import Navbar from "./components/navbar";
import AboutMe from "./pages/AboutMe/page";
import Projects from "./pages/Projects/page";
import Contact from "./pages/Contact/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="about">
            <AboutMe />
        </section>
        <section id="projects">
            <Projects />
        </section>
        <section id="contact">
            <Contact />
        </section>
      </main>
    </>
  );
}