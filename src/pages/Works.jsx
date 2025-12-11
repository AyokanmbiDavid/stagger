import React,{useState} from 'react'
import { motion } from 'framer-motion'
import { MyWorks } from '../components/Exporting'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const Works = () => {
  const [workDown, setworkDown] = useState()

  return (
    <>
     <motion.div
      initial={{scale:1.2}}
      animate={{scale:1}}
      transition={{duration:0.4, ease:"easeIn"}}
     className="p-2">
         <h1 className="text-lg text-slate-300">
        My works
      </h1>

      <div className="grid grid-cols-2 max-md:grid-cols-1 place-items-start p-2 my-2 gap-2">
        {MyWorks.map((e,i) => (
          <>
            <div className="border border-slate-800 rounded-lg p-2 w-full">
              {/* top */}
             <div className="">
              <div className="flex w-full justify-between items-center">
               <h1 className="text-slate-300 flex gap-2 items-center">
                <div className="bg-slate-700 h-[50px] w-[50px] rounded-full"></div>
                {e.name}
              </h1>

              <div className="flex gap-2 items-center">
                {/* visit */}
                <a href={e.desc} className='text-blue-600'>visit</a>
                {/* dropdown button */}
              <button className="p-2 rounded-md hover:bg-slate-800 duration-300" 
              onClick={() => setworkDown(workDown == e.name ? '' : e.name)}>
                {workDown != e.name ? 
                <ChevronDownIcon className='h-4 w-4' /> :
                <ChevronUpIcon  className='h-4 w-4'/>}
              </button>
              </div>
             </div>
             {/* description */}
             <div className={`bg-slate-800 ${workDown == e.name ? 'p-2 my-2' : ''} rounded-lg  text-slate-200 duration-300`}>
              {workDown == e.name && e.desc}
             </div>
             </div>
            </div>
          </>
        ))}
      </div>
      </motion.div>
    </>
  )
}

export default Works