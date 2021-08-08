const axios = require("axios");
const Selection = require("../models/selection");

async function trimOptions(username, results) {
  let trimmedResults = results;
  let userSelections = await Selection.getByUsername(username);
  let userYelpIds = userSelections.map((s) => s.yelp_id);
  if (userSelections) {
    let resultOptions = Object.values(results);
    trimmedResults = resultOptions.filter((place) => {
      return userYelpIds.indexOf(place.id) === -1;
    });
  }
  trimmedResults =
    trimmedResults.length > 2 ? trimmedResults.splice(0, 2) : trimmedResults;
  return trimmedResults;
}

module.exports = { trimOptions };
