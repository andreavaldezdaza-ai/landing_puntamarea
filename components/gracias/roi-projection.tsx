"use client"

import { useMemo, useState } from "react"

const APPRECIATION_RATE = 0.127
const ROI_YEAR1 = 0.299
const RENTAL_YIELD = 0.08
const YEARS = 5

const MIN_COP = 280
const MAX_COP = 1200
const STEP_COP = 10
const DEFAULT_COP = 450

const USD_RATE = 4000

type Currency = "COP" | "USD"

function formatCOP(millions: number): string {
  if (millions >= 1000) {
    const billions = millions / 1000
    return `$${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(2)}B`
  }
  return `$${Math.round(millions)}M`
}

function formatUSD(millions: number): string {
  const usdThousands = (millions * 1_000_000) / USD_RATE / 1000
  if (usdThousands >= 1000) {
    return `$${(usdThousands / 1000).toFixed(2)}M`
  }
  return `$${Math.round(usdThousands)}K`
}

function format(millions: number, currency: Currency): string {
  return currency === "COP" ? formatCOP(millions) : formatUSD(millions)
}

export function RoiProjection() {
  const [investment, setInvestment] = useState(DEFAULT_COP)
  const [currency, setCurrency] = useState<Currency>("COP")
  const [showTable, setShowTable] = useState(false)

  const { year1ROI, year1Rental, year5Value, totalRental, totalGain, totalROI, yearlyBreakdown } = useMemo(() => {
    const y1ROI = investment * ROI_YEAR1
    const y1Rental = investment * RENTAL_YIELD
    const y5Value = investment * Math.pow(1 + APPRECIATION_RATE, YEARS)
    const tRental = investment * RENTAL_YIELD * YEARS
    const tGain = y5Value - investment + tRental
    const tROI = (tGain / investment) * 100

    const breakdown = Array.from({ length: YEARS }, (_, i) => {
      const year = i + 1
      const propertyValue = investment * Math.pow(1 + APPRECIATION_RATE, year)
      const cumulativeRental = investment * RENTAL_YIELD * year
      const totalPosition = propertyValue + cumulativeRental
      return { year, propertyValue, cumulativeRental, totalPosition }
    })

    return {
      year1ROI: y1ROI,
      year1Rental: y1Rental,
      year5Value: y5Value,
      totalRental: tRental,
      totalGain: tGain,
      totalROI: tROI,
      yearlyBreakdown: breakdown,
    }
  }, [investment])

  const chartPoints = useMemo(() => {
    const values = [investment, ...yearlyBreakdown.map((y) => y.totalPosition)]
    const maxVal = Math.max(...values)
    const minVal = investment
    return values.map((v, i) => {
      const x = Number(((i / YEARS) * 100).toFixed(3))
      const y = Number((100 - ((v - minVal) / (maxVal - minVal)) * 90).toFixed(3))
      return { x, y, value: v }
    })
  }, [investment, yearlyBreakdown])

  const linePath = chartPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const areaPath = `${linePath} L 100 100 L 0 100 Z`

  return (
    <div className="bg-sand px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-4 font-sans text-[26px] font-light leading-[1.1] text-viveloo-black md:text-4xl lg:text-5xl">
            Así luce tu inversión{" "}
            <span className="font-serif italic font-normal text-viveloo-brown lowercase">
              proyectada a cinco años.
            </span>
          </h2>
          <p className="mx-auto max-w-lg font-sans text-sm font-light leading-relaxed text-caramel/75 md:text-base">
            Ajusta el monto inicial y visualiza la evolución del activo. Datos basados en el histórico de apreciación de Barú y tasas de ocupación validadas por Viveloo.
          </p>
        </div>

        {/* Currency toggle + Investment slider */}
        <div className="mb-10 md:mb-14">
          <div className="mx-auto max-w-2xl">

            {/* Currency toggle */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex border border-viveloo-taupe/25">
                {(["COP", "USD"] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-5 py-2 font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all ${
                      currency === c
                        ? "bg-viveloo-taupe text-white"
                        : "text-viveloo-taupe/60 hover:text-viveloo-taupe"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="px-2">
              <div className="mb-4 flex items-baseline justify-between">
                <p className="font-sans text-[10px] font-semibold tracking-[0.25em] text-caramel/60 uppercase">
                  Inversión Inicial
                </p>
                <p className="font-serif text-3xl font-light text-viveloo-brown md:text-4xl">
                  {format(investment, currency)}
                </p>
              </div>

              <input
                type="range"
                min={MIN_COP}
                max={MAX_COP}
                step={STEP_COP}
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                style={{
                  WebkitAppearance: "none",
                  appearance: "none",
                  height: "2px",
                  background: "rgba(145, 124, 98, 0.25)",
                  outline: "none",
                }}
                className="roi-slider w-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-viveloo-taupe [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-sand [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-[22px] [&::-moz-range-thumb]:w-[22px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-viveloo-taupe [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-sand [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
                aria-label="Monto de inversión"
              />

              <div className="mt-3 flex justify-between font-sans text-[10px] font-light text-caramel/50">
                <span>{format(MIN_COP, currency)}</span>
                <span>{format(MAX_COP, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight headline */}
        <div className="mb-10 text-center md:mb-14">
          <p className="mx-auto max-w-3xl font-sans text-lg font-light leading-snug text-viveloo-black md:text-2xl lg:text-3xl">
            Tu inversión de{" "}
            <span className="font-serif italic font-normal text-viveloo-brown">
              {format(investment, currency)}
            </span>{" "}
            podría valer{" "}
            <span className="font-serif italic font-normal text-viveloo-brown">
              {format(year5Value, currency)}
            </span>{" "}
            en cinco años.
          </p>
        </div>

        {/* Chart */}
        <div className="mb-10 md:mb-14">
          <div className="relative mx-auto max-w-4xl bg-white/60 p-6 md:p-10">
            <p className="mb-6 font-sans text-[10px] font-semibold tracking-[0.25em] text-caramel/60 uppercase">
              Evolución del Activo · Apreciación + Rentas Acumuladas
            </p>

            <div className="relative h-48 w-full md:h-64">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="#917c62"
                    strokeOpacity="0.08"
                    strokeWidth="0.2"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {/* Area fill */}
                <path
                  d={areaPath}
                  fill="#917c62"
                  fillOpacity="0.08"
                />

                {/* Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#917c62"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points */}
                {chartPoints.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="2.5"
                    fill="#917c62"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            </div>

            <div className="mt-4 flex justify-between font-sans text-[10px] font-light text-caramel/60">
              <span>Hoy</span>
              <span>Año 1</span>
              <span>Año 2</span>
              <span>Año 3</span>
              <span>Año 4</span>
              <span>Año 5</span>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div>
          <div className="grid grid-cols-2 gap-px bg-viveloo-taupe/15 md:grid-cols-4">
            <KPI
              label="ROI Año 1"
              value={`+${format(year1ROI, currency)}`}
              caption={`${(ROI_YEAR1 * 100).toFixed(1)}% retorno`}
            />
            <KPI
              label="Renta Anual Estimada"
              value={format(year1Rental, currency)}
              caption={`${(RENTAL_YIELD * 100).toFixed(0)}% yield anual`}
            />
            <KPI
              label="Valor a 5 Años"
              value={format(year5Value, currency)}
              caption={`${(APPRECIATION_RATE * 100).toFixed(1)}% apreciación anual`}
            />
            <KPI
              label="Ganancia Total 5A"
              value={`+${format(totalGain, currency)}`}
              caption={`${totalROI.toFixed(0)}% ROI acumulado`}
            />
          </div>
        </div>

        {/* Toggle yearly breakdown */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowTable((v) => !v)}
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-viveloo-taupe uppercase transition-colors hover:text-viveloo-brown"
          >
            {showTable ? "Ocultar detalle año a año" : "Ver detalle año a año"}
            <span className={`transition-transform ${showTable ? "rotate-180" : ""}`}>↓</span>
          </button>
        </div>

        {showTable && (
          <div className="mt-6 overflow-x-auto border border-viveloo-taupe/20">
            <table className="w-full font-sans text-sm">
              <thead className="bg-viveloo-taupe/10">
                <tr>
                  <Th>Año</Th>
                  <Th>Valor Propiedad</Th>
                  <Th>Rentas Acumuladas</Th>
                  <Th>Posición Total</Th>
                </tr>
              </thead>
              <tbody>
                {yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="border-t border-viveloo-taupe/10">
                    <Td>
                      <span className="font-serif italic text-viveloo-brown">Año {row.year}</span>
                    </Td>
                    <Td>{format(row.propertyValue, currency)}</Td>
                    <Td>{format(row.cumulativeRental, currency)}</Td>
                    <Td>
                      <span className="font-medium text-viveloo-black">
                        {format(row.totalPosition, currency)}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-10 mx-auto max-w-2xl text-center font-sans text-[10px] font-light leading-relaxed text-caramel/50 md:text-[11px]">
          Proyecciones basadas en datos históricos de apreciación en Barú y Cartagena, y tasas de ocupación estimadas por Viveloo. Tasa de referencia USD/COP: 1 USD = 4.000 COP. Las cifras son estimaciones y no constituyen oferta ni garantía de retorno. Tu asesor PUNTAMAREA te entregará el modelo financiero completo.
        </p>

      </div>
    </div>
  )
}

function KPI({ label, value, caption }: { label: string; value: string; caption: string }) {
  return (
    <div className="bg-sand p-5 text-center sm:p-8">
      <p className="mb-2 font-sans text-[9px] font-semibold tracking-[0.3em] text-caramel/60 uppercase md:text-[10px]">
        {label}
      </p>
      <p className="font-serif text-2xl font-light text-viveloo-taupe sm:text-3xl md:text-4xl">
        {value}
      </p>
      <p className="mt-2 font-sans text-[10px] font-light text-caramel/55">
        {caption}
      </p>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-sans text-[10px] font-semibold tracking-[0.2em] text-viveloo-taupe uppercase">
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-left font-sans text-sm font-light text-caramel">
      {children}
    </td>
  )
}
