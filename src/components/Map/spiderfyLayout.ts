import type { Map as MapLibreMap } from 'maplibre-gl'
import type { NearbyUser } from '../../types/map.types'

/** Max distance in screen pixels between projected points to count as one stack. */
export const SPIDERFY_OVERLAP_THRESHOLD_PX = 36

/** Radius in pixels from the stack centroid to place each marker leg. */
export const SPIDERFY_LEG_RADIUS_PX = 52

function distSq(ax: number, ay: number, bx: number, by: number): number {
  const dx = ax - bx
  const dy = ay - by
  return dx * dx + dy * dy
}

/**
 * Groups user ids that overlap in screen space (transitive: A–B and B–C ⇒ one group).
 * Uses pixel distance after `map.project` so zoom level is respected.
 */
export function buildOverlapGroups(
  users: NearbyUser[],
  map: MapLibreMap,
  thresholdPx: number = SPIDERFY_OVERLAP_THRESHOLD_PX
): string[][] {
  if (users.length === 0) return []

  const projected = users.map((u) => {
    const p = map.project([u.lng, u.lat])
    return { id: u.id, x: p.x, y: p.y }
  })

  const n = projected.length
  const adj: number[][] = Array.from({ length: n }, () => [])
  const thr2 = thresholdPx * thresholdPx

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (distSq(projected[i].x, projected[i].y, projected[j].x, projected[j].y) <= thr2) {
        adj[i].push(j)
        adj[j].push(i)
      }
    }
  }

  const visited = new Array(n).fill(false)
  const groups: string[][] = []

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue
    const comp: string[] = []
    const stack = [i]
    visited[i] = true
    while (stack.length) {
      const u = stack.pop()!
      comp.push(projected[u].id)
      for (const v of adj[u]) {
        if (!visited[v]) {
          visited[v] = true
          stack.push(v)
        }
      }
    }
    groups.push(comp)
  }

  return groups
}

/**
 * Places each user in `groupUsers` on a circle in pixel space around the geographic
 * centroid of the group, then converts back to lng/lat via `map.unproject`.
 */
export function computeSpiderLngLats(
  map: MapLibreMap,
  groupUsers: NearbyUser[],
  radiusPx: number = SPIDERFY_LEG_RADIUS_PX
): Map<string, [number, number]> {
  const out = new Map<string, [number, number]>()
  const n = groupUsers.length
  if (n === 0) return out
  if (n === 1) {
    const u = groupUsers[0]
    out.set(u.id, [u.lng, u.lat])
    return out
  }

  const avgLng = groupUsers.reduce((s, u) => s + u.lng, 0) / n
  const avgLat = groupUsers.reduce((s, u) => s + u.lat, 0) / n
  const center = map.project([avgLng, avgLat])

  const sorted = [...groupUsers].sort((a, b) => a.id.localeCompare(b.id))
  sorted.forEach((u, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    const x = center.x + radiusPx * Math.cos(angle)
    const y = center.y + radiusPx * Math.sin(angle)
    const ll = map.unproject([x, y])
    out.set(u.id, [ll.lng, ll.lat])
  })

  return out
}
