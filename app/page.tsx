import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import FeaturedProjects from '@/components/FeaturedProjects'
import TechStackSection from '@/components/TechStackSection'
import CybersecuritySection from '@/components/CybersecuritySection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import RevealInit from '@/components/RevealInit'

export default function Home() {
  return (
    <>
      {/* Kicks off IntersectionObserver for .reveal elements */}
      <RevealInit />

      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedProjects />
        <TechStackSection />
        <CybersecuritySection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
