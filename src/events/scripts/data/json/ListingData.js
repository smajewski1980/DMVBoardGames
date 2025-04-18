import { gameStores } from "./GameStoreData.js";
import { gameRestaurants } from "./GameRestaurantData.js";
import { GROUP_DATA } from "./GroupData.js";
import { getConventionData } from "./ConventionData.js";

export function getData() {
  let groups = structuredClone(Object.values(GROUP_DATA));
  groups.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  const sortedGameStores = gameStores.slice();
  sortedGameStores.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }

    return 0;
  });

  const sortedGameRestaurants = gameRestaurants.slice();
  sortedGameRestaurants.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }

    return 0;
  });

  return {
    groups: groups,
    conventions: getConventionData(),
    gameStores: sortedGameStores,
    gameRestaurants: sortedGameRestaurants,
  };
}
