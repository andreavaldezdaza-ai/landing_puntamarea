"use client"

import { useInView } from "@/hooks/use-in-view"
import { useState } from "react"

const investorProfiles = [
  {
    title: "Maximizadores de Capital",
    highlight: "29.9%",
    highlightLabel: "ROI Proyectado",
    highlightSub: "Año 1",
    description:
      "Adquiere tu lote hoy, construye y participa en un modelo de renta corta gestionado, estructurado para proyectar hasta un 29.9% de ROI en el primer año de operación.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20h20M5 20V8l5-5 4 4 6-4v17" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: "Segunda Vivienda",
    highlight: "24/7",
    highlightLabel: "Concierge",
    highlightSub: "Premium",
    description:
      "El santuario privado ideal para familias, manteniendo la liquidez de un activo premium.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Inversores Internacionales",
    highlight: "USA · EU",
    highlightLabel: "Acompañamiento total",
    highlightSub: "Internacional",
    description:
      "Inversores desde USA y Europa con respaldo y acompañamiento total en cada etapa del proceso: estructuración legal, apertura de cuenta y operación.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Legado Familiar",
    highlight: "10%",
    highlightLabel: "Apreciación",
    highlightSub: "Anual",
    description:
      "Activos tangibles de ultra-lujo con una proyección de apreciación anual del 10%.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function InvestorSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
      id="inversores"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand via-sand-deep to-sand" />
      
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 lg:mb-20 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="mb-4 inline-block font-sans text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
            Oportunidad Exclusiva
          </span>
          <h2 className="mb-6 font-serif text-4xl font-light text-brown md:text-5xl lg:text-6xl xl:text-7xl text-balance">
            Una inversión{" "}
            <span className="italic">inteligente.</span>
          </h2>
          <p className="mx-auto max-w-xl font-sans text-base font-light leading-relaxed text-caramel/80">
            Diseñado para perfiles que entienden que el lujo es, ante todo, un activo estratégico.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {investorProfiles.map((profile, index) => (
            <div
              key={profile.title}
              className={`group relative transition-all duration-700 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div 
                className={`relative h-full overflow-hidden border border-gold/10 bg-card/80 p-8 backdrop-blur-sm transition-all duration-500 lg:p-10 ${
                  hoveredIndex === index 
                    ? "scale-[1.02] border-gold/30 shadow-2xl shadow-gold/10" 
                    : "shadow-lg shadow-charcoal/5"
                }`}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`} 
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Label row */}
                  <div className="mb-6 flex items-start justify-between">
                    <div 
                      className={`flex h-14 w-14 items-center justify-center border transition-all duration-500 ${
                        hoveredIndex === index 
                          ? "border-gold/40 bg-gold/10 text-gold" 
                          : "border-gold/20 bg-sand text-gold/70"
                      }`}
                    >
                      {profile.icon}
                    </div>
                    <span 
                      className={`rounded-full border px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-wider transition-all duration-500 ${
                        hoveredIndex === index 
                          ? "border-gold/40 bg-gold/10 text-gold" 
                          : "border-gold/20 bg-transparent text-caramel/80"
                      }`}
                    >
                      {profile.highlightSub}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 font-serif text-2xl font-light text-brown lg:text-3xl">
                    {profile.title}
                  </h3>

                  {/* Highlight stat */}
                  <div className="mb-6 flex items-baseline gap-3">
                    <span
                      className={`font-serif font-light transition-colors duration-500 ${
                        profile.highlight.length > 5
                          ? "text-3xl lg:text-4xl"
                          : "text-5xl lg:text-6xl"
                      } ${hoveredIndex === index ? "text-gold" : "text-gold/80"}`}
                    >
                      {profile.highlight}
                    </span>
                    <span className="font-sans text-sm font-light text-caramel/80">
                      {profile.highlightLabel}
                    </span>
                  </div>

                  {/* Divider */}
                  <div 
                    className={`mb-6 h-px transition-all duration-500 ${
                      hoveredIndex === index 
                        ? "w-16 bg-gold" 
                        : "w-12 bg-gold/30"
                    }`} 
                  />

                  {/* Description */}
                  <p className="font-sans text-sm font-light leading-relaxed text-caramel/80">
                    {profile.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div 
                  className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full transition-all duration-700 ${
                    hoveredIndex === index 
                      ? "bg-gold/10 scale-150" 
                      : "bg-gold/5 scale-100"
                  }`} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 lg:mt-20 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 border border-gold bg-transparent px-8 py-4 font-sans text-sm font-medium uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-white"
          >
            Agenda una consulta privada
            <svg 
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
