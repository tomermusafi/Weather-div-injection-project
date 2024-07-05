import { TDailyForecast, TForecastResponse, TCityLocation } from "./data-types"
import { getWeatherData, getCityCoordinate } from "./api"
import { renderWeekTemperatures } from "./view"

const scriptElement = document.currentScript as HTMLScriptElement
export async function updateWeatherElement(location: TCityLocation | null) {
  const divId = scriptElement?.getAttribute("targetDivId")
  let targetElement = divId ? document.getElementById(divId) : document.body
  if (!targetElement) {
    targetElement = document.body
  }
  const week: TDailyForecast[] = await getweeklyForecastData(location)
  renderWeekTemperatures(targetElement, week, location)
}

export async function getweeklyForecastData(
  location: TCityLocation
): Promise<TDailyForecast[]> {
  const data: TForecastResponse = await getWeatherData(location)
  if (!data) {
    return []
  }
  const dates = data.daily.time
  const temperatures = data.daily.temperature_2m_max
  const unit = data.daily_units.temperature_2m_max

  return dates.slice(0, dates.length / 2).map((date: string, i: number) => ({
    day: getDay(date),
    temperature: Math.round(
      (temperatures[i] + temperatures[i + dates.length / 2]) / 2
    ),
    unit,
  }))
}

function getDay(date: string): string {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  return days[new Date(date).getDay()]
}

export function switchView(event): void {
  const view1 = document.getElementById("cityName")
  const view2 = document.getElementById("coordinates")
  if (event.target.value === "cityName") {
    view1.style.display = "block"
    view2.style.display = "none"
  } else {
    view1.style.display = "none"
    view2.style.display = "block"
  }
}

export async function updateForecastByCityName() {
  const cityNameInputElement = document.getElementById(
    "cityNameInput"
  ) as HTMLInputElement
  const cityName = cityNameInputElement.value
  const cityCoordinates: TCityLocation = await getCityCoordinate(cityName)

  updateWeatherElement(
    cityCoordinates
      ? {
          latitude: cityCoordinates.latitude,
          longitude: cityCoordinates.longitude,
          name: cityName,
        }
      : null
  )
}

export function updateForecastByCoordinates() {
  const latitudeInputElement = document.getElementById(
    "latitudeInput"
  ) as HTMLInputElement
  const longitudeInputElement = document.getElementById(
    "longitudeInput"
  ) as HTMLInputElement
  const latitude = latitudeInputElement.value
  const longitude = longitudeInputElement.value
  if (latitude && longitude) {
    updateWeatherElement({
      latitude: parseInt(latitude),
      longitude: parseInt(longitude),
    })
  }
}
