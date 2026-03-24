"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const amenities = [
  {
    id: "beach",
    title: "Beach Club & Restaurante",
    description: "La playa como extensión de tu hogar. Disfruta de un santuario privado con 150m de frente real y una experiencia gastronómica donde los atardeceres marcan el ritmo del día.",
    image: "/renders/RENDER FINAL 8.png",
  },
  {
    id: "wellness",
    title: "Refugios de Bienestar",
    description: "Un espacio inmerso en la vegetación nativa. Encuentra tu equilibrio interior en nuestro yoga pit y zonas de meditación diseñadas para desconectar de la rutina.",
    image: "/renders/RENDER FINAL 10.jpg",
  },
  {
    id: "active",
    title: "Vida Activa & Deporte",
    description: "Entrena rodeado de diseño y naturaleza. Canchas de pádel y gimnasio híbrido (indoor/outdoor) para mantener un ritmo de vida dinámico.",
    image: "/renders/RENDER FINAL 27.jpg",
  },
  {
    id: "lounge",
    title: "Mirador & Zonas de Estancia",
    description: "Espacios contemplativos pensados para la vida social y la relajación. Zonas de BBQ y fogata para extender las veladas frente al horizonte.",
    image: "/renders/RENDER FINAL 22.jpg",
  },
]

export function AmenitiesSection() {
  const [activeAmenity, setActiveAmenity] = useState(amenities[0])
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className="relative bg-sand lg:h-screen"
      id="amenidades"
    >
      <div className="flex h-full flex-col lg:flex-row">
        {/* Left Panel: Menu */}
        <div
          className={`flex w-full flex-col justify-center bg-sand px-6 py-16 lg:w-[35%] lg:py-0 lg:px-12 xl:px-16 transition-all duration-1000 ${
            isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-12 font-serif text-4xl font-light italic text-brown md:text-5xl">
            Where every moment is ours
          </h2>

          <nav className="space-y-6">
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                onClick={() => setActiveAmenity(amenity)}
                className={`group block w-full text-left transition-all duration-300 ${
                  activeAmenity.id === amenity.id
                    ? "text-gold"
                    : "text-brown/35 hover:text-brown/70"
                }`}
              >
                <span className="font-serif text-xl md:text-2xl lg:text-3xl">
                  {amenity.title}
                </span>
              </button>
            ))}
          </nav>

          {/* Active Description */}
          <div className="mt-12 max-w-sm">
            <p className="font-sans text-sm font-light leading-relaxed text-caramel/80">
              {activeAmenity.description}
            </p>
          </div>
        </div>

        {/* Right Panel: Image — visible on mobile too */}
        <div
          className={`relative aspect-[4/3] w-full lg:aspect-auto lg:w-[65%] transition-all duration-1000 delay-200 ${
            isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
        >
          <div className="relative h-full overflow-hidden">
            <img
              key={activeAmenity.id}
              src={activeAmenity.image}
              alt={activeAmenity.title}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
