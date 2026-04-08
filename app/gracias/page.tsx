"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

const STEPS = [
  { n: "1", title: "Confirmación inmediata", body: "Tu solicitud fue recibida y registrada en nuestro sistema." },
  { n: "2", title: "Contacto en 2 horas",    body: "Un asesor exclusivo te contactará por WhatsApp o llamada." },
  { n: "3", title: "Cita privada",           body: "Coordinamos una presentación personalizada del proyecto." },
]

function GraciasContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const utmSource   = searchParams.get("utm_source")   || "direct"
    const utmMedium   = searchParams.get("utm_medium")   || ""
    const utmCampaign = searchParams.get("utm_campaign") || ""

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "conversion_lead_puntamarea",
      conversion_type: "lead",
      page: "gracias",
      value: 1,
      currency: "USD",
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    })

    if (typeof window.fbq === "function") window.fbq("track", "Lead")

    const googleAdsId    = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
    const googleAdsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL
    if (typeof window.gtag === "function" && googleAdsId && googleAdsLabel) {
      window.gtag("event", "conversion", { send_to: `${googleAdsId}/${googleAdsLabel}` })
    }
  }, [searchParams])

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573216549342"
  const waUrl    = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hola, acabo de registrar mi interés en PUNTAMAREA y quiero agendar una asesoría privada."
  )}`
  const brochureUrl = process.env.NEXT_PUBLIC_BROCHURE_URL || "/brochure-puntamarea.pdf"

  return (
    <main className="relative min-h-screen overflow-hidden bg-sand">

      {/* ── Fondo full-bleed ── */}
      <div className="absolute inset-0">
        <img src="/renders/RENDER FINAL 2.png" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brown/60" />
      </div>

      {/* ── Contenido ── */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10 text-center">

        {/* ── Panel principal ── */}
        <div className="w-full max-w-xl bg-black/35 backdrop-blur-md px-6 py-8 sm:px-10 sm:py-10">

          {/* Ícono de éxito */}
          <div className="mb-5 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-viveloo-taupe/60 bg-viveloo-taupe/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-viveloo-taupe">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Eyebrow */}
          <p className="mb-2 font-sans text-[10px] font-medium tracking-[0.4em] text-viveloo-taupe uppercase">
            Solicitud Recibida
          </p>

          {/* Headline + Logo */}
          <p className="font-serif text-xl font-light text-white">Bienvenido a</p>
          <div className="my-3 flex justify-center">
            <Image
              src="/logo-puntamarea.png"
              alt="Puntamarea"
              width={600}
              height={220}
              style={{ width: "38vw", height: "auto", minWidth: 160, maxWidth: 300 }}
              className="object-contain"
            />
          </div>

          {/* Body */}
          <p className="mb-8 font-sans text-sm font-light leading-relaxed text-white/75">
            Un asesor de nuestro equipo se comunicará contigo en las próximas 2 horas para coordinar tu cita privada.
          </p>

          {/* ── Timeline ── */}
          <div className="mb-8 space-y-0 border border-viveloo-taupe/20">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`flex items-start gap-4 px-5 py-4 text-left ${i < STEPS.length - 1 ? "border-b border-viveloo-taupe/15" : ""}`}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-viveloo-taupe/20 font-sans text-xs font-medium text-viveloo-taupe">
                  {s.n}
                </div>
                <div>
                  <p className="font-sans text-xs font-medium text-white/90">{s.title}</p>
                  <p className="mt-0.5 font-sans text-[11px] font-light text-white/55 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Material exclusivo ── */}
          <p className="mb-4 font-sans text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
            Material exclusivo para ti
          </p>
          <div className="mb-5 flex flex-col gap-2">
            <a
              href={brochureUrl}
              download
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-5 py-3 font-sans text-[11px] font-medium tracking-[0.15em] text-white uppercase transition-all hover:border-viveloo-taupe hover:text-viveloo-taupe"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v13M7 11l5 5 5-5M4 20h16" />
              </svg>
              Descargar Brochure + Lista de Precios
            </a>
            <a
              href="/#inversores"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-5 py-3 font-sans text-[11px] font-medium tracking-[0.15em] text-white uppercase transition-all hover:border-viveloo-taupe hover:text-viveloo-taupe"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
              </svg>
              Ver Proyección de ROI
            </a>
            <a
              href="https://www.migracioncolombia.gov.co/visas/para-extranjeros/visa-inversionista"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-5 py-3 font-sans text-[11px] font-medium tracking-[0.15em] text-white uppercase transition-all hover:border-viveloo-taupe hover:text-viveloo-taupe"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
              </svg>
              Ver Guía Visa de Inversionista
            </a>
          </div>

          {/* ── WhatsApp CTA ── */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 bg-viveloo-taupe px-6 py-3.5 font-sans text-xs font-medium tracking-wide text-white uppercase transition-all hover:bg-[#7a6852]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hablar con un asesor ahora
          </a>
        </div>

        {/* Volver */}
        <Link
          href="/"
          className="mt-6 font-sans text-xs font-light tracking-[0.15em] text-white/30 uppercase transition-colors hover:text-white/55"
        >
          ← Volver al inicio
        </Link>
        <p className="mt-3 font-sans text-[9px] font-light tracking-wide text-white/20">
          PUNTAMAREA · Un desarrollo de Viveloo · Barú, Colombia
        </p>
      </div>
    </main>
  )
}

export default function GraciasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand" />}>
      <GraciasContent />
    </Suspense>
  )
}
