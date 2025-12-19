"use client"

import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section className="py-10 px-4 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Pink gradient blob background */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-[800px] h-[400px] bg-gradient-to-br from-pink-200/40 via-pink-300/30 to-pink-200/40 rounded-full blur-3xl"
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative text-center py-16 px-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gray-900">TAKE THE FIRST STEP </span>
              <span className="text-[#FF69B4]">TODAY</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              A welcoming call-to-action section designed to encourage women to
              take the next step in their fitness and wellness journey with confidence.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
