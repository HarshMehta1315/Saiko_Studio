"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What if there are Service Delays?",
    answer:
      "Saiko Studio is not responsible for any unexpected shipping delays due to bad weather, natural disasters, or clearance delays. The best thing to do in situations like this would be to directly contact the courier company with the provided tracking number to receive updates.",
  },
  {
    question: "Will I be charged Custom Fees?",
    answer:
      "Custom duties/taxes/charges can be charged once the parcel reaches its destination country. Saiko Studio is not responsible for these charges and we are not aware of what these charges would be for each destination country, if applicable. We would recommend contacting your local custom office to inquire about what these rates would be for parcels being shipping from India to your country of residence.",
  },
  {
    question: "What if the package is returned due to Failed Delivery?",
    answer:
      "For any failed attempts of delivery pertaining to an incorrect address, multiple failed attempts to reach you, or refusal to pay customs fees - Saiko Studio does not take responsibility for shipping fees pertaining to the return shipment of your order. If your order is returned to us and it is to be sent to you again, you will have to pay the shipping fees once again.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gold/20">
      <button
        className="w-full flex items-center justify-between py-6 text-left"
        onClick={onClick}
      >
        <span className="text-white text-lg tracking-wide">{question}</span>
        <svg
          className={`w-5 h-5 text-gold flex-shrink-0 ml-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-gray-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="bg-black-light border-b border-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase gold-text-gradient mb-6">
            Need Help?
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            If you have an issue or question that requires immediate assistance, you can reach out to
            us. If we are not available, drop us an email and we will get back to you within 20-36
            hours!
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl tracking-widest uppercase gold-text-gradient mb-8">Questions</h2>
        <div>
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
