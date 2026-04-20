# PUNTAMAREA — Landing Page

## Stack
- **Framework:** Next.js 16 (App Router, React Server Components)
- **CSS:** Tailwind v4 con config CSS-based (NO tailwind.config.js)
- **Animaciones:** Framer Motion 12 (`motion`, `useInView`, `useScroll`, `useTransform`)
- **Deploy:** Vercel (auto-deploy desde GitHub `main`)
- **Repo:** https://github.com/andreavaldezdaza-ai/landing_puntamarea (privado)
- **Producción:** https://landing-puntamarea.vercel.app/

## Git Push
Para push usar token de GitHub (Personal Access Token) guardado en keychain/local. No incluir tokens en archivos trackeados.
```bash
git push origin main
# Si falla auth, usar: git push https://USER:TOKEN@github.com/andreavaldezdaza-ai/landing_puntamarea.git main
```

## ⚠️ Quirk crítico: `--radius: 9999px`
En `app/globals.css` línea ~36 hay `--radius: 9999px`. Esto hace que `rounded-md`, `rounded-lg`, etc. se conviertan en pills (9997px). **Solución:** usar siempre valores arbitrarios de Tailwind:
- `rounded-[2px]`, `rounded-[4px]`, `rounded-[6px]`, `rounded-[8px]`
- NUNCA usar `rounded-sm`, `rounded-md`, `rounded-lg` → salen redondeados como pills

## Design Tokens
- **Colors:** `viveloo-black` (#111111), `viveloo-brown` (#66523c), `viveloo-taupe` (#917c62), `bg-sand` (fondo arena), `caramel`
- **Typography dual:** `font-sans font-light` para body + `font-serif italic font-normal text-viveloo-brown lowercase` para acentos
- **Headings pattern:** "Texto sans *acento serif.*" → `<h2>Texto <span className="font-serif italic ...">acento.</span></h2>`
- **Overlines:** `font-sans text-[10px]-[11px] font-semibold uppercase tracking-[0.2em]`

## Patrones recurrentes
- **Roseta/marca decorativa:** CSS `mask-image` + `backgroundColor` para colorear PNG blanco (`/puntamarea-mark.png`) en brand brown. Opacity 0.035 para efecto watermark.
- **Parallax en imágenes:** `useScroll({ target, offset })` + `useTransform(scrollYProgress, [0,1], ["-6%","6%"])` con `h-[112%]` para cubrir el desplazamiento.
- **Counter animations:** `requestAnimationFrame` + ease-out cubic (`1 - Math.pow(1-t, 3)`), no requiere librería externa.
- **Clip-path reveal:** `clipPath: "inset(0 100% 0 0)"` → `"inset(0 0% 0 0)"` con Framer Motion.
- **Inputs de formulario:** `rounded-[4px]` (micro-UI interactiva con radius sutil). Botones CTA: square (editorial).

## Componentes clave
| Componente | Descripción |
|---|---|
| `hero-section.tsx` | Video hero + nav con gradiente `from-viveloo-black/35` en estado unscrolled. Nav sin logo (espacio vacío intencional). |
| `location-section.tsx` | Cartagena + Isla Barú. Animaciones avanzadas: clip-path reveal, parallax, counter, accent lines. Chips pill en subtítulos. |
| `gallery-carousel.tsx` | 3 imágenes 4/3 (center larger), 12 renders de `/carrusel/`. Bordes `rounded-[6px]`/`rounded-[8px]`. Auto-advance 5s. |
| `amenities-section.tsx` | 4 amenidades con roseta decorativa (opacity 0.035, alineada derecha). Texto en parte inferior del panel. |
| `investor-section.tsx` | 4 columnas: Maximizadores de Capital, Inversores (USA·EU), Segunda Vivienda (Santuario privado), Legado Familiar. Headlines 1 línea. |
| `project-section.tsx` | 3 pilares sin numeración (Desarrollo Costero, Legado Patrimonial, Alta Liquidez). |
| `residences-section.tsx` | Tabs Casa A/B/C. Casa A orden: RENDER 19→1, 15→2, 12→3, 4→4, 10→5. |
| `fase-uno-section.tsx` | 3 tarjetas (no 4). Grid `lg:grid-cols-3`. |
| `investment-banner.tsx` | `<Image fill>` como fondo (NO bg-fixed, falla en iOS). Aspect `4/5` en móvil, `21/9` en desktop. Logo 260px móvil. |
| `trust-partners.tsx` | Logos aliados: Inspira (h-20), Viveloo (h-10), Ahead (h-24). En móvil: Viveloo primero (`order-1 md:order-2`). |
| `contact-section.tsx` | 2 columnas: imagen izquierda (full height) + formulario derecha. Inputs `rounded-[4px]`. Webhook via `NEXT_PUBLIC_WEBHOOK_URL`. |
| `roi-calculator.tsx` | Eliminado del main page. Considerar para página /gracias en el futuro. |

## Assets en `/public/`
- `/carrusel/` — 12 renders para galería
- `/casas/casa-a|b|c/` — fotos de residencias
- `/renders/` — 28 renders (tracked en git)
- `/puntamarea-mark.png` — roseta/sol (icon only, blanco sobre transparente, 2741×3188)
- `/logo-puntamarea-tight.png` — logo completo (PUNTAMAREA · BARÚ RESIDENCES)
- `/hero-video.mp4` — 31MB (meta: comprimir a <15MB antes de lanzar)
- `/logo-aliado-1.png` (Inspira), `/logo-aliado-2.png` (Viveloo), `/logo-aliado-3.png` (Ahead)

---

## 🚀 PENDIENTE: Revisión final antes de lanzar

**La landing debe entregarse como versión final. Revisar estos puntos:**

### Prioridad ALTA — Bloqueantes para lanzamiento
- [ ] **Comprimir hero-video.mp4** de 31MB a <15MB (ver `TODO-ANTES-DE-LANZAR.md` para settings de ffmpeg). Actualmente pesa 31MB → penaliza LCP y consumo de datos en móvil.
- [ ] **Verificar formulario completo** en producción: llenar, submit, confirmar que el webhook recibe datos y redirige a `/gracias`.
- [ ] **Configurar `NEXT_PUBLIC_WEBHOOK_URL`** en Vercel Environment Variables (si no está).
- [ ] **QA móvil completo** — recorrer toda la landing en iPhone/Android real. Revisar especialmente:
  - Hero video reproduce (o fallback a poster image)
  - Gallery carousel swipe funciona
  - Residencias tabs funcionan
  - Formulario submit funciona
  - WhatsApp button apunta al número correcto (+573108125075)
- [ ] **QA desktop** — Chrome, Safari, Firefox. Verificar todas las animaciones (location parallax, counters, clip-path reveal).
- [ ] **Página /gracias** — verificar que se ve bien, tiene render de fondo, mensaje correcto.

### Prioridad MEDIA — Mejoras importantes
- [ ] **Meta tags OG/Twitter** — verificar que al compartir la URL se ve imagen de preview correcta, título y descripción adecuados para redes sociales.
- [ ] **Favicon** — verificar que existe y se muestra en tab del navegador.
- [ ] **GTM / dataLayer** — verificar que `form_submit_puntamarea` se dispara correctamente con UTM params.
- [ ] **Performance Lighthouse** — correr auditoría, target ≥ 85 en Performance. Si el video penaliza LCP, considerar lazy loading o poster image.
- [ ] **WhatsApp floating button** — verificar que no tapa contenido importante en móvil en cada sección.

### Prioridad BAJA — Nice to have
- [ ] Aplicar animaciones avanzadas (parallax, counter, clip-path) a más secciones si se desea.
- [ ] Considerar mover el RoiCalculator a la página `/gracias` como valor añadido post-registro.
- [ ] Optimizar imágenes de `/carrusel/` y `/casas/` (Next.js Image component ya hace AVIF/WebP, pero los originals podrían comprimirse).

### Archivos de referencia
- `TODO-ANTES-DE-LANZAR.md` — checklist detallado con settings de compresión de video
- Este archivo (`CLAUDE.md`) — contexto técnico para cualquier sesión futura
