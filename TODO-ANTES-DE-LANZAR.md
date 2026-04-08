# ✅ Checklist antes de lanzar la landing a clientes

## 🎬 Hero video — COMPRIMIR MÁS

**Estado actual:** `public/hero-video.mp4` pesa **31 MB**.

**Meta antes de lanzar:** `< 15 MB` (idealmente 8–12 MB)

### Por qué
- 31 MB = ~3–5 segundos de espera en 4G promedio antes de que arranque el hero
- Penaliza **LCP** (Largest Contentful Paint) en Core Web Vitals → SEO + percepción de calidad
- En móvil consume datos del usuario, molesto en conexiones débiles
- Referencias de luxury real estate (Aman, Rosewood, Four Seasons): 8–20 MB

### Settings recomendados para recomprimir
| Parámetro | Valor |
|---|---|
| Resolución | 1920×1080 (1080p suficiente para hero) |
| Codec | H.264 (x264) |
| Bitrate | 1.5–2 Mbps |
| CRF | 28–30 (si usas CRF en vez de bitrate fijo) |
| Audio | **Eliminar por completo** (hero videos van en mute) → ahorra 2–5 MB fácil |
| Duración | Máximo 10–15 segundos (loop) |
| Container | MP4 |
| Profile | High, Level 4.0 |

### Herramientas
- **HandBrake** (gratis, GUI, macOS): preset "Web > Gmail Small 5 Minutes 480p30" ajustando a 1080p
- **FFmpeg** (CLI):
  ```bash
  ffmpeg -i hero-video.mp4 \
    -vf "scale=1920:1080" \
    -c:v libx264 -preset slow -crf 28 \
    -an \
    -movflags +faststart \
    hero-video-compressed.mp4
  ```
  El flag `-an` elimina audio, `-movflags +faststart` permite streaming progresivo.
- **Online:** https://www.freeconvert.com/video-compressor

### Validación después de comprimir
- [ ] Archivo `< 15 MB`
- [ ] Se ve bien en desktop (1080p)
- [ ] Se ve bien en móvil
- [ ] Arranca rápido (menos de 2s en wifi normal)
- [ ] Lighthouse LCP `< 2.5s`

---

## 📋 Otros checks pre-lanzamiento

- [ ] Verificar que el webhook del formulario de contacto (`NEXT_PUBLIC_WEBHOOK_URL`) está configurado en Vercel
- [ ] Validar que GTM / dataLayer está capturando `form_submit_puntamarea`
- [ ] Probar el flujo completo: landing → form → /gracias
- [ ] Probar en Safari, Chrome, Firefox (desktop + móvil)
- [ ] Revisar que el botón flotante de WhatsApp apunta al número correcto
- [ ] Verificar meta tags OG / Twitter para previews de compartir
- [ ] Lighthouse audit ≥ 85 en Performance
- [ ] Favicon y manifest listos
- [ ] Analytics (Vercel / GA4) conectado
