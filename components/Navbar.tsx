"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          <div className="flex items-center gap-2">
          <img
            src="/images/logo-mark.svg"   // small icon / emblem
            alt=""
            width={28}
            height={28} 
            className="h-16 w-16 object-contain"
          />
          <img
            src="/images/logo.svg"
            alt="Premium Ladies Fitness Center"
            width={180}
            height={45}
            className="h-auto w-fill"
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
            <button className="font-bebas text-lg text-[#333333]">Login</button>
            <button className="font-bebas text-lg px-6 py-2 border border-[#FF69B4] text-[#FF69B4] rounded hover:bg-[#FF69B4] hover:text-white transition">
              Join Now
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU (ANIMATED) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <motion.nav
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col px-6 py-6 gap-6"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-bebas text-xl text-[#333333]"
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bebas text-xl border border-[#FF69B4] py-3 text-[#FF69B4] rounded"
              >
                Join Now
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
