const express = require("express");

const {
    getAllSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
} = require("../controller/suppleirController")

let router = express.Router();

router.get("/", getAllSuppliers);
router.post("/", addSupplier);
router.put("/", updateSupplier);
router.delete("/", deleteSupplier);

module.exports = router;