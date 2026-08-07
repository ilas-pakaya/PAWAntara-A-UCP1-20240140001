const express = require("express");
const router = express.Router();
const products = require("../data/product");

// GET /api/products - Read-only, fondasi REST API Sprint 2
router.get("/products", (req, res) => {
  res.json({
    status: "success",
    data: products
  });
});

module.exports = router;