export function UpdatesSection() {
  const updates = [
    /*
    {
      title: "Keynote Speaker Announced",
      description: "Get ready for insights from industry leaders in tech and innovation.",
      date: "March 15, 2024",
      image: "/keynote-speaker-technology.jpg",
    },
    {
      title: "Early Bird Tickets Available",
      description: "Limited slots available at special discounted rates for early registrants.",
      date: "March 10, 2024",
      image: "/event-tickets-registration.jpg",
    },
    {
      title: "Event Schedule Released",
      description: "Check out the full schedule of workshops, talks, and networking sessions.",
      date: "March 8, 2024",
      image: "/event-schedule-calendar.jpg",
    },
    */
  ]

  return (
    <section id="updates" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
          Latest <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Updates</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update, idx) => (
            <div
              key={idx}
              className="glass-effect-dark rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={update.image || "/placeholder.svg"}
                  alt={update.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-accent/80 px-3 py-1 rounded-full text-xs font-semibold text-accent-foreground">
                  {update.date}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{update.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{update.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
