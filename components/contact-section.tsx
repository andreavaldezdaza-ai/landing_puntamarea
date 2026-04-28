"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const WA_RE    = /^\+?[1-9]\d{7,14}$/

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 })
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "+57 ",
    investment: "",
    consent: false,
  })

  function validate() {
    const e: Record<string, string> = {}
    if (!formData.name.trim())          e.name       = "Ingresa tu nombre"
    if (!EMAIL_RE.test(formData.email)) e.email      = "Email inválido"
    const wa = formData.whatsapp.replace(/\s/g, "")
    if (!WA_RE.test(wa))                e.whatsapp   = "Número inválido (mín. 8 dígitos)"
    if (!formData.investment)           e.investment = "Selecciona un rango"
    if (!formData.consent)              e.consent    = "Requerido"
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)

    const params = new URLSearchParams(window.location.search)
    const utmData = {
      utm_source:   params.get("utm_source")   || "direct",
      utm_medium:   params.get("utm_medium")   || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content:  params.get("utm_content")  || "",
      utm_term:     params.get("utm_term")     || "",
    }

    const payload = { ...formData, ...utmData, timestamp: new Date().toISOString() }

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }
    } catch { /* silent */ }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "form_submit_puntamarea",
      form_name: "contacto_principal",
      investment_range: formData.investment,
      ...utmData,
    })

    router.push("/gracias")
  }

  /* Clase base de cada caja-campo */
  const box = (name: string, hasErr: boolean) =>
    `relative flex flex-col gap-1 rounded-[4px] border px-4 pt-3 pb-3 bg-white transition-all duration-200 ${
      focused === name
        ? "border-viveloo-taupe ring-2 ring-viveloo-taupe/20"
        : hasErr
        ? "border-red-300"
        : "border-caramel/20 hover:border-caramel/40"
    }`

  const inputCls = "w-full bg-transparent font-sans text-sm font-light text-brown placeholder:text-caramel/40 focus:outline-none"
  const labelCls = "font-sans text-[10px] font-medium tracking-[0.15em] text-caramel/60 uppercase"
  const errMsg   = "font-sans text-[10px] text-red-400 mt-0.5"

  return (
    <section
      ref={ref}
      className="relative bg-sand py-10 lg:py-0 lg:min-h-screen"
      id="contacto"
    >
      <div className="mx-auto max-w-7xl lg:max-w-none">
        <div className="grid lg:grid-cols-2 lg:min-h-screen">

          {/* ── Columna izquierda: Imagen (alineada al formulario con el mismo padding vertical) ── */}
          <div
            className={`relative hidden lg:flex lg:py-24 pl-6 lg:pl-16 xl:pl-20 transition-all duration-1000 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="relative w-full overflow-hidden">
              <Image
                src="/renders/RENDER FINAL 4.png"
                alt="Residencias Puntamarea — Vista al mar"
                fill
                sizes="(max-width: 1024px) 0vw, 50vw"
                quality={75}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sand-deep/30" />
            </div>
          </div>

          {/* ── Columna derecha: Formulario ── */}
          <div
            className={`flex flex-col justify-center px-6 py-6 lg:px-16 xl:px-20 lg:py-24 transition-all duration-1000 delay-200 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            {/* Encabezado */}
            <div className="mb-8 text-center md:text-left">
              <p className="mb-3 font-sans text-xs font-medium tracking-[0.3em] text-viveloo-taupe uppercase">
                Apertura Preferencial
              </p>
              <h2 className="mb-3 text-[22px] font-sans font-light text-viveloo-black tracking-wide leading-tight md:text-4xl text-balance">
                Invertir es una <span className="font-serif italic font-normal text-viveloo-brown lowercase">decisión.</span>
                <br />
                Pertenecer es un <span className="font-serif italic font-normal text-viveloo-brown lowercase">privilegio.</span>
              </h2>
              <p className="font-sans text-sm font-light leading-relaxed text-caramel/70 max-w-sm mx-auto md:mx-0">
                Solo para inversores fundadores. Agenda tu cita privada antes del ajuste de precio de Fase 1.
              </p>
            </div>

            {/* Beneficios al inscribirse */}
            <div className="mb-6 border-t border-b border-viveloo-taupe/20 py-5">
              <p className="mb-3 font-sans text-[10px] font-semibold tracking-[0.25em] text-viveloo-taupe uppercase text-center md:text-left">
                Al agendar recibes
              </p>
              <ul className="flex flex-col gap-2.5 mx-auto md:mx-0 max-w-sm">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-viveloo-brown">
                    <path d="M3 3v18h18" />
                    <path d="m7 15 4-4 4 4 5-6" />
                  </svg>
                  <span className="font-sans text-sm font-light text-viveloo-black leading-snug">
                    Proyección ROI personalizada
                  </span>
                </li>
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-viveloo-brown">
                    <rect x="4" y="3" width="16" height="18" rx="2" />
                    <path d="M9 7h6M9 11h6M9 15h4" />
                  </svg>
                  <span className="font-sans text-sm font-light text-viveloo-black leading-snug">
                    Guía visa inversionista <span className="text-caramel/70">USA · EU</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Tarjeta del formulario */}
            <div className="border border-viveloo-taupe/20 bg-sand/60 p-6 sm:p-8 shadow-sm">

              <form onSubmit={handleSubmit} noValidate className="space-y-3">

                {/* Nombre */}
                <div className={box("name", !!errors.name)}>
                  <label className={labelCls}>Nombre completo</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className={inputCls}
                    required
                  />
                  {errors.name && <p className={errMsg}>{errors.name}</p>}
                </div>

                {/* Email + WhatsApp en grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className={box("email", !!errors.email)}>
                    <label className={labelCls}>Correo electrónico</label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                      className={inputCls}
                      required
                    />
                    {errors.email && <p className={errMsg}>{errors.email}</p>}
                  </div>

                  <div className={box("whatsapp", !!errors.whatsapp)}>
                    <label className={labelCls}>WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+57 300 000 0000"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      onFocus={() => setFocused("whatsapp")}
                      onBlur={() => setFocused(null)}
                      className={inputCls}
                      required
                    />
                    {errors.whatsapp && <p className={errMsg}>{errors.whatsapp}</p>}
                  </div>
                </div>

                {/* Rango de inversión — radio buttons en cajas */}
                <div>
                  <p className="mb-2 font-sans text-[10px] font-medium tracking-[0.15em] text-caramel/60 uppercase">
                    Rango de inversión
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { value: "280M-500M COP", label: "$280M – $500M" },
                      { value: "+500M COP",     label: "+$500M COP"   },
                      { value: "USD 200K-400K", label: "USD $200K–$400K" },
                      { value: "USD +400K",     label: "USD +$400K"   },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex cursor-pointer items-center justify-center rounded-[4px] border px-2 py-3 text-center font-sans text-[11px] font-medium transition-all duration-150 ${
                          formData.investment === opt.value
                            ? "border-viveloo-taupe bg-viveloo-taupe/10 text-brown"
                            : "border-caramel/20 bg-white text-caramel/60 hover:border-caramel/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="investment"
                          value={opt.value}
                          checked={formData.investment === opt.value}
                          onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                          className="sr-only"
                          required
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  {errors.investment && <p className={errMsg + " mt-1"}>{errors.investment}</p>}
                </div>

                {/* Consentimiento */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 accent-[#917c62] shrink-0"
                    required
                  />
                  <label htmlFor="consent" className="font-sans text-xs font-light leading-relaxed text-caramel/60">
                    Acepto la política de tratamiento de datos personales (Habeas Data) y autorizo el contacto por parte del equipo comercial de PUNTAMAREA.
                  </label>
                </div>
                {errors.consent && <p className={errMsg}>{errors.consent}</p>}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-2 inline-flex w-full items-center justify-center gap-2 bg-viveloo-taupe px-8 py-4 font-sans text-sm font-medium tracking-wide text-white uppercase transition-all duration-300 hover:bg-[#7a6852] hover:shadow-lg disabled:opacity-70"
                >
                  {submitting ? "Enviando..." : "Agendar cita privada"}
                  {!submitting && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  )}
                </button>
              </form>

              <p className="mt-4 font-sans text-[10px] font-light text-center text-caramel/40">
                Sin compromiso · Respuesta en menos de 2 horas
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
