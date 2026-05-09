const router = require("express").Router();
const ctrl = require("./brand.controller");
const { protect, authorize, } = require("../../middleware/auth.middleware");

// CREATE
router.post("/",
    protect,
    authorize("admin"),
    ctrl.create
);

// READ
router.get(
    "/",
    protect,
    ctrl.getAll
);

router.get(
    "/:id",
    protect,
    ctrl.getOne
);

// UPDATE
router.put(
    "/:id",
    protect,
    authorize("admin"),
    ctrl.update
);

// STATUS
router.put(
    "/:id/status",
    protect,
    authorize("admin"),
    ctrl.toggleStatus
);

// DELETE
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    ctrl.remove
);

module.exports = router;