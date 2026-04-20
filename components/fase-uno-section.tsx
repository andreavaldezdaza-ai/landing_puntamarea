"use client"

import { useEffect, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const BENEFITS = [
  {
    number: "01",
    title: "Precio mínimo garantizado",
    body: "Los primeros compradores acceden al precio más bajo de todo el proyecto. Cada etapa sube.",
  },
  {
    number: "02",
    title: "Apreciación máxima",
    body: "Entrar en etapa temprana maximiza la plusvalía. El lote ya vale más antes de construirse.",
  },
  {
    number: "03",
    title: "Primera selección de lotes",
    body: "Acceso prioritario a los mejores frentes de playa y vistas panorámicas al Caribe.",
  },
]

// Target: 50 days, 14 hours from 2026-03-31
const TARGET = new Date("2026-05-21T14:00:00").getTime()

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function tick() {
      const now = Date.now()
      const diff = Math.max(0, TARGET - now)
      setTimeLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="flex items-end justify-center md:justify-start gap-3 sm:gap-5">
      {[
        { value: timeLeft.days,    label: "Días" },
        { value: timeLeft.hours,   label: "Horas" },
        { value: timeLeft.minutes, label: "Min" },
        { value: timeLeft.seconds, label: "Seg" },
      ].map(({ value, label }, i) => (
        <div key={label} className="flex items-end gap-1 sm:gap-2">
          {i > 0 && <span className="mb-3 font-serif text-2xl text-viveloo-taupe/60 leading-none">:</span>}
          <div className="text-center">
            <div className="font-serif text-4xl sm:text-5xl font-light text-brown tabular-nums leading-none">
              {pad(value)}
            </div>
            <div className="mt-1 font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-caramel/50">
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function FaseUnoSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section ref={ref} className="bg-sand py-20 lg:py-28" id="fase-uno">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className={`mb-16 lg:mb-20 text-center md:text-left transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="mb-4 font-sans text-xs font-medium tracking-[0.3em] text-viveloo-taupe uppercase">
            Oportunidad de Inversión
          </p>
          <div className="flex flex-col items-center gap-6 md:items-stretch lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-[26px] font-sans font-light text-viveloo-black tracking-wide leading-tight md:text-4xl lg:text-5xl text-balance max-w-xl">
              Por qué Fase 1 es{" "}
              <span className="font-serif italic font-normal text-viveloo-brown lowercase">diferente</span>
            </h2>
            {/* Countdown */}
            <div className="lg:text-right">
              <p className="mb-3 font-sans text-[10px] font-medium tracking-[0.25em] text-caramel/60 uppercase">
                Tiempo restante en precio de lanzamiento
              </p>
              <Countdown />
            </div>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid gap-px bg-viveloo-taupe/15 border border-viveloo-taupe/15 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div
              key={b.number}
              className={`bg-sand p-8 lg:p-10 text-center sm:text-left transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="mb-6 font-serif text-4xl font-light text-viveloo-taupe/30 leading-none">
                {b.number}
              </div>
              <h3 className="mb-3 font-serif text-lg font-light leading-snug text-brown">
                {b.title}
              </h3>
              <p className="font-sans text-sm font-light leading-relaxed text-caramel/70">
                {b.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className={`mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-viveloo-taupe px-8 py-4 font-sans text-xs font-medium tracking-wide text-white uppercase transition-all duration-300 hover:bg-[#7a6852] hover:shadow-lg"
          >
            Reservar mi lote en Fase 1 →
          </a>
        </div>

      </div>
    </section>
  )
}
