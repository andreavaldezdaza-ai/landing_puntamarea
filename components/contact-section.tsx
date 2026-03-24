"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useInView } from "@/hooks/use-in-view"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    investment: "",
    consent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Capture UTM params from URL
    const params = new URLSearchParams(window.location.search)
    const utmData = {
      utm_source: params.get("utm_source") || "direct",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
    }

    const payload = { ...formData, ...utmData, timestamp: new Date().toISOString() }

    try {
      // Send to webhook (Make/Zapier/n8n)
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }
    } catch {
      // Silently continue — don't block redirect on webhook failure
    }

    // Push GTM / dataLayer event
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "form_submit_puntamarea",
      form_name: "contacto_principal",
      investment_range: formData.investment,
      ...utmData,
    })

    // Redirect to thank-you page
    router.push("/gracias")
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-sand-deep py-24 lg:py-0"
      id="contacto"
    >
      <div className="mx-auto max-w-7xl lg:max-w-none">
        <div className="grid lg:grid-cols-2">
          {/* Left: Image */}
          <div
            className={`relative hidden min-h-[600px] lg:block lg:min-h-screen transition-all duration-1000 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <img
              src="/renders/RENDER FINAL 4.png"
              alt="Residencias Puntamarea — Vista al mar"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sand-deep/30" />
          </div>

          {/* Right: Form */}
          <div
            className={`flex flex-col justify-center px-6 py-16 lg:px-16 lg:py-24 xl:px-24 transition-all duration-1000 delay-200 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            {/* Header */}
            <div className="mb-12">
              <p className="mb-4 font-sans text-xs font-medium tracking-[0.3em] text-gold uppercase">
                Acceso Exclusivo
              </p>
              <h2 className="mb-4 font-serif text-3xl font-light leading-tight text-brown md:text-4xl lg:text-5xl text-balance">
                Invertir es una decisión.
                <br />
                <span className="italic text-gold">Pertenecer es un privilegio.</span>
              </h2>
              <p className="font-sans text-sm font-light text-caramel/80">
                Agenda una cita privada con nuestro equipo de asesores.
              </p>
            </div>

            {/* Form — inside card */}
            <div className="border border-gold/20 bg-sand p-6 sm:p-8 lg:bg-transparent lg:border-transparent lg:p-0">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-caramel/30 bg-transparent py-4 font-sans text-base font-light text-brown placeholder:text-caramel/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b border-caramel/30 bg-transparent py-4 font-sans text-base font-light text-brown placeholder:text-caramel/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <input
                    type="tel"
                    placeholder="WhatsApp (con código de país)"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full border-b border-caramel/30 bg-transparent py-4 font-sans text-base font-light text-brown placeholder:text-caramel/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Investment Range */}
                <div>
                  <select
                    value={formData.investment}
                    onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                    className="w-full appearance-none border-b border-caramel/30 bg-transparent py-4 font-sans text-base font-light text-brown focus:border-gold focus:outline-none transition-colors cursor-pointer"
                    required
                  >
                    <option value="" disabled className="text-caramel/50">
                      Rango de inversión
                    </option>
                    <option value="280M-500M COP">$280M – $500M COP</option>
                    <option value="+500M COP">+$500M COP</option>
                    <option value="USD 200K-400K">USD $200,000 – $400,000</option>
                    <option value="USD +400K">USD +$400,000</option>
                  </select>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 accent-gold"
                    required
                  />
                  <label
                    htmlFor="consent"
                    className="font-sans text-xs font-light leading-relaxed text-caramel/70"
                  >
                    Acepto la política de tratamiento de datos personales (Habeas Data) y
                    autorizo el contacto por parte del equipo comercial de PUNTAMAREA.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex w-full items-center justify-center gap-2 bg-gold px-8 py-4 font-sans text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-gold/90 hover:shadow-lg disabled:opacity-70"
                >
                  {submitting ? "Enviando..." : "Agendar cita privada"}
                  {!submitting && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
