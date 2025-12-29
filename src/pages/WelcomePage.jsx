import React, { Suspense, useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { apiUrl, LoadingBig } from '../components/Exporting'
import { useNavigate } from 'react-router-dom'
import { ReactTyped } from 'react-typed'
import axios from 'axios'
import { Link } from 'react-router-dom'

const LoginReg = () => {
  const navigate = useNavigate();
  const [allgetUser, setAllgetuser] = useState([]);
  const [welForm, setWelForm] = useState({
    email: '',
    username: '',
    age: '',
    password: '',
  });
  const [usernameErr, setUsernameerr] = useState(false);
  const [ageErr, setAgeerr] = useState(false)

  function changeForm (e,name) {
    setWelForm({...welForm,
      [name]: e.target.value
    })
  };

  useEffect(() => {
    try{
        axios.get(`${apiUrl}/users`).then(res => setAllgetuser(res.data));
    } catch (e) {
      console.error(e)
    }
  }, []);

  // check f username available
  function checkUsername (username) {
    
   let checkUsername = allgetUser.find(e => username.target.value.toLowerCase() == e.username.toLowerCase());

   if (!checkUsername) {
    setUsernameerr(false) 
   } else {
    setUsernameerr(true)
   }
  }

  // check Age compatibilty
  function checkAge (e) {
   let check = parseInt(e.target.value) >= 15;

    if (check) {
      setAgeerr(false)
    } else {
      setAgeerr(true)
    }
  }

  // submit form funstion
  function submitForm (e) {
    e.preventDefault();
    if (usernameErr || ageErr) return
    // create user and auto-login
    axios.post(`${apiUrl}/users`, welForm)
      .then(() => axios.post(`${apiUrl}/users/login`, { email: welForm.email, password: welForm.password }))
      .then(res => {
        const { token, user } = res.data || {}
        if (token) {
          localStorage.setItem('staggerToken', token)
          localStorage.setItem('staggerUser', JSON.stringify(user))
          localStorage.setItem('staggerLog', JSON.stringify({ email: user.email, username: user.username }))
          navigate('/home')
        } else {
          // fallback: just navigate
          navigate('/home')
        }
      })
      .catch(err => {
        console.error(err?.response?.data || err)
      })
  }

  return (
    <>
       <Suspense fallback={<LoadingBig/>}>
       <div className="py-2 relative h-screen">
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

        <motion.div
        initial={{y:30}}
        animate={{y:[-100,0,-50,0,-20,0.-10,0]}}
        transition={{duration: 0.6}}
         className="md:hidden p-2 absolute w-full bottom-5 border-5 border-slate-300 rounded-4xl min-h-[460px] shadow-lg duration-200">
          {/* new to stagger */}
          <h1 className="text-lg text-green-600 font-semibold w-full text-center my-3">
            Welcome to Stagger
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

             {/* UserName */}
              <div className="flex flex-col gap-2 p-3">
                <h1 className="text-xs font-semibold text-slate-700">
                  UserName
                </h1>

                <motion.input 
                whileFocus={{y:-5, scale: 1.03}}
                type="text"
                 className="w-full border-3 border-slate-300 rounded-2xl p-3 "
                 placeholder='UserName...' 
                  onChange={(e) => {changeForm(e, 'username'); checkUsername(e)}}
                  required/>

                  {welForm.username && 
                  <div className={`${!usernameErr ? 'text-green-500' : 'text-red-600'}`}>
                    {welForm.username} {!usernameErr ? 'is available' : 'is already taken'}
                  </div>}
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

               {/* Age */}
              <div className="flex flex-col gap-2 p-3">
                <h1 className="text-xs font-semibold text-slate-700">
                 Age
                </h1>

                <motion.input 
                whileFocus={{y:-5, scale: 1.03}}
                type="number"
                 className="w-full border-3 border-slate-300 rounded-2xl p-3 "
                 placeholder='Age (15 and above)...'
                 onChange={(e) => {changeForm(e, 'age'); checkAge(e)}} 
                 required/>

                 {welForm.age &&
                 <div className={`${ageErr ? 'text-red-600' : 'text-green-600'}`}>
                  {ageErr ? 'you are not old enough' : 'ok good to go'}
                </div>}
              </div>

              {/* submit button */}
              <motion.button
              whileTap={{scale:0.97}}
              className='w-full border-2 border-b-4 rounded-2xl p-3 bg-green-500 border-green-600 text-white mt-2 shadow-sm'
              >
                Submit
              </motion.button>

             
           </form> 
           {/* login button */}
           <Link to={'/login'}>
               <button className='w-full border-2 border-b-4 rounded-2xl p-3 mt-3 border-blue-600'>
               Login
               </button>
          </Link>
        </motion.div>
       </div>
       </Suspense>
    </>
  )
}

export default LoginReg