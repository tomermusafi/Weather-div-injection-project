import { TCityLocation } from "./data-types"
import { updateWeatherElement } from "./utils"

const initialLocation: TCityLocation = {
  latitude: 32.0809,
  longitude: 34.7806,
  name: "Tel Aviv",
}
document.addEventListener("DOMContentLoaded", async () => {
  updateWeatherElement(initialLocation)
})
