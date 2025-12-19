"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const url = process.env.NEXT_PUBLIC_GAS_CONTACT_URL
      if (!url) throw new Error("ENV missing")
  
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
      })
  
      const text = await response.text()
      console.log("RAW RESPONSE FROM GAS:", text)
  
      const result = JSON.parse(text)
  
      if (result.success) {
        alert("Message sent")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        console.error("SCRIPT ERROR:", result.error)
        throw new Error(result.error || "Script failure")
      }
    } catch (err) {
      console.error("SEND ERROR:", err)
      alert("Unable to send message")
    }
  }
  
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const trainingHours = [
    { day: "Monday", hours: "07:00 – 21:00" },
    { day: "Tuesday", hours: "07:00 – 21:00" },
    { day: "Wednesday", hours: "07:00 – 21:00" },
    { day: "Thursday", hours: "07:00 – 21:00" },
    { day: "Friday", hours: "07:00 – 21:00" },
    { day: "Saturday", hours: "07:00 – 21:00" },
  ]

  return (
    <section className="py-24 px-6 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.14)_0%,#ffffff_45%)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-bebas text-6xl md:text-7xl lg:text-8xl text-[#333333]">
            Get in <span className="text-[#FF69B4]">Touch</span>
          </h2>
          <p className="mt-4 text-[#333333] text-lg font-space max-w-xl mx-auto leading-relaxed">
            Have questions or ready to begin? Reach out and we’ll guide you every
            step of the way.
          </p>
        </motion.div>

        {/* Content */}
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
                <label className="block text-[#FF69B4] font-bebas text-xl mb-1">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={(formData as any)[field.id]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 rounded-lg bg-transparent text-[#333333] font-space focus:ring-2 focus:ring-pink-300 outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-[#FF69B4] font-bebas text-xl mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-black/20 rounded-lg bg-transparent text-[#333333] font-space focus:ring-2 focus:ring-pink-300 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center bg-[#FF69B4] text-white font-bebas text-2xl px-10 py-4 rounded-lg hover:scale-[1.02] transition-transform"
            >
              Send Message
            </button>
          </motion.form>

          {/* Training Hours */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="bg-white border border-black/20 rounded-xl p-8 w-full max-w-md">
              <h3 className="font-bebas text-3xl text-[#FF69B4] text-center mb-6 border-b pb-4">
                Training Hours
              </h3>
              {trainingHours.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b last:border-0 text-sm font-space text-[#333333]"
                >
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
