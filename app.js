const express = require("express");
require("dotenv").config();

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

const searchRoutes = require("./routes/search");
const placesRoutes = require("./routes/places");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use(function (req, res, next) {
  let header =
    process.env.NODE_ENV === "production"
      ? "https://cool-with-whatever.surge.sh"
      : "http://localhost:3000";
  res.header("Access-Control-Allow-Origin", header);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  next();
});

app.use("/search", searchRoutes);
app.use("/places", placesRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

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
