const express = require("express");

const router = express.Router();

const stockController = require("./stock.controller");

router.get("/", stockController.index);

router.get("/history/:id", stockController.history);

router.post("/scan", stockController.scan);

router.post("/update", stockController.update);

module.exports = router;