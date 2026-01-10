import { Mail, Phone } from "lucide-react"

export function TeamsSection() {
  const team = [
    /*
    {
      name: "Priya Sharma",
      role: "Event Director",
      image: "/professional-woman-headshot.png",
      phone: "+91 98765 43210",
      email: "priya@saksham.com",
    },
    {
      name: "Raj Patel",
      role: "Technical Lead",
      image: "/professional-man-headshot.png",
      phone: "+91 87654 32109",
      email: "raj@saksham.com",
    },
    {
      name: "Anjali Singh",
      role: "Sponsorship Manager",
      image: "/professional-woman-headshot.png",
      phone: "+91 76543 21098",
      email: "anjali@saksham.com",
    },
    {
      name: "Vikram Kumar",
      role: "Operations Head",
      image: "/professional-man-headshot.png",
      phone: "+91 65432 10987",
      email: "vikram@saksham.com",
    },*/
  ]

  return (
    <section id="teams" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
          Meet Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Team</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="glass-effect-dark rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-semibold mb-4">{member.role}</p>
                <div className="space-y-3">
                  <a
                    href={`tel:${member.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
