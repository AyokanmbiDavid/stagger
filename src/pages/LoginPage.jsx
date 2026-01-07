import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { DoorOpen, EyeIcon, LockIcon } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passform, setPassform] = useState({email:"", security_question:"",password:""});
  const [passerror, setPasserror] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passType, setpassType] = useState("password");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token) {
    navigate('/')
    }
  },[])


  function handleChangeForm (e,name) {
    setFormData({...formData,
      [name]:e.target.value
    })
  }
   function handleChangePass (e,name) {
    setPassform({...formData,
      [name]:e.target.value
    })
  }
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
    navigate("/"); 
    setTimeout(() => {
        navigate('/')
    }, 500)// Go to the Chat Page
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

async function submitPass (e) {
  e.preventDefault();

    
  // PASSWORD LENGTH CHECK
  if (passform.password.length < 6) {
    setPasserror("Password must be at least 6 characters long");
    setTimeout(() => { setPasserror(""); }, 3000);
    return; // This stops the form from submitting
  }

  setLoading(true);
  try {
    const { data } = await API.post("/api/auth/resetpass", passform.password);
    console.log(data._id);
    // SAVE DATA TO LOCAL STORAGE
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data._id);
    setLoading(false);
    navigate("/"); 
    setTimeout(() => {
        navigate('/')
    }, 500)// Go to the Chat Page
  } catch (err) {
    setLoading(false);
    if (err?.response?.message) {
      setPasserror("Invalid security question");
    } else {
      console.log(err);
      setPasserror(err?.message);
    }        
    setTimeout(() => { setPasserror(""); }, 3000);
  }
}
  return (
   <>
    <div className="w-full h-screen flex  justify-center items-center relative">
      <div className="p-2 max-md:w-full max-lg:w-6/10 w-4/10 flex flex-col h-screen justify-between ">
        <h1 className="w-full py-2 font-semibold space-y-3 text-xl">
          Stagger
        </h1>

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

          {/* forgot password */}
          <h1 
          data-modal-target="default-modal" data-modal-toggle="default-modal"
          className="text-end w-full text-red-500 text-sm mt-2 cursor-pointer">
            forgot password
          </h1>

          {/* sunbmit button */}
          <button className="flex justify-center items-center py-3 w-full rounded-2xl bg-green-600 text-white shadow-md mt-3 cursor-pointer">
            {loading ?
          <LoadingSmall/> :
          <>
            Sign In <DoorOpen />
          </>}
          </button>

          <h1 className="text-center w-full mt-3">
            dont have an account? <Link to={'/signup'} className="text-blue-600">Sign Up</Link>
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

{/* <!-- Main modal-->  */}
<div id="default-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content-->  */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* <!-- Modal header-->  */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change Password
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body-->  */}
            {passerror && <>
              <div className="w-full p-3 border-2 border-red-500 bg-red-50 text-red-700 rounded-2xl mb-2">
              {passerror}
          </div>
            </>}
            <form
            onSubmit={submitPass}
            className="p-4 md:p-5 space-y-4">
              {/* Email */}
               <label htmlFor="" className="text-gray-700 mb-2">Email..</label>
               <input type="email" 
               className="w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-1"
               placeholder="Email" value={formData.email}
               onChange={(e) => handleChangePass(e,'email')}
               required />

              {/* Security Question */}
                <label htmlFor="" className="text-gray-700 mb-2">Security Question..</label>
               <input type="text" 
               className="w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-1"
               placeholder="Your security question" 
               onChange={(e) => handleChangePass(e,'security_question')}
               required />

               {/* New Password */}
                 <label htmlFor="" className="text-gray-700 mb-2">New Password..</label>
                <div className="flex justify-between items-center w-full rounded-2xl border-2 border-gray-200">
                <input type={passType} 
                className="w-full rounded-l-2xl border-0 outline-none"
                placeholder="Password..." 
                onChange={(e) => handleChangePass(e,'password')}
                required/>
                <span 
                onClick={() => setpassType(passType == "text" ? 'password' : 'text')}
                className="p-3 px-4 rounded-r-2xl bg-gray-200">
                <EyeIcon className="w-5" />
              </span>
          </div>
              <button className="p-2 px-4 shadow-lg cursor-pointer rounded-xl bg-green-600 text-white">
                {loading ? 
                <LoadingSmall/> :
                "Submit"}
              </button>
            </form>
               
        </div>
    </div>
</div>

    </div>
   </>
  );
};

export default LoginPage;