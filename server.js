const express = require("express");
const bodyParser = require("body-parser");
const feedRouter = require("./modules/feed/router");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/feed", feedRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
