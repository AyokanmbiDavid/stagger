import React, { Suspense, useEffect, useState } from 'react'
import { apiUrl, LoadingBig, LoadingSmall } from '../components/Exporting'
import { ReactTyped } from 'react-typed'
import { Link, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {motion} from 'framer-motion'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [allgetUser, setAllgetuser] = useState([]);
    const [welForm, setWelForm] = useState({
      email: '',
      password: ''
    });
  const [toastNotice, setToastNotice] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const showToast = (message, type = 'error', ms = 4000) => {
    setToastNotice({ message, type })
    // trigger slide-in on next tick
    setTimeout(() => setToastVisible(true), 10)
    // hide: start slide-out slightly before full timeout
    setTimeout(() => setToastVisible(false), Math.max(0, ms - 260))
    // remove notice after timeout
    setTimeout(() => setToastNotice(null), ms)
  }

    function changeForm (e,name) {
    setWelForm({...welForm,
      [name]: e.target.value
    })
  };

  useEffect(() => {
    let checkLog = localStorage.getItem('staggerLog')
    
    if (checkLog) {
      navigate('/home')
    }
  }, []);


   // submit form funstion
  function submitForm (e) {
    e.preventDefault();
    setLoading(true)
    // call backend login
    axios.post(`${apiUrl}/users/login`, welForm)
      .then(res => {
        const { token, user } = res.data || {}
        if (token) {
          localStorage.setItem('staggerToken', token)
          localStorage.setItem('staggerUser', JSON.stringify(user))
          // keep staggerLog for ProtectedRoute compatibility
          localStorage.setItem('staggerLog', JSON.stringify({ email: user.email, username: user.username }))
          showToast('Login successful', 'success')
          setTimeout(() => navigate('/home'), 200)
        } else {
          showToast('Login failed', 'error')
        }
      })
      .catch(err => {
        console.error(err?.response?.data || err)
        showToast(err?.response?.data?.error || 'Wrong email or password', 'error')
      })
      .finally(() => setLoading(false))
  }

  
  return (
    <>
      <Suspense fallback={<LoadingBig/>}>
        <div className="py-2 h-screen w-full relative">
          {toastNotice && 
            <div className={`fixed top-6 right-6 z-50 transform transition-transform duration-300 ease-out flex gap-2 items-center ${toastVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} ${toastNotice.type === 'success' ? 'bg-green-500 border-2 border-green-600 border-b-3 boder-b-green-700' : 'bg-red-500 border-2 border-b-3 border-red-600 border-b-red-700'} text-white px-4 py-2 rounded-xl shadow-lg`}> 
              {toastNotice.message}
              <XMarkIcon onClick={() => setToastVisible(false)} className={`w-5 rounded-md ${toastNotice.type == 'success' ? 'hover:bg-green-600' : 'hover:bg-red-600'} cursor-pointer duration-300`}/>
            </div>
          }
          {/* title */}
            <h1 className="text-lg text-slate-800 font-semibold">
              <ReactTyped 
              strings={['Stagger']}
              typeSpeed={'10'}
              backDelay={'20'}
              backSpeed={'5'}
              loop
              />
            </h1>

            {/* login form mobile from */}
            <motion.div
                    initial={{y:30}}
                    animate={{y:[-100,0,-50,0,-20,0.-10,0]}}
                    transition={{duration: 0.6}}
                     className="md:hidden p-2 absolute w-full bottom-5 border-5 border-slate-300 rounded-4xl min-h-[420px] shadow-lg duration-200">
                      {/* new to stagger */}
                      <h1 className="text-lg text-green-600 font-semibold w-full text-center my-3">
                        Welcome to Stagger Login
                      </h1>
            
                      {/* form for registeration */}
                      <form
                      onSubmit={submitForm}
                       className="w-full">
                        {/* Email */}
                          <div className="flex flex-col gap-2 p-3">
                            <h1 className="text-xs font-semibold text-slate-700">
                              Email
                            </h1>
            
                            <motion.input 
                            whileFocus={{y:-5, scale: 1.03}}
                            type="email"
                             className="w-full border-3 border-slate-300 rounded-2xl p-3 "
                             placeholder='Email...'
                             onChange={(e) => changeForm(e, 'email')}
                             required />
                          </div>

                           {/* Password */}
                          <div className="flex flex-col gap-2 p-3">
                            <h1 className="text-xs font-semibold text-slate-700">
                              Password
                            </h1>
            
                            <motion.input 
                            whileFocus={{y:-5, scale: 1.03}}
                            type="password"
                             className="w-full border-3 border-slate-300 rounded-2xl p-3 "
                             placeholder='Password'
                             onChange={(e) => changeForm(e, 'password')}
                             required />
                          </div>
            
                          {/* submit button */}
                          <motion.button type='submit'
                            whileTap={{scale:0.97}}
                            className='w-full border-2 border-b-4 rounded-2xl p-3 bg-green-500 border-green-600 text-white mt-2 shadow-sm'
                            disabled={loading}
                          >
                            {loading ? <LoadingSmall/> : 'Login'}
                          </motion.button>
            
                         
                       </form> 
                       {/* login button */}
                       <Link to={'/'}>
                           <button className='w-full border-2 border-b-4 rounded-2xl p-3 mt-3 border-blue-600'> to Register
                           </button>
                       </Link>
                    </motion.div>

            {/* for dekstop */}
            <div className="w-full max-lg:hidden flex absolute bottom-5 justify-center">
                <motion.div
                    initial={{y:30}}
                    animate={{y:[-100,0,-50,0,-20,0.-10,0]}}
                    transition={{duration: 0.6}}
                     className=" p-2 w-8/10 border-5 border-slate-300 rounded-4xl min-h-[420px] shadow-lg duration-200">
                      {/* new to stagger */}
                      <h1 className="text-lg text-green-600 font-semibold w-full text-center my-3">
                        Welcome to Stagger Login
                      </h1>
            
                      {/* form for registeration */}
                      <form
                      onSubmit={submitForm}
                       className="w-full">
                        {/* Email */}
                          <div className="flex flex-col gap-2 p-3">
                            <h1 className="text-xs font-semibold text-slate-700">
                              Email
                            </h1>
            
                            <motion.input 
                            whileFocus={{y:-5, scale: 1.03}}
                            type="email"
                             className="w-full border-3 border-slate-300 rounded-2xl p-3 "
                             placeholder='Email...'
                             onChange={(e) => changeForm(e, 'email')}
                             required />
                          </div>

                           {/* Password */}
                          <div className="flex flex-col gap-2 p-3">
                            <h1 className="text-xs font-semibold text-slate-700">
                              Password
                            </h1>
            
                            <motion.input 
                            whileFocus={{y:-5, scale: 1.03}}
                            type="password"
                             className="w-full border-3 border-slate-300 rounded-2xl p-3 "
                             placeholder='Password'
                             onChange={(e) => changeForm(e, 'password')}
                             required />
                          </div>
            
                          {/* submit button */}
                          <motion.button type='submit'
                            whileTap={{scale:0.97}}
                            className='w-full border-2 border-b-4 rounded-2xl p-3 bg-green-500 border-green-600 text-white mt-2 shadow-sm'
                            disabled={loading}
                          >
                            {loading ? <LoadingSmall/> : 'Login'}
                          </motion.button>
            
                         
                       </form> 
                       {/* login button */}
                       <Link to={'/'}>
                           <button className='w-full border-2 border-b-4 rounded-2xl p-3 mt-3 border-blue-600'> to Register
                           </button>
                       </Link>
                    </motion.div>
            </div>
        </div>
      </Suspense>
    </>
  )
  }



export default Login