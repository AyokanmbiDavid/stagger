import React, { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import e from 'cors'
import { LoadingBig } from '../components/Exporting'

const Message = () => {
  const [WhatsappForm, setWhatsappForm] = useState({
    text: '',
    name: '',
    email: '',
  }) 

  async function changeForm (e,name) {
    setWhatsappForm({...WhatsappForm, 
      [name]: e.target.value
    })
  }

  async function submitForm (e) {
    e.preventDefault();

    try{
    const Message = `Name: ${WhatsappForm.name}\nEmail: ${WhatsappForm.email}\nText: ${WhatsappForm.text}`;
    const encodeMess = encodeURIComponent(Message);
    const WhatsappUrl =`https://wa.me/9024572602?text=${encodeMess}`;
    window.open(WhatsappUrl, '_blank')
    } catch (e) {
      alert('network error')
    }
  }

  return (
    <>
  <Suspense fallback={<LoadingBig/>}>
      <motion.div 
      initial={{y:-60}}
      animate={{y:0}}
      transition={{duration:0.7, ease:"easeIn"}}
    className="flex justify-center md:items-center w-full h-[400px]" onSubmit={submitForm}>
      <motion.form 
      drag
      dragConstraints={{
        top:0,
        left:0,
        right: 0,
        bottom:0,
      }}
      transition={{ duration: 1,bounceStiffness: 600}}
      className="p-2 md:border md:border-slate-800 rounded-lg md:shadow-lg ">
        <div className="flex items-center justify-center p-2 max-md:hidden md:cursor-grab">
          <div className="w-30 p-1 rounded-full bg-slate-700"></div>
        </div>
      <h1 className="text-sm text-slate-300">
        What would you love to tell me?
      </h1>
      
      <textarea type="text"
       className="w-[400px] max-md:w-[300px] bg-slate-800 rounded-md text-sm border border-slate-600 my-2"
       placeholder='Type here..' onChange={(e) => changeForm(e,'text')} required/>

      {/* name */}
      <h1 className="text-sm text-slate-300">
        Your Name?
      </h1>
      
      <input type="text"
       className="w-[400px] max-md:w-[300px] bg-slate-800 rounded-md text-sm border border-slate-600 my-2"
       placeholder='Your Name..' onChange={(e) => changeForm(e,'name')} required/>

       {/* email */}
      <h1 className="text-sm text-slate-300 mt-3">
        Your Email?
      </h1>
      
      <input type="text"
       className="w-[400px] max-md:w-[300px] bg-slate-800 rounded-md text-sm border border-slate-600 my-2"
       placeholder='Your Email..' onChange={(e) => changeForm(e,'email')} required/>


      {/* send */}
        <div className="w-full flex justify-center items-center my-2 mt-3">
          <button className="p-2 w-7/10 max-md:w-full rounded-md bg-green-700 cursor-pointer hover:shadow-md hover:bg-green-800
          duration-300">
            Send (Whatsapp)
          </button>
        </div>

      </motion.form>
    </motion.div>
  </Suspense>
    </>
  )
}

export default Message