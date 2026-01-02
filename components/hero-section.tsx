import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="pt-20 md:pt-28 lg:pt-32 pb-12 lg:pb-16 bg-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.16)_0%,rgba(255,255,255,1)_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <h1 className="sr-only">
            Premium Ladies Gym – Women-Only Gym in Al Ain, UAE
          </h1>

          {/* Left content */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bebas leading-[1em]">
              <span className="text-[#333333] block">Get Fit, Strong and</span>
              <span className="text-[#FF69B4] block">Healthy</span>
            </h2>

            <p className="text-[#333333] text-xl font-space leading-[1.4em] max-w-lg">
              Welcome to{" "}
              <span className="font-semibold">
                Premium Ladies Fitness Center
              </span>
              , Al Ain’s{" "}
              <span className="font-semibold text-[#FF69B4]">
                most trusted ladies-only gym
              </span>
              . We help you become{" "}
              <span className="font-semibold">
                stronger, healthier, and more confident
              </span>
              .
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Link
                href="/#membership"
                className="px-8 py-3 font-bebas text-lg tracking-wide bg-[#FF69B4] text-white rounded transition hover:scale-[1.03]"
              >
                Join Now
              </Link>

              <Link
                href="/#contact"
                className="px-8 py-3 font-bebas text-lg tracking-wide text-[#333333] border border-[#333333] rounded transition hover:bg-[#333333] hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right image (LCP element) */}
          <div className="relative flex justify-center">
            <Image
              src="/images/image.webp"
              alt="Fitness woman in boxing stance"
              width={600}
              height={750}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 90vw, 600px"
              className="relative z-20 w-full h-auto object-cover"
            />

            {/* Soft ground fade (static, safe) */}
            <div
              className="pointer-events-none absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[55%]
                         bg-linear-to-t from-[#FF69B4]/30 via-[#FF69B4]/15 to-transparent blur-2xl z-10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
