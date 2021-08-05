"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
// const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for selections. */

class Selection {
  /** Given a username and yelp_id, return the selection.
   *
   * Returns { username, yelp_id }
   **/

  static async getByUsername(username) {
    const selectionRes = await db.query(
      `SELECT username, yelp_id
           FROM selections
           WHERE username = $1`,
      [username]
    );

    const selection = selectionRes.rows;
    if (!selection) return null;

    return selection;
  }

  /** Delete given selection from database; returns undefined. */

  //   static async remove(username, yelp_id) {
  //     let result = await db.query(
  //       `DELETE
  //              FROM selections
  //              WHERE username = $1 AND yelp_id = $2
  //              RETURNING username, yelp_id`,
  //       [username, yelp_id]
  //     );
  //     const selection = result.rows[0];

  //     if (!selection)
  //       throw new NotFoundError(`No selection: ${username}, ${yelp_id}`);
  //   }
}

module.exports = Selection;
