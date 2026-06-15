const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  placeOrder,
  getUserOrders,
} = require("../controllers/orderController");

// Place Order
router.post("/place", protect, placeOrder);

// Get Logged-in User Orders
router.get("/", protect, getUserOrders);

module.exports = router;