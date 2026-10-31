"use client";

import { useId, useState } from "react";
import { faqs } from "./howItWorksFaqs";
import "./HowItWorksSections.css";

export default function HowItWorksFaq() {
  const [open, setOpen] = useState(1);
  const uid = useId();

  return (
    <section className="hiws-faq" aria-labelledby={`${uid}-h`}>
      <div className="hiws-faq__block">
        <h2 id={`${uid}-h`} className="hiws-faq__title">
          Questions About How WealthNX Works
        </h2>
        <div className="hiws-faq__list">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            const bid = `${uid}-b${i}`;
            const pid = `${uid}-p${i}`;
            return (
              <div key={q} className={`hiws-faq__item${isOpen ? " is-open" : ""}`}>
                <h3 className="hiws-faq__q">
                  <button
                    type="button"
                    id={bid}
                    aria-expanded={isOpen}
                    aria-controls={pid}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{q}</span>
                    <svg className="hiws-faq__icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 12h16" />
                      <path className="hiws-faq__v" d="M12 4v16" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={pid}
                  role="region"
                  aria-labelledby={bid}
                  className="hiws-faq__panel"
                >
                  <div className="hiws-faq__panel-in">
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
