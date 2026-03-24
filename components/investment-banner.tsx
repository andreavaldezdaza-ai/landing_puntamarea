"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function InvestmentBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const [parallax, setParallax] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const wh = window.innerHeight
      if (rect.top < wh && rect.bottom > 0) {
        const progress = (wh - rect.top) / (wh + rect.height)
        setParallax(progress * 55)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "100vh" }}
      aria-label="Puntamarea — sección de marca"
    >
      {/* ── Imagen de fondo con parallax ─────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${parallax}px) scale(1.12)`,
          transition: "transform 0.08s linear",
        }}
      >
        <img
          src="/renders/RENDER FINAL 15.jpg"
          alt="Puntamarea, Barú"
          className="h-full w-full object-cover"
        />
      </div>

      {/* ── Overlay mínimo ───────────────────────────────────────── */}
      <div className="absolute inset-0 bg-brown/25" />

      {/* ── Contenido centrado ───────────────────────────────────── */}
      <div className="relative flex h-full flex-col items-center justify-center gap-5 px-6 text-center">

        {/* Logo */}
        <Image
          src="/logo-puntamarea.png"
          alt="Puntamarea"
          width={280}
          height={100}
          style={{ width: "auto", height: 100 }}
          className="object-contain opacity-90 mb-2"
        />

        {/* Línea 1 — sans, ligero */}
        <p className="font-sans text-sm font-light tracking-[0.18em] text-white/85 md:text-base">
          Naturaleza, exclusividad y visión
        </p>

        {/* Línea 2 — serif grande, itálica */}
        <p className="font-serif text-4xl font-light italic text-white md:text-5xl lg:text-6xl">
          en un solo lugar
        </p>

      </div>
    </section>
  )
}
