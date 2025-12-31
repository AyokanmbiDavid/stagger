import React, { Suspense, useEffect, useState } from 'react'
import { AllGroups, LoadingBig } from '../components/Exporting'
import { UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import GroupCard from '../components/GroupCard.jsx';

const Navbar = React.lazy(() => import('../components/Navbar.jsx'))
const Groups = () => {
    const [searchvalue, setSearchValue] = useState('');
    const [filtgroup,   setFIltgroup] = useState([])

    useEffect(() => {
      if (searchvalue){
        setFIltgroup(AllGroups.filter(e => e.name.toLowerCase().includes(searchvalue.toLowerCase())
        ))
      }
    }, [searchvalue])

  return (
    <>  
      <Suspense fallback={<LoadingBig/>}>
        <div className="e-full relative h-screen flex">
          <Navbar/>

          <div className="w-full max-lg:mt-15 p-2">
            <h1 className="text-xl font-semibold">
              Groups
            </h1>

            {/* search value */}
            <div className="w-full flex gap-2 mt-2">
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
          <div className="flex flex-col w-full">
              {AllGroups.map((newChat,i) => (
                <>
                <GroupCard name={newChat.name} id={newChat.id} />
                </>
              ))}
          </div>
         </>}

         {searchvalue &&
         <>
          <div className="w-full">
            {filtgroup.length > 0 ?
            <>
              {filtgroup.map((filt, i) => (
                 <GroupCard name={filt.name} id={filt.id} />
              ))}
            </>: 
            <>
              <h1 className="text-sm text-center text-red-500 mt-3">
              no Groups found
              </h1>
            </>}
          </div>
         </>}
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default Groups