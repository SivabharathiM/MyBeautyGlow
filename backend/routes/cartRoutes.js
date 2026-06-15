const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/cart");

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

// Add to Cart
router.post("/add", protect, addToCart);

// Get Current User Cart
router.get("/", protect, getCart);

// Remove Item from Cart
router.post("/remove", protect, removeFromCart);

// Clear Entire Cart
router.delete("/clear", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.deleteOne({ user: userId });

    res.json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;