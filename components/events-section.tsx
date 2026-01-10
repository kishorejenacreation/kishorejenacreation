"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function EventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const events = [
    /*
    {
      title: "AI Workshop",
      description: "Deep dive into artificial intelligence and machine learning fundamentals.",
      image: "/ai-workshop-machine-learning.jpg",
    },
    {
      title: "Web Development Track",
      description: "Learn modern web technologies and build scalable applications.",
      image: "/web-development-coding.png",
    },
    {
      title: "Cloud Computing Session",
      description: "Explore cloud platforms and infrastructure for modern applications.",
      image: "/cloud-computing-servers.jpg",
    },
    {
      title: "Cybersecurity Talks",
      description: "Security best practices and protecting your digital assets.",
      image: "/cybersecurity-protection.png",
    },
    {
      title: "Data Science Masterclass",
      description: "Transform raw data into actionable insights and predictions.",
      image: "/data-science-analytics.jpg",
    },
    */
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
          Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Events</span>
        </h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {events.map((event, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-96 glass-effect-dark rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3">{event.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{event.description}</p>
                  <a
                    href="https://docs.google.com/forms/u/0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Controls */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full glass-effect-dark hover:bg-accent/10 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full glass-effect-dark hover:bg-accent/10 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
