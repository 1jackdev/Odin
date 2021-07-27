require("dotenv").config();

const GOOGLE_API_KEY = "AIzaSyCNz895M6EkAN4e-uVsfdwgVZswF2NnoGc";
const YELP_API_KEY =
  "wMVO48Hcvs1lkB4O8varjd6hhj113jLGZq3UitoT7OWjY9nmnjhf_UZcls4V7hL0AkXHOxDTEgMWKnclQzHknYmi8u6qOedEbUii-wPghwJIYcbjDgzKk2cZDNf-YHYx";
// const YELP_CLIENT_ID = "g6FnYuAfZnw1wQjfJxIuCA";
const YELP_SEARCH_API = "https://api.yelp.com/v3/businesses/search";
const PORT = +process.env.PORT || 3001;
const DIRECTIONS_API = "https://maps.googleapis.com/maps/api/directions/json";

module.exports = {
  YELP_API_KEY,
  DIRECTIONS_API,
  GOOGLE_API_KEY,
  PORT,
  YELP_SEARCH_API,
};
