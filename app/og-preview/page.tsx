// Página privada para comparar las 3 opciones de OG image.
// Visita /og-preview para ver las 3 lado a lado.

export const dynamic = "force-dynamic"

export default function OgPreviewPage() {
  const options = [
    { id: "a", title: "Opción A — Gradiente oscuro", desc: "Degradado dramático de transparente a casi opaco. Contenido en bottom-left." },
    { id: "b", title: "Opción B — Split editorial", desc: "Panel izquierdo marrón con copy + render limpio a la derecha (estilo revista)." },
    { id: "c", title: "Opción C — Card flotante", desc: "Render como fondo + card oscura con texto. Alta legibilidad, muy limpio." },
  ]

  return (
    <main style={{
      minHeight: "100vh",
      background: "#F7F3EC",
      padding: "40px 24px",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 300, color: "#111", marginBottom: 8 }}>
          OG Image — 3 opciones de diseño
        </h1>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>
          Cada imagen se renderiza en 1200×630. Así se verá al compartir el link por WhatsApp, FB, LinkedIn, etc.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {options.map((opt) => (
            <div key={opt.id}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111" }}>{opt.title}</h2>
                <span style={{ fontSize: 13, color: "#888" }}>{opt.desc}</span>
              </div>
              <img
                src={`/og-preview/${opt.id}`}
                alt={`OG preview ${opt.id}`}
                style={{
                  width: "100%",
                  maxWidth: 1200,
                  height: "auto",
                  border: "1px solid #ddd",
                  display: "block",
                }}
              />
              <p style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
                URL directa: <a href={`/og-preview/${opt.id}`} style={{ color: "#66523c" }}>/og-preview/{opt.id}</a>
              </p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 48,
          padding: 20,
          background: "#EDE8E0",
          border: "1px solid #D4CFC5",
          fontSize: 13,
          color: "#444",
        }}>
          <strong>¿Cómo decides?</strong> Dime qué opción prefieres (A, B o C) y actualizo
          <code style={{ margin: "0 6px", padding: "2px 6px", background: "#fff", fontSize: 12 }}>app/opengraph-image.tsx</code>
          para que esa sea la imagen oficial que se muestre al compartir el link.
        </div>
      </div>
    </main>
  )
}
