import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock, Trash2, Save } from "lucide-react";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";

const ProfilePage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Fetch current user data on load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await API.get("/api/auth/me");
        setFormData({ username: data.username, email: data.email, password: "" });
      } catch (err) {
        setError("Failed to load user data");
      }
    };
    fetchUserData();
  }, []);

  // 2. Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Check password length IF they are trying to change it
    if (formData.password && formData.password.length < 6) {
      setError("New password must be at least 6 characters long");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);
    try {
      await API.put("/api/auth/update", formData);
      setSuccess("Profile updated successfully!");
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Update failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  // 3. Handle Delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure? This will permanently delete your account.")) {
      try {
        await API.delete("/api/auth/delete");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/signup");
      } catch (err) {
        setError("Could not delete account");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border-3 border-slate-200 p-8 shadow-sm">
        
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-xl font-bold text-green-600">Edit Profile</h2>
        </div>

        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">{error}</p>}
        {success && <p className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm text-center">{success}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Username</label>
            <div className="relative">
               <User className="absolute left-3 top-4 text-gray-400" size={18} />
               <input
                type="text"
                value={formData.username}
                className="w-full p-3 pl-10 py-4 border-2 border-slate-200 bg-slate-100 rounded-xl"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-3 top-4 text-gray-400" size={18} />
               <input
                type="email"
                value={formData.email}
                className="w-full p-3 pl-10 py-4 border-2 border-slate-200 bg-slate-100 rounded-xl"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">New Password (Leave blank to keep current)</label>
            <div className="relative">
               <Lock className="absolute left-3 top-4 text-gray-400" size={18} />
               <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 pl-10 py-4 border-2 border-slate-200 bg-slate-100 rounded-xl"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white p-3 py-4 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2">
             {loading ? <LoadingSmall /> : <><Save size={20} /> Save Changes</>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <button 
            onClick={handleDelete}
            className="w-full text-red-500 font-bold text-sm flex items-center justify-center gap-2 p-2 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 size={18} /> Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;