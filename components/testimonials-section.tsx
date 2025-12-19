"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Stive meloni",
    role: "Ceo Of Miko",
    rating: 4.5,
    text: "The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!",
    image: "/testimonial-user-1.jpg",
  },
  {
    id: 2,
    name: "Stive meloni",
    role: "Ceo Of Miko",
    rating: 4.5,
    text: "The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!",
    image: "/testimonial-user-2.jpg",
  },
  {
    id: 3,
    name: "Stive meloni",
    role: "Ceo Of Miko",
    rating: 4.5,
    text: "The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!",
    image: "/testimonial-user-3.jpg",
  },
  {
    id: 4,
    name: "Stive meloni",
    role: "Ceo Of Miko",
    rating: 4.5,
    text: "The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!",
    image: "/testimonial-user-4.jpg",
  },
]

export default function TestimonialsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, index])])
            }
          })
        },
        { threshold: 0.1 },
      )

      observer.observe(card)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section className="py-20 px-4 md:px-8 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.16)_0%,rgba(255,255,255,1)_40%)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl font-bold text-[#333333] mb-4">our clients </h2>
          <h3 className="font-bebas text-5xl md:text-6xl lg:text-7xl font-bold text-[#FF69B4] mb-6">feedback</h3>
          <p className="text-[#333333] text-xl font-space leading-[1.3em] max-w-2xl mx-auto">
            We provide clear and concise answers to help users understand more about the gym's services, policies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-700 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${
                index === 0
                  ? "border-4 border-purple-500"
                  : index === 1
                    ? "border-4 border-pink-200"
                    : "border border-gray-200"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Title */}
              <h4 className="font-space text-2xl font-medium text-[#333333] mb-4">The Best Training Program!</h4>

              {/* Testimonial Text */}
              <p className="text-[rgba(51,51,51,0.5)] font-space text-lg leading-[1.276em] mb-6">{testimonial.text}</p>

              {/* User Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-pink-400 to-purple-500 shrink-0">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-space text-2xl font-medium text-[#343951]">{testimonial.name}</p>
                    <p className="text-lg font-space text-[rgba(51,51,51,0.75)]">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(testimonial.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-space text-[#333333]">({testimonial.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
