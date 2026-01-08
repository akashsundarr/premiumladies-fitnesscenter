"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import SignatureCanvas from "react-signature-canvas"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

// Agreement Text (short, scannable, gym-appropriate)
const AGREEMENT_TEXT = `
1. MEMBERSHIP
This membership is personal, non-transferable, and non-refundable.

2. HEALTH DECLARATION
I confirm that I am medically fit to participate in physical activities and exercises.

3. WAIVER OF LIABILITY
I understand that gym activities involve risk. I voluntarily assume all risks and release Premium Ladies Fitness Center from liability.

4. RULES & CONDUCT
I agree to follow gym rules, maintain discipline, and respect staff and members. Membership may be terminated for violations.

5. PAYMENTS
I authorize the gym to collect membership fees as per the selected plan.
`

export default function DigitalAgreement() {
  const sigPadRef = useRef<SignatureCanvas>(null)

  const [formData, setFormData] = useState({
    name: "",
    memberId: "",
    email: "",
  })

  const [agreed, setAgreed] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const clearSignature = () => {
    sigPadRef.current?.clear()
  }

  const base64ToUint8Array = (base64: string) => {
    const binary = window.atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes
  }

  const generatePDF = async () => {
    if (!formData.name || !formData.memberId || !agreed) {
      alert("Please complete all fields and accept the terms.")
      return
    }

    if (sigPadRef.current?.isEmpty()) {
      alert("Please sign before continuing.")
      return
    }

    setIsGenerating(true)

    try {
      const pdf = await PDFDocument.create()
      const page = pdf.addPage([595, 842])
      const { width, height } = page.getSize()

      const fontRegular = await pdf.embedFont(StandardFonts.TimesRoman)
      const fontBold = await pdf.embedFont(StandardFonts.TimesRomanBold)

      // Logo
      try {
        const logoBytes = await fetch("/agree-logo.jpg").then(res => res.arrayBuffer())
        const logo = await pdf.embedJpg(logoBytes)
        const dims = logo.scale(0.25)

        page.drawImage(logo, {
          x: 50,
          y: height - 120,
          width: dims.width,
          height: dims.height,
        })
      } catch {
        page.drawText("PREMIUM LADIES FITNESS CENTER", {
          x: 50,
          y: height - 80,
          size: 16,
          font: fontBold,
        })
      }

      const startY = height - 160

      page.drawText("MEMBERSHIP AGREEMENT", {
        x: 50,
        y: startY,
        size: 16,
        font: fontBold,
      })

      page.drawLine({
        start: { x: 50, y: startY - 10 },
        end: { x: width - 50, y: startY - 10 },
        thickness: 1,
      })

      const infoY = startY - 50
      page.drawText("Member Details", {
        x: 50,
        y: infoY,
        size: 12,
        font: fontBold,
      })

      page.drawText(`Name: ${formData.name}`, { x: 50, y: infoY - 25, size: 11, font: fontRegular })
      page.drawText(`Membership ID: ${formData.memberId}`, { x: 50, y: infoY - 45, size: 11, font: fontRegular })
      page.drawText(`Email: ${formData.email || "N/A"}`, { x: 300, y: infoY - 25, size: 11, font: fontRegular })
      page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 300, y: infoY - 45, size: 11, font: fontRegular })

      page.drawText("Terms & Conditions", {
        x: 50,
        y: infoY - 90,
        size: 12,
        font: fontBold,
      })

      page.drawText(AGREEMENT_TEXT, {
        x: 50,
        y: infoY - 115,
        size: 9,
        font: fontRegular,
        maxWidth: width - 100,
        lineHeight: 12,
        color: rgb(0.2, 0.2, 0.2),
      })

      const sigY = infoY - 360
      const sigData = sigPadRef.current?.getTrimmedCanvas().toDataURL("image/png")

      if (sigData) {
        const sigBytes = base64ToUint8Array(sigData.split(",")[1])
        const sigImage = await pdf.embedPng(sigBytes)
        const sigDims = sigImage.scale(0.5)

        page.drawImage(sigImage, {
          x: 50,
          y: sigY,
          width: sigDims.width,
          height: sigDims.height,
        })
      }

      page.drawLine({
        start: { x: 50, y: sigY - 10 },
        end: { x: 250, y: sigY - 10 },
        thickness: 1,
      })

      page.drawText("Authorized Signature", {
        x: 50,
        y: sigY - 25,
        size: 10,
        font: fontRegular,
      })

      page.drawText(`Signed digitally on ${new Date().toLocaleString()}`, {
        x: 50,
        y: sigY - 40,
        size: 8,
        font: fontRegular,
        color: rgb(0.5, 0.5, 0.5),
      })

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes.buffer.slice(0)], { type: "application/pdf" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `Agreement_${formData.memberId}.pdf`
      link.click()
    } catch (err) {
      console.error(err)
      alert("PDF generation failed.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 font-space text-gray-800">
      <div className="max-w-3xl mx-auto border border-gray-200 shadow-sm rounded-lg overflow-hidden bg-white">

        {/* Header */}
        <div className="border-b border-gray-100 p-8 flex flex-col items-center">
          <Image
            src="/agree-logo.jpg"
            alt="Premium Ladies Fitness Center"
            width={300}
            height={100}
            className="w-[220px] md:w-[300px] h-auto"
            priority
          />
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Membership Agreement
          </h1>
        </div>

        <div className="p-8 space-y-8">

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border px-3 py-2.5 rounded-md"
            />
            <input
              name="memberId"
              placeholder="Membership ID"
              value={formData.memberId}
              onChange={handleInputChange}
              className="border px-3 py-2.5 rounded-md"
            />
            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="border px-3 py-2.5 rounded-md md:col-span-2"
            />
          </div>

          {/* Terms */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Terms & Conditions</label>
            <div className="h-32 overflow-y-auto border border-gray-200 bg-gray-50 p-4 rounded-md text-[13px] text-gray-700 leading-snug">
              <p className="whitespace-pre-wrap tracking-tight">
                {AGREEMENT_TEXT}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1">Scroll to read all terms</p>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-md border">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <p className="text-sm text-gray-700">
              I have read and agree to the terms. This digital signature is legally binding.
            </p>
          </div>

          {/* Signature */}
          <div>
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-gray-700">Signature</label>
              <button onClick={clearSignature} className="text-xs text-red-600">Clear</button>
            </div>
            <div className="border rounded-md mt-2">
              <SignatureCanvas
                ref={sigPadRef}
                penColor="black"
                canvasProps={{ className: "w-full h-40" }}
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className={`w-full py-3 rounded-md text-white font-medium ${
              isGenerating ? "bg-gray-400" : "bg-black hover:bg-gray-800"
            }`}
          >
            {isGenerating ? "Generating..." : "Sign & Download PDF"}
          </button>

        </div>
      </div>
    </div>
  )
}
