"use client"

import { motion } from "framer-motion"

// UPDATED DATA STRUCTURE: Split titles for dual-typography
const amenities = [
  {
    id: "beach",
    titlePrefix: "Beach Club &",
    titleAccent: "Restaurante",
    description: "La playa como extensión de tu hogar. Disfruta de un santuario privado con 150m de frente real y una experiencia gastronómica donde los atardeceres marcan el ritmo del día.",
    image: "/renders/RENDER FINAL 9.jpg",
  },
  {
    id: "wellness",
    titlePrefix: "Refugios de",
    titleAccent: "Bienestar",
    description: "Un espacio inmerso en la vegetación nativa. Encuentra tu equilibrio interior en nuestro yoga pit y zonas de meditación diseñadas para desconectar de la rutina.",
    image: "/renders/RENDER FINAL 10.jpg",
  },
  {
    id: "active",
    titlePrefix: "Vida Activa &",
    titleAccent: "Deporte",
    description: "Entrena rodeado de diseño y naturaleza. Canchas de pádel y gimnasio híbrido (indoor/outdoor) para mantener un ritmo de vida dinámico.",
    image: "/renders/RENDER FINAL 27.jpg",
  },
  {
    id: "lounge",
    titlePrefix: "Mirador & Zonas de",
    titleAccent: "Estancia",
    description: "Espacios contemplativos pensados para la vida social y la relajación. Zonas de BBQ y fogata para extender las veladas frente al horizonte.",
    image: "/renders/RENDER FINAL 18.jpg",
  },
]

export function AmenitiesSection() {
  return (
    <section id="amenidades" className="relative w-full bg-sand">

      {/* Global Section Header */}
      <div className="w-full py-16 md:py-24 bg-sand relative z-10">
        <h2 className="text-[34px] md:text-5xl font-sans font-light text-viveloo-black text-center leading-tight">
          Where every<br className="md:hidden" />{" "}
          <span className="font-serif italic text-viveloo-brown lowercase">moment is ours</span>
        </h2>
      </div>

      {/* Stacking Cards Container */}
      <div className="relative w-full">
        {amenities.map((amenity, index) => (
          <div
            key={amenity.id}
            className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center overflow-hidden bg-sand"
            style={{ zIndex: index + 10 }}
          >

            {/* Image Container (60%) */}
            <div className="w-full h-[50vh] md:h-full md:w-[60%] relative">
              <motion.img
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={amenity.image}
                alt={`${amenity.titlePrefix} ${amenity.titleAccent}`}
                className="w-full h-full object-cover rounded-none"
              />
            </div>

            {/* Text Container (40%) */}
            <div className="w-full h-[50vh] md:h-full md:w-[40%] bg-sand flex flex-col justify-start pt-8 md:justify-end md:pt-0 pb-8 md:pb-24 px-10 md:px-16 lg:px-24 relative overflow-hidden">

              {/* Decorative mark — Puntamarea rosette (alternating L/R) */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-[8%] -right-[10%] w-[55%] aspect-square opacity-[0.035]"
                style={{
                  maskImage: "url(/puntamarea-mark.png)",
                  WebkitMaskImage: "url(/puntamarea-mark.png)",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  backgroundColor: "#66523c",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 max-w-sm mx-auto md:mx-0"
              >
                {/* Refined Dual-Typography Title */}
                <h3 className="text-[26px] md:text-4xl font-sans font-light text-viveloo-black mb-4 leading-tight">
                  {amenity.titlePrefix} <br className="hidden md:block" />
                  <span className="font-serif italic text-viveloo-brown capitalize">
                    {amenity.titleAccent}
                  </span>
                </h3>

                {/* Scaled-down Description */}
                <p className="text-sm md:text-base font-sans font-light text-viveloo-black/80 leading-relaxed italic">
                  {amenity.description}
                </p>
              </motion.div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
