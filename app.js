const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const searchRoutes = require("./routes/search");
const placesRoutes = require("./routes/places");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/search", searchRoutes);
app.use("/places", placesRoutes);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header(
    "Access-Control-Allow-Origin",
    "https://cool-with-whatever.surge.sh/"
  );
  next();
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
