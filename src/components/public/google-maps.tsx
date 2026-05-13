export function GoogleMaps() {
  const embedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL

  if (!embedUrl) return null

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <iframe
        src={embedUrl}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lokasi CV. Prabaswara Gandar Prima"
      />
    </div>
  )
}
