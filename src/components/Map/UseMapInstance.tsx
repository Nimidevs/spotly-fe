import { useEffect, useRef, useState } from 'react'
import maplibregl, { Map } from 'maplibre-gl'
import { LIGHT_STYLE } from './mapStyles'

export const useMapInstance = () => {
  const mapRef = useRef<Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mapReady, setMapReady] = useState<Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: LIGHT_STYLE,
      center: [3.3792, 6.5244], //replace with user's location
      zoom: 14,
      pitch: 60,     // 3D tilt
      bearing: -20
      // pitch: 45,
      // bearing: 0,
    })

    mapRef.current = map

    const onLoad = () => setMapReady(map)
    map.once('load', onLoad)

    return () => {
      map.off('load', onLoad)
      map.remove()
      mapRef.current = null
      setMapReady(null)
    }
  }, [])

  return { mapRef, containerRef, mapReady }
}
