import React, { Suspense, useState } from 'react'
import { LoadingBig } from '../components/Exporting.jsx';
import { ArrowRightEndOnRectangleIcon, BellIcon, CalendarIcon, MagnifyingGlassIcon, WrenchIcon } from '@heroicons/react/24/outline';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Navbar = React.lazy(() => import('../components/Navbar.jsx'));

  

const Home = () => {
  const navigate = useNavigate();
  const [useData, setUseData] = useState(JSON.parse(localStorage.getItem('sonaData')) || [])

  function logout () {
    localStorage.removeItem("sonaData", '');
    navigate('/')
  }

  return (
    <>
    <Navbar/>
    <Suspense fallback={<LoadingBig/>}>
    {/* for desktop */}
    <div className="max-lg:hidden">

    </div>

    {/* for mobile */}
      <div className="bg-gray-100 lg:hidden h-screen w-full px-5">
        {/* top */}
        <div className="w-full py-3 flex justify-between items-center">
          <h1 className="flex flex-col gap-2 font-bold text-gray-800">
            Hi,<br/>
            {useData.name}
          </h1>

          <button 
          onClick={() => logout()}
          className="p-2 rounded-full bg-white flex gap-2 text-xs items-center text-red-600">
             <ArrowRightEndOnRectangleIcon className='h-5 w-5 ' /> Logout
          </button>
        </div>

      {/* input section */}
        <div className="w-full flex justify-center">
          <div className="w-full rounded-2xl bg-white flex justify-between items-center pr-4">
            <input type="text"
          placeholder='Search name'
          className="w-full rounded-2xl p-3 border-0 " />

          <MagnifyingGlassIcon className='h-5 w-5' />
          </div>
        </div> 
        
        {/* skill slides */}
          <motion.div
          
          className="w-full my-7 flex gap-4 overflow-x-auto py-3">
            {['FullStack Developer', 'UI/UX designer','Backend Developer', 'Frontend Developer'].map((e,i) => (
              <>
                <motion.div
                animate={{x:[0,-220,0]}}
                transition={{duration: 3, repeat: Infinity,}} className="p-2 bg-white w-[120px] h-[120px] shrink-0 rounded-2xl flex flex-col justify-between 
                items-center shadow-lg" key={i}>
                    <WrenchIcon className='h-[70px] w-[70px] text-purple-700' />
                    <h1 className="text-xs text-gray-800">
                      {e}
                    </h1>
                </motion.div>
              </>
            ))}
          </motion.div>

          {/* upcoming jobs */}
            <div className="w-full">
              <h1 className="text-sm text-blue-600">
                Upcoming Jobs
              </h1>

              <div className="mt-2 w-full rounded-3xl bg-blue-600 p-3 border-3 border-blue-500">
                <div className="flex w-full items-center gap-2 ">
                  {/* image */}
                  <div className="bg-blue-300 h-[50px] w-[50px] rounded-full"></div>
                  <h1 className="text-lg text-white font-bold flex flex-col">
                    TaskUi
                    <span className="font-light text-sm">
                      by Sona Team
                    </span>
                  </h1>
                </div>
                <div className="mt-2">
                  <div className="w-full p-2 px-3 text-white rounded-full bg-blue-400 flex gap-2">
                    <CalendarIcon className='h-5 w-5' /> 03 January 2026
                  </div>
                </div>
              </div>

            </div>
    </div>
    </Suspense>
    </>
  )
}

export default Home