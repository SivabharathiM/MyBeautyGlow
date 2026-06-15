import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.delete("/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Cart cleared!");
      setCart(null);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/orders/place",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");
      setCart(null);
    } catch (error) {
      console.log(error.response?.data);
      alert("Order failed");
    }
  };

  if (!cart) return <h2>Loading cart...</h2>;

  const total = cart.products.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

 return (
  <div className="min-h-screen bg-pink-50 p-6">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-pink-600 mb-8">
        My Cart
      </h2>

      {cart.products.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-md p-6 mb-4 hover:shadow-lg transition"
        >
          <h3 className="text-2xl font-semibold text-gray-800">
            {item.product.name}
          </h3>

          <p className="text-gray-600 mt-2">
            Price: ₹{item.product.price}
          </p>

          <p className="text-gray-600">
            Quantity: {item.quantity}
          </p>
        </div>
      ))}

      <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
        <h3 className="text-3xl font-bold text-pink-600">
          Total: ₹{total}
        </h3>

        <div className="flex gap-4 mt-6">
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Clear Cart
          </button>

          <button
            onClick={placeOrder}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default Cart;