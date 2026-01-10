export function HomeSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen gradient-animate flex items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-balance mb-6 leading-tight">
          <span className="text-foreground">Welcome To</span>
          <br />
          <button
  type="button"
  onClick={() => {
    const el = document.getElementById("home")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }}
  className="
    cursor-pointer
    bg-gradient-to-r from-primary via-accent to-secondary
    bg-clip-text text-transparent
    drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
    drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]
    drop-shadow-[0_0_22px_rgba(168,85,247,0.95)]
  "
>
  SAKSHAM
</button>






          <br />
          <span className="text-2xl sm:text-3xl text-muted-foreground">The Fourth Edition</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Experience the convergence of innovation and technology. Join us for an unforgettable journey through
          cutting-edge technical achievements, inspiring talks, and an electrifying celebration of creativity.
        </p>
        <button
  onClick={() => {
    const el = document.getElementById("updates")
    el?.scrollIntoView({ behavior: "smooth" })
  }}
  className="
    px-8 py-3 rounded-full
    bg-gradient-to-r from-primary to-accent
    text-primary-foreground font-semibold
    hover:shadow-lg hover:shadow-primary/50
    transition-all duration-300
  "
>
  Explore Events
</button>

      </div>
    </section>
  )
}
