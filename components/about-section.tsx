import { Mail, Phone, MapPin } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-balance">
          About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SAKSHAM</span>
        </h2>

        <div className="glass-effect-dark rounded-3xl p-8 md:p-12 mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">SAKSHAM ~ The Fourth Edition</h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            SAKSHAM is a premier technical event that brings together the brightest minds in technology, innovation, and
            entrepreneurship. For four consecutive years, we have curated experiences that inspire, educate, and
            connect. This fourth edition promises to be bigger, bolder, and more impactful than ever before.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Join us as we celebrate technological excellence, showcase groundbreaking projects, and create an ecosystem
            where ideas flourish and innovations come to life. Whether you are a developer, designer, entrepreneur, or
            tech enthusiast, SAKSHAM has something extraordinary for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-effect-dark rounded-2xl p-6 text-center">
            <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Phone</h4>
            <a href="tel:+919876543210" className="text-muted-foreground hover:text-accent transition-colors">
              +91 8260500705
            </a>
          </div>
          <div className="glass-effect-dark rounded-2xl p-6 text-center">
            <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Email</h4>
            <a href="mailto:info@saksham.com" className="text-muted-foreground hover:text-accent transition-colors">
              gamil
            </a>
          </div>
          <div className="glass-effect-dark rounded-2xl p-6 text-center">
            <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Address</h4>
            <p className="text-muted-foreground text-sm">
              Srinix College of Engineering,
              <br />
              Ranipatna, Balasore,
              <br />
              Odisha, India
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="mailto:admin@saksham.com"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            Contact Admin
          </a>
        </div>
      </div>
    </section>
  )
}
