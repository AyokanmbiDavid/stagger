import React, { useState } from 'react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {Link, useLocation} from 'react-router-dom'
import { Menus } from './Exporting';

const Navbar = () => {
  const [navOpen, setnavOpen] = useState(false);
  const location = useLocation()
  return (
    <>
      {/* for mobile view */}
      <div className="lg:hidden absolute top-0 left-0 w-full border-b-3 bg-white border-b-slate-200 p-2 py-3 flex justify-between">
        <h1 className="text-lg font-semibold text-slate-800">Stagger</h1>

        <button 
        onClick={() => setnavOpen(prev => !prev)}
        className="text-slate-800 hover:bg-slate-100 p-2 rounded-md">
          {!navOpen ? 
          <Bars3Icon className='w-5'/>: 
          <XMarkIcon className='w-5'/>}
        </button>
      </div>  

      {/* mobile drawer */}
      <div className={`lg:hidden fixed top-2 p-2 rounded-2xl bg-gray-100 w-[200px] h-screen border-2 border-green-100 shadow-lg ${navOpen ? 'ml-0' : '-ml-[400px]'} duration-300`}>
         <div className="flex flex-col gap-2">
           {Menus.map((navItem) => (
            <>
              <Link
              to={navItem.link}
              className={`w-full  rounded-2xl p-2 py-4 flex justify-between items-center ${location.pathname == navItem.link ? 'bg-green-100 text-green-600 border-2 border-green-200': 'hover:bg-slate-200'}`}>
                {navItem.name}
                {navItem.icon}
              </Link>
            </>
          ))}
         </div>
      </div>

      {/* for desktop */}
      <div className="max-lg:hidden h-screen p-2 border-r-3 border-slate-300 min-w-[250px]">
          <h1 className="text-lg text-slate-800 font-semibold ">
            Stagger
          </h1>
         <div className="flex flex-col gap-2 mt-5">
           {Menus.map((navItem) => (
            <>
              <Link
              to={navItem.link}
              className={`w-full  rounded-2xl p-2 py-4 flex justify-between text-sm items-center ${location.pathname == navItem.link ? 'bg-green-100 text-green-600 border-2 border-green-200': 'hover:bg-slate-200'}`}>
                {navItem.name}
                {navItem.icon}
              </Link>
            </>
          ))}
          </div>
      </div>
    </>
  )
}

export default Navbar