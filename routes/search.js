"use strict";

const { YELP_API_KEY } = require("../config/keys");
const axios = require("axios");
const express = require("express");
const YELP_SEARCH_API = "https://api.yelp.com/v3/businesses/search";
const Selection = require("../models/selection");

const router = express.Router({ mergeParams: true });

router.get("/", async function (req, res, next) {
  const { type, location, distance, username } = req.query;
  try {
    let conversionFactor = 0.621371;
    let radiusInMeters = Math.round((distance / conversionFactor) * 1000, 4);
    let params = {
      term: type,
      location: location,
      open_now: true,
      radius: radiusInMeters,
      limit: 6,
    };
    let resp = await axios.get(YELP_SEARCH_API, {
      headers: {
        Authorization: "Bearer " + YELP_API_KEY,
      },
      params: params,
    });
    let results = resp.data.businesses;
    // if someone is signed in, don't show them something
    // they've tried before
    if (username) {
      let userSelections = await Selection.getByUsername(username);
      let userYelpIds = userSelections.map((s) => s.yelp_id);
      if (userSelections) {
        let resultOptions = Object.values(results);
        results = resultOptions.filter((place) => {
          return userYelpIds.indexOf(place.id) === -1;
        });
        results = results.length > 2 ? results.splice(0, 2) : results;
        return res.json({ results });
      }
    }
    results = results.length > 2 ? results.splice(0, 2) : results;
    return res.json({ results });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
