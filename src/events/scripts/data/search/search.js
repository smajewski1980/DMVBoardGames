export const DEFAULT_SEARCH_PARAMETER = "any";

export const UNDEFINED_EVENT_LOCATION_PARAMETER =
  "See group on Meetup for location";

export function findResults(data, searchParams) {
  const searchDay = searchParams.day;
  const searchLocation = searchParams.location;

  //TODO: Add isDefaultMethod here.
  if (
    (searchDay === DEFAULT_SEARCH_PARAMETER || !searchDay) &&
    (searchLocation === DEFAULT_SEARCH_PARAMETER || !searchLocation)
  ) {
    return {
      groups: data,
    };
  }

  const eventCopy = JSON.parse(JSON.stringify(data));
  const groupsToInclude = [];

  eventCopy.forEach((group) => {
    const eventsToInclude = [];
    group.data.events.forEach((event) => {
      if (eventMatch(event, searchParams, group)) {
        eventsToInclude.push(event);
      }
    });

    if (eventsToInclude.length > 0) {
      group.data.events = eventsToInclude;
      groupsToInclude.push(group);
    } else if (
      group.data.locations &&
      searchLocation !== DEFAULT_SEARCH_PARAMETER &&
      group.data.locations.includes(searchLocation) &&
      searchDay === DEFAULT_SEARCH_PARAMETER
    ) {
      groupsToInclude.push(group);
    }
  });
  eventCopy.groups = groupsToInclude;
  groupsToInclude.forEach(function (group) {
    group["frontendState"]["visibleEvents"] = group.data.events;
  });
  return eventCopy;
}

function eventMatch(event, searchParams, group) {
  let dayMatch = false;
  if (
    searchParams.day === event.day ||
    searchParams.day === DEFAULT_SEARCH_PARAMETER
  ) {
    dayMatch = true;
  }

  let location = event.location;
  if (
    !event.location ||
    event.location === UNDEFINED_EVENT_LOCATION_PARAMETER
  ) {
    location = group.data.locations;
  }
  let locationMatch = false;
  if (
    location.includes(searchParams.location) ||
    searchParams.location === DEFAULT_SEARCH_PARAMETER
  ) {
    locationMatch = true;
  }
  return dayMatch && locationMatch;
}

export function getSearchResultGroups(searchResults) {
  return searchResults.groups;
}
