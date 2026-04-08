"use client"

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

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 lg:py-24 bg-sand"
      id="inversores"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header — left aligned editorial */}
        <div
          className={`mb-12 max-w-2xl transition-all duration-1000 lg:mb-16 ${
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

        {/* Editorial 4-column grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {investorProfiles.map((profile, index) => (
            <div
              key={profile.title}
              className={`group relative transition-all duration-700 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${(index + 1) * 120}ms` }}
            >
              {/* Top accent line */}
              <div className="mb-8 h-px w-12 bg-viveloo-brown/40 transition-all duration-500 group-hover:w-20 group-hover:bg-viveloo-brown" />

              {/* Overline label */}
              <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-viveloo-black">
                {profile.title}
              </p>

              {/* Italic serif headline — single line */}
              <h3 className="mb-6 font-serif text-2xl font-light italic text-viveloo-black leading-tight whitespace-nowrap lg:text-[28px]">
                {profile.highlight}
                {profile.highlightLabel && (
                  <> <span className="lowercase">{profile.highlightLabel}</span></>
                )}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm font-light leading-relaxed text-viveloo-brown/70">
                {profile.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-12 transition-all duration-1000 lg:mt-16 ${
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
        </div>
      </div>
    </section>
  )
}
