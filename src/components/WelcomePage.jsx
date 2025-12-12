import React from 'react'
import ProfilePic from '../images/Img1.jpg'
import {motion}  from 'framer-motion'
import { ReactTyped } from 'react-typed'


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
        <motion.h1
        animate={{
          y:[-7,0,-7],
        }}
        transition={{bounceDamping: 20, duration: 2, repeat: Infinity}}
        className="text-xl font-bold text-slate-300 text-center">
          Hi there,{' '}
          <ReactTyped
            strings={['My name is David','I am a Software Developer','I am a FullStack Developer','I love Coding']}
            typeSpeed={60}
            backSpeed={60}
            loop={true}
          />
        </motion.h1>
      </motion.div>
    </>
  )
}

export default WelcomePage