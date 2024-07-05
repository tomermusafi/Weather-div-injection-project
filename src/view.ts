import { TCityLocation, TDailyForecast } from "./data-types"
import {
  updateForecastByCoordinates,
  updateForecastByCityName,
  switchView,
} from "./utils"

export function renderWeekTemperatures(
  targetElement: HTMLElement,
  weekTemperatures: TDailyForecast[],
  location: TCityLocation | null
) {
  const weatherDivId = "weatherDivId"
  const weatherDiv = document.getElementById(weatherDivId)
  if (weatherDiv) {
    if (targetElement.contains(weatherDiv)) {
      targetElement.removeChild(weatherDiv)
    }
  }
  const html = `
    <div id="${weatherDivId}" style="display: flex; flex-direction: column; gap: 16px; width:100%; height:100%; overflow: auto;white-space: nowrap;">
      ${renderViewSwitcher()}
      ${renderSearchViews()}
      ${location && location.name ? `<strong>${location.name}</strong>` : ""}
      ${
        location
          ? `latitude: ${location.latitude} longitude:${location.longitude}`
          : ""
      }
      <div style="display: flex; gap: 8px; align-items: center;">
        ${
          weekTemperatures.length > 0 && location
            ? weekTemperatures.map((day) => renderDay(day)).join("")
            : "Empty Data"
        }
      </div>
    </div>
  `
  targetElement.innerHTML += html
  addEventListeners()
}
function renderViewSwitcher() {
  return `
        <div style="display: flex; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <input id="cityNameView" type="radio" name="view" value="cityName" checked />
            <label>Search by city name</label>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <input id="CoordinatesView" type="radio" name="view" value="coordinates" />
            <label>Search by coordinates</label>
          </div>
        </div>
      `
}

function renderSearchViews() {
  return `
      <div id="cityName" class="view">
        <input id="cityNameInput" type="text" placeholder="Enter City Name" />
        <button id="updateCityNameButton">Update</button>
      </div>
      <div id="coordinates" class="view" style="display: none;">
        <input id="latitudeInput" type="number" placeholder="Enter latitude" />
        <input id="longitudeInput" type="number" placeholder="Enter longitude" />
        <button id="updateCoordinatesButton">Update</button>
      </div>
    `
}

function renderDay(dailyForecast: TDailyForecast) {
  return `
        <div style="display: flex; flex-direction: column; gap: 4px; min-width: 54px; color: white; background: #54a0ff; border-radius: 10px; padding: 8px; justify-content: center; align-items: center;">
          <div>${dailyForecast.day}</div>
          <div>${dailyForecast.temperature}${dailyForecast.unit}</div>
        </div>
      `
}
function addEventListeners() {
  const cityNameView = document.getElementById("cityNameView")
  const CoordinatesView = document.getElementById("CoordinatesView")
  const updateCityNameButton = document.getElementById("updateCityNameButton")
  const updateCoordinatesButton = document.getElementById(
    "updateCoordinatesButton"
  )

  //Remove existing listeners
  cityNameView.removeEventListener("click", switchView)
  CoordinatesView.removeEventListener("click", switchView)
  updateCityNameButton.removeEventListener("click", updateForecastByCityName)
  updateCoordinatesButton.removeEventListener(
    "click",
    updateForecastByCoordinates
  )

  //Add listeners
  cityNameView.addEventListener("click", switchView)
  CoordinatesView.addEventListener("click", switchView)
  updateCityNameButton.addEventListener("click", updateForecastByCityName)
  updateCoordinatesButton.addEventListener("click", updateForecastByCoordinates)
}
