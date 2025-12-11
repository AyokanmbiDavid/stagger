import React from 'react'
import ProfilePic from '../images/Img1.jpg'
import {motion}  from 'framer-motion'

const WelcomePage = () => {
  return (
    <>
      <motion.div 
      initial={{opacity:0.2}}
      animate={{opacity:1}}
      transition={{duration:0.6, ease:"easeIn"}}
      className="w-full p-2 flex max-md:flex-col items-center gap-4">
          <div className="border border-slate-800 w-[150px] h-[150px] rounded-full ">
            <img src={ProfilePic} className="object-cover w-full rounded-full h-full" />
          </div>
        <h1 className="text-xl font-bold text-slate-300">
          Hi there, My name is David
        </h1>
      </motion.div>
    </>
  )
}

export default WelcomePage