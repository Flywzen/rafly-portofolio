import HeroSection from '@/components/HeroSection'
import FeaturedProjects from '@/components/FeaturedProjects'
import PhilosophySection from '@/components/PhilosophySection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'

/**
 * Homepage — personal branding only. Answers: what I've built, how I
 * think, who I am, how to reach me. No pricing, no service pitch, that
 * lives at /services, a deliberately separate journey for a different
 * audience (see ADR in README).
 *
 * CybersecuritySection is intentionally not rendered here for now — the
 * component still exists (components/CybersecuritySection.tsx) and Nav/
 * Footer's "Security" link was removed alongside it, so there's no dead
 * anchor. Re-add both once there's a certification or concrete proof to
 * back the section up; until then this page shouldn't claim it.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <PhilosophySection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
