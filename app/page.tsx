import Image from "next/image"
import { HeroSection } from "@/components/hero-section"
import { GalleryCarousel } from "@/components/gallery-carousel"
import { LocationSection } from "@/components/location-section"
import { ProjectSection } from "@/components/project-section"
import { InvestmentBanner } from "@/components/investment-banner"
import { AmenitiesSection } from "@/components/amenities-section"
import { ResidencesSection } from "@/components/residences-section"
import { InvestorSection } from "@/components/investor-section"
import { FaseUnoSection } from "@/components/fase-uno-section"
import { ContactSection } from "@/components/contact-section"
import { TrustPartners } from "@/components/trust-partners"
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

      {/* 5. Banner de inversión — imagen cinematográfica 21:9 fixed */}
      <InvestmentBanner />

      {/* 6. Trust Partners */}
      <TrustPartners />

      {/* 7. Amenidades */}
      <AmenitiesSection />

      {/* 7. Tipos de Residencias */}
      <ResidencesSection />

      {/* 8. Perfil Inversionista */}
      <InvestorSection />

      {/* 9. Por qué Fase 1 */}
      <FaseUnoSection />

      {/* 10. Contacto */}
      <ContactSection />

      {/* Botón flotante WhatsApp */}
      <WhatsAppButton />

      {/* Footer */}
      <footer className="relative bg-sand pt-8 md:pt-24 pb-8 md:pb-6">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          {/* Top: logo + tagline + social */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo-viveloo-vv2.png"
              alt="Viveloo Inmobiliaria"
              width={500}
              height={90}
              className="h-20 md:h-16 w-auto object-contain"
            />

            {/* Social icons */}
            <div className="mt-7 flex items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/viveloo.co/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-viveloo-brown/25 text-viveloo-brown transition-all duration-300 hover:border-viveloo-brown hover:bg-viveloo-brown hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/573108125075?text=Hola,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20PUNTAMAREA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center border border-viveloo-brown/25 text-viveloo-brown transition-all duration-300 hover:border-viveloo-brown hover:bg-viveloo-brown hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/>
                </svg>
              </a>
              <a
                href="mailto:Gerenciacomercial@viveloinmibiliaria.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center border border-viveloo-brown/25 text-viveloo-brown transition-all duration-300 hover:border-viveloo-brown hover:bg-viveloo-brown hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { label: "Ubicación",   href: "#ubicacion" },
              { label: "Proyecto",    href: "#proyecto" },
              { label: "Amenidades",  href: "#amenidades" },
              { label: "Residencias", href: "#residencias" },
              { label: "Inversión",   href: "#inversores" },
              { label: "Contacto",    href: "#contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-viveloo-brown/70 transition-colors hover:text-viveloo-brown"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Bottom row */}
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-viveloo-brown/15 pt-5 md:flex-row">
            <p className="font-sans text-[11px] font-light tracking-wide text-viveloo-brown/60">
              © 2026 Viveloo · Todos los derechos reservados
            </p>
            <div className="flex items-center gap-3">
              <span className="font-sans text-[11px] font-light tracking-wide text-viveloo-brown/60">
                Desarrollado por
              </span>
              <a
                href="https://oragrowth.studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ORA Growth Studio"
                className="opacity-70 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src="/logo-ora.png"
                  alt="ORA Growth Studio"
                  width={260}
                  height={30}
                  className="h-4 md:h-5 w-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
