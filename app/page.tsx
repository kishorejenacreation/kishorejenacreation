import Hero from "./components/Hero"
import Services from "./components/Services"
import AboutSection from "./components/AboutSection"
import MusicSection from "./components/MusicSection"
import ReviewSection from "./components/ReviewSection"
import Timeline from "./components/Timeline"
import Marquee from "./components/Marquee"
import WearYourStory from "./components/WearYourStory"
import UpdatesSection from "./components/UpdatesSection"
import FollowButton from "./components/FollowButton"
import SignupDashboard from "./components/SignupDashboard" // ✅ Add this line

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutSection />
      <MusicSection />
      <ReviewSection />
      <Timeline />
      <Marquee />
      <WearYourStory />
      <UpdatesSection />

      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-md">
          <FollowButton />
        </div>
      </div>

      {/* ✅ Admin Signup Dashboard Button + Panel */}
      <SignupDashboard />
    </>
  )
}
