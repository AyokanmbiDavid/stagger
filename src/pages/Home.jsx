import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { AllChat, AllUsers } from '../components/Exporting.jsx';
import UserCard from '../components/UserCard.jsx';

const Navbar = React.lazy(() => import('../components/Navbar.jsx'))
const Home = () => {
  const [searchvalue, setSearchValue] = useState('');
  const [filtSearch,   setFIltSearch] = useState([])

  useEffect(() => {
    if (searchvalue){
      setFIltSearch(AllUsers.filter(e => e.name.toLowerCase().includes(searchvalue.toLowerCase())
      ))
    }
  }, [searchvalue])

  return (
    <>
      <div className="w-full relative h-screen flex justify-between">
        <Navbar/>

        <div className="w-full p-2 max-md:mt-15">
          <h1 className="text-xl font-semibold">
            Home
          </h1>
          {/* search input */}
          <div className="w-full p-3 flex gap-2">
            <input type="text" 
            className="p-3 text-sm rounded-xl bg-slate-200 w-7/10 max-md:w-full shadow-sm border-0"
            placeholder='Search Friends here..'
            value={searchvalue}
            onChange={(e) => setSearchValue(e.target.value)}
             />

            {searchvalue &&
              <>
                <button 
                onClick={() => setSearchValue('')}
                className='p-2 px-3 rounded-md hover:bg-red-100 duration-300 cursor-pointer'>
                  <XMarkIcon className='w-5 text-red-500' />
                </button>
              </>}
          </div>

         {!searchvalue &&
         <>
           {/* you have not chat with */}
          <h1 className="text-sm text-slate-600 py-2">
                You haven't chat with
          </h1>

          <div className="flex flex-col w-full">
              {AllUsers.map((newChat) => 
                <UserCard name={newChat.name}  id={newChat.id}/>
              )}
          </div>
         </>}

         {searchvalue &&
         <>
          <div className="w-full">
            {filtSearch.length > 0 ?
            <>
              {filtSearch.map((filt) => (
                 <UserCard name={filt.name} id={filt.id} />
              ))}
            </>: 
            <>
              <h1 className="text-sm text-center text-red-500">
               Sorry no User found
              </h1>
            </>}
          </div>
         </>}
        </div>
      </div>
    </>
  )
}

export default Home