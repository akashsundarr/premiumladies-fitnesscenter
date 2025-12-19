"use client";

import { Check } from "lucide-react";

/* WhatsApp helper */
const whatsappLink = (message: string) =>
  `https://wa.me/971509511234?text=${encodeURIComponent(message)}`;

export default function PricingSection() {
  return (
    <section
      id="membership"
      className="relative py-10 px-6 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.16)_0%,rgba(255,255,255,1)_40%)]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-bebas text-5xl md:text-7xl text-[#333333] mb-4">
            Membership <br />
            <span className="text-[#FF69B4]">Plans</span>
          </h2>
          <p className="text-xl text-[#333333] font-space max-w-2xl mx-auto">
            Simple, transparent pricing designed for women who want real results
            in a safe, professional environment.
          </p>
        </div>

        {/* Main Plans */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">

          {/* 1 Month Plan */}
          <div className="bg-white border border-[#2E3937]/30 rounded-2xl p-8">
            <h3 className="font-bebas text-3xl text-[#333333] mb-2">
              1 Month Membership
            </h3>

            <div className="font-bebas text-6xl text-[#FF69B4] mb-2">
              AED 300
            </div>

            <p className="text-sm text-[#333333]/70 mb-6">
              *Confirm membership at the gym
            </p>

            <ul className="space-y-4 font-space text-lg text-[#333333] mb-6">
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> Coach-guided training included</li>
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> 20 group training sessions per month</li>
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> 1 FREE Zumba class every week</li>
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> Full access to UK-based gym equipment</li>
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> Clean, private ladies-only environment</li>
            </ul>

            <p className="font-space text-base text-[#333333] opacity-80 mb-6">
              Ideal for women looking for structured guidance and quick fitness results.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink(
                `Hello Premium Ladies Fitness Center 👋

I’m interested in the *1 Month Membership* plan.

Price: AED 300

Please share more details and the joining process.
Thank you!`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                px-6 py-3
                font-bebas
                text-lg
                tracking-wide
                bg-[#25D366]
                text-white
                rounded
                hover:opacity-90
                transition
              "
            >
              Join via WhatsApp
            </a>
          </div>

          {/* 3 Month Plan */}
          <div className="bg-white border border-[#FF69B4] rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF69B4] text-white px-4 py-1 text-sm rounded">
              Best Value
            </div>

            <h3 className="font-bebas text-3xl text-[#333333] mb-2">
              3 Months Membership
            </h3>

            <div className="font-bebas text-6xl text-[#FF69B4] mb-2">
              AED 750
            </div>

            <p className="text-sm text-[#333333]/70 mb-6">
              *Confirm membership at the gym
            </p>

            <ul className="space-y-4 font-space text-lg text-[#333333] mb-6">
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> Coach-guided training included</li>
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> Regular group workout sessions</li>
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> Weekly Zumba classes included</li>
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> Better value & consistent progress</li>
              <li className="flex gap-3"><Check className="text-[#FF69B4]" /> Ideal for long-term transformation</li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink(
                `Hello Premium Ladies Fitness Center 👋

I’m interested in the *3 Months Membership* plan.

Price: AED 750

Please share more details and the joining process.
Thank you!`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                px-6 py-3
                font-bebas
                text-lg
                tracking-wide
                bg-[#25D366]
                text-white
                rounded
                hover:opacity-90
                transition
              "
            >
              Join via WhatsApp
            </a>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="space-y-16">

          <div>
            <h3 className="font-bebas text-4xl text-[#333333] mb-6">
              Gym Membership Fees
            </h3>
            <ul className="space-y-3 font-space text-lg">
              <li>• 1 Day Pass – AED 30</li>
              <li>• 1 Month – AED 300</li>
              <li>• 3 Months – AED 750</li>
              <li>• 6 Months – AED 1,400</li>
              <li>• 1 Year – AED 2,500</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bebas text-4xl text-[#333333] mb-6">
              Personal Training (Ladies Only)
            </h3>
            <ul className="space-y-3 font-space text-lg">
              <li>• Monthly (20 Sessions) – AED 1,500</li>
              <li>• Per Session – AED 90</li>
              <li>• 10-Session Package – AED 850</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bebas text-4xl text-[#333333] mb-6">
              Group & Zumba Classes
            </h3>
            <ul className="space-y-3 font-space text-lg">
              <li>• Group Class – AED 40</li>
              <li>• Group Classes (Monthly Unlimited) – AED 300</li>
              <li>• Zumba Class – AED 40</li>
              <li>• Zumba (Monthly Unlimited) – AED 300</li>
            </ul>
          </div>

          <div className="bg-white border border-[#FF69B4] rounded-2xl p-8">
            <h3 className="font-bebas text-4xl text-[#FF69B4] mb-4">
              Special Offers
            </h3>
            <ul className="space-y-3 font-space text-lg">
              <li>✔ Free First Class</li>
              <li>✔ Referral Discount – AED 50 OFF</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
