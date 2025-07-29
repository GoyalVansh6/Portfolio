"use client";
import React from "react";
import ProjectsStartStrip from "../../components/projectsStart";
import TodoAppProject from "./todoapp/page";
import InvoiceExchangeProject from "./invoiceExchange/page";

import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: ["400"],
});

export default function Projects() {
  return (
    <>
      <ProjectsStartStrip />
      <TodoAppProject />
      <InvoiceExchangeProject />
    </>
  );
}
