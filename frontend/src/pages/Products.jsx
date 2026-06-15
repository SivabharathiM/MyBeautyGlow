import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/cart/add",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart!");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      alert(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  };

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5"
        >
          <div className="h-48 flex items-center justify-center bg-pink-100 rounded-xl mb-4">
            <span className="text-pink-500 text-lg font-semibold">
              {product.name}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800">
            {product.name}
          </h3>
         
          <p className="text-gray-500 mt-2">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-pink-600 mt-4">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product._id)}
            className="w-full mt-5 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>


);
}

export default Products;