"use strict";

require("dotenv").config();

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "cool_with_whatever_test"
    : process.env.DATABASE_URL || "cool_with_whatever";
}

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  getDatabaseUri,
};