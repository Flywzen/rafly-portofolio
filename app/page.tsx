import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import FeaturedProjects from '@/components/FeaturedProjects'
import CybersecuritySection from '@/components/CybersecuritySection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedProjects />
        <CybersecuritySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
