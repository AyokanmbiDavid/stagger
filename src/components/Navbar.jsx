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
      <div className="w-full bottom-5 absolute">
        <motion.nav
        className='w-full p-2 border-2 border-slate-300 rounded-2xl shadow-lg'>
          <div className="flex gap-2 w-full justify-evenly">
            {Menus.map((e,i) => (
              <>
                <Link
                to={e.link}
                className={`p-2 px-4 rounded-xl ${loaction.pathname == e.link ? 'bg-green-100 text-green-700 border-green-300 border-2' : 'text-slate-700'}`}>
                  {e.icon}
                </Link>
              </>
            ))}
          </div>
        </motion.nav>
      </div>
    </Suspense>
   </>
  )
}

export default Navbar