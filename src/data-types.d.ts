export type TDailyForecast = {
  day: string
  temperature: number
  unit: string
}

export type TForecastResponse = {
  latitude: number
  longitude: number
  daily_units: { temperature_2m_max: string }
  daily: { time: string[]; temperature_2m_max: number[] }
}
export type TCityResponse = {
  results: TCityLocation[]
}
export type TCityLocation = {
  name?: string
  latitude: number
  longitude: number
}
