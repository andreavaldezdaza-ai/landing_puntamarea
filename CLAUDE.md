# PUNTAMAREA — Landing Page

## Stack
- **Framework:** Next.js 16 (App Router, React Server Components)
- **CSS:** Tailwind v4 con config CSS-based (NO tailwind.config.js)
- **Animaciones:** Framer Motion 12 (`motion`, `useInView`, `useScroll`, `useTransform`)
- **Deploy:** Vercel (auto-deploy desde GitHub `main`)
- **Repo:** https://github.com/andreavaldezdaza-ai/landing_puntamarea (privado)
- **Producción:** https://landing-puntamarea.vercel.app/
- **Dominio final (pendiente DNS):** `puntamarea.viveloo.co` (ns1.webbuho.com / ns2.webbuho.com). CNAME requerido: `puntamarea → 2524bebc133b611b.vercel-dns-017.com` (TTL 300). Cuando propague, actualizar `NEXT_PUBLIC_SITE_URL` en Vercel Env Vars.

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

## ⚠️ Quirk crítico: `overflow-x: hidden` rompe `position: sticky`
En `app/globals.css` **NO poner `overflow-x: hidden`** en `html`/`body`. Eso crea un nuevo scroll container y rompe el efecto sticky de las amenidades (stacking cards) tanto en móvil como desktop.

**Solución correcta** (bloquea scroll horizontal en móvil SIN romper sticky):
```css
html, body {
  overscroll-behavior-x: none; /* bloquea rubber-band */
  overflow-x: clip;            /* clip NO crea scroll container, a diferencia de hidden */
}
```
`overflow-x: clip` es la clave: corta el contenido horizontal pero NO genera contexto de scroll, así `position: sticky` sigue funcionando. Soportado en todos los navegadores modernos.

Esta regla va FUERA de `@layer base` (Tailwind v4 puede ignorar `@media` dentro de layer).

## 📱 Estrategia mobile
- **Principio:** desktop mantiene layout editorial original. Móvil se centra y se compacta.
- **Patrón de centrado:** `text-center md:text-left` + `mx-auto md:mx-0` para bloques con max-width.
- **Tamaños headings móvil:** usar valores arbitrarios como `text-[26px]`, `text-[22px]`, `text-[34px]` porque los múltiplos de Tailwind saltan demasiado.
- **Sticky en móvil:** funciona si NO hay `overflow-x: hidden` en ancestros.
- **Touch feedback:** añadir `whileTap` de Framer Motion + Tailwind `active:` variants para replicar el hover en móvil.

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
| `hero-section.tsx` | **Desktop:** texto "PUNTAMAREA" + video de fondo + slideshow de 3 imágenes con auto-advance. **Móvil:** logo `/logo-blanco.png` (w-[420px] max-w-none) + primera imagen fija (sin rotación, sin indicadores, sin swipe). Contenido centrado en móvil, izquierda en desktop. Overlay L→R fuerte en desktop, gradiente uniforme oscuro en móvil. |
| `location-section.tsx` | Cartagena + Isla Barú. Animaciones avanzadas: clip-path reveal, parallax, counter, accent lines. Chips pill en subtítulos. Móvil: contenido centrado (`text-center md:text-left`); líneas de acento de stats a `100%` en móvil, `40%` en desktop. Padding ajustado a `pt-24 pb-16 lg:pt-32 lg:pb-20` (menos espacio debajo para reducir whitespace con ProjectSection). |
| `gallery-carousel.tsx` | 3 imágenes 4/3 (center larger), 12 renders de `/carrusel/`. Bordes `rounded-[6px]`/`rounded-[8px]`. Auto-advance 5s. |
| `amenities-section.tsx` | 4 amenidades con roseta decorativa (opacity 0.035). Efecto sticky stacking (funciona también en móvil). Header "Where every moment is ours" `text-[34px] md:text-5xl` con `<br className="md:hidden" />` entre partes. Texto `justify-start pt-8 md:justify-end md:pt-0` (evita espacio vacío arriba en móvil). Títulos de cards `text-[26px] md:text-4xl`. |
| `investor-section.tsx` | **Desktop:** 4 columnas editoriales (Maximizadores de Capital, Inversores USA·EU, Segunda Vivienda/Santuario, Legado Familiar). **Móvil:** grid 2×2 con cards interactivas — `onClick` expande descripción (tap-to-reveal con `grid-template-rows` animation), borde+fondo activo, número `0X` en esquina, highlight grande serif italic. CTA centrado con tagline "Recibe tu proyección ROI personalizada y guía visa inversionista USA·EU". |
| `project-section.tsx` | 3 pilares sin numeración (Desarrollo Costero, Legado Patrimonial, Alta Liquidez). `whileTap` de Framer Motion + `active:` variants. Título "La evolución de tu *patrimonio*" en una sola línea desde `md:` con `text-[30px] md:text-[40px] lg:text-[52px] md:whitespace-nowrap`. **Incluye mapa de ubicación** (`/ubicacion-puntamarea.png`) en `max-w-3xl` con borde `viveloo-taupe/25`, ubicado ENTRE el header y los 3 pilares. Padding reducido a `py-16 lg:py-24` y header mb `mb-12 lg:mb-16` para mejor balance vertical. |
| `residences-section.tsx` | Tabs Casa A/B/C. Casa A orden: RENDER 19→1, 15→2, 12→3, 4→4, 10→5. **Móvil:** descripción larga oculta (`hidden md:block`), specs alineados a la izquierda, CTA "Descargar Brochure" centrado (`mx-auto md:mx-0`). Carousel con flechas visibles en móvil (chevrons blancos con `drop-shadow`, sin fondo), swipe gesture con `touch-pan-y`. Icono de casa para "Espacios Destacados". |
| `fase-uno-section.tsx` | 3 tarjetas. Grid `lg:grid-cols-3`. Móvil: countdown centrado (`justify-center md:justify-start`), header centrado, cards `text-center sm:text-left`, heading "Por qué Fase 1 es diferente" `text-[26px]`. |
| `investment-banner.tsx` | `<Image fill>` como fondo (NO bg-fixed, falla en iOS). Aspect `4/5` en móvil, `21/9` en desktop. Logo 260px móvil. |
| `trust-partners.tsx` | Logos aliados: Inspira (h-20), Viveloo (h-10), Ahead (h-24). En móvil: Viveloo primero (`order-1 md:order-2`). Copy "Accede de forma voluntaria a nuestro operador aliado (Ahead)". |
| `contact-section.tsx` | 2 columnas: imagen izquierda (full height) + formulario derecha. Inputs `rounded-[4px]`. Webhook via `NEXT_PUBLIC_WEBHOOK_URL`. Móvil: heading `text-[22px]`, `py-10` (no `min-h-screen`), column `py-6`. Bloque "AL AGENDAR RECIBES" con 2 items (Proyección ROI + Guía visa USA·EU) entre heading y form. |
| `roi-calculator.tsx` | Eliminado del main page. Versión premium ahora vive en `/gracias` dentro de modal (ver `components/gracias/roi-projection.tsx`). |
| `app/page.tsx` | Footer: `pt-8 md:pt-24` (móvil más compacto), logo Viveloo `h-20 md:h-16`. |
| `components/gracias/material-modal.tsx` | Wrapper de modal reutilizable con Framer Motion. Backdrop blur, ESC para cerrar, click-outside, scroll interno. Bottom-sheet en móvil, modal centrado en desktop (`max-w-5xl` para ROI, `max-w-4xl` para Visa). |
| `components/gracias/roi-projection.tsx` | Calculadora premium: slider continuo COP $280M a $1.2B con snap points, toggle COP/USD (tasa fija 4000 COP/USD), curva SVG de 5 años con rounded-path (evita hydration mismatch), 4 KPIs (ROI Año 1, Renta Anual, Valor 5A, Ganancia Total), tabla desglose año a año colapsable, highlight "Tu inversión de $X podría valer $Y en cinco años". |
| `components/gracias/visa-guide.tsx` | Guía Visa M Inversionista Inmobiliario: header editorial + banner horizontal con render + 3 cards numeradas (Visa M, Inversión mínima 2026, Camino a Visa R) con pills de data verificada, bloque CTA con botones alineados al mismo ancho (`w-full md:min-w-[320px]`) para descarga PDF + agendar asesoría. Banner va DESPUÉS del título, no antes. |
| `app/gracias/page.tsx` | **Hero único** con confirmación + timeline + 3 botones "Material exclusivo": Ver Proyección ROI → abre modal, Ver Guía Visa → abre modal, Descargar Brochure → descarga directa. WhatsApp CTA + link volver. **No hay secciones debajo del hero** — todo el contenido en modales. Estado de modal con `useState<"roi" \| "visa" \| null>`. |

## Assets en `/public/`
- `/carrusel/` — 12 renders para galería
- `/casas/casa-a|b|c/` — fotos de residencias
- `/renders/` — 28 renders (tracked en git)
- `/puntamarea-mark.png` — roseta/sol (icon only, blanco sobre transparente, 2741×3188)
- `/logo-puntamarea-tight.png` — logo completo (PUNTAMAREA · BARÚ RESIDENCES)
- `/logo-blanco.png` — logo blanco usado en hero móvil
- `/hero-video.mp4` — 11MB (ya comprimido, meta <15MB alcanzada)
- `/logo-aliado-1.png` (Inspira), `/logo-aliado-2.png` (Viveloo), `/logo-aliado-3.png` (Ahead)
- `/logo-ahead.png`, `/logo-inspira.png`, `/logo-ora-raw.png` — logos adicionales
- `/brochure-puntamarea.pdf` — 14MB (versión actual: BROCHURE PUNTA MAREA - CASAS_compressed.pdf)
- `/ubicacion-puntamarea.png` — mapa de ubicación Barú + Cartagena (usado en ProjectSection)
- `/og-render-21.jpg`, `/og-render-9.jpg` — renders disponibles para OG image (editar constante en `app/opengraph-image.tsx`)

## Directorio `/docs/` (deliverables fuera del build)
- `guia-visa-content.md` — contenido estructurado de Guía Visa Inversionista (9 páginas) con notas de diseño para Canva
- `guia-visa.html` — versión HTML auto-contenida con Playfair + Montserrat, lista para imprimir a PDF (Chrome → Cmd+P → A4 sin márgenes → Gráficos de fondo activado). 9 páginas consolidadas.

---

## 🚀 PENDIENTE: Revisión final antes de lanzar

**La landing debe entregarse como versión final. Revisar estos puntos:**

### Prioridad ALTA — Bloqueantes para lanzamiento
- [x] ~~Comprimir hero-video.mp4~~ ✅ Actualmente en 11MB (<15MB target).
- [ ] **Verificar formulario completo** en producción: llenar, submit, confirmar que el webhook recibe datos y redirige a `/gracias`.
- [ ] **Configurar `NEXT_PUBLIC_WEBHOOK_URL`** en Vercel Environment Variables (si no está).
- [ ] **QA móvil completo** — recorrer toda la landing en iPhone/Android real. Revisar especialmente:
  - Hero video reproduce (o fallback a poster image)
  - Gallery carousel swipe funciona
  - Residencias tabs funcionan
  - Formulario submit funciona
  - WhatsApp button apunta al número correcto (+573108125075)
- [ ] **QA desktop** — Chrome, Safari, Firefox. Verificar todas las animaciones (location parallax, counters, clip-path reveal).
- [x] ~~Página /gracias~~ ✅ Rediseñada con hero + 3 botones de material exclusivo que abren modales (ROI + Visa Guide + Brochure descarga).
- [ ] **Propagación DNS `puntamarea.viveloo.co`** — pendiente ToGrow (agencia previa) para crear CNAME en Webbuho. Una vez propague: actualizar `NEXT_PUBLIC_SITE_URL` en Vercel → Settings → Env Vars.
- [ ] **PDF Guía Visa final** — actualmente placeholder en `/public/guia-visa-puntamarea.pdf`. Hay contenido listo en `docs/guia-visa-content.md` y `docs/guia-visa.html` (9 páginas). Pendiente: diseño final en Canva y reemplazo del PDF en `/public`.

### Prioridad MEDIA — Mejoras importantes
- [x] ~~Meta tags OG/Twitter~~ ✅ `metadataBase`, `openGraph`, `twitter` (summary_large_image), canonical y JSON-LD enriquecido con `@graph` (Organization, WebSite, RealEstateListing+Residence) configurados en `app/layout.tsx`.
- [x] ~~OG image dinámica~~ ✅ `app/opengraph-image.tsx` genera 1200×630 via `ImageResponse`. Diseño actual: render de fondo + overline + titular + 3 KPIs. Para iterar diseño usar rutas `/og-preview/a|b|c` (a eliminar cuando se decida el final).
- [x] ~~sitemap.ts + robots.ts + manifest.ts~~ ✅ Archivos nativos Next.js en `app/`.
- [ ] **Favicon** — verificar que existe y se muestra en tab del navegador.
- [ ] **GTM / dataLayer** — verificar que `form_submit_puntamarea` se dispara correctamente con UTM params.
- [ ] **Performance Lighthouse** — correr auditoría, target ≥ 85 en Performance. Si el video penaliza LCP, considerar lazy loading o poster image.
- [ ] **WhatsApp floating button** — verificar que no tapa contenido importante en móvil en cada sección.

### Prioridad BAJA — Nice to have
- [ ] Aplicar animaciones avanzadas (parallax, counter, clip-path) a más secciones si se desea.
- [ ] Optimizar imágenes de `/carrusel/` y `/casas/` (Next.js Image component ya hace AVIF/WebP, pero los originals podrían comprimirse).
- [ ] Decidir diseño OG image final (3 variantes A/B/C en `/og-preview`) y mover la elegida a `app/opengraph-image.tsx`.

### Archivos de referencia
- `TODO-ANTES-DE-LANZAR.md` — checklist detallado con settings de compresión de video
- Este archivo (`CLAUDE.md`) — contexto técnico para cualquier sesión futura

---

## ✅ COMPLETADO: Página `/gracias` con materiales exclusivos

**Decisión de UX:** materiales NO expuestos como secciones scrolleables. El usuario elige qué le interesa via 3 botones en el hero que abren modales (progressive disclosure).

**Componentes creados en `components/gracias/`:**
- `material-modal.tsx` — wrapper Framer Motion genérico (backdrop, ESC, click-outside).
- `roi-projection.tsx` — calculadora premium con slider, toggle COP/USD, curva SVG, 4 KPIs, tabla año-a-año.
- `visa-guide.tsx` — guía Visa M Inversionista Inmobiliario con data verificada 2026 (Resolución 5477, 350 SMMLV = COP $612.816.750 ≈ USD $161.300). 3 cards + CTA descarga PDF + agendar asesoría.

**Alcance de la Guía Visa:** extranjeros (cualquier nacionalidad) que quieren residir legalmente en Colombia comprando residencia en PUNTAMAREA. NO es visa USA/EU para colombianos (ese enfoque quedó descartado). Incluye camino a Visa R Residente tras 5 años.

**Data clave de Visa M (2026):**
- Monto mínimo: 350 SMMLV = COP $612.816.750 ≈ USD $161.300
- Solo tickets Puntamarea de $800M+ califican por sí solos. Tickets menores pueden consolidarse.
- Base legal: Resolución 5477 de 2022 del Ministerio de Relaciones Exteriores.
- SMMLV 2026: COP $1.750.905.

**PDF de Guía:** placeholder en `/public/guia-visa-puntamarea.pdf`. Contenido final en `docs/guia-visa-content.md` (markdown para Canva) y `docs/guia-visa.html` (HTML A4 imprimible). 9 páginas consolidadas (portada, intro+proyecto, visa+elegibilidad, monto+tickets, proceso, docs+tiempos, visa R+lifestyle, FAQ, contacto+disclaimer).

## 🧰 Cambios recientes (sesión de ajustes móvil)
Todos los cambios son `md:` responsive — desktop intocado. Principales:
- Hero móvil con logo imagen + fondo fijo, sin slideshow
- Efecto sticky de amenidades restaurado (era quirk de `overflow-x: hidden`)
- Inversores: grid 2×2 con tap-to-expand descripción
- Formulario: bloque "AL AGENDAR RECIBES" con 2 beneficios
- Footer más compacto, logo Viveloo más grande en móvil
- Residences: flechas carousel visibles, swipe, icono de casa
- Tamaños de headings ajustados para no desbordar viewport

## 🧰 Cambios recientes (sesión /gracias + SEO + mapa + Canva)

**Página /gracias rediseñada:**
- Hero único con confirmación, timeline y 3 botones de material exclusivo.
- Modales con Framer Motion: ROI Projection y Visa Guide.
- Sin secciones scrolleables debajo (progressive disclosure).

**Mapa de Ubicación:**
- Nuevo asset `/ubicacion-puntamarea.png` agregado.
- Integrado en `project-section.tsx` ENTRE header y 3 pilares, con borde `viveloo-taupe/25`.
- Removido de `location-section.tsx` (donde estuvo primero).

**ProjectSection title:**
- "La evolución de tu *patrimonio*" ahora en una sola línea en desktop (`md:whitespace-nowrap`).
- Padding y márgenes compactados para no dejar whitespace vacío.

**SEO completo:**
- `metadataBase` configurable via `NEXT_PUBLIC_SITE_URL` env var.
- Twitter card + canonical + keywords extendidas.
- JSON-LD `@graph` multi-entidad: Organization (Viveloo) + WebSite + RealEstateListing con geo, developer, amenityFeature, AggregateOffer (280M a 1.2B COP).
- OG image dinámica en `app/opengraph-image.tsx` con `ImageResponse` (render + overline + titular + 3 KPIs).
- 3 variantes de diseño OG accesibles en `/og-preview/a|b|c` (a eliminar cuando se decida el final).
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` nativos Next.js.

**Scroll horizontal mobile fix:**
- `overflow-x: clip` en `html, body` (NO `hidden`, que rompe sticky).

**Typo fix:** trust-partners.tsx "Acceda" → "Accede" (tono informal consistente).

**Deliverables Guía Visa:**
- `docs/guia-visa-content.md` y `docs/guia-visa.html` con 9 páginas densas consolidadas.
- Canva MCP para editar diseño existente (arreglar textos concatenados del importador).
