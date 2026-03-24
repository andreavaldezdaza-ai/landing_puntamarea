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

function GraciasContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const utmSource = searchParams.get("utm_source") || "direct"
    const utmMedium = searchParams.get("utm_medium") || ""
    const utmCampaign = searchParams.get("utm_campaign") || ""

    // ── Google Tag Manager: conversion event ──────────────────────────────
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

    // ── Meta Pixel: Lead event ────────────────────────────────────────────
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead")
    }

    // ── Google Ads: conversion ────────────────────────────────────────────
    const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
    const googleAdsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL
    if (typeof window.gtag === "function" && googleAdsId && googleAdsLabel) {
      window.gtag("event", "conversion", {
        send_to: `${googleAdsId}/${googleAdsLabel}`,
      })
    }
  }, [searchParams])

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573001234567"
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hola, acabo de registrar mi interés en PUNTAMAREA y quiero agendar una asesoría privada."
  )}`
  const brochureUrl = process.env.NEXT_PUBLIC_BROCHURE_URL || "/brochure-puntamarea.pdf"

  return (
    <main className="relative h-screen overflow-hidden">

      {/* ── Fondo: render full-bleed ───────────────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="/renders/RENDER FINAL 15.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Overlay base */}
        <div className="absolute inset-0 bg-brown/50" />
      </div>

      {/* ── Contenido centrado — ocupa exactamente el viewport ── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

        {/* ── Panel difuminado detrás del texto ── */}
        <div className="w-full max-w-2xl rounded-none bg-black/30 backdrop-blur-md px-8 py-8 sm:px-12">

          {/* Separador dorado */}
          <div className="mb-4 mx-auto h-px w-10 bg-gold" />

          {/* Eyebrow */}
          <p className="mb-3 font-sans text-[10px] font-medium tracking-[0.4em] text-gold uppercase">
            Solicitud Recibida
          </p>

          {/* Headline + Logo */}
          <div className="mb-3">
            <p className="font-serif text-2xl font-light text-white md:text-3xl">
              Bienvenido a
            </p>
            <div className="mt-3 flex justify-center">
              <Image
                src="/logo-puntamarea.png"
                alt="Puntamarea"
                width={600}
                height={220}
                style={{ width: "42vw", height: "auto", minWidth: 180, maxWidth: 380 }}
                className="object-contain"
              />
            </div>
          </div>

          {/* Body */}
          <p className="mb-7 font-sans text-sm font-light leading-relaxed text-white/75 md:text-base">
            Un asesor de nuestro equipo se comunicará contigo en las próximas 2 horas para coordinar tu cita privada.
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">

            {/* WhatsApp — filled gold */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-6 py-3.5 font-sans text-xs font-medium tracking-[0.2em] text-white transition-all duration-300 hover:bg-gold/80 uppercase"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Agendar por WhatsApp
            </a>

            {/* Proyección ROI */}
            <a
              href="/#inversores"
              className="inline-flex items-center gap-2 border border-white/50 px-6 py-3.5 font-sans text-xs font-medium tracking-[0.2em] text-white transition-all duration-300 hover:border-gold hover:text-gold uppercase"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              Proyección ROI
            </a>

            {/* Descargar Brochure */}
            <a
              href={brochureUrl}
              download
              className="inline-flex items-center gap-2 border border-white/50 px-6 py-3.5 font-sans text-xs font-medium tracking-[0.2em] text-white transition-all duration-300 hover:border-gold hover:text-gold uppercase"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v13M7 11l5 5 5-5M4 20h16" />
              </svg>
              Descargar Brochure
            </a>
          </div>
        </div>

        {/* Volver al inicio */}
        <Link
          href="/"
          className="mt-6 font-sans text-xs font-light tracking-[0.15em] text-white/35 transition-colors hover:text-white/60 uppercase"
        >
          ← Volver al inicio
        </Link>

        {/* Firma */}
        <p className="mt-3 font-sans text-[9px] font-light tracking-wide text-white/25">
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
