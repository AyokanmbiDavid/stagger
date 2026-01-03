import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { LockIcon } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

 const handleSubmit = async (e) => {
  e.preventDefault(); // Moved to the top for better practice
  
  // PASSWORD LENGTH CHECK
  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters long");
    setTimeout(() => { setError(""); }, 3000);
    return; // This stops the form from submitting
  }

  setLoading(true);
  try {
    const { data } = await API.post("/api/auth/login", formData);
    console.log(data._id);
    // SAVE DATA TO LOCAL STORAGE
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data._id);
    setLoading(false);
    navigate("/"); // Go to the Chat Page
  } catch (err) {
    setLoading(false);
    if (err?.response?.message) {
      setError("Invalid credentials");
    } else {
      console.log(err);
      setError(err?.message);
    }        
    setTimeout(() => { setError(""); }, 3000);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border-3 border-slate-200 p-8">
        <h2 className="text-xl font-bold text-center text-green-600 mb-6 flex items-center gap-2">Login to Stagger <LockIcon /></h2>
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 py-4 border-2 border-slate-200 bg-slate-100 rounded-xl"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 py-4  border-2 border-slate-200 bg-slate-100 rounded-xl"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white p-3 py-4 rounded-xl font-bold hover:bg-green-700 transition
          ">
           {loading ? <LoadingSmall/> : 'Log In'}
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