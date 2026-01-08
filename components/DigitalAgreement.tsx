"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import SignatureCanvas from "react-signature-canvas"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

const AGREEMENT_TEXT = `
1. MEMBERSHIP
This membership is personal, non-transferable, and non-refundable.

2. HEALTH DECLARATION
I confirm that I am medically fit to participate in physical activities.

3. WAIVER OF LIABILITY
I voluntarily assume all risks and release Premium Ladies Fitness Center from liability.

4. RULES & CONDUCT
I agree to follow gym rules. Membership may be terminated for violations.

5. PAYMENTS
I authorize the gym to collect membership fees as per the selected plan.
`

export default function DigitalAgreement() {
  const sigPadRef = useRef<SignatureCanvas>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    memberId: "",
    email: "",
  })

  // State to handle responsive canvas width
  const [canvasWidth, setCanvasWidth] = useState(300)
  const [agreed, setAgreed] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // 1. Responsive Canvas Logic
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth - 2
        setCanvasWidth(width)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Clear signature on resize to prevent coordinate skewing
  useEffect(() => {
    sigPadRef.current?.clear()
  }, [canvasWidth])

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
      const page = pdf.addPage([595, 842]) // A4 Size
      const { width, height } = page.getSize()

      const fontRegular = await pdf.embedFont(StandardFonts.TimesRoman)
      const fontBold = await pdf.embedFont(StandardFonts.TimesRomanBold)

      // --- LOGO HANDLING ---
      try {
        const logoBytes = await fetch("/agree-logo.jpg").then((res) => res.arrayBuffer())
        const logo = await pdf.embedJpg(logoBytes)
        const logoDims = logo.scaleToFit(200, 80)

        page.drawImage(logo, {
          x: 50,
          y: height - 120,
          width: logoDims.width,
          height: logoDims.height,
        })
      } catch {
        page.drawText("PREMIUM LADIES FITNESS CENTER", {
          x: 50,
          y: height - 100,
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
      
      // Details Section
      page.drawText("Member Details", { x: 50, y: infoY, size: 12, font: fontBold })
      
      const fieldY = infoY - 25
      page.drawText(`Name: ${formData.name}`, { x: 50, y: fieldY, size: 11, font: fontRegular })
      page.drawText(`Email: ${formData.email || "N/A"}`, { x: 300, y: fieldY, size: 11, font: fontRegular })
      
      const fieldY2 = infoY - 45
      page.drawText(`Membership ID: ${formData.memberId}`, { x: 50, y: fieldY2, size: 11, font: fontRegular })
      page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 300, y: fieldY2, size: 11, font: fontRegular })

      // Terms Section
      page.drawText("Terms & Conditions", { x: 50, y: infoY - 80, size: 12, font: fontBold })

      page.drawText(AGREEMENT_TEXT, {
        x: 50,
        y: infoY - 105,
        size: 9,
        font: fontRegular,
        maxWidth: width - 100,
        lineHeight: 12,
        color: rgb(0.2, 0.2, 0.2),
      })

      // --- SIGNATURE HANDLING ---
      const sigY = infoY - 350
      const sigData = sigPadRef.current?.getTrimmedCanvas().toDataURL("image/png")

      if (sigData) {
        const sigBytes = base64ToUint8Array(sigData.split(",")[1])
        const sigImage = await pdf.embedPng(sigBytes)

        // Fit signature into 150x60 box
        const sigDims = sigImage.scaleToFit(150, 60)

        page.drawImage(sigImage, {
          x: 50,
          y: sigY,
          width: sigDims.width,
          height: sigDims.height,
        })
      }

      page.drawLine({
        start: { x: 50, y: sigY - 5 },
        end: { x: 200, y: sigY - 5 },
        thickness: 1,
      })

      page.drawText("Authorized Signature", {
        x: 50,
        y: sigY - 20,
        size: 10,
        font: fontRegular,
      })

      page.drawText(`Digitally signed: ${new Date().toLocaleString()}`, {
        x: 50,
        y: sigY - 32,
        size: 8,
        font: fontRegular,
        color: rgb(0.5, 0.5, 0.5),
      })

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      
      // --- UPDATED FILENAME LOGIC ---
      // Uses ID, removes any spaces from the ID just in case
      const safeId = formData.memberId.replace(/\s+/g, "")
      link.download = `Membership_Agreement_${safeId}.pdf`
      
      link.click()

    } catch (err) {
      console.error("PDF Gen Error:", err)
      alert("Could not generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 font-space text-gray-800 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="p-6 md:p-8 flex flex-col items-center text-center border-b border-gray-100">
          <div className="w-[180px] md:w-[220px] mb-4">
            <Image
              src="/agree-logo.jpg"
              alt="Premium Ladies Fitness Center"
              width={300}
              height={100}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Membership Agreement
          </h1>
          <p className="text-sm text-gray-500 mt-1">Please fill details and sign below</p>
        </div>

        <div className="p-6 md:p-8 space-y-6">

          {/* Form Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                placeholder="e.g. Sarah Smith"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Membership ID</label>
                <input
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  placeholder="e.g. MEM-001"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email (Optional)</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  placeholder="sarah@example.com"
                />
              </div>
            </div>
          </div>

          {/* Terms Scroll Area */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
             <div className="h-28 overflow-y-auto text-xs text-gray-600 leading-relaxed pr-2 scrollbar-thin scrollbar-thumb-gray-300">
               <p className="whitespace-pre-wrap">{AGREEMENT_TEXT}</p>
             </div>
          </div>

          {/* Consent Checkbox */}
          <label className="flex gap-3 items-start cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 accent-black"
            />
            <span className="text-sm text-gray-700 select-none">
              I have read the terms above and agree to the rules of Premium Ladies Fitness Center.
            </span>
          </label>

          {/* Signature Section */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm font-bold text-gray-900">Sign Below</label>
              <button 
                onClick={clearSignature} 
                className="text-xs font-medium text-red-600 hover:text-red-800 bg-red-50 px-2 py-1 rounded"
              >
                Reset Signature
              </button>
            </div>
            
            {/* Canvas Container */}
            <div 
              ref={containerRef}
              className="border-2 border-dashed border-gray-300 rounded-xl bg-white relative touch-none"
              style={{ height: "180px" }}
            >
              {!canvasWidth ? null : (
                <SignatureCanvas
                  ref={sigPadRef}
                  penColor="black"
                  canvasProps={{
                    width: canvasWidth,
                    height: 180, 
                    className: "outline-none cursor-crosshair"
                  }}
                />
              )}
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                 <span className="text-4xl font-serif italic text-gray-400">Sign Here</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-1 text-center">Use your finger or mouse to sign inside the box</p>
          </div>

          {/* Submit Button */}
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all active:scale-[0.98] ${
              isGenerating 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-black hover:bg-gray-800 hover:shadow-xl"
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating...
              </span>
            ) : (
              "Complete Registration & Download PDF"
            )}
          </button>

        </div>
      </div>
    </div>
  )
}