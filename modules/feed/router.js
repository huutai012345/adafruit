const express = require("express");
const { createData, getAllData, getLastData } = require("./handle");

const feedRouter = express.Router();

feedRouter.post("/data", createData);
feedRouter.get("/data", getAllData);
feedRouter.get("/data/last", getLastData);

module.exports = feedRouter;
