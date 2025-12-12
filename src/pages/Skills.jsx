import React, { Suspense, useState } from 'react'
import {motion} from 'framer-motion'
import { backendSkills, frontendSkills, LoadingBig } from '../components/Exporting'

const Skills = () => {
  const [frontHoveredIndex, setFrontHovered] = useState();
  const [backHoveredIndex, setBackHovered] = useState();

  function Frontend () {
    return(
      <>
        <div
        className='w-full rounded-xl bg-slate-700 p-2 my-2'
        >
          <h1 className="text-md text-slate-300">
            Frontend
          </h1>

          {/* grid display */}
          <div className="grid grid-cols-3 place-items-center gap-2 max-lg:grid-cols-2
          max-md:grid-cols-2 mt-3">
            {frontendSkills.map((e,i) => (
              <>
                <motion.div
                key={i}
                onMouseOver={() => setFrontHovered(frontendSkills.indexOf(e))}
                onMouseLeave={() => setFrontHovered()}
                className='w-[200px] relative max-md:w-[150px] py-5 rounded-full bg-slate-800 text-center
                gap-3 cursor-pointer'>
                 <h1 className="text-lg text-slate-100 ">
                   {e.name}
                 </h1>
                  {frontHoveredIndex == frontendSkills.indexOf(e) &&
                  <motion.div
                  initial={{y:100}}
                  animate={{y:-40}}
                  className="absolute top-1/2 right-2 py-4 px-3 bg-slate-600 rounded-full z-0
                  max-w-[170px]">
                    {e.desc}
                  </motion.div>}
                </motion.div>
              </>
            ))}
          </div>

        </div>
      </>
    )
  }

  function Backend () {
    return(
      <>
          <div
        className='w-full rounded-xl p-2 my-2'
        >
          <h1 className="text-md text-slate-300">
            Backend
          </h1>

          {/* grid display */}
          <div className="grid grid-cols-3 place-items-center gap-2 max-lg:grid-cols-2
          max-md:grid-cols-2 mt-3">
            {backendSkills.map((e,i) => (
              <>
                <motion.div
                key={i}
                onMouseOver={() => setBackHovered(backendSkills.indexOf(e))}
                onMouseLeave={() => setBackHovered()}
                className='w-[200px] relative max-md:w-[150px] py-5 rounded-full bg-slate-700 text-center
                gap-3 cursor-pointer'>
                 <h1 className="text-lg text-slate-100 ">
                   {e.name}
                 </h1>
                  {backHoveredIndex == backendSkills.indexOf(e) &&
                  <motion.div
                  initial={{y:100}}
                  animate={{y:-40}}
                  className="absolute top-1/2 right-2 py-4 px-3 bg-slate-800 rounded-full z-0
                  max-w-[170px]">
                    {e.desc}
                  </motion.div>}
                </motion.div>
              </>
            ))}
          </div>

        </div>
      </>
    )
  }

  return (
    <>
      <Suspense fallback={<LoadingBig/>}>
        <motion.div
      initial={{opacity:0.5}}
      animate={{opacity: 1}}
      transition={{duration:0.7,}}
      className='w-full p-2'>
        <h1 className="text-lg font-bold text-slate-300">
          My Skills
        </h1>

        <Frontend/>

        <Backend/>

      </motion.div>
      </Suspense>
    </>
  )
}

export default Skills