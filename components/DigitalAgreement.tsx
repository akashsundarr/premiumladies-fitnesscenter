"use client"

import { useRef, useState } from "react"
import { PDFDocument, StandardFonts } from "pdf-lib"

export default function DigitalAgreement() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [name, setName] = useState("")
  const [memberId, setMemberId] = useState("")
  const [agree, setAgree] = useState(false)
  const [drawing, setDrawing] = useState(false)

  const start = () => setDrawing(true)
  const stop = () => setDrawing(false)

  const draw = (e: any) => {
    if (!drawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const rect = canvas.getBoundingClientRect()

    const x = (e.clientX || e.touches?.[0].clientX) - rect.left
    const y = (e.clientY || e.touches?.[0].clientY) - rect.top

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#000"
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const clear = () => {
    const ctx = canvasRef.current!.getContext("2d")!
    ctx.clearRect(0, 0, 300, 150)
  }

  const generatePDF = async () => {
    if (!name || !memberId || !agree) {
      alert("Please complete all fields and accept terms")
      return
    }

    const pdf = await PDFDocument.create()
    const page = pdf.addPage([595, 842]) // A4
    const font = await pdf.embedFont(StandardFonts.Helvetica)

    page.drawText("PREMIUM LADIES FITNESS CENTER", {
      x: 50,
      y: 800,
      size: 18,
      font
    })

    page.drawText("Digital Membership Agreement", {
      x: 50,
      y: 770,
      size: 12,
      font
    })

    page.drawText(`Name: ${name}`, { x: 50, y: 730, size: 11, font })
    page.drawText(`Membership ID: ${memberId}`, { x: 50, y: 710, size: 11, font })
    page.drawText(`Date: ${new Date().toLocaleString()}`, {
      x: 50,
      y: 690,
      size: 11,
      font
    })

    const termsText =
      "I confirm that I have read, understood, and agreed to the rules, policies, and membership terms of Premium Ladies Fitness Center. This document is signed electronically and is legally binding under UAE Electronic Transactions Law."

    page.drawText(termsText, {
      x: 50,
      y: 640,
      size: 10,
      font,
      maxWidth: 500,
      lineHeight: 14
    })

    const signatureBase64 = canvasRef.current!.toDataURL("image/png")
    const signatureBytes = Buffer.from(signatureBase64.split(",")[1], "base64")
    const signatureImage = await pdf.embedPng(signatureBytes)

    page.drawImage(signatureImage, {
      x: 50,
      y: 520,
      width: 150,
      height: 60
    })

    page.drawText("Signature", { x: 50, y: 585, size: 10, font })

    const pdfBytes = await pdf.save()

    const blob = new Blob(
        [pdfBytes],
        { type: "application/pdf" }
      )
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)

    link.download = `${name.replace(/\s+/g, "_")}_Membership_Agreement.pdf`
    link.click()
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="font-bebas text-4xl text-center mb-8">
        Membership Agreement
      </h2>

      <div className="space-y-4">
        <input
          placeholder="Full Name"
          className="w-full border px-4 py-3 rounded font-space"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Membership ID"
          className="w-full border px-4 py-3 rounded font-space"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />

        <div className="border p-4 max-h-40 overflow-y-auto text-sm font-space">
          <p>
            Please read all gym rules, safety policies, and membership terms
            carefully before signing.
          </p>
        </div>

        <label className="flex items-center gap-2 font-space text-sm">
          <input type="checkbox" onChange={(e) => setAgree(e.target.checked)} />
          I have read and agree to the Terms & Conditions
        </label>

        <div>
          <p className="font-space text-sm mb-2">Signature</p>
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="border"
            onMouseDown={start}
            onMouseUp={stop}
            onMouseMove={draw}
            onTouchStart={start}
            onTouchEnd={stop}
            onTouchMove={draw}
          />
          <button
            onClick={clear}
            className="mt-2 text-sm underline text-gray-500"
          >
            Clear signature
          </button>
        </div>

        <button
          onClick={generatePDF}
          className="w-full mt-6 bg-[#FF69B4] text-white py-3 rounded font-bebas text-lg tracking-wide hover:opacity-90"
        >
          Generate & Download PDF
        </button>
      </div>
    </section>
  )
}
