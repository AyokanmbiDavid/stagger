import React, { Suspense, useEffect, useState } from 'react'
import { apiUrl, LoadingBig, LoadingSmall } from '../components/Exporting.jsx';
import { ArrowRightEndOnRectangleIcon, BellIcon, CalendarIcon, ChatBubbleLeftIcon, MagnifyingGlassIcon, PlusIcon, WrenchIcon } from '@heroicons/react/24/outline';
import {motion} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import {ReactTyped} from 'react-typed'
import axios from 'axios'

const Navbar = React.lazy(() => import('../components/Navbar.jsx'));

  

const Home = () => {
  const navigate = useNavigate();
  const [allgetUser, setAllgetuser] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchQuery, setSearchQuery] = useState('')

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await axios.get(`${apiUrl}/users`);
      console.log('GET /users response:', res);
      const payload = res.data;
      // handle either an array or an object like { users: [...] }
      const users = Array.isArray(payload) ? payload : (payload?.users ?? []);
      setAllgetuser(users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setAllgetuser([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  fetchUsers();
 }, [])

    console.log(allgetUser);
  

  const filteredUsers = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return allgetUser
    return allgetUser.filter(u => {
      const name = (u.username || u.name || '').toLowerCase()
      const email = (u.email || '').toLowerCase()
      return name.includes(q) || email.includes(q)
    })
  }, [allgetUser, searchQuery])

  return (
    <>
    <Suspense fallback={<LoadingBig/>}>
      <div className="relative w-full h-screen flex flex-col">
        <Navbar/>

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

        {/* search bar */}
        <div className="w-full py-3">
          <motion.div
          whileTap={{scale: 1.01}}
          className="w-full flex justify-between items-center px-4 rounded-xl border-3 border-slate-300 p-1">
            <input type="text"
            placeholder='Search Chat...' 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='bg-transparent rounded-xl border-0 focus:outline-0'/>

            <MagnifyingGlassIcon  className='w-5'/>
          </motion.div>
        </div>

        {/* body */}
        <div className="w-full flex-1 overflow-y-auto">
          {/* chat list */}
          <div className="py-3">
            <div className="flex flex-col gap-3">
              {loadingUsers ? (
                <div className="p-4"><LoadingSmall/></div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-sm text-slate-500 p-4">No users found</div>
              ) : (
                filteredUsers.map((u, i) => (
                  <Link key={u._id ?? u.id ?? i} to={`/chat/${u._id ?? u.id ?? i}`} className="w-full p-2 py-3 flex justify-between items-center border-2 border-slate-200 rounded-2xl">
                    <h1 className="text-lg text-slate-800 ">{u.username ?? u.email ?? 'Unknown'}</h1>
                    <motion.button whileTap={{scale: 0.96}} className="p-2 px-4 rounded-xl border-3 flex justify-center items-center gap-2 border-slate-300 text-slate-700 font-semibold">message <ChatBubbleLeftIcon className='w-5 text-green-600'/></motion.button>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
    </>
  )
}

export default Home