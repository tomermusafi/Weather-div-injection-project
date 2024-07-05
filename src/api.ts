import { TCityLocation, TCityResponse, TForecastResponse } from "./data-types"

export async function getWeatherData(
  location: TCityLocation
): Promise<TForecastResponse | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max&forecast_days=14`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`)
    }

    const data: TForecastResponse = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch weather data:", error)
    return null
  }
}

export async function getCityCoordinate(
  cityName: string
): Promise<TCityLocation | null> {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error fetching city coordinates: ${response.statusText}`)
    }

    const data: TCityResponse = await response.json()

    if (data && data.results && data.results.length > 0) {
      return data.results[0]
    } else {
      throw new Error(`City not found: ${cityName}`)
    }
  } catch (error) {
    console.error("Failed to fetch city coordinates:", error)
    return null
  }
}
