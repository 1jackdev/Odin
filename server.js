"use strict";

const app = require("./app");
const { PORT } = require("./port");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
