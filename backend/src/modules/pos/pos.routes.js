const express = require("express");

const router = express.Router();

const posController = require("./pos.controller");

router.get("/products", posController.products);

router.post("/checkout", posController.checkout);

module.exports = router;