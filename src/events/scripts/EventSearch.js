import { eventSearchState } from "./data/search/EventSearchState.js";

const DEFAULT_SEARCH_PARAMETER = "any";

const days = [
  DEFAULT_SEARCH_PARAMETER,
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function updateLocations(groups) {
  const locations = new Set();
  groups.forEach((group) => {
    group.locations.split(",").forEach((location) => {
      locations.add(location.trim());
    });
  });

  const locationArray = Array.from(locations);

  locationArray.sort();
  locationArray.unshift(DEFAULT_SEARCH_PARAMETER);

  let id = 0;
  const locationData = [];
  locationArray.map((location) => {
    locationData.push({
      id: id,
      name: location,
    });
    id++;
  });

  eventSearchState.locations = locationData;
  refreshLocations();
}

function refreshLocations() {
  document.querySelector("#search-locations").innerHTML = getLocationSelect();
}

function setupEventHandlers() {
  const searchForm = document.querySelector("form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchEvent = new CustomEvent("search", {
      detail: {
        location: eventSearchState.location,
        day: eventSearchState.day,
      },
    });
    document.dispatchEvent(searchEvent);
  });

  const select = document.querySelector("#search-locations");

  select.addEventListener("change", (e) => {
    eventSearchState.location = e.target.value;
  });

  const searchDays = document.querySelector("#search-days");

  searchDays.addEventListener("change", (e) => {
    eventSearchState.day = e.target.value;
  });
}

function getLocationSelect() {
  const data = `
    ${eventSearchState.locations.map(
      (location) =>
        `<option key=${location.index} value=${location.name}>
          ${
            location === DEFAULT_SEARCH_PARAMETER
              ? "Any location"
              : location.name
          }
        </option>`,
    )}`;
  return data;
}
function getLocationHtml() {
  return ` 
    <label>Chose a location: </label>
    <select
      id="search-locations"
      name="locations"
      value=${eventSearchState.location}
    >

    ${getLocationSelect()}
    </select>`;
}

function init() {
  const html = `
    <h1>Search Events</h1>
      <form id='search-form'>
      
        <div>
          ${getLocationHtml(eventSearchState.locations)}
         
          &nbsp;
          <label htmlFor="days">Chose a day:</label>
          &nbsp;
          <select
            name="days"
            id="search-days"
            value=${eventSearchState.day}
          >
            ${days.map(
              (day, index) =>
                `<option key=${index} value=${day}>
                ${day === DEFAULT_SEARCH_PARAMETER ? "Any day" : day}
              </option>`,
            )}
          </select>
        </div>
        <br></br>
        <button type="submit">Submit</button>
      </form>
  `;
  document.querySelector("#event-search").innerHTML = html;
}

init();
setupEventHandlers();
