"use strict";

const { YELP_API_KEY, YELP_SEARCH_API } = require("../config");
const axios = require("axios");
const express = require("express");

const router = express.Router({ mergeParams: true });

router.get("/", async function (req, res, next) {
  const { type, location, distance } = req.query;

  try {
    let conversionFactor = 0.621371;
    // miles-placeholder / conversionFactor * 1000
    let radiusInMeters = Math.round((distance / conversionFactor) * 1000, 4);
    let params = {
      term: type,
      location: location,
      open_now: true,
      radius: radiusInMeters,
      limit: 2
    };
    let resp = await axios.get(YELP_SEARCH_API, {
      headers: {
        Authorization: "Bearer " + YELP_API_KEY,
      },
      params: params,
    });
    let results = resp.data.businesses;
    return res.json({ results });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
