const express = require("express");

const {
    getAllProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controller/productsController")

let router = express.Router();

router.get("/", getAllProduct);
router.post("/", addProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

module.exports = router;