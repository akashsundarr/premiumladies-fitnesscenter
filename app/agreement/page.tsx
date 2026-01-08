import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
import DigitalAgreement from "@/components/DigitalAgreement"

export default function AgreementPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24">
        <DigitalAgreement />
      </main>

      <Footer />
    </>
  )
}
