import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", formData);
      
      // SAVE DATA TO LOCAL STORAGE
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      
      navigate("/"); // Go to the Chat Page
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-blue-500"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-blue-500"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          New here? <Link to="/signup" className="text-blue-600 font-bold">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;