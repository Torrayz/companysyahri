'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default icon path issue with Next.js & Webpack
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png'
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png'
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'

const customIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

export default function LeafletMap() {
  const lat = Number(process.env.NEXT_PUBLIC_MAP_LATITUDE || -6.1702)
  const lng = Number(process.env.NEXT_PUBLIC_MAP_LONGITUDE || 106.6403)
  const position: [number, number] = [lat, lng]

  // Fix global leaflet css issues if needed
  useEffect(() => {
    // Ensuring map loads tiles properly
  }, [])

  return (
    <div className="relative h-[300px] w-full" style={{ zIndex: 0 }}>
      <MapContainer 
        center={position} 
        zoom={14} 
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <strong>CV. Prabaswara Gandar Prima</strong><br/>
            Tangerang, Banten
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
