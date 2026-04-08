"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"

const residences = [
  {
    id: "casa-a",
    tab: "CASA A",
    name: "Casa A — Residencia Esencial",
    description:
      "Combina texturas de madera con vegetación vertical, creando un ambiente fresco y lleno de luz. Diseño de concepto abierto, planeado estratégicamente para maximizar cada metro cuadrado.",
    area: "130.70 m²",
    areaDetail: "Planta baja 45 m² + Segundo nivel 62.45 m² + Tercer nivel 23.25 m²",
    levels: "2 Pisos + Altillo",
    spaces:
      "Piscina privada, sala-comedor de concepto abierto, dormitorio principal con estudio y balcón, altillo con jacuzzi y terraza.",
    images: [
      "/casas/casa-a/1.jpg",
      "/casas/casa-a/2.jpg",
      "/casas/casa-a/3.jpg",
      "/casas/casa-a/4.jpg",
      "/casas/casa-a/5.jpg",
    ],
  },
  {
    id: "casa-b",
    tab: "CASA B",
    name: "Casa B — Residencia Horizonte",
    description:
      "Arquitectura de líneas horizontales que prioriza la luz natural y la ventilación, creando un refugio privado diseñado para disfrutar del aire libre con total comodidad.",
    area: "170 m²",
    areaDetail: "Planta baja 55 m² + Segundo nivel 95 m² + Tercer nivel 20 m²",
    levels: "2 Pisos + Altillo",
    spaces:
      "Piscina con zona de fogata exterior, BBQ con baño de terraza, dos dormitorios con walking closet y balcón, altillo con sala exterior, zona BBQ y jacuzzi.",
    images: [
      "/casas/casa-b/1.jpg",
      "/casas/casa-b/2.jpg",
      "/casas/casa-b/3.jpg",
      "/casas/casa-b/4.jpg",
      "/casas/casa-b/5.jpg",
      "/casas/casa-b/6.jpg",
    ],
  },
  {
    id: "casa-c",
    tab: "CASA C",
    name: "Casa C — Residencia Santuario",
    description:
      "Destaca por su diseño en piedra y madera con balcones ajardinados. Una arquitectura sólida que hacia el interior se transforma en espacios abiertos integrados al paisaje, el refugio perfecto para desconectar.",
    area: "200 m²",
    areaDetail: "Planta baja 60 m² + Segundo nivel 95 m² + Tercer nivel 45 m²",
    levels: "2 Pisos + Altillo",
    spaces:
      "Piscina, fogata y BBQ exterior, dos suites con walking closet, baño privado y balcón ajardinado, altillo suite máster con jacuzzi, baño spa y terraza panorámica.",
    images: [
      "/casas/casa-c/1.png",
      "/casas/casa-c/2.png",
      "/casas/casa-c/3.jpg",
      "/casas/casa-c/4.png",
      "/casas/casa-c/5.jpg",
      "/casas/casa-c/6.png",
      "/casas/casa-c/7.jpg",
    ],
  },
]

function AreaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-viveloo-taupe">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-viveloo-taupe">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  )
}

function SpacesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-viveloo-taupe">
      <path d="M2 12h6l3-9 3 18 3-9h5" />
    </svg>
  )
}

function Carousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const [interactionTick, setInteractionTick] = useState(0)
  const total = images.length

  // Auto-advance — restarts whenever the user interacts (interactionTick changes)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 5000)
    return () => clearInterval(id)
  }, [total, interactionTick])

  const prev = () => {
    setIndex((i) => (i - 1 + total) % total)
    setInteractionTick((t) => t + 1)
  }
  const next = () => {
    setIndex((i) => (i + 1) % total)
    setInteractionTick((t) => t + 1)
  }
  const goTo = (i: number) => {
    setIndex(i)
    setInteractionTick((t) => t + 1)
  }

  return (
    <div className="relative overflow-hidden group">
      <div className="relative aspect-[4/5] w-full">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} — ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Imagen anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/80 text-viveloo-black backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Siguiente imagen"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/80 text-viveloo-black backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            className={`h-1 transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "w-4 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function ResidencesSection() {
  const [activeTab, setActiveTab] = useState(0)
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const active = residences[activeTab]

  return (
    <section
      ref={ref}
      className="relative bg-sand py-24 lg:py-32"
      id="residencias"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-8 text-5xl font-sans font-light text-viveloo-black tracking-wide md:text-6xl lg:text-7xl">
            <span className="font-serif italic font-normal text-viveloo-brown capitalize">Residencias</span>
          </h2>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {residences.map((residence, index) => (
              <button
                key={residence.id}
                onClick={() => setActiveTab(index)}
                className={`relative pb-2 font-sans text-xs font-medium tracking-[0.2em] transition-colors duration-300 ${
                  activeTab === index
                    ? "text-brown"
                    : "text-caramel/80 hover:text-brown"
                }`}
              >
                {residence.tab}
                {activeTab === index && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-viveloo-taupe" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className={`mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Left Column - Info */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 font-serif text-3xl font-light italic text-brown md:text-4xl">
              {active.name}
            </h3>
            <p className="mb-10 max-w-md font-sans text-base font-light leading-relaxed text-caramel/80">
              {active.description}
            </p>

            {/* Specs */}
            <div className="mb-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                  <AreaIcon />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] text-caramel/60 uppercase">
                    Área Construida Total
                  </p>
                  <p className="font-serif text-xl font-light text-brown">
                    {active.area}
                  </p>
                  <p className="mt-1 font-sans text-xs font-light text-caramel/70">
                    {active.areaDetail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                  <LayersIcon />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] text-caramel/60 uppercase">
                    Niveles
                  </p>
                  <p className="font-serif text-xl font-light text-brown">
                    {active.levels}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                  <SpacesIcon />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] text-caramel/60 uppercase">
                    Espacios Destacados
                  </p>
                  <p className="mt-1 max-w-md font-sans text-sm font-light leading-relaxed text-brown/90">
                    {active.spaces}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <a
              href="/brochure-puntamarea.pdf"
              download="BROCHURE Puntamarea.pdf"
              className="inline-flex w-fit items-center justify-center gap-2 bg-viveloo-taupe px-10 py-4 font-sans text-xs font-medium tracking-wide text-white uppercase transition-all duration-300 hover:bg-[#7a6852]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v13M7 11l5 5 5-5M4 20h16" />
              </svg>
              Descargar Brochure
            </a>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="relative">
            <Carousel key={active.id} images={active.images} alt={active.name} />
          </div>
        </div>
      </div>
    </section>
  )
}
