"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

const pillars = [
  { label: "Desarrollo Costero", detail: "Planificado con visión" },
  { label: "Legado Patrimonial", detail: "Activo de largo plazo" },
  { label: "Alta Liquidez", detail: "Inversión estratégica" },
]

const easeOut = [0.16, 1, 0.3, 1] as const

export function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Header subtle drift
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const headerY = useTransform(sectionProgress, [0, 0.5], [40, 0])
  const headerOpacityWrap = useTransform(sectionProgress, [0, 0.15], [0, 1])

  return (
    <section ref={sectionRef} className="relative bg-sand py-16 lg:py-24 overflow-hidden" id="proyecto">

      {/* ── Editorial Header ──────────────────────────────────── */}
      <motion.div
        style={{ opacity: headerOpacityWrap }}
        className="mx-auto max-w-4xl px-6 text-center mb-12 lg:mb-16"
      >
        {/* Overline with animated underline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: easeOut }}
            className="h-px bg-viveloo-taupe"
          />
          <span className="font-sans text-[10px] font-medium tracking-[0.35em] text-viveloo-taupe uppercase">
            El Proyecto
          </span>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: easeOut }}
            className="h-px bg-viveloo-taupe"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: easeOut }}
          className="text-[30px] md:text-[40px] lg:text-[52px] md:whitespace-nowrap font-sans font-light text-viveloo-black mb-8 leading-tight"
        >
          La evolución de tu{" "}
          <span className="font-serif italic font-normal text-viveloo-brown lowercase">
            patrimonio.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.35, ease: easeOut }}
          className="max-w-2xl mx-auto font-sans text-base md:text-lg font-light leading-relaxed text-caramel/80"
        >
          Puntamarea no es un proyecto inmobiliario tradicional. Es un desarrollo costero
          planificado con visión patrimonial. Diseñado para quienes buscan un equilibrio
          perfecto entre el disfrute personal, la sofisticación y una inversión inteligente
          de alta liquidez.
        </motion.p>
      </motion.div>

      {/* ── Mapa de Ubicación ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: easeOut }}
        className="mx-auto mb-16 max-w-3xl px-6 lg:mb-20"
      >
        <div className="overflow-hidden border border-viveloo-taupe/25 bg-sand">
          <Image
            src="/ubicacion-puntamarea.png"
            alt="Mapa de ubicación de PUNTAMAREA en Barú, cerca a Cartagena"
            width={1596}
            height={1030}
            sizes="(max-width: 768px) 100vw, 768px"
            quality={80}
            className="h-auto w-full object-contain"
          />
        </div>
      </motion.div>

      {/* ── 3 Pillars ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-viveloo-taupe/15 border border-viveloo-taupe/15">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: easeOut,
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.4, ease: easeOut },
              }}
              whileTap={{
                y: -4,
                transition: { duration: 0.3, ease: easeOut },
              }}
              className="group relative bg-sand px-8 py-12 text-center cursor-default overflow-hidden active:[&_.wash]:opacity-100 active:[&_.divider]:bg-viveloo-taupe active:[&_h3]:-translate-y-0.5"
            >
              {/* Animated background wash on hover/tap */}
              <motion.div
                className="wash absolute inset-0 bg-gradient-to-b from-transparent to-viveloo-taupe/5 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl md:text-3xl italic font-light text-viveloo-brown mb-3 transition-transform duration-500 group-hover:-translate-y-0.5">
                  {pillar.label}
                </h3>

                {/* Divider line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 24 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: i * 0.15 + 0.5, ease: easeOut }}
                  className="divider h-px bg-viveloo-taupe/40 mx-auto mb-3 group-hover:bg-viveloo-taupe transition-colors duration-500"
                />

                <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-caramel/70">
                  {pillar.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
