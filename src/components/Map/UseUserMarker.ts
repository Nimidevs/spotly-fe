import { useEffect, useRef, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import * as React from 'react'
import maplibregl, { Map as MapLibreMap, Marker } from 'maplibre-gl'
import type { NearbyUser } from '../../types/map.types'
import UserMarker from '../Home/UserMarker'
import {
  buildOverlapGroups,
  computeSpiderLngLats,
  SPIDERFY_LEG_RADIUS_PX,
  SPIDERFY_OVERLAP_THRESHOLD_PX,
} from './spiderfyLayout'

type MarkerEntry = { marker: Marker; root: Root }

function sameStringSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const sa = new Set(a)
  return b.every((id) => sa.has(id))
}

export const useUserMarkers = (
  map: MapLibreMap | null,
  users: NearbyUser[],
  onUserClick?: (user: NearbyUser) => void
) => {
  const entriesRef = useRef<Map<string, MarkerEntry>>(new Map())
  /** Ids currently shown in spider layout; `null` means collapsed. */
  const [spiderUserIds, setSpiderUserIds] = useState<string[] | null>(null)

  useEffect(() => {
    if (!map) return

    const currentIds = new Set(users.map((u) => u.id))

    const effectiveSpiderIds =
      spiderUserIds?.length &&
      spiderUserIds.every((id) => currentIds.has(id))
        ? spiderUserIds
        : null

    if (spiderUserIds && effectiveSpiderIds === null) {
      queueMicrotask(() => setSpiderUserIds(null))
    }

    const spiderLngLatById =
      effectiveSpiderIds && effectiveSpiderIds.length > 1
        ? computeSpiderLngLats(
            map,
            users.filter((u) => effectiveSpiderIds.includes(u.id)),
            SPIDERFY_LEG_RADIUS_PX
          )
        : null

    const resolveLngLat = (user: NearbyUser): [number, number] =>
      spiderLngLatById?.get(user.id) ?? [user.lng, user.lat]

    const handleMarkerClick = (user: NearbyUser) => {
      const groups = buildOverlapGroups(users, map, SPIDERFY_OVERLAP_THRESHOLD_PX)
      const group = groups.find((g) => g.includes(user.id)) ?? [user.id]

      if (group.length === 1) {
        onUserClick?.(user)
        setSpiderUserIds(null)
        return
      }

      const spiderActive =
        effectiveSpiderIds != null && effectiveSpiderIds.length > 0
      const sameGroupAsSpider =
        spiderActive && sameStringSet(effectiveSpiderIds, group)

      if (sameGroupAsSpider) {
        onUserClick?.(user)
        setSpiderUserIds(null)
        return
      }

      setSpiderUserIds(group)
    }

    const entries = entriesRef.current

    users.forEach((user) => {
      const [lng, lat] = resolveLngLat(user)
      const existing = entries.get(user.id)
      if (existing) {
        existing.marker.setLngLat([lng, lat])
        existing.root.render(
          React.createElement(UserMarker, {
            user,
            onClick: () => handleMarkerClick(user),
          })
        )
        return
      }

      const el = document.createElement('div')
      el.className = 'user-marker-wrapper'
      el.addEventListener('click', (e) => e.stopPropagation())

      const root = createRoot(el)
      root.render(
        React.createElement(UserMarker, {
          user,
          onClick: () => handleMarkerClick(user),
        })
      )

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map)

      entries.set(user.id, { marker, root })
    })

    entries.forEach(({ marker, root }, id) => {
      if (!currentIds.has(id)) {
        root.unmount()
        marker.remove()
        entries.delete(id)
      }
    })

    const collapseSpider = () => setSpiderUserIds(null)
    map.on('click', collapseSpider)

    const onMoveEnd = () => {
      if (effectiveSpiderIds && effectiveSpiderIds.length > 1) {
        const next = computeSpiderLngLats(
          map,
          users.filter((u) => effectiveSpiderIds.includes(u.id)),
          SPIDERFY_LEG_RADIUS_PX
        )
        effectiveSpiderIds.forEach((id) => {
          const entry = entries.get(id)
          const ll = next.get(id)
          if (entry && ll) entry.marker.setLngLat(ll)
        })
      }
    }
    map.on('moveend', onMoveEnd)

    return () => {
      map.off('click', collapseSpider)
      map.off('moveend', onMoveEnd)
    }
  }, [map, users, onUserClick, spiderUserIds])
}
