/** Express app for odin. */

const express = require("express");

const { NotFoundError } = require("./expressError");

const searchRoutes = require("./routes/search");
const placesRoutes = require("./routes/places");

const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/search", searchRoutes);
app.use("/places", placesRoutes);

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
