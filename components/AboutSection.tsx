// components/AboutSection.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  VideoCameraIcon,
  PhotoIcon,
  AcademicCapIcon,
  TrophyIcon,
  StarIcon,
  CalendarIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { useProjectForm } from "@/components/ProjectFormContext";

const achievements = [
  {
    icon: <VideoCameraIcon className="h-6 w-6" />,
    title: "500+ Videos Edited",
    description: "Professional video editing for weddings, events, and commercial projects",
  },
  {
    icon: <PhotoIcon className="h-6 w-6" />,
    title: "1000+ Photos Enhanced",
    description: "Expert photo manipulation, retouching, and creative enhancement",
  },
  {
    icon: <TrophyIcon className="h-6 w-6" />,
    title: "3+ Years Experience",
    description: "Dedicated expertise in digital content creation and editing",
  },
  {
    icon: <StarIcon className="h-6 w-6" />,
    title: "98% Client Satisfaction",
    description: "Consistently delivering high-quality results that exceed expectations",
  },
];

const skills = [
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Adobe Photoshop",
  "Canva Pro",
  "Figma",
  "Audio Editing",
  "Color Grading",
];

export default function AboutSection() {
  const { openProjectForm } = useProjectForm();

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/10 to-primary/5"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Meet the Creator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The visionary behind Kishore Jena Creation, bringing stories to life through expert editing and creative design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-xl">
                  <Image
                    src="/images/kishore-jena.jpg"
                    alt="Kishore Jena"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                  <AcademicCapIcon className="h-5 w-5" />
                </div>
              </motion.div>

              <div className="flex-1">
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-2 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h3 className="text-3xl font-bold text-foreground">Kishore Jena</h3>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CheckBadgeIcon className="h-7 w-7 text-purple-500 fill-current" />
                    <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 animate-pulse" />
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-primary font-semibold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Founder & Creative Director
                  <span className="ml-2 text-xs bg-blue-500/10 text-purple-600 px-2 py-1 rounded-full">
                    ✓ Verified Creator
                  </span>
                </motion.p>

                <motion.div
                  className="flex items-center gap-2 text-sm text-muted-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span>Founded in 2021 • Based in Odisha, India</span>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="mt-6 space-y-4 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <p>
                Kishore Jena is a passionate digital content creator and professional editor with over 3 years of experience
                in transforming raw footage and images into compelling visual stories.
              </p>
              <p>
                Specializing in wedding cinematography, commercial video production, and creative photo enhancement,
                Kishore has built a reputation for delivering exceptional quality work.
              </p>
              <p>
                He also helps businesses grow by creating impactful promotional content that boosts brand identity and
                audience engagement.
              </p>
              <p>
                When he's not behind the editing desk, Kishore explores creative techniques and mentors aspiring creators.
              </p>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <a
                href="mailto:jenakishore2006@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors text-sm"
              >
                📧 jenakishore2006@gmail.com
              </a>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm">
                📍 Odisha, India
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-6">Professional Achievements</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-primary mt-1">{item.icon}</div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-1">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-foreground mb-6">Technical Expertise</h4>
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h5 className="text-lg font-semibold text-foreground mb-2">Ready to Start Your Project?</h5>
              <p className="text-muted-foreground mb-4">
                Let's bring your creative vision to life with professional editing and design services.
              </p>
              <button
                onClick={openProjectForm}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
