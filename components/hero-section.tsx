import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="pt-20 md:pt-28 lg:pt-32 pb-12 lg:pb-16 bg-white relative overflow-hidden">
      {/* Pink gradient background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.16)_0%,rgba(255,255,255,1)_40%)]" />

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <h1 className="sr-only">
            Premium Ladies Gym – Women-Only Gym in Al Ain, UAE
          </h1>

          {/* Left content */}
          <div className="space-y-8 animate-slide-in-left">
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

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              {/* Primary CTA */}
              <Link
                href="/#membership"
                className="
                  group
                  relative
                  px-8 py-3
                  font-bebas
                  text-lg
                  tracking-wide
                  bg-[#FF69B4]
                  text-white
                  rounded
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:shadow-[0_10px_30px_rgba(255,105,180,0.35)]
                "
              >
                Join Now
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/#contact"
                className="
                  px-8 py-3
                  font-bebas
                  text-lg
                  tracking-wide
                  text-[#333333]
                  border border-[#333333]
                  rounded
                  transition-all
                  duration-300
                  hover:bg-[#333333]
                  hover:text-white
                "
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-slide-in-right flex justify-center">
            <img
              src="/images/image.png"
              alt="Fitness woman in boxing stance"
              className="relative z-20 max-w-130 w-full h-auto object-cover"
            />

            {/* Ground fade */}
            <div
              className="pointer-events-none absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[55%]
                            bg-linear-to-t from-[#FF69B4]/30 via-[#FF69B4]/15 to-transparent blur-2xl z-10"
            />

            {/* Decorative chevron */}
            <div className="absolute top-8 right-8 animate-bounce-slow z-30">
              <svg
                className="w-10 h-10 text-white opacity-70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 15l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
