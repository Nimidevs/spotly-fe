const getApiKey = () => import.meta.env.VITE_MAPTILER_API_KEY ?? ''

/** MapTiler style.json URLs (required for MapLibre). Key is appended when the style is used. */
export const getLightStyleUrl = () =>
  `https://api.maptiler.com/maps/streets/style.json?key=${getApiKey()}`
export const getDarkStyleUrl = () =>
  `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${getApiKey()}`

/** Default style URL for the map (light). */
export const LIGHT_STYLE = getLightStyleUrl()
export const DARK_STYLE = getDarkStyleUrl()
