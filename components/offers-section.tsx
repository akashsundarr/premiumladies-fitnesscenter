"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Dumbbell, Utensils, Heart, ClipboardCheck } from "lucide-react"

const offers = [
  {
    icon: Dumbbell,
    title: "Personal Training",
    description: "Our certified personal trainers provide one-on-one coaching tailored to your individual fitness goals.",
  },
  {
    icon: Utensils,
    title: "Nutrition Plan",
    description: "Our expert nutritionists create personalized meal plans to support your fitness and health goals.",
  },
  {
    icon: Heart,
    title: "Wellness Program",
    description: "Engage in comprehensive wellness programs that include mental, physical, and emotional wellbeing.",
  },
  {
    icon: ClipboardCheck,
    title: "Fitness Assessment",
    description: "Track your progress with in-depth fitness assessments to adjust and improve your performance.",
  },
]

export default function OffersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // --- MOBILE AUTO-SWITCH STATE ---
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    // Switch card every 5 seconds (Slow timing)
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % offers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // --- DESKTOP SCROLL LOGIC ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 1,
  })

  return (
    <section className="relative min-h-[90vh] lg:min-h-[180vh] bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.12)_0%,#ffffff_60%)] py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: Title Section */}
          <div className="lg:sticky lg:top-32 space-y-6 z-10">
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1em]">
              What We <br />
              <span className="text-[#FF69B4]">Offer</span>
            </h2>
            <p className="text-[#333] text-lg lg:text-xl font-space leading-[1.4em] max-w-md">
              Carefully designed services to support strength, wellness,
              nutrition, and long-term fitness growth.
            </p>
            
            {/* Mobile Progress Dots (Optional visual indicator) */}
            <div className="lg:hidden flex gap-2 pt-4">
              {offers.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex ? "w-8 bg-[#FF69B4]" : "w-2 bg-[#FF69B4]/30"}`} 
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Cards Section */}
          <div className="relative w-full">
            
            {/* --- MOBILE: Slow Auto-Switch Animation --- */}
            {/* We need a fixed height container for absolute positioning to work */}
            <div className="lg:hidden relative h-[400px] w-full">
               <AnimatePresence initial={false}>
                  <motion.div
                    key={activeIndex} // Changing the key triggers the animation
                    initial={{ x: "100%", opacity: 0 }} // Start off-screen right
                    animate={{ x: 0, opacity: 1 }} // Move to center
                    exit={{ x: "-100%", opacity: 0 }} // Move off-screen left
                    transition={{
                        x: { type: "tween", duration: 1.2, ease: "easeInOut" }, // Slow, smooth "good motion"
                        opacity: { duration: 0.8 }
                    }}
                    className="absolute top-0 left-0 w-full h-full"
                  >
                     <Card offer={offers[activeIndex]} />
                  </motion.div>
               </AnimatePresence>
            </div>

            {/* --- DESKTOP: Sticky Stack Animation (Unchanged) --- */}
            <div ref={containerRef} className="hidden lg:block relative min-h-[100vh]">
              {offers.map((offer, index) => {
                const start = index / offers.length
                const end = (index + 1) / offers.length
                const opacity = useTransform(smoothScroll, [start, end, end + 0.15], [1, 1, 0])
                const scale = useTransform(smoothScroll, [start, end], [1, 0.95])
                const y = useTransform(smoothScroll, [start, end], [0, -20])

                return (
                  <motion.div
                    key={index}
                    style={{ opacity, scale, y, top: `${6 + index * 2}rem`, zIndex: offers.length - index }}
                    className="sticky"
                  >
                    <Card offer={offer} />
                  </motion.div>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// --- SHARED CARD COMPONENT (Original UI & Colors) ---
function Card({ offer }: { offer: any }) {
  const Icon = offer.icon
  return (
    <div className="
      h-full w-full rounded-2xl p-8 md:p-10
      bg-white/80 backdrop-blur-md
      border border-[#FF69B4]/10
      shadow-[0_10px_40px_-10px_rgba(255,105,180,0.15)]
      flex flex-col justify-center
    ">
      <div className="w-14 h-14 rounded-xl bg-[#FF69B4]/10 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-[#FF69B4]" />
      </div>
      <h3 className="font-bebas text-4xl text-[#333] mb-3">
        {offer.title}
      </h3>
      <p className="text-gray-600 font-space text-lg leading-relaxed">
        {offer.description}
      </p>
    </div>
  )
}