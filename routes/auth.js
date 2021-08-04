"use strict";

/** Routes for authentication. */
const jsonschema = require("jsonschema");

const express = require("express");
const User = require("../models/user");
const { createToken } = require("../helpers/token");
const router = express.Router({ mergeParams: true });
const userAuth = require("../schemas/UserAuth.json");
const UserRegister = require("../schemas/UserRegister.json");
const { BadRequestError } = require("../expressError");
/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body.credentials, userAuth);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const { username, password } = req.body.credentials;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body.credentials, UserRegister);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const newUser = await User.register({
      ...req.body.credentials,
      isAdmin: false,
    });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
