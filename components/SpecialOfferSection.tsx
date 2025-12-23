"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

/* 🔒 Fixed Christmas Event Window */
const OFFER_START = new Date("2025-12-24T00:00:00")
const OFFER_END = new Date("2025-12-25T23:59:59")

function isOfferActive() {
  const now = Date.now()
  return now >= OFFER_START.getTime() && now <= OFFER_END.getTime()
}

function getTimeLeft(targetDate: Date) {
  const now = Date.now()
  const distance = targetDate.getTime() - now
  if (distance <= 0) return null

  return {
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  }
}

export default function HighUrgencyOffer() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(
    () => (isOfferActive() ? getTimeLeft(OFFER_END) : null)
  )
  const [spotsLeft, setSpotsLeft] = useState(7)

  /* Countdown */
  useEffect(() => {
    if (!isOfferActive()) return

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(OFFER_END))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  /* Soft UI scarcity (never drops below 3) */
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => (prev > 3 ? prev - 1 : 3))
    }, 9000)

    return () => clearInterval(interval)
  }, [])

  if (!timeLeft || !isOfferActive()) return null

  return (
    <section className="relative w-full bg-white border-y-4 border-[#FF69B4] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-bebas text-6xl md:text-8xl text-slate-900">
          CHRISTMAS SPECIAL
        </h2>

        <div className="mt-3 text-[#FF69B4] font-bold text-xl">
          Only {spotsLeft} Slots Available
        </div>

        <div className="mt-6 text-lg text-slate-700 space-y-2">
          <p>✔ 1-Month Membership</p>
          <p>✔ Special Christmas Pricing</p>
          <p className="text-[#FF69B4] font-bold">
            ✔ Valid only on 24 & 25 December 2025
          </p>
        </div>

        <div className="flex justify-center gap-2 my-10 font-mono">
          <ClockUnit value={timeLeft.hours} label="HRS" />
          <Separator />
          <ClockUnit value={timeLeft.minutes} label="MIN" />
          <Separator />
          <ClockUnit value={timeLeft.seconds} label="SEC" highlight />
        </div>

        <motion.a
          href="https://wa.me/971509511234?text=Hi%20Premium%20Ladies%20Fitness%20Center%0AI%20want%20to%20claim%20the%20Christmas%20special%20offer."
          target="_blank"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-3 bg-[#FF69B4] text-white font-black text-2xl px-12 py-5 rounded-xl"
        >
          Claim Offer Now
          <ArrowRight className="w-6 h-6" />
        </motion.a>
      </div>
    </section>
  )
}

/* ---------- Helpers ---------- */

function ClockUnit({
  value,
  label,
  highlight = false,
}: {
  value: number
  label: string
  highlight?: boolean
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-16 h-20 md:w-24 md:h-28 rounded-lg flex items-center justify-center border ${
          highlight ? "bg-slate-900 text-white" : "bg-white text-slate-900"
        }`}
      >
        <span className="text-4xl md:text-6xl font-black font-bebas">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-slate-400 mt-2">{label}</span>
    </div>
  )
}

function Separator() {
  return (
    <div className="h-20 md:h-28 flex items-center justify-center">
      <span className="text-3xl text-slate-300">:</span>
    </div>
  )
}
