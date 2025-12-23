import HeroSection from "@/components/hero-section"
import MissionSection from "@/components/mission-section"
import OffersSection from "@/components/offers-section"
import GallerySection from "@/components/gallery-section"
import PricingSection from "@/components/pricing-section"
import CTASection from "@/components/cta-section"
import TrainersSection from "@/components/trainers-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import AppNavbar from "@/components/Navbar"
import SpecialOfferSection from "@/components/SpecialOfferSection"

export default function Page() {
  return (
    <>
      <AppNavbar />
      

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
