import React from 'react'
import { motion } from 'framer-motion'
import { InformationCircleIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Typed } from 'react-typed'

const AboutMe = () => {
  return (
    <>
      <motion.div
      animate={{scale:[0.95,1,0.95]}}
      transition={{duration:2, repeat: Infinity}}
      className=''>
        <div className="p-2 w-full">
          <div className="bg-slate-800 rounded-lg w-full p-2">
            <InformationCircleIcon className='h-5 w-5 text-slate-300'/>
            <h1 className="text-sm text-slate-200 my-2">
              I am a Software Developer <span className="text-slate-400">(FullStack Development)</span>.
              I Graduated from a software institute called <span className="text-slate-400">Gomycode</span>, 
              Having over 1 year of project building and building bigger experience. I am at no hesitation to give
              you the best service.
            </h1>
          </div>

        </div>
      </motion.div>
    </>
  )
}

export default AboutMe