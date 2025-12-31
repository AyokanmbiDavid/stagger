import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
   const [Form, setForm] = useState({
      email:'',
      password: '',
      secQuestion: '',
      phone_number: '',
      username: '',
    })
  
    function changeForm(e,[name]) {
      setForm({...Form, 
        [name]: e.target.value,
      })
    }
  
    function submitForm (e) {
      e.preventDefault()
    }

  return (
    <>
      <div className="relative h-screen w-full flex justify-center items-center">

           <form
                    onSubmit={submitForm}
                    className='max-md:w-9/10 w-2/5 rounded-2xl shadow-md p-3'>
                        <h1 className="text-lg text-slate-800 font-semibold">
                          Stagger Login
                        </h1>
                        
                        {/* Email */}
                        <div className="flex flex-col gap-2 mt-3">
                          <label className="text-sm text-">
                            Email 
                          </label>
          
                          <input type="email" 
                          className="w-full p-3 bg-slate-100 rounded-xl border-0 text-sm"
                          placeholder='Email...'
                          onChange={(e) => changeForm(e,'email')}
                          required />
                        </div>
          
                        {/* password */}
                        <div className="flex flex-col gap-2 mt-3">
                          <label className="text-sm text-">
                            Password
                          </label>
          
                          <input type="password" 
                          className="w-full p-3 bg-slate-100 rounded-xl border-0 text-sm"
                          placeholder='Password'
                          onChange={(e) => changeForm(e,'password')}
                          required />
                        </div>
          
                        <button className="w-full p-3 py-4 mt-3 text-white text-sm bg-green-600 rounded-xl">
                          Login
                        </button>
          
                        <h1 className="text-sm text-slate-600 text-center mt-3">
                          dont have an account? <Link to={'/'} className='text-blue-700'>Register</Link>
                        </h1>
                    </form>
      </div>
    </>
  )
}

export default Login