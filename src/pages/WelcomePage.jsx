import React, { Suspense, useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { LoadingBig } from '../components/Exporting'
import { useNavigate } from 'react-router-dom'

const LoginReg = () => {
  const navigate = useNavigate();
  const [welForm, setWelForm] = useState({
    email: '',
    name: ''
  });

  // get Name from LocalStorage
  useEffect(() => {
    const sonaData = JSON.parse(localStorage.getItem('sonaData')) || [];
    setWelForm(sonaData);
  }, []);


  // change welform
  function changeForm (e,name) {
    setWelForm({...welForm,
       [name]: e.target.value});
       console.log(welForm);
       
  }

  // submit data
  async function submitData (e) {
    e.preventDefault();

    try{
        localStorage.setItem('sonaData', JSON.stringify(welForm));
        navigate('/home')
    } catch (e) {
      alert('error')
    }
  }
  


  // sign in
  function Welcome () {
    return(
      <>
      
      </>
    )
  }

  return (
    <>
       <Suspense fallback={<LoadingBig/>}>
         <div 
        
        className='bg-blue-600 w-full h-screen flex justify-start items-center'>
          <div className="w-full h-screen relative ">
        {/* greetings */}
          <div className="w-full lg:w-1/2 text-center py-10 mt-30 lg:mt-40">
            <h1 className="text-3xl font-bold text-white">
              Sona
            </h1>
            <div className="mt-3 font-semibold text-lg text-white">
              Welcome to sona team
            </div>
          </div>
        {/* for desktop */}
        <motion.div
          initial={{
            x: 300,
          }}
          animate={{x:0}}
          transition={{duration:0.7}}
        className='max-lg:hidden fixed right-0 bottom-0 bg-white rounded-3xl p-2 mr-[-40px] mb-[-30px] w-3/5 pr-10
        h-9/10 flex justify-center items-center'>
           <form
          onSubmit={submitData}
          className="flex flex-col justify-center items-center w-8/10">
            {/* Email */}
            <div className="p-2 w-10/11 mt-2">
              <label className="text-xs text-gray-700">
                Name
              </label>
              <motion.input
              whileFocus={{
                scale: 1.05,
                y:-2
              }}
               type="text" 
               className="w-full rounded-lg p-3 text-sm border-3 border-gray-300 focus:shadow-md focus:outline-0" 
              placeholder='Name..'
                onChange={(e) => changeForm(e,'name')}
              />
            </div>

            {/* password */}
            <div className="p-2 w-10/11">
              <label className="text-xs text-gray-700">
                Email
              </label>
              <motion.input
              whileFocus={{
                scale: 1.05,
                y:-2
              }} 
              type="email"
               className="w-full rounded-lg p-3 text-sm border-3 border-gray-300" 
              placeholder='Email...' 
              onChange={(e) => changeForm(e,'email')}
              required/>
            </div>
            {/* remember and forget password */}
            <div className="flex w-10/11 justify-between p-2">
              {/* remember me checkbox */}
              <div className="flex items-center gap-2 text-xs">
                <input type="checkbox" name='rem' /> 
                <label htmlFor="rem">Remember me</label>
              </div>
            </div>

            {/* submit button */}
            <motion.button type='submit'
            whileTap={{
              scale: 0.95
            }}
            className="w-10/11 rounded-lg bg-blue-500 border-5 border-t border-l border-r border-blue-600
             text-sm my-2 text-white py-3 mb-20">
            Submit
            </motion.button>
          </form>
        </motion.div>

        {/* for mobile */}
        <motion.div
        initial={{y:300}}
        animate={{y:0}}
        transition={{duration: 0.5, bounceDamping: 600}}
        className='lg:hidden absolute bottom-0 left-0 w-full p-3 rounded-3xl bg-white
        border-3 border-gray-300 shadow-2xl'>

          <form
          onSubmit={submitData}
          className="flex flex-col justify-center items-center">
            {/* Email */}
            <div className="p-2 w-10/11 mt-2">
              <label className="text-xs text-gray-700">
                Name
              </label>
              <motion.input
              whileFocus={{
                scale: 1.05,
                y:-2
              }}
               type="text" 
               className="w-full rounded-lg p-3 text-sm border-3 border-gray-300 focus:shadow-md focus:outline-0" 
              placeholder='Name..'
                onChange={(e) => changeForm(e,'name')}
              />
            </div>

            {/* password */}
            <div className="p-2 w-10/11">
              <label className="text-xs text-gray-700">
                Email
              </label>
              <motion.input
              whileFocus={{
                scale: 1.05,
                y:-2
              }} 
              type="email"
               className="w-full rounded-lg p-3 text-sm border-3 border-gray-300" 
              placeholder='Email...' 
              onChange={(e) => changeForm(e,'email')}
              required/>
            </div>
            {/* remember and forget password */}
            <div className="flex w-10/11 justify-between p-2">
              {/* remember me checkbox */}
              <div className="flex items-center gap-2 text-xs">
                <input type="checkbox" name='rem' /> 
                <label htmlFor="rem">Remember me</label>
              </div>
            </div>

            {/* submit button */}
            <motion.button type='submit'
            whileTap={{
              scale: 0.95
            }}
            className="w-10/11 rounded-lg bg-blue-500 border-5 border-t border-l border-r border-blue-600
             text-sm my-2 text-white py-3 mb-20">
            Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
        </div>
       </Suspense>
    </>
  )
}

export default LoginReg