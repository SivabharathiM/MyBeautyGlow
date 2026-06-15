const Order = require("../models/order");
const Cart = require("../models/cart");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    cart.products.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    const order = await Order.create({
      user: userId,
      products: cart.products,
      totalAmount,
    });

    // Clear cart after order
    cart.products = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).populate(
      "products.product"
    );

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
};