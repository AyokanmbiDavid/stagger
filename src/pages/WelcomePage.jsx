import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {

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
      <div className="relative h-screen w-full flex justify-center items-center ">

          <form
          onSubmit={submitForm}
          className='max-md:w-9/10 w-2/5 rounded-2xl shadow-md p-3'>
              <h1 className="text-lg text-slate-800 font-semibold">
                Stagger Register
              </h1>

              {/* Uername */}
              <div className="flex flex-col gap-2 mt-3">
                <label className="text-sm text-">
                  UserName
                </label>

                <input type="text" 
                className="w-full p-3 bg-slate-100 rounded-xl border-0 text-sm"
                placeholder='UserName...'
                onChange={(e) => changeForm(e,'username')}
                required />
              </div>

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

              {/* security question */}
              <div className="flex flex-col gap-2 mt-3">
                <label className="text-sm text-">
                  Security Question
                </label>

                <input type="text" 
                className="w-full p-3 bg-slate-100 rounded-xl border-0 text-sm"
                placeholder='Security Question'
                onChange={(e) => changeForm(e,'secQuestion')}
                required />

                <h1 className="text-sm text-red-500">
                  Used for resetting password
                </h1>
              </div>

              {/* phone number */}
              <div className="flex flex-col gap-2 mt-3">
                <label className="text-sm text-">
                  Phone Number
                </label>

                <input type="number" 
                className="w-full p-3 bg-slate-100 rounded-xl border-0 text-sm"
                placeholder='Phone Number...'
                onChange={(e) => changeForm(e,'phone_number')}
                required />
              </div>

              <button className="w-full p-3 py-4 mt-3 text-white text-sm bg-green-600 rounded-xl">
                Register
              </button>

              <h1 className="text-sm text-slate-600 text-center mt-3">
                already have an account? <Link to={'/login'} className='text-blue-700'>Login</Link>
              </h1>
          </form>
      </div>
    </>
  )
}

export default WelcomePage