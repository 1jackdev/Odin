const Selection = require("../models/selection");

function getUserPreferences(selections) {
  const genericCategories = ["bars", "restaurants", "coffee", "desserts"];
  let categories = {};
  let categoryArr = [];
  for (let selection of selections) {
    let name = selection.name;
    let selectionCategories = selection.category_aliases;
    for (let a of selectionCategories) {
      if (categories[a]) {
        categories[a].push(name);
      } else categories[a] = [name];
    }
  }
  if (categories) {
    categoryArr = Object.entries(categories);
    // remove any one-offs
    // disregard generic categories
    categoryArr = categoryArr.filter(
      (a) => a[1].length > 1 && genericCategories.indexOf(a[0]) === -1
    );
    // we just need the name and "weight"
    if (categoryArr) {
      categoryArr = categoryArr.map((b) => {
        return {
          name: b[0],
          length: b[1].length,
        };
      });
    }
  }

  return categoryArr;
}

function findRecommendation(results, preferences) {
  if (preferences && results.length > 1) {
    for (let result of results) {
      let placeWeight = 0;
      let placeCategories = result.categories;
      for (let category of placeCategories) {
        for (let pref of preferences) {
          if (category.alias === pref.name) placeWeight++;
        }
      }
      result.weight = placeWeight;
    }
    results = results.sort((a, b) => b.weight - a.weight);
  }
  return results;
}

async function trimOptions(username, results) {
  let trimmedResults = results;
  let userSelections = await Selection.getByUsername(username);
  let userPreferences = getUserPreferences(userSelections);
  let userYelpIds = userSelections.map((s) => s.yelp_id);
  if (userSelections) {
    let resultOptions = Object.values(results);
    trimmedResults = resultOptions.filter((place) => {
      return userYelpIds.indexOf(place.id) === -1;
    });
  }
  trimmedResults = findRecommendation(trimmedResults, userPreferences);
  trimmedResults =
    trimmedResults.length > 2
      ? [trimmedResults[0], trimmedResults[trimmedResults.length - 1]]
      : trimmedResults;
  return trimmedResults;
}

module.exports = { trimOptions };
