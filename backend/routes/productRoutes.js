const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin route (we will protect later)
router.post("/", createProduct);

module.exports = router;