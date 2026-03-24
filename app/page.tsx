import Image from "next/image"
import { HeroSection } from "@/components/hero-section"
import { GalleryCarousel } from "@/components/gallery-carousel"
import { LocationSection } from "@/components/location-section"
import { ProjectSection } from "@/components/project-section"
import { InvestmentBanner } from "@/components/investment-banner"
import { AmenitiesSection } from "@/components/amenities-section"
import { ResidencesSection } from "@/components/residences-section"
import { InvestorSection } from "@/components/investor-section"
import { RoiCalculator } from "@/components/roi-calculator"
import { ContactSection } from "@/components/contact-section"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="relative bg-sand">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Galería — inmersión visual inmediata */}
      <GalleryCarousel />

      {/* 3. Ubicación */}
      <LocationSection />

      {/* 4. El Proyecto */}
      <ProjectSection />

      {/* 5. Banner de inversión — transición entre Proyecto y Amenidades */}
      <InvestmentBanner />

      {/* 6. Amenidades */}
      <AmenitiesSection />

      {/* 7. Tipos de Residencias */}
      <ResidencesSection />

      {/* 8. Perfil Inversionista */}
      <InvestorSection />

      {/* 9. Calculadora ROI */}
      <RoiCalculator />

      {/* 10. Contacto */}
      <ContactSection />

      {/* Botón flotante WhatsApp */}
      <WhatsAppButton />

      {/* Footer */}
      <footer className="bg-sand-deep border-t border-gold/15 py-14 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-3 flex justify-center">
            <Image
              src="/logo-puntamarea.png"
              alt="Puntamarea"
              width={220}
              height={80}
              style={{ width: "auto", height: 64 }}
              className="object-contain brightness-0 opacity-60"
            />
          </div>
          <p className="mb-8 font-sans text-xs font-light text-caramel/70 tracking-wide">
            Un desarrollo de Viveloo · Barú, Colombia
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              { label: "Ubicación",   href: "#ubicacion" },
              { label: "Proyecto",    href: "#proyecto" },
              { label: "Experiencia", href: "#amenidades" },
              { label: "Residencias", href: "#residencias" },
              { label: "Inversión",   href: "#inversores" },
              { label: "Contacto",    href: "#contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[11px] font-light uppercase tracking-wider text-caramel/50 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="font-sans text-[11px] font-light text-caramel/40">
            © 2026 PUNTAMAREA. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
