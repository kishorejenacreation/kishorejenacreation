export function EDMSection() {
  return (
    <section id="edm-night" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
       <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-balance">
          EDM <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Night</span>
        </h2>



        <div className="glass-effect-dark rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <img src="/edm-electronic-dance-music-concert.jpg" alt="EDM Night" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">EDM Night</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Experience an unforgettable night of electronic dance music featuring top DJs and live performances.
                Feel the rhythm, embrace the energy, and celebrate with thousands of tech enthusiasts in an electrifying
                atmosphere designed to create memories that last a lifetime.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-foreground">Premium Sound System</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-foreground">Drinks : Mocktails</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-foreground">Date : 13th Feb 2026 | Time : 7PM</span>
                </div>
              </div>
              <a
                href="https://docs.google.com/forms/u/0/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 w-fit"
              >
                Get Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
