"use strict";

const { YELP_API_KEY } = require("../config/keys");
const axios = require("axios");
const express = require("express");
const YELP_SEARCH_API = "https://api.yelp.com/v3/businesses/search";
const { trimOptions } = require("../helpers/engine");

const router = express.Router({ mergeParams: true });

router.get("/", async function (req, res, next) {
  let trimmedResults;
  let limit = 4;
  const { type, location, distance, username, lat, lng } = req.query;
  try {
    let conversionFactor = 0.621371;
    let radiusInMeters = Math.round((distance / conversionFactor) * 1000, 4);
    let params = {
      term: type,
      location: location,
      open_now: true,
      radius: radiusInMeters,
      limit: limit,
    };
    if (!location) {
      delete params.location
      params.latitude = parseFloat(lat);
      params.longitude = parseFloat(lng);
    }
    const {data} = await axios.get(YELP_SEARCH_API, {
      headers: {
        Authorization: "Bearer " + YELP_API_KEY,
      },
      params: params,
    });
    let results = data.businesses;
    // if someone is signed in, don't show them something
    // they've tried before
    if (username) trimmedResults = await trimOptions(username, results);

    if (trimmedResults) {
      results = trimmedResults;
    } else {
      results = results.length > 2 ? results.splice(0, 2) : results;
    }
    return res.json({ results });
  } catch (err) {
    console.log(err.response.data)
    return res.json(err.response.data);
  }
});

module.exports = router;
