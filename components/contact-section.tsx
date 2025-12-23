"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSending, setIsSending] = useState(false)
  const [popup, setPopup] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  useEffect(() => {
    if (!popup) return
    const timer = setTimeout(() => setPopup(null), 3000)
    return () => clearTimeout(timer)
  }, [popup])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSending) return

    setIsSending(true)

    try {
      const url = process.env.NEXT_PUBLIC_GAS_CONTACT_URL
      if (!url) throw new Error("ENV missing")

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
      })

      const text = await response.text()
      const result = JSON.parse(text)

      if (result.success) {
        setPopup({
          type: "success",
          message:
            "Your message has been sent successfully. We’ll contact you soon.",
        })
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        throw new Error(result.error || "Script failure")
      }
    } catch {
      setPopup({
        type: "error",
        message: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const workingHours = [
    { day: "Saturday", hours: "06:00 AM – 11:59 PM" },
    { day: "Sunday", hours: "06:00 AM – 11:59 PM" },
    { day: "Monday", hours: "06:00 AM – 11:59 PM" },
    { day: "Tuesday", hours: "06:00 AM – 11:59 PM" },
    { day: "Wednesday", hours: "06:00 AM – 11:59 PM" },
    { day: "Thursday", hours: "06:00 AM – 11:59 PM" },
    { day: "Friday", hours: "03:00 PM – 11:59 PM" },
  ]
  

  return (
    <section className="py-24 px-6 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.14)_0%,#ffffff_45%)]">

      {/* 🔒 SEO-only NAP (no UI impact) */}
      <div className="sr-only">
        <p>Premium Ladies Gym, Al Ain, Abu Dhabi, United Arab Emirates</p>
        <p>Phone: +971XXXXXXXXX</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-bebas text-6xl md:text-7xl text-[#333333]">
            Get in <span className="text-[#FF69B4]">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-[#333333] max-w-xl mx-auto">
            Have questions or ready to begin? Reach out and we’ll guide you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {[
              { id: "name", label: "Full Name", type: "text" },
              { id: "email", label: "Email Address", type: "email" },
              { id: "phone", label: "Phone Number", type: "tel" },
            ].map((field) => (
              <div key={field.id}>
                <label className="block font-bebas text-xl text-[#FF69B4] mb-1">
                  {field.label}
                </label>
                <input
                  name={field.id}
                  type={field.type}
                  value={(formData as any)[field.id]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 rounded-lg bg-transparent focus:ring-2 focus:ring-pink-300 outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block font-bebas text-xl text-[#FF69B4] mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-black/20 rounded-lg bg-transparent focus:ring-2 focus:ring-pink-300 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`inline-flex items-center justify-center gap-3 font-bebas text-2xl px-10 py-4 rounded-lg transition
                ${
                  isSending
                    ? "bg-pink-300 cursor-not-allowed"
                    : "bg-[#FF69B4] hover:scale-[1.02]"
                }
                text-white
              `}
            >
              {isSending ? "Sending…" : "Send Message"}
            </button>
          </motion.form>

          {/* Training Hours */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="bg-white border border-black/20 rounded-xl p-8 w-full max-w-md">
              <h3 className="font-bebas text-3xl text-[#FF69B4] text-center mb-6 border-b pb-4">
                Training Hours
              </h3>
              {trainingHours.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b last:border-0 text-sm"
                >
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🗺️ Google Map (SEO + Maps ranking booster) */}
      <div className="mt-16 max-w-7xl mx-auto">
        <iframe
          title="Premium Ladies Gym Location"
          src="https://www.google.com/maps?q=Premium+Ladies+Gym+Al+Ain&output=embed"
          className="w-full h-[380px] rounded-xl border border-black/20"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-xl"
            >
              <h3 className="font-bebas text-3xl mb-3">
                {popup.type === "success" ? "Message Sent" : "Error"}
              </h3>
              <p className="text-[#333333]">{popup.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
