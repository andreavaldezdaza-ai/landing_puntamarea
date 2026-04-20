"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const investorProfiles = [
  {
    title: "Maximizadores de Capital",
    highlight: "29.9%",
    highlightLabel: "ROI Proyectado",
    highlightSub: "Año 1",
    description:
      "Adquiere tu lote hoy, construye y participa en un modelo de renta corta gestionado, estructurado para proyectar hasta un 29.9% de ROI en el primer año de operación.",
  },
  {
    title: "Inversores Internacionales",
    highlight: "USA · EU",
    highlightLabel: "",
    highlightSub: "Internacional",
    description:
      "Acompañamiento con respaldo en cada etapa del proceso: estructuración legal, apertura de cuenta y operación.",
  },
  {
    title: "Segunda Vivienda",
    highlight: "Santuario",
    highlightLabel: "Privado",
    highlightSub: "Premium",
    description:
      "El santuario privado ideal para familias, manteniendo la liquidez de un activo premium.",
  },
  {
    title: "Legado Familiar",
    highlight: "10%",
    highlightLabel: "Apreciación",
    highlightSub: "Anual",
    description:
      "Activos tangibles de ultra-lujo con una proyección de apreciación anual del 10%.",
  },
]

export function InvestorSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 lg:py-24 bg-sand"
      id="inversores"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header — left aligned editorial */}
        <div
          className={`mb-12 max-w-2xl mx-auto text-center md:mx-0 md:text-left transition-all duration-1000 lg:mb-16 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-4xl font-sans font-light text-viveloo-black tracking-tight md:text-5xl lg:text-6xl text-balance">
            Una inversión{" "}
            <span className="font-serif italic font-normal text-viveloo-brown lowercase">
              inteligente.
            </span>
          </h2>
          <p className="font-sans text-base font-light leading-relaxed text-viveloo-brown/80 md:text-xl">
            Diseñada para perfiles que entienden que el lujo es, ante todo, un activo estratégico.
          </p>
        </div>

        {/* Editorial grid — mobile: cards 2 columnas con diseño denso; desktop: layout editorial original */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10">
          {investorProfiles.map((profile, index) => {
            const isActive = activeCard === index
            return (
              <button
                type="button"
                key={profile.title}
                onClick={() => setActiveCard(isActive ? null : index)}
                className={`group relative overflow-hidden rounded-[4px] border p-5 text-center md:cursor-default md:border-0 md:bg-transparent md:rounded-none md:p-0 md:text-left transition-all duration-700 active:scale-[0.98] ${
                  isActive
                    ? "border-viveloo-brown/40 bg-viveloo-taupe/[0.08]"
                    : "border-viveloo-brown/15 bg-viveloo-taupe/[0.04]"
                } ${
                  isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${(index + 1) * 120}ms` }}
              >
                {/* Número — solo móvil */}
                <span className="md:hidden absolute top-2 right-3 font-serif text-xs font-light text-viveloo-brown/30 tabular-nums">
                  0{index + 1}
                </span>

                {/* Top accent line */}
                <div className={`mb-4 md:mb-8 h-px mx-auto md:mx-0 transition-all duration-500 md:w-12 md:bg-viveloo-brown/40 md:group-hover:w-20 md:group-hover:bg-viveloo-brown ${
                  isActive ? "w-14 bg-viveloo-brown" : "w-8 bg-viveloo-brown/40"
                }`} />

                {/* Highlight grande — solo móvil */}
                <h3 className="md:hidden mb-3 font-serif text-[28px] font-light italic text-viveloo-brown leading-[0.95]">
                  {profile.highlight}
                </h3>

                {/* Overline label */}
                <p className="mb-1 md:mb-5 font-sans text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.18em] md:tracking-[0.2em] text-viveloo-black leading-tight">
                  {profile.title}
                </p>

                {/* Italic serif headline — solo desktop */}
                <h3 className="hidden md:block mb-6 font-serif text-2xl font-light italic text-viveloo-black leading-tight whitespace-nowrap lg:text-[28px]">
                  {profile.highlight}
                  {profile.highlightLabel && (
                    <> <span className="lowercase">{profile.highlightLabel}</span></>
                  )}
                </h3>

                {/* Label pequeño — móvil */}
                {profile.highlightLabel && (
                  <p className="md:hidden font-sans text-[10px] font-light tracking-[0.1em] text-viveloo-brown/60 lowercase">
                    {profile.highlightLabel}
                  </p>
                )}

                {/* Description móvil — expande al tocar */}
                <div className={`md:hidden grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
                  isActive ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                }`}>
                  <p className="overflow-hidden font-sans text-[12px] font-light leading-relaxed text-viveloo-brown/75">
                    {profile.description}
                  </p>
                </div>

                {/* Hint tap — solo móvil */}
                <p className={`md:hidden mt-3 font-sans text-[9px] uppercase tracking-[0.18em] transition-opacity duration-300 ${
                  isActive ? "text-viveloo-brown/40" : "text-viveloo-brown/50"
                }`}>
                  {isActive ? "tocar para cerrar" : "tocar para ver más"}
                </p>

                {/* Description — solo desktop */}
                <p className="hidden md:block font-sans text-sm font-light leading-relaxed text-viveloo-brown/70">
                  {profile.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-12 flex flex-col items-center md:items-start gap-3 transition-all duration-1000 lg:mt-16 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 bg-viveloo-taupe px-8 py-4 font-sans text-sm font-medium uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#7a6852]"
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
          <p className="font-sans text-[11px] font-light tracking-wide text-viveloo-brown/70 text-center md:text-left max-w-sm">
            Recibe tu <span className="text-viveloo-brown font-medium">proyección ROI personalizada</span> y la <span className="text-viveloo-brown font-medium">guía visa inversionista USA · EU</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
