"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const residences = [
  {
    id: "tipo-a",
    tab: "TIPO A",
    name: "Tipo A — Residencia de Playa",
    description: "Residencia de 3 habitaciones pensada para la vida frente al mar. Terraza con piscina privada y zona BBQ integrada al paisaje tropical, con acceso directo a las áreas comunes del complejo.",
    area: "107.3 m²",
    bedrooms: "3 Habitaciones",
    amenities: "Piscina + Terraza BBQ",
    image: "/renders/RENDER FINAL 7.jpg",
  },
  {
    id: "tipo-b",
    tab: "TIPO B",
    name: "Tipo B — Suite Panorámica",
    description: "Suite de 3 habitaciones con deck solarium de doble exposición y jacuzzi exterior. Diseñada para capturar el horizonte del Caribe desde cada espacio, con acabados de primera selección.",
    area: "149.0 m²",
    bedrooms: "3 Habitaciones",
    amenities: "Deck Solarium + Jacuzzi",
    image: "/renders/RENDER FINAL 8.png",
  },
  {
    id: "tipo-c",
    tab: "TIPO C",
    name: "Tipo C — Suite Contemporánea",
    description: "Suite de 3 habitaciones con diseño contemporáneo que integra una isla central como corazón del espacio social. Cocina abierta al living con vistas al mar, materiales nobles y luz natural abundante.",
    area: "157.7 m²",
    bedrooms: "3 Habitaciones",
    amenities: "Diseño con Isla Central",
    image: "/renders/RENDER FINAL 9.jpg",
  },
  {
    id: "tipo-d",
    tab: "TIPO D",
    name: "Tipo D — Gran Residencia",
    description: "La residencia más exclusiva de la colección. 3 habitaciones con máxima sofisticación: doble sala comedor, terraza expandida y acabados de alta gama. Para quienes exigen lo mejor en cada detalle.",
    area: "225.1 m²",
    bedrooms: "3 Habitaciones",
    amenities: "Doble Sala-Comedor",
    image: "/renders/RENDER FINAL 11.jpg",
  },
]

function AreaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  )
}

function BedroomIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <path d="M2 9V20h20V9" />
      <path d="M2 14h20" />
      <path d="M4 9V7a2 2 0 012-2h12a2 2 0 012 2v2" />
      <rect x="6" y="9" width="4" height="3" />
      <rect x="14" y="9" width="4" height="3" />
    </svg>
  )
}

function AmenitiesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <path d="M2 12h6l3-9 3 18 3-9h5" />
    </svg>
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
          <p className="mb-4 font-sans text-xs font-medium tracking-[0.3em] text-gold uppercase">
            Colección Privada
          </p>
          <h2 className="mb-8 font-serif text-5xl font-light italic text-brown md:text-6xl lg:text-7xl">
            Residencias
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
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-gold" />
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
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">
                  <AreaIcon />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] text-caramel/60 uppercase">
                    Superficie Total
                  </p>
                  <p className="font-serif text-xl font-light text-brown">
                    {active.area}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">
                  <BedroomIcon />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] text-caramel/60 uppercase">
                    Habitaciones
                  </p>
                  <p className="font-serif text-xl font-light text-brown">
                    {active.bedrooms}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">
                  <AmenitiesIcon />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] text-caramel/60 uppercase">
                    Amenidades Privadas
                  </p>
                  <p className="font-serif text-xl font-light text-brown">
                    {active.amenities}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <a
              href="/brochure-puntamarea.pdf"
              download="BROCHURE Puntamarea.pdf"
              className="inline-flex w-fit items-center justify-center gap-2 border border-gold bg-transparent px-10 py-4 font-sans text-xs font-medium tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-white uppercase"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v13M7 11l5 5 5-5M4 20h16" />
              </svg>
              Descargar Brochure
            </a>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative overflow-hidden">
              <img
                key={active.id}
                src={active.image}
                alt={active.name}
                className="aspect-[4/5] h-full w-full object-cover transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
