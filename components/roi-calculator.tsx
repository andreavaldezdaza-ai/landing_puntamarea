"use client"

import { useState, useMemo } from "react"
import { useInView } from "@/hooks/use-in-view"

// Investment tiers in COP millions
const TIERS = [
  { label: "280M",  value: 280 },
  { label: "350M",  value: 350 },
  { label: "450M",  value: 450 },
  { label: "600M",  value: 600 },
  { label: "800M+", value: 800 },
]

// Projection assumptions (from the investment document)
const APPRECIATION_RATE = 0.127   // 12.7% annual appreciation
const ROI_YEAR1         = 0.299   // 29.9% ROI Year 1
const RENTAL_YIELD      = 0.08    // ~8% annual rental yield
const YEARS             = 5

function formatCOP(millions: number): string {
  if (millions >= 1000) {
    const billions = millions / 1000
    return `$${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)}B`
  }
  return `$${millions.toFixed(0)}M`
}

export function RoiCalculator() {
  const [tierIndex, setTierIndex] = useState(1) // default 350M
  const { ref, isInView } = useInView({ threshold: 0.15 })

  const investment = TIERS[tierIndex].value

  const projections = useMemo(() => {
    const year1ROI    = investment * ROI_YEAR1
    const year1Rental = investment * RENTAL_YIELD
    const year5Value  = investment * Math.pow(1 + APPRECIATION_RATE, YEARS)
    const totalRental = investment * RENTAL_YIELD * YEARS
    const totalGain   = year5Value - investment + totalRental
    const totalROI    = (totalGain / investment) * 100

    return { year1ROI, year1Rental, year5Value, totalRental, totalGain, totalROI }
  }, [investment])

  return (
    <section
      ref={ref}
      className="relative bg-sand-deep py-24 lg:py-32"
      id="roi-calculator"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-12">

        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-4 font-sans text-xs font-medium tracking-[0.35em] text-viveloo-taupe uppercase">
            Herramienta de Proyección
          </p>
          <h2 className="mb-4 text-4xl font-sans font-light text-viveloo-black tracking-wide md:text-5xl lg:text-6xl">
            Tu inversión, <span className="font-serif italic font-normal text-viveloo-brown lowercase">proyectada.</span>
          </h2>
          <p className="mx-auto max-w-md font-sans text-sm font-light leading-relaxed text-caramel/70">
            Selecciona tu nivel de inversión y visualiza el retorno estimado a 5 años, incluyendo apreciación y renta.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* ── Tier Selector ─────────────────────────────────────── */}
          <div className="mb-12">
            <p className="mb-4 text-center font-sans text-[10px] font-medium tracking-[0.3em] text-caramel/60 uppercase">
              Inversión inicial (COP)
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {TIERS.map((tier, i) => (
                <button
                  key={tier.label}
                  onClick={() => setTierIndex(i)}
                  className={`relative px-6 py-3 font-serif text-lg transition-all duration-300 ${
                    tierIndex === i
                      ? "border border-viveloo-taupe text-viveloo-taupe"
                      : "border border-brown/15 text-brown/40 hover:border-brown/30 hover:text-brown/70"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Results Grid ──────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-px bg-viveloo-taupe/10 md:grid-cols-4">

            {/* ROI Año 1 */}
            <div className="bg-sand-deep p-5 text-center sm:p-8">
              <p className="mb-1 font-sans text-[9px] font-medium tracking-[0.35em] text-caramel/50 uppercase">
                ROI Año 1
              </p>
              <p className="font-serif text-2xl font-light text-viveloo-taupe sm:text-3xl md:text-4xl">
                +{formatCOP(projections.year1ROI)}
              </p>
              <p className="mt-1 font-sans text-[10px] text-caramel/50">
                {(ROI_YEAR1 * 100).toFixed(1)}% retorno
              </p>
            </div>

            {/* Renta anual */}
            <div className="bg-sand-deep p-5 text-center sm:p-8">
              <p className="mb-1 font-sans text-[9px] font-medium tracking-[0.35em] text-caramel/50 uppercase">
                Renta Anual Est.
              </p>
              <p className="font-serif text-2xl font-light text-viveloo-taupe sm:text-3xl md:text-4xl">
                {formatCOP(projections.year1Rental)}
              </p>
              <p className="mt-1 font-sans text-[10px] text-caramel/50">
                {(RENTAL_YIELD * 100).toFixed(0)}% yield anual
              </p>
            </div>

            {/* Valor a 5 años */}
            <div className="bg-sand-deep p-5 text-center sm:p-8">
              <p className="mb-1 font-sans text-[9px] font-medium tracking-[0.35em] text-caramel/50 uppercase">
                Valor a 5 Años
              </p>
              <p className="font-serif text-2xl font-light text-viveloo-taupe sm:text-3xl md:text-4xl">
                {formatCOP(projections.year5Value)}
              </p>
              <p className="mt-1 font-sans text-[10px] text-caramel/50">
                12.7% apreciación anual
              </p>
            </div>

            {/* Ganancia total */}
            <div className="bg-sand-deep p-5 text-center sm:p-8">
              <p className="mb-1 font-sans text-[9px] font-medium tracking-[0.35em] text-caramel/50 uppercase">
                Ganancia Total 5A
              </p>
              <p className="font-serif text-2xl font-light text-viveloo-taupe sm:text-3xl md:text-4xl">
                +{formatCOP(projections.totalGain)}
              </p>
              <p className="mt-1 font-sans text-[10px] text-caramel/50">
                {projections.totalROI.toFixed(0)}% ROI acumulado
              </p>
            </div>
          </div>

          {/* ── Disclaimer + CTA ──────────────────────────────────── */}
          <div className="mt-10 flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <p className="max-w-sm font-sans text-[10px] font-light leading-relaxed text-caramel/40">
              * Proyecciones basadas en datos históricos de apreciación en Barú y tasas de ocupación estimadas. No constituyen garantía de retorno.
            </p>
            <a
              href="#contacto"
              className="group inline-flex shrink-0 items-center gap-2 bg-viveloo-taupe px-8 py-4 font-sans text-xs font-medium tracking-wide text-white uppercase transition-all duration-300 hover:bg-[#7a6852]"
            >
              Hablar con un asesor
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
