"use client";

import { motion } from "framer-motion";
import {
  VideoCameraIcon,
  PhotoIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  HeartIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    icon: <VideoCameraIcon className="w-12 h-12 mb-4 text-purple-500" />,
    title: "Video Editing",
    description:
      "Professional video editing with After Effects and Premiere Pro for all your creative needs.",
  },
  {
    icon: <PhotoIcon className="w-12 h-12 mb-4 text-green-500" />,
    title: "Photo Editing",
    description:
      "Expert photo manipulation and enhancement using industry-standard software.",
  },
  {
    icon: <RectangleStackIcon className="w-12 h-12 mb-4 text-purple-500" />,
    title: "Thumbnail Design",
    description:
      "Eye-catching thumbnails for YouTube, social media, and digital platforms.",
  },
  {
    icon: <HeartIcon className="w-12 h-12 mb-4 text-red-500" />,
    title: "Wedding Invitations",
    description:
      "Beautiful and elegant wedding invitation designs for your special day.",
  },
  {
    icon: <PaintBrushIcon className="w-12 h-12 mb-4 text-yellow-500" />,
    title: "Graphic Design",
    description:
      "Creative graphic design solutions for branding, logos, and marketing materials.",
  },
  {
    icon: <MusicalNoteIcon className="w-12 h-12 mb-4 text-purple-600" />,
    title: "Audio Editing",
    description:
      "Professional audio editing and mixing for podcasts, music, and videos.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-background p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
