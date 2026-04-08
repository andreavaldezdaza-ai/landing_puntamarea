"use client"

import { useInView } from "@/hooks/use-in-view"

const locations = [
  {
    key: "cartagena",
    heading: "Cartagena",
    subtitle: "El Hub del Lujo",
    description:
      "Asegura tu patrimonio en un destino que combina apreciación constante y una demanda turística excepcional. Puntamarea ocupa uno de los pocos frentes de mar disponibles con acceso directo.",
    image: "/cartagena.webp",
    stats: [
      { label: "Apreciación Récord", value: "12.7%", detail: "Incremento anual promedio en propiedades frente al mar" },
      { label: "Demanda Premium", value: "7.7M", detail: "Pasajeros en 2025 consolidan a la ciudad como destino líder" },
      { label: "Hub Turístico", value: "#1", detail: "Mayor proyección para eventos de alto perfil en Colombia" },
    ],
  },
  {
    key: "baru",
    heading: "Isla Barú",
    subtitle: "La Isla en Transformación",
    description:
      "La inversión privada y pública más grande del Caribe colombiano. Un destino con infraestructura de clase mundial y conectividad privilegiada desde Cartagena.",
    image: "/baru.jpg",
    stats: [
      { label: "Inversión Masiva", value: "+$200M", detail: "En infraestructura respaldado por Master Plan de Grupo Argos" },
      { label: "Conectividad", value: "45 min", detail: "Por vía terrestre desde Cartagena. 15 min acceso marítimo exclusivo" },
      { label: "Entorno Premium", value: "×6", detail: "Cadenas hoteleras de ultra-lujo en el entorno inmediato" },
    ],
  },
]

export function LocationSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="relative bg-sand py-24 lg:py-32"
      id="ubicacion"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Global Section Header */}
        <div
          className={`mb-20 lg:mb-24 transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-sans font-light text-viveloo-black text-center">
            El valor de lo{" "}
            <span className="font-serif italic font-normal text-viveloo-brown lowercase">
              irrepetible.
            </span>
          </h2>
        </div>

        {/* Alternating Location Blocks */}
        <div className="flex flex-col gap-24">
          {locations.map((loc, i) => (
            <div
              key={loc.key}
              className={`flex flex-col gap-12 lg:gap-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } transition-all duration-1000 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Image — card grande con radius sutil */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] md:w-1/2">
                <img
                  src={loc.image}
                  alt={loc.heading}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between md:w-1/2 md:px-8 lg:px-12">
                <div>
                  <h2 className="text-5xl md:text-6xl font-serif italic text-viveloo-brown mb-4 capitalize">
                    {loc.heading}
                  </h2>
                  {/* Chip / pill — micro-UI con rounded-full */}
                  <span className="inline-flex items-center rounded-full border border-viveloo-taupe/30 bg-viveloo-taupe/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-viveloo-brown mb-8">
                    {loc.subtitle}
                  </span>
                </div>

                {/* Stats */}
                <div className="mt-10 space-y-0">
                  {loc.stats.map((stat, si) => (
                    <div key={si} className="border-t border-viveloo-taupe/20 py-5">
                      <h4 className="text-xl md:text-2xl font-sans text-viveloo-brown mb-1">
                        {stat.label}
                      </h4>
                      <p className="text-sm md:text-base font-sans font-light text-viveloo-black/80 leading-relaxed">
                        {stat.value} — {stat.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-20 text-center transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 bg-viveloo-taupe px-8 py-4 font-sans text-xs font-medium tracking-wide text-white uppercase transition-all duration-300 hover:bg-[#7a6852]"
          >
            Solicita tu análisis de inversión
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
