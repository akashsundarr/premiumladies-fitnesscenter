"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- Types ---------------- */

type Trainer = {
  id: number;
  name: string;
  title: string;
  experience: string;
  nationality: string;
  location: string;
  bio: string;
  imageCard: string;
  imageProfile: string;
  languages: string[];
  certifications: string[];
  skills: string[];
  achievements: string[];
};

/* ---------------- Data ---------------- */

const trainers: Trainer[] = [
  {
    id: 1,
    name: "Sandhra Sabu",
    title: "Certified Fitness Trainer",
    experience: "5 Years Experience",
    nationality: "Indian",
    location: "Premium Ladies Fitness Center, Al Ain",
    imageCard: "/sandhra-card.jpg",
    imageProfile: "/sandhra-profile.jpg",
    languages: ["English", "Hindi", "Malayalam", "Tamil"],
    certifications: [
      "IACET, USA Certificate",
      "REPS Certificate & Membership",
      "NSQF Level 5 Certificate",
      "Trauma Responds Certificate & Membership",
      "NABET Certificate",
    ],
    skills: [
      "Weight loss & fat burning",
      "Strength & muscle building",
      "Functional & core training",
      "Personalised diet & workout plans",
      "Tracking client progress",
      "Correcting exercise form & posture",
      "Group classes (Zumba, Tabata)",
    ],
    achievements: [
      "Happy and satisfied clients",
      "Sub Junior State Volleyball Championship",
      "Junior State Volleyball Championship",
    ],
    bio:
      "Sandhra Sabu is a dedicated and certified fitness professional with strong expertise in strength training, functional workouts, and personalized fat loss programs. She focuses on correct form, injury-free training, and long-term lifestyle improvement, making every session motivating and results-driven.",
  },
  {
    id: 2,
    name: "Akshara NR",
    title: "Certified Fitness Trainer",
    experience: "3 Years 8 Months Experience",
    nationality: "Indian",
    location: "Premium Ladies Fitness Center, Al Ain",
    imageCard: "/akshara-card.jpg",
    imageProfile: "/akshara-profile.jpg",
    languages: ["English", "Malayalam", "Tamil"],
    certifications: [
      "IACET, USA Certificate",
      "REPS Certificate & Membership",
      "NSQF Level 5 Certificate",
      "Trauma Responds Certificate & Membership",
      "NABET Certificate",
    ],
    skills: [
      "Weight loss & fat burning",
      "Strength & muscle building",
      "Functional & core training",
      "Personalised diet & workout plans",
      "Tracking client progress",
      "Correcting exercise form & posture",
      "Group classes",
    ],
    achievements: [
      "Happy and satisfied clients",
      "Junior National Volleyball Championship",
      "Inter College Volleyball Championship",
      "Sub Junior National Volleyball Championship",
    ],
    bio:
      "Akshara NR is a certified fitness trainer specializing in strength training, functional workouts, and sustainable fat loss programs. She emphasizes correct form, injury prevention, and long-term lifestyle improvement to ensure safe and effective results.",
  },
];

/* ---------------- Component ---------------- */

export default function TrainersSection() {
  const [activeTrainer, setActiveTrainer] = useState<Trainer | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeTrainer ? "hidden" : "auto";
  }, [activeTrainer]);

  return (
    <section className="py-24 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.14)_0%,#ffffff_45%)]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-bebas text-6xl md:text-7xl text-[#333333]">
            Our <span className="text-[#FF69B4]">Trainers</span>
          </h2>
          <p className="font-space text-[#333333] mt-4 max-w-xl mx-auto text-lg">
            Meet our certified female trainers who guide, support, and inspire your fitness journey.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {trainers.map((trainer) => (
            <motion.button
              key={trainer.id}
              onClick={() => setActiveTrainer(trainer)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="
                group relative overflow-hidden rounded-2xl bg-white
                border border-[#FF69B4]/40 text-left
                hover:shadow-xl transition-shadow
              "
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={trainer.imageCard}
                  alt={trainer.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-bebas text-3xl text-[#333333]">
                  {trainer.name}
                </h3>
                <p className="font-space text-sm text-[#333333]/80 uppercase tracking-widest mt-1">
                  {trainer.title}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-space text-sm text-[#333333]/70">
                    {trainer.experience}
                  </span>
                  <span className="font-space text-sm text-[#FF69B4]">
                    View Profile →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ---------------- Modal ---------------- */}
      <AnimatePresence>
        {activeTrainer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70"
          >
            <div className="relative w-full h-full overflow-y-auto">

              {/* Image Header */}
              <div className="relative h-[32vh]">
                <Image
                  src={activeTrainer.imageProfile}
                  alt={activeTrainer.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />

                {/* Close */}
                <motion.button
                  onClick={() => setActiveTrainer(null)}
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Content */}
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="
  -mt-6 md:-mt-8 lg:-mt-10
  bg-white rounded-t-3xl
  px-6
  pt-12 md:pt-10 lg:pt-12
  pb-24
  space-y-6
"

              >
                <div>
                  <h3 className="font-bebas text-4xl text-[#333333]">
                    {activeTrainer.name}
                  </h3>
                  <p className="font-space text-[#FF69B4] uppercase tracking-widest text-sm mt-1">
                    {activeTrainer.title}
                  </p>
                  <p className="font-space text-sm text-[#333333]/70 mt-1">
                    {activeTrainer.location}
                  </p>
                </div>

                <p className="font-space text-[#333333] leading-[1.6em]">
                  {activeTrainer.bio}
                </p>

                <Section title="Languages">
                  <TagGroup items={activeTrainer.languages} />
                </Section>

                <Section title="Certifications">
                  <List items={activeTrainer.certifications} />
                </Section>

                <Section title="Special Skills & Expertise">
                  <TagGroup items={activeTrainer.skills} />
                </Section>

                <Section title="Achievements">
                  <List items={activeTrainer.achievements} />
                </Section>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Helpers ---------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-bebas text-2xl text-[#333333] mb-2">{title}</h4>
      {children}
    </div>
  );
}

function TagGroup({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="font-space text-sm px-4 py-2 rounded-full bg-[#FF69B4]/10 text-[#333333]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside font-space text-[#333333] space-y-1">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
