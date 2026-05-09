const express = require("express");

const router = express.Router();

const reportController =
    require("./reports.controller");

router.get(
    "/stats",
    reportController.stats
);

router.get(
    "/sales",
    reportController.sales
);

router.get(
    "/low-stock",
    reportController.lowStock
);

router.get(
    "/transactions",
    reportController.transactions
);

module.exports = router;