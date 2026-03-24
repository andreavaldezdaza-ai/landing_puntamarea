"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const NAV_LINKS = [
  { label: "Ubicación",   href: "#ubicacion" },
  { label: "Proyecto",    href: "#proyecto" },
  { label: "Experiencia", href: "#amenidades" },
  { label: "Residencias", href: "#residencias" },
  { label: "Inversión",   href: "#inversores" },
  { label: "Contacto",    href: "#contacto" },
]

// ── Navbar ────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const barColor = menuOpen || scrolled ? "bg-brown" : "bg-white"

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-sand/90 backdrop-blur-md border-b border-gold/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/logo-puntamarea.png"
              alt="PUNTAMAREA"
              width={220}
              height={52}
              className={`h-9 w-auto object-contain transition-all duration-300 md:h-11 ${
                scrolled || menuOpen ? "brightness-0" : "brightness-0 invert"
              }`}
            />
          </a>

          {/* Nav links — desktop only */}
          <div
            className={`hidden md:flex items-center gap-8 transition-colors duration-300 ${
              scrolled ? "text-brown" : "text-white"
            }`}
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-xs font-light uppercase tracking-[0.2em] opacity-80 hover:opacity-100 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA — desktop */}
          <a
            href="#contacto"
            className={`hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-light tracking-wide transition-all duration-300 ${
              scrolled
                ? "bg-gold text-white hover:bg-gold/90"
                : "border border-white/60 text-white hover:bg-white/10"
            }`}
          >
            Agendar Asesoría
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={`block h-px w-6 origin-center transition-all duration-300 ${barColor} ${
                menuOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${barColor} ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 origin-center transition-all duration-300 ${barColor} ${
                menuOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center px-8 pt-24 pb-12 md:hidden transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto bg-sand/97 backdrop-blur-md"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Nav links */}
        <nav className="space-y-7">
          {NAV_LINKS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block font-serif text-3xl font-light text-brown/80 transition-all duration-300 hover:text-gold ${
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="mt-12">
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 border border-gold px-8 py-4 font-sans text-xs font-medium tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-white uppercase"
          >
            Agendar Asesoría
            <span>→</span>
          </a>
        </div>

        {/* Footer line */}
        <p className="mt-auto font-sans text-[10px] font-light tracking-wide text-caramel/40 uppercase">
          PUNTAMAREA · Barú, Colombia
        </p>
      </div>
    </>
  )
}

// ── Stat item ─────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center px-3 py-4 md:px-4">
      <span className="font-serif text-lg font-light text-gold leading-none md:text-2xl">
        {value}
      </span>
      <span className="mt-1.5 font-sans text-[9px] font-light uppercase tracking-[0.12em] text-caramel leading-tight max-w-[100px] md:text-[10px] md:tracking-[0.15em] md:max-w-[110px]">
        {label}
      </span>
    </div>
  )
}

const MOBILE_SLIDES = [
  "/renders/RENDER FINAL 9.jpg",
  "/renders/RENDER FINAL 2.png",
  "/renders/RENDER FINAL 17.jpg",
]

// ── Hero ──────────────────────────────────────────────────
export function HeroSection() {
  const [visible, setVisible] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance slides every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((i) => (i + 1) % MOBILE_SLIDES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* ── Slideshow fondo — mobile ── */}
        <div className="absolute inset-0 md:hidden">
          {MOBILE_SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Puntamarea"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                i === slideIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* ── Indicadores de slide — mobile ── */}
        <div className="absolute bottom-[200px] left-1/2 z-10 -translate-x-1/2 flex gap-1.5 md:hidden">
          {MOBILE_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-px transition-all duration-300 ${
                i === slideIndex ? "w-6 bg-white" : "w-3 bg-white/40"
              }`}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Video de fondo — desktop ── */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          poster="/renders/RENDER FINAL 9.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* ── Overlays cálidos sutiles ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800/38 via-stone-700/14 to-stone-800/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/42 via-stone-900/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/28 via-transparent to-transparent" />

        {/* ── Contenido principal ── */}
        <div className="relative z-10 flex h-full flex-col justify-center px-6 pb-52 md:pb-28 lg:px-16 xl:px-24">
          {/* Badge */}
          <div
            className={`mb-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
            }`}
          >
            <span className="font-sans text-[10px] font-light uppercase tracking-[0.35em] text-white/75">
              Lanzamiento exclusivo · Fase 1
            </span>
          </div>

          {/* H1 */}
          <h1
            className={`font-serif font-light text-white leading-[0.9] tracking-[0.08em] mb-5 transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
          >
            PUNTAMAREA
          </h1>

          {/* Línea dorada animada */}
          <div
            className={`mb-5 h-px bg-gold origin-left transition-all duration-700 delay-300 ${
              visible ? "w-20 opacity-100" : "w-0 opacity-0"
            }`}
          />

          {/* H2 */}
          <p
            className={`font-serif font-light italic text-white/90 leading-snug mb-3 transition-all duration-700 delay-[400ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.1rem)" }}
          >
            Un estilo de vida frente al mar.
          </p>

          {/* Subtítulo */}
          <p
            className={`font-sans font-light text-white/70 text-sm md:text-[15px] max-w-md leading-relaxed mb-10 transition-all duration-700 delay-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Lotes exclusivos con amenidades de estilo resort con acceso directo a 150m de frente de playa en Barú.
          </p>

          {/* CTA */}
          <div
            className={`transition-all duration-700 delay-[600ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#proyecto"
              className="group inline-flex items-center gap-3 border border-white/50 px-7 py-3.5 font-sans text-xs font-light uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Descubre el Proyecto
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* ── Scroll indicator — hidden on mobile ── */}
        <div
          className={`absolute bottom-[108px] left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${
            visible ? "opacity-60" : "opacity-0"
          }`}
        >
          <ChevronDown className="h-5 w-5 text-white animate-bounce" />
        </div>

        {/* ── Stats bar inferior ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-sand-deep/88 backdrop-blur-md border-t border-gold/15">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/20">
              <StatItem value="Desde $280M" label="Lotes en Etapa 1" />
              <StatItem value="Beach Club" label="& Restaurante" />
              <StatItem value="Wellness" label="Pádel, Yoga y Gimnasio" />
              <StatItem value="Aprobado" label="Para Rentas Cortas" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
