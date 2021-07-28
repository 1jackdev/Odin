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

// async function getDetails({ place, location }) {
//   let api_url = `https://api.yelp.com/v3/businesses/${place}`;
//   // miles-placeholder / conversionFactor * 1000
//   let resp = await axios.get(api_url, {
//     headers: {
//       Authorization: "Bearer " + YELP_API_KEY,
//     },
//   });
//   let results = resp.data;
//   let address = results.location.display_address;
//   let googleResp = await axios.get(
//     `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location}&destinations=${address}&key=${GOOGLE_API_KEY}`
//   );
//   let distanceInMiles =
//     googleResp.data.rows[0].elements[0].distance.value * 0.00062137;
//     results.distanceInMiles = distanceInMiles.toFixed(2);
//     return results;
// }

// export default getDetails;
