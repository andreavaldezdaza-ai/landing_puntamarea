"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const locationData = {
  cartagena: {
    title: "Cartagena — El Hub del Lujo",
    description:
      "Asegura tu patrimonio en un destino que combina apreciación constante y una demanda turística excepcional. Puntamarea ocupa uno de los pocos frentes de mar disponibles con acceso directo.",
    stats: [
      { label: "Apreciación Récord", value: "12.7%", detail: "Incremento anual promedio en propiedades frente al mar" },
      { label: "Demanda Premium", value: "7.7M", detail: "Pasajeros en 2025 consolidan a la ciudad como destino líder" },
      { label: "Hub Turístico", value: "#1", detail: "Mayor proyección para eventos de alto perfil en Colombia" },
    ],
  },
  baru: {
    title: "Barú — La Isla en Transformación",
    description:
      "La inversión privada y pública más grande del Caribe colombiano. Un destino con infraestructura de clase mundial y conectividad privilegiada desde Cartagena.",
    stats: [
      { label: "Inversión Masiva", value: "+$200M", detail: "En infraestructura respaldado por Master Plan de Grupo Argos" },
      { label: "Conectividad", value: "45 min", detail: "Por vía terrestre desde Cartagena. 15 min acceso marítimo exclusivo" },
      { label: "Entorno Premium", value: "×6", detail: "Cadenas hoteleras de ultra-lujo en el entorno inmediato" },
    ],
  },
}

export function LocationSection() {
  const [activeTab, setActiveTab] = useState<"cartagena" | "baru">("cartagena")
  const { ref, isInView } = useInView({ threshold: 0.2 })

  const data = locationData[activeTab]

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-sand py-24 lg:py-32"
      id="ubicacion"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">

          {/* Left: Image — altura fija de referencia */}
          <div
            className={`relative aspect-[3/4] overflow-hidden lg:aspect-auto lg:h-[700px] transition-all duration-1000 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <img
              src={activeTab === "cartagena" ? "/cartagena.webp" : "/baru.jpg"}
              alt={data.title}
              className="h-full w-full object-cover transition-all duration-700"
            />
          </div>

          {/* Right: Content — mismo alto que la imagen, CTA suelto abajo */}
          <div
            className={`flex flex-col transition-all duration-1000 delay-200 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            {/* Bloque acotado — misma altura que la imagen */}
            <div className="flex flex-col justify-between lg:h-[700px]">

              {/* Grupo superior: título + tabs + descripción */}
              <div>
                <h2 className="mb-10 font-serif text-4xl font-light leading-tight text-brown md:text-5xl lg:text-6xl text-balance">
                  El valor de lo irrepetible.
                </h2>

                {/* Tab Toggle */}
                <div className="mb-8 flex gap-8">
                  {(["cartagena", "baru"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative font-serif text-xl transition-colors duration-300 ${
                        activeTab === tab ? "text-gold" : "text-brown/40 hover:text-brown"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <span className="absolute -bottom-2 left-0 h-px w-full bg-gold" />
                      )}
                    </button>
                  ))}
                </div>

                <p className="mt-10 font-sans text-base font-light leading-relaxed text-caramel/80">
                  {data.description}
                </p>
              </div>

              {/* Grupo inferior: stats — alineados con borde inferior de imagen */}
              <div className="space-y-0">
                {data.stats.map((stat, index) => (
                  <div key={index} className="border-t border-gold/20 py-5">
                    <p className="mb-1 font-sans text-[10px] font-light uppercase tracking-[0.35em] text-caramel">
                      {stat.label}
                    </p>
                    <p className="font-serif text-3xl font-light text-gold">{stat.value}</p>
                    <p className="mt-0.5 font-sans text-xs font-light text-brown/60 leading-relaxed">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA — único elemento por debajo del borde inferior de la imagen */}
            <div className="mt-8">
              <a
                href="#inversores"
                className="group inline-flex w-fit items-center gap-2 border border-gold px-8 py-4 font-sans text-xs font-medium tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-white uppercase"
              >
                Ver proyección de apreciación y ROI
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
