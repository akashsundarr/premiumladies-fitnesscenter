export default function MissionSection() {
  return (
    <section className="relative -mt-16 lg:-mt-24 py-16 md:py-24 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.16)_0%,rgba(255,255,255,1)_40%)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          
          {/* Left column – Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6 animate-fade-in-up">
  <h2 className="font-bebas text-2xl md:text-3xl text-[#333333]">
    Our Purpose
  </h2>
  <h3 className="font-bebas text-6xl md:text-7xl lg:text-8xl text-[#FF69B4] leading-[1em]">
    Your Strength
  </h3>
</div>


            {/* Integrated premium paragraph */}
            <p className="text-xl text-[#333333] font-space leading-[1.4em] max-w-xl">
              Our gym features a{" "}
              <span className="font-semibold">premium ambience</span>, a{" "}
              <span className="font-semibold">highly hygienic environment</span>,
              and modern{" "}
              <span className="font-semibold text-[#FF69B4]">
                UK-based fitness equipment
              </span>
              , creating a safe, clean, and motivating space for every woman.
              With a spacious{" "}
              <span className="font-semibold">5,000 sq. ft. facility</span>, a
              separate large fitness studio, and{" "}
              <span className="font-semibold">
                Level 4 certified female trainers
              </span>
              , we ensure professional guidance and visible results.
            </p>

            {/* Concrete highlights (not generic) */}
            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3 text-[#333333] font-space text-lg">
                <span className="mt-1 text-[#FF69B4]">•</span>
                Women-only, private, and professionally managed environment
              </li>
              <li className="flex items-start gap-3 text-[#333333] font-space text-lg">
                <span className="mt-1 text-[#FF69B4]">•</span>
                International-grade equipment with structured training programs
              </li>
              <li className="flex items-start gap-3 text-[#333333] font-space text-lg">
                <span className="mt-1 text-[#FF69B4]">•</span>
                Certified female trainers focused on safety and long-term results
              </li>
            </ul>
          </div>

          {/* Right column – Image */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="relative w-full h-105 md:h-130">
              <img
                src="/images/mission.png"
                alt="Athlete training in premium fitness studio"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
