import React from 'react'
import { Contacts } from './Exporting'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import {motion} from 'framer-motion'

const Contact = () => {

    async function copyVal(e) {
      try{
       navigator.clipboard.writeText(e);
       alert(`${e} copied to clipboard`)
      } catch (e) {
        alert(`error copying text`)
      }
    }

  return (
    <>
      <motion.div
      initial={{scale:0.85}}
      animate={{scale:1}}
      transition={{duration:0.8, ease:"easeIn"}}
      className="w-full p-3 flex justify-center items-center flex-col gap-3 mt-5">
        <h1 className="text-sm text-slate-300">
          Contact me
        </h1>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-2 w-full place-items-center">
          {Contacts.map((e,i) => (
            <>
              <motion.div
              whileHover={{
                y:-5,
                scale:1.1,
                rotate: -2,
              }}
              transition={{
                bounceDamping: 10,
                bounceStiffness: 600
              }} drag
              dragConstraints={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 100,
              }}
              className="p-2 flex flex-col gap-2 relative rounded-lg border border-slate-800 min-w-full">
               <div className="flex w-full items-center justify-between">
                {/* name */}
                <h1 className="font-semibold text-slate-300 text-xs">
                 {e.name}
               </h1>
                  {/* copy button */}
                  <button className="p-2 rounded-bl-md absolute top-0 right-0 flex items-center justify-center
                   hover:bg-slate-700 bg-slate-800
                  duration-300" onClick={() => copyVal(e.val)}>
                    <ClipboardIcon className='h-4 w-4' />
                  </button>
               </div>
               {/* value */}
               <h1 className="text-lg font-bold">
                {e.val}
               </h1>
              </motion.div>
            </>
          )) }
        </div>
      </motion.div>
    </>
  )
}

export default Contact