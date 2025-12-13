import React, { Suspense, useState } from 'react'
import { LoadingBig, Menus } from './Exporting';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const loaction = useLocation()

  return (
   <>
   {/* for desktop */}
    <Suspense fallback={<LoadingBig/>}>
      <motion.nav
    initial={{y:-20}}
    animate={{y:0}}
    transition={{duration:0.6, ease:"easeIn"}}
    className="w-full max-lg:hidden p-2 z-20 fixed top-0 left-0 bg-slate-900">
      
    </motion.nav>

    {/* for mobile */}
     <motion.nav
    initial={{y:20}}
    animate={{y:0}}
    className="w-full lg:hidden p-2 py-4 z-20 fixed bottom-0 border-3 bg-white border-gray-300">
      <div className="flex justify-evenly gap-2">
        {Menus.map((e,i) => (
          <>
          <Link to={e.link} className={`${loaction.pathname == e.link ? 'bg-purple-500 text-white' : 'text-gray-800'} p-2 rounded-full flex justify-center items-center gap-2 px-3`}>
            {e.icon}
            {loaction.pathname == e.link &&
            <motion.h1
            initial={{
              scale:0,
            }}
            animate={{scale:1}}
            transition={{duration: 0.4}}
            className={`font-semibold text-sm origin-left`}>
              {e.name}
            </motion.h1>}
          </Link>
          </>
        ))}
      </div>
    </motion.nav>
    </Suspense>
   </>
  )
}

export default Navbar