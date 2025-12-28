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
        <div className="relative w-full h-screen md:flex">

          {/* LEFT: contacts sidebar (mobile shows above chat; desktop left column) */}
          <aside className="w-full md:w-80 lg:w-96 border-r border-slate-200 bg-white md:h-screen overflow-auto">
            <div className="px-4 py-3">
              <div className="mt-3">
                <motion.div whileTap={{scale:1.01}} className="flex items-center gap-3 p-2 rounded-xl border border-slate-200">
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search or start new chat" className="flex-1 bg-transparent outline-none" />
                  <MagnifyingGlassIcon className="w-5 text-slate-500" />
                </motion.div>
              </div>
            </div>

            <div className="px-3 pb-6">
              {loadingUsers ? (
                <div className="p-4"><LoadingSmall/></div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-sm text-slate-500 p-4">No users found</div>
              ) : (
                <div className="flex flex-col gap-2 mt-3">
                  {filteredUsers.map((u,i) => (
                    <Link key={u._id ?? u.id ?? i} to={`/chat/${u._id ?? u.id ?? i}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                      <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white font-semibold">{(u.username || '?').slice(0,1).toUpperCase()}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{u.username ?? u.email ?? 'Unknown'}</div>
                        <div className="text-xs text-slate-500">{u.email ?? ''}</div>
                      </div>
                      <div className="text-xs text-slate-500">now</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT: chat preview / main panel (on mobile this is the list area) */}
          <main className="flex-1 h-screen overflow-auto bg-slate-50">
            {/* On small screens show the list content (same as before) */}
            <div className="md:hidden px-4 py-2">
              {/* mobile list kept compact */}
              {loadingUsers ? <LoadingSmall/> : (
                filteredUsers.map((u,i) => (
                  <Link key={u._id ?? u.id ?? i} to={`/chat/${u._id ?? u.id ?? i}`} className="w-full p-2 py-3 flex justify-between items-center border-2 border-slate-200 rounded-2xl mb-3">
                    <h1 className="text-lg text-slate-800 ">{u.username ?? u.email ?? 'Unknown'}</h1>
                    <motion.button whileTap={{scale:0.96}} className="p-2 px-4 rounded-xl border-3 flex justify-center items-center gap-2 border-slate-300 text-slate-700 font-semibold">message <ChatBubbleLeftIcon className='w-5 text-green-600'/></motion.button>
                  </Link>
                ))
              )}
            </div>

            {/* Desktop middle panel - default content prompting selection */}
            <div className="hidden md:flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-700">Welcome to Stagger</h2>
                <p className="text-slate-500 mt-2">Select a chat from the left to start messaging.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Suspense>
    </>
  )
}

export default Home