"use client"

import Image from "next/image"

export function InvestmentBanner() {
  return (
    <section
      className="relative w-full aspect-video md:aspect-[21/9] bg-cover bg-center bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('/renders/RENDER FINAL 15.jpg')" }}
      aria-label="Puntamarea — sección de marca"
    >
      {/* ── Overlay ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-brown/40" />

      {/* ── Centered Content ─────────────────────────────────────── */}
      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 text-center">

        {/* Logo — protagonista */}
        <Image
          src="/logo-puntamarea-tight.png"
          alt="Puntamarea"
          width={600}
          height={335}
          priority
          className="h-auto w-[180px] md:w-[240px] lg:w-[280px] object-contain drop-shadow-xl"
        />

        {/* Overline — sans, light */}
        <p className="mt-2 font-sans text-xs font-light tracking-[0.25em] text-white/95 md:text-sm">
          Naturaleza, exclusividad y visión
        </p>

        {/* Main line — serif italic */}
        <p className="font-serif text-2xl font-light italic text-white md:text-4xl lg:text-5xl">
          en un solo lugar
        </p>

      </div>
    </section>
  )
}
