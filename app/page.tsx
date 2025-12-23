"use client"

import { useEffect, useState } from "react"
import Snowfall from "react-snowfall"

import HeroSection from "@/components/hero-section"
import MissionSection from "@/components/mission-section"
import GallerySection from "@/components/gallery-section"
import PricingSection from "@/components/pricing-section"
import CTASection from "@/components/cta-section"
import TrainersSection from "@/components/trainers-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import AppNavbar from "@/components/Navbar"
import SpecialOfferSection from "@/components/SpecialOfferSection"

export default function Page() {
  const [showSnow, setShowSnow] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setShowSnow(true)
  
    const timer = setTimeout(() => {
      setShowSnow(false)
    }, 30000) // ⏱️ 30 seconds
  
    return () => clearTimeout(timer)
  }, [])
  

  return (
    <>
      <AppNavbar />

      {showSnow && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      pointerEvents: "none",
    }}
  >
    <Snowfall
      color="rgba(255,105,180,0.85)" // pink glow base
      snowflakeCount={isMobile ? 40 : 120} // ❄️ heavy
      speed={isMobile ? [0.5, 1.2] : [1, 2.5]}
      wind={[-0.3, 0.3]}
      radius={isMobile ? [0.8, 1.8] : [1.2, 3.2]} // 👈 BIG flakes
      opacity={[0.5, 0.9]} // glow illusion
    />
  </div>
)}


      <section id="home">
        <HeroSection />
      </section>

      <SpecialOfferSection />

      <section id="mission">
        <MissionSection />
      </section>

      <section id="gallery">
        <GallerySection />
      </section>

      <section id="faq">
        <FAQSection />
      </section>

      <section id="membership">
        <PricingSection />
      </section>

      <section id="cta">
        <CTASection />
      </section>

      <section id="trainers">
        <TrainersSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </>
  )
}
