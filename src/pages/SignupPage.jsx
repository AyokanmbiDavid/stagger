import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { FileIcon } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD LENGTH CHECK
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setTimeout(() => { setError(""); }, 3000);
      return; // Stop form submission
    }

    setLoading(true);
    try {
      await API.post("/api/auth/signup", formData);
      setLoading(false);
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      setLoading(false);
      if (err?.response?.message) {
        setError('Email registered or invalid credentials');
      } else {
        setError(err?.message);
      }        
      setTimeout(() => { setError(""); }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border-3 border-gray-200 p-8">
        <h2 className="text-xl font-bold text-green-600 mb-6 flex gap-2 items-center">
          Create Account with Stagger <FileIcon />
        </h2>
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 py-4 border border-slate-200 bg-slate-100 rounded-xl"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 py-4 border border-slate-200 bg-slate-100 rounded-xl"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 py-4 border border-slate-200 bg-slate-100 rounded-xl"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white p-3 py-4 rounded-lg font-bold hover:bg-green-700 transition">
            {loading ? <LoadingSmall/> : 'Sign Up'}
          </button>

          <h1 className="text-sm text-green-800 text-center">
            You would be redirected to login page after sign up is successful, then login to this app
          </h1>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;