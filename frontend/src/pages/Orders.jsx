import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    // decode BEFORE API call (for debugging)
    const decoded = JSON.parse(atob(token.split(".")[1]));
    console.log("FRONTEND USER ID:", decoded.id);

    const res = await API.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("ORDERS RESPONSE:", res.data); // 🔥 important debug

    setOrders(res.data);
  } catch (error) {
    console.log(error.response?.data);
  }
};
  

  return (
    <div className="min-h-screen bg-pink-200">
      <h2 className="text-center text-pink-600 font-bold text-xl">My Orders</h2>

       {orders.length === 0 ? (
      <div className="bg-pink rounded-2xl shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">
          No orders found
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {orders.map((order) => (
    <div
      key={order._id}
      className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
    >
      <p className="text-sm text-gray-500">
        Order ID
      </p>

      <p className="font-semibold text-gray-700 truncate">
        {order._id}
      </p>

      <p className="mt-3">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {order.status}
        </span>
      </p>

      <p className="mt-4 text-pink-600 font-bold text-xl">
        ₹{order.totalAmount}
      </p>

      <div className="mt-4 border-t pt-3">
        {order.products.map((item, index) => (
          <p key={index} className="text-sm text-gray-600">
            {item.product?.name || "Product"} × {item.quantity}
          </p>
        ))}
      </div>
    </div>
  ))}
</div>
    )}
  </div>


);
}

export default Orders;
