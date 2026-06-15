import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-pink-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BeautyGlow</h1>

        <div className="space-x-6">
          <div className="flex gap-6"> 
            <Link to="/products">Products</Link> 
          <Link to="/cart">Cart</Link> 
          <Link to="/orders">Orders</Link>
           <Link to="/login">Login</Link> 
          <Link to="/register">Register</Link> </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;