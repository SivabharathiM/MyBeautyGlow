import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful!");
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">

      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
      <div className="mb-5 ">
        <label className="block text-gray-700 font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-pink-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" w-full border border-pink-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition"
      >
        Login
      </button>
    </form>
 </div>

);
}

export default Login;