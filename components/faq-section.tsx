"use client";

import { useState } from "react";

export default function WhyChooseSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const reasons = [
    {
      title: "Ladies-only gym with complete privacy",
      description:
        "Our facility is exclusively for women, ensuring a private, comfortable, and judgment-free environment where you can train confidently at your own pace.",
    },
    {
      title: "Premium ambience & strict hygiene standards",
      description:
        "We maintain high cleanliness standards with regular sanitization, well-ventilated spaces, and a calm premium ambience that keeps you motivated every day.",
    },
    {
      title: "Modern UK-based fitness equipment",
      description:
        "Our gym is equipped with internationally sourced, UK-based machines designed for safety, performance, and effective results for all fitness levels.",
    },
    {
      title: "Level 4 certified female trainers",
      description:
        "Our experienced female trainers are Level 4 certified, offering professional guidance, personalized support, and safe training techniques.",
    },
    {
      title: "Separate, spacious fitness studio for classes & Zumba",
      description:
        "We have a dedicated, spacious studio for group classes, Zumba, and functional training—so classes never feel crowded or rushed.",
    },
    {
      title: "Friendly, motivating & supportive atmosphere",
      description:
        "We foster a positive and encouraging environment where every woman feels welcomed, supported, and inspired throughout her fitness journey.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.16)_0%,rgba(255,255,255,1)_40%)]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#333333] mb-4">
            Why Choose <br />
            <span className="text-[#FF69B4]">Premium Ladies Fitness Center</span>
          </h2>
          <p className="text-[#333333] text-xl font-space max-w-2xl mx-auto">
            Everything we offer is designed to give women a safe, premium, and results-driven fitness experience.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white border border-[rgba(46,57,55,0.25)] rounded-xl overflow-hidden">
          {reasons.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-bebas text-2xl md:text-[28px] text-[#333333] pr-4 leading-[1.1em]">
                  {item.title}
                </span>
                <span
                  className={`text-2xl text-[#333333] transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 sm:px-8 pb-6 text-[#333333] font-space text-lg leading-[1.4em]">
                  {item.description}
                </div>
              </div>

              {index < reasons.length - 1 && (
                <div className="border-b border-[rgba(46,57,55,0.2)]" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
