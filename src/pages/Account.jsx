import React, { Suspense, useEffect, useState } from 'react'
import { apiUrl, LoadingBig, LoadingSmall } from '../components/Exporting.jsx'
import { ReactTyped } from 'react-typed'
import axios, { all } from 'axios'
import { ArrowLeftEndOnRectangleIcon, PencilIcon } from '@heroicons/react/24/outline'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Navbar = React.lazy(() => import('../components/Navbar.jsx'))

const Account = () => {
  const [userData, setUsedata] = useState(JSON.parse(localStorage.getItem('staggerLog')));
  const [allgetUser, setAllgetuser] = useState([]);
  const [profileData, setProfiledata] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    try{
      axios.get(`${apiUrl}/users`).then(res => setAllgetuser(res.data));
    } catch (e) {
      console.error(e)
    }
  }, []);
  

  useEffect(() => {
    let ui = allgetUser.filter(e => e.email == 'david@gmail.com')
    setProfiledata(ui[0]);
    console.log(profileData);
  }, [allgetUser]);

  function Logout () {
    localStorage.removeItem('staggerToken');
    localStorage.removeItem('staggerLog')
    setTimeout(() => {
      navigate('/login')
    }, 500)
  }
  return (
    <>
      <Suspense fallback={<LoadingBig/>}>
        <div className="w-full relative h-screen">
           {/* title */}
            <h1 className="text-lg text-slate-800 font-semibold py-2">
              <ReactTyped 
              strings={['Stagger']}
              typeSpeed={'10'}
              backDelay={'20'}
              backSpeed={'5'}
              loop
              />
            </h1>

            {/* top */}
            <div className="w-full mt-10">
              <h1 className="text-2xl py-3 text-slate-700">
                {profileData ? profileData.username : <LoadingSmall/> }
              </h1>
              <div className="lg:flex gap-2 items-center">
                {/* edit profil */}
                <motion.button
              whileTap={{scale:1.01, y: -2}}
              className='w-full p-3 rounded-xl flex justify-center gap-2 text-sm font-semibold text-blue-500 border-2 border-b-4 border-b-blue-600 '
              >
                Edit Profile <PencilIcon className='w-5'/>
              </motion.button>

              {/* logout */}
               <motion.button
              whileTap={{scale:1.01, y: -2}}
              className='w-full p-3 rounded-xl flex justify-center gap-2 text-sm font-semibold text-red-500 border-2 border-b-4 border-b-red-600 max-lg:mt-2 '
              onClick={() => Logout()}
              >
                Logout <ArrowLeftEndOnRectangleIcon className='w-5'/>
              </motion.button>
              </div>
              
            </div>

          <Navbar/>
        </div>
      </Suspense>
    </>
  )
}

export default Account