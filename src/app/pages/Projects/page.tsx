import React from "react";
import ProjectsStartStrip from "../../components/projectsStart";
import TodoAppProject from "./todoapp/page";
import InvoiceExchangeProject from "./invoiceExchange/page";

export default function Projects() {
  return (
    <>
      <ProjectsStartStrip />
        <TodoAppProject />
        <InvoiceExchangeProject />
    </>
  );
}
