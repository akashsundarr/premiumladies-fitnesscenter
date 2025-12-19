import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-[#d6d6d6]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="leading-none">
              <h2 className="font-bebas text-3xl md:text-4xl text-[#f2f2f2]">
                Premium Ladies Fitness
              </h2>
              <h3 className="font-bebas text-4xl md:text-5xl text-[#FF69B4]">
                Center
              </h3>
            </div>

            <p className="text-sm max-w-xs leading-relaxed text-[#cfcfcf]">
              A private, supportive, and premium fitness space exclusively for
              women.
            </p>

            <Link
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full
                         bg-[#1a1a1a] hover:bg-[#FF69B4] hover:text-black transition"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bebas text-xl text-[#f2f2f2] mb-5">navigate</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/#home" className="hover:text-[#FF69B4] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#gallery"
                  className="hover:text-[#FF69B4] transition"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/#trainers"
                  className="hover:text-[#FF69B4] transition"
                >
                  Trainers
                </Link>
              </li>
              <li>
                <Link
                  href="/#membership"
                  className="hover:text-[#FF69B4] transition"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-[#FF69B4] transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bebas text-xl text-[#f2f2f2] mb-5">visit us</h4>

            <div className="space-y-4 text-sm leading-relaxed text-[#cfcfcf]">
              <p className="text-[#cfcfcf]">
                <span className="text-[#FF69B4]">📍</span> Al Ain, Abu Dhabi{" "}
                <br />
                Near STMC Hospital <br />
                Dawar Al Jabal Roundabout
              </p>

              <p>
                <Link
                  href="tel:+971509511234"
                  className="text-[#f2f2f2] hover:text-[#FF69B4] transition"
                >
                  +971 50 951 1234
                </Link>
              </p>

              <p>
                <Link
                  href="mailto:hello@premiumfitnesscenters.ae"
                  className="text-[#f2f2f2] hover:text-[#FF69B4] transition break-all"
                >
                  hello@premiumfitnesscenters.ae
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between text-xs md:text-sm">
          <p className="text-[#bdbdbd]">© 2025 Premium Ladies Fitness Center</p>
          <p className="font-bebas tracking-wider text-[#FF69B4] mt-1 md:mt-0">
            Designed for Confidence
          </p>
        </div>
      </div>
    </footer>
  );
}
