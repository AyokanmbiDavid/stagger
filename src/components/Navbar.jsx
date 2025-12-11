import React, { useState } from 'react'
import { Menus } from './Exporting';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const loaction = useLocation()

  return (
   <>
    <motion.nav
    initial={{y:-20}}
    animate={{y:0}}
    transition={{duration:0.6, ease:"easeIn"}}
    className="w-full p-2 z-20 fixed top-0 left-0 bg-slate-900">
      <div className="w-full flex justify-end items-center">
        {/* for desktop */}
        <div className="max-md:hidden flex items-center">
            {Menus.map((e,i) => (
              <>
                <Link to={e.link} className={`p-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer 
                  ${loaction.pathname == e.link && 'bg-slate-800 shadow-md'}`}>
                  {e.icon}
                </Link>
              </>
            ))}
        </div>

        {/* for mobile */}
        <button className="p-2 md:hidden rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
        onClick={() => setNavOpen(!navOpen)}>
          {!navOpen ?
        <Bars3Icon className='h-5 w-5' /> :
        <XMarkIcon className='h-5 w-5' />}
        </button>

        {/* mobile menus */}
        <div className={`md:hidden fixed z-30  mt-50 ${navOpen ? 'right-10' : '-right-[200px]'} bg-slate-900 duration-300
        p-2 flex flex-col w-[200px] rounded-lg border border-slate-800 shadow-md `}>
              {Menus.map((e, i) => (
                <>
                  <Link to={e.link} className={`p-2 rounded-lg flex justify-between items-center hover:bg-slate-800 duration-300
                   ${loaction.pathname == e.link && 'bg-slate-800 shadow-md'}`}>
                    {e.name}
                    {e.icon}
                  </Link>
                </>
              ))}
        </div>
      </div>
    </motion.nav>
   </>
  )
}

export default Navbar