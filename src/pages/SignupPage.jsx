import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { Cloud, EyeIcon, FileIcon } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "",security_question:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passType, setpassType] = useState("password");

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
      if (err?.response) {
        setError('Email registered or invalid credentials');
      } else {
        setError("Network Error");
      }        
      setTimeout(() => { setError(""); }, 3000);
    }
  };

  function handleChangeForm (e,name) {
    setFormData({...formData, 
      [name]: e.target.value
    })
  }

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="max-md:w-full p-2 max-lg:w-5/10 w-4/10 h-screen flex flex-col justify-between items-center">
            <h1 className="w-full py-2 font-semibold space-y-3 text-xl">
              Stagger
            </h1>

            {/* form */}
             {/* body */}
        <div className="w-full flex flex-col">
          {error && <>
          <div className="w-full p-3 border-2 border-red-500 bg-red-50 text-red-700 rounded-2xl mb-2">
              {error}
          </div>
          </>}
          {/* form */}
         <form action=""
         onSubmit={handleSubmit}
         className="w-full flex flex-col max-md:px-3">
           {/* Username */}
           <label htmlFor="" className="text-sm text-slat-700 mb-3">
            Username...</label>
            <input type="text" 
            className="border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-slate-200 mb-3"
            placeholder="Username.."
            onChange={(e) => handleChangeForm(e,'username')}
            required />

          {/* Email */}
           <label htmlFor="" className="text-sm text-slat-700 mb-3">
            Email...</label>
            <input type="email" 
            className="border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-slate-200"
            placeholder="Email.."
            onChange={(e) => handleChangeForm(e,'email')}
            required />

          {/* password */}
           <label htmlFor="" className="text-sm text-slat-700 mb-3 mt-4">
            Passsword...</label>
            <div className="flex justify-between items-center w-full rounded-2xl border-2 border-gray-200">
            <input type={passType} 
            className="w-full rounded-l-2xl border-0 outline-none"
            placeholder="Password..." 
            onChange={(e) => handleChangeForm(e,'password')}
            required/>
            <span 
            onClick={() => setpassType(passType == "text" ? 'password' : 'text')}
            className="p-3 px-4 rounded-r-2xl bg-gray-200">
            <EyeIcon className="w-5" />
           </span>
          </div>

          {/*Sec Question*/}
           <label htmlFor="" className="text-sm text-slat-700 mt-3 mb-3">
           Security Question used for reseting password</label>
            <input type="text" 
            className="border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-slate-200 mb-3"
            placeholder="Security Question.."
            onChange={(e) => handleChangeForm(e,'security_question')}
            required />

          {/* sunbmit button */}
          <button className="flex justify-center items-center py-3 w-full rounded-2xl bg-green-600 text-white shadow-md mt-3 cursor-pointer">
            {loading ?
          <LoadingSmall/> :
          <>
            Sign Up <Cloud />
          </>}
          </button>

          <h1 className="w-full text-center text-gray-700 mt-3">
            Already have an Account? <Link to={'/login'} className="text-blue-600">Sign In</Link>
          </h1>
         </form>
        </div>

        {/* bottom */}
        <div className="w-full py-3">
            <h1 className="text-center font-semibold text-gray-700">
              Developed by Dayvid @2026 All right Reserved
            </h1>
        </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;