"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "#" },
  { name: "Membership", href: "#membership" },
  { name: "Facilities", href: "#gallery" },
  { name: "Trainers", href: "#trainers" },
  { name: "Contact", href: "#contact" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* NAV BAR */}
        <div className="h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo-mark.svg"
              alt="Premium Ladies Fitness Center"
              width={56}
              height={56}
              className="w-[40px] h-[40px] md:w-[56px] md:h-[56px] shrink-0"
            />
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-bebas text-lg tracking-wide text-[#333333] hover:text-[#FF69B4] transition"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/971509511234?text=Hi%20Premium%20Ladies%20Fitness%20Center%0AI%20want%20to%20join%20the%20gym.%20Please%20share%20membership%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bebas text-lg px-6 py-2 border border-[#FF69B4] text-[#FF69B4] rounded hover:bg-[#FF69B4] hover:text-white transition"
            >
              Join Now
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-2xl font-bold"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <motion.nav
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col px-6 py-6 gap-6"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="font-bebas text-xl text-[#333333]"
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.a
                href="https://wa.me/971509511234?text=Hi%20Premium%20Ladies%20Fitness%20Center%0AI%20want%20to%20join%20the%20gym.%20Please%20share%20membership%20details."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-bebas text-xl border border-[#FF69B4] py-3 px-6 text-[#FF69B4] rounded text-center hover:bg-[#FF69B4] hover:text-white transition"
              >
                Join Now
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
