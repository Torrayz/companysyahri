'use client'

import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./leaflet-map'), { 
  ssr: false, 
  loading: () => <div className="h-[300px] w-full animate-pulse bg-background-muted rounded-lg border border-border" /> 
})

export function MapWrapper() {
  return <LeafletMap />
}
