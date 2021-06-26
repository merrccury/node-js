const express = require("express");

const {
    getAllPositions,
    addPosition,
    updatePosition,
    deletePosition
} = require("../controller/positionController")

let router = express.Router();

router.get("/", getAllPositions);
router.post("/", addPosition);
router.put("/", updatePosition);
router.delete("/", deletePosition);

module.exports = router;