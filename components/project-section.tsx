"use client"

import { useInView } from "@/hooks/use-in-view"

export function ProjectSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-sand-deep py-24 lg:py-0"
      id="proyecto"
    >
      <div className="mx-auto max-w-7xl lg:max-w-none">
        <div className="grid lg:grid-cols-2">
          {/* Left: Content */}
          <div
            className={`order-last flex flex-col justify-center px-6 py-16 lg:order-first lg:px-16 lg:py-32 xl:px-24 transition-all duration-1000 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <h2 className="mb-8 font-serif text-4xl font-light leading-tight text-brown md:text-5xl lg:text-6xl text-balance">
              La evolución de tu patrimonio.
            </h2>

            <p className="mb-12 max-w-lg font-sans text-base font-light leading-relaxed text-caramel/80">
              Puntamarea no es un proyecto inmobiliario tradicional. Es un desarrollo costero planificado con visión patrimonial. Diseñado para quienes buscan un equilibrio perfecto entre el disfrute personal, la sofisticación y una inversión inteligente de alta liquidez.
            </p>

            {/* Partner Logos */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:gap-x-12">
              <span className="font-serif text-lg font-light tracking-wide text-brown/60">
                Viveloo
              </span>
              <div className="hidden h-6 w-px bg-border sm:block" />
              <span className="font-serif text-lg font-light tracking-wide text-brown/60">
                Inspira Constructora
              </span>
              <div className="hidden h-6 w-px bg-border sm:block" />
              <span className="font-serif text-lg font-light tracking-wide text-brown/60">
                Ahead
              </span>
            </div>
            <p className="mt-8 font-sans text-xs font-light text-caramel/80 leading-relaxed max-w-sm">
              <span className="font-medium text-brown">Gestión & Operación:</span> Acceda de forma voluntaria a nuestro operador aliado. Una solución profesional para una inversión sin esfuerzo y retornos sostenibles.
            </p>
          </div>

          {/* Right: Image */}
          <div
            className={`relative order-first min-h-[360px] lg:order-last lg:min-h-screen transition-all duration-1000 delay-200 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <img
              src="/renders/RENDER FINAL 2.png"
              alt="Architectural render of PUNTAMAREA"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
