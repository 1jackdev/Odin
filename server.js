"use strict";

const app = require("./app");
const PORT = +process.env.PORT || 3001;
const { getDatabaseUri } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
  console.log(getDatabaseUri());
});
