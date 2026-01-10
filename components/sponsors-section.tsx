export function SponsorsSection() {
  const sponsors = [
    /*
    {
      name: "TechCorp Solutions",
      category: "Platinum Sponsor",
      image: "/tech-company-logo.jpg",
    },
    {
      name: "InnovateLabs",
      category: "Gold Sponsor",
      image: "/innovation-company-logo.png",
    },
    {
      name: "CloudFirst",
      category: "Gold Sponsor",
      image: "/cloud-services-logo.jpg",
    },
    {
      name: "DataDrive",
      category: "Silver Sponsor",
      image: "/data-analytics-logo.jpg",
    },
    {
      name: "SecureNet",
      category: "Silver Sponsor",
      image: "/security-company-logo.png",
    },
    {
      name: "DevTools Pro",
      category: "Silver Sponsor",
      image: "/development-tools-logo.jpg",
    },*/
  ]

  return (
    <section id="sponsors" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
          Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sponsors</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="glass-effect-dark rounded-2xl p-8 text-center hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="relative h-32 mb-6 rounded-lg overflow-hidden bg-muted/20">
                <img
                  src={sponsor.image || "/placeholder.svg"}
                  alt={sponsor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{sponsor.name}</h3>
              <p className="text-accent text-sm font-semibold">{sponsor.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
