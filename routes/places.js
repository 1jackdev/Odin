"use strict";

const { YELP_API_KEY } = require("../config");
const axios = require("axios");
const express = require("express");

const router = express.Router({ mergeParams: true });

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    let resp = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
      headers: {
        Authorization: "Bearer " + YELP_API_KEY,
        AccessControlAllowOrigin: "*",
      },
    });
    let results = resp.data;
    return res.json({ results });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
