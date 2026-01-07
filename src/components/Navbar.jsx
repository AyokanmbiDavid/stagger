import { DoorOpenIcon, EditIcon, ImageIcon, MessageCircleIcon, UserIcon,} from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [profiledrop, setprofileDrop] = useState(false)
  const Menus = [
    {name:'Chats',link:"/",icon: <MessageCircleIcon className='w-4' />},
    {name:'Groups',link:"",icon: <ImageIcon className='w-4' />},
    {name:'Account',link:"",icon: <UserIcon className='w-4' />},
  ]

  const navigate = useNavigate()

  const location = useLocation()

  async function Logout () {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate('/login')
    }, 500);
  }

  return (
    <>
      {/* for mobile view */}
      <div className="md:hidden w-full absolute left-0 z-50 bottom-10 bg-white border-t-2 border-slate-200">
        <div className="w-full p-2 flex justify-around">
          {Menus.map((li, i) => (
            <>
              <Link to={li.name != "Account" && li.link} className='relative'>
                <div className={`p-1 rounded-full ${location.pathname == li.link && 'border-2 border-gray-200 px-3 text-green-600'}`}
                 onClick={() => {li.name == 'Account' && setprofileDrop(!profiledrop)}}>
                  {li.icon}
                </div>
                
                {li.name == "Account" && 
                <>
                  <div className={`p-2 border-2 border-slate-200 rounded-xl bg-white flex flex-col gap-3 absolute bottom-5 -right-2 z-50 
                   origin-bottom-right duration-100 shadow-lg ${profiledrop ? 'scale-100': 'scale-0'}`}>
                      <h1 className="border-b border-slate-200 py-1">
                        ~AuraNostra
                      </h1>
                      <div className="border-b border-slate-200 py-1 ">
                        <Link to={'/edit'} className='text-sm flex justify-between w-[150px] gap-2 items-center p-2 text-blue-600 border-2 border-blue-200 rounded-xl'>
                        Edit Profile <EditIcon />
                        </Link>
                      </div>
                      <div className="py-1 w-full">
                        <button
                        onClick={() => Logout()}
                        className='flex w-full p-2 text-sm justify-between bg-red-600 text-white rounded-xl'>
                          Logout <DoorOpenIcon />
                        </button>
                      </div>
                  </div>
                </>}
              </Link>
            </>
          ))}
          
        </div>
        
      </div>



      {/* for dektop view */}
      <div className="max-md:hidden flex flex-col gap-3 p-2 h-screen rounded-2xl border-2 bg-white border-gray-200">
           {Menus.map((li, i) => (
            <>
              <Link to={li.name == "Account" && li.link} className='relative'>
                <div className={` p-3 py-2 rounded-2xl hover:bg-green-100 duration-200 ${location.pathname == li.link && ' text-green-600 border-b-2 border-green-300 bg-green-100'}`}
                onClick={() => {li.name == 'Account' && setprofileDrop(!profiledrop)}}>
                  {li.icon}
                </div>
                
                {li.name == "Account" && 
                <>
                  <div className={`p-2 border-2 border-slate-200 rounded-xl bg-slate-100 flex flex-col absolute top-2 left-10 z-50 
                   origin-top-left duration-100 ${profiledrop ? 'scale-100': 'scale-0'}`}>
                      <h1 className="border-b border-slate-200 py-1">
                        ~AuraNostra
                      </h1>
                      <div className="border-b border-slate-200 py-1 ">
                        <Link to={'/edit'} className='text-sm flex justify-between w-[150px] gap-2 items-center p-2 text-blue-600 border-2 border-blue-200 rounded-xl'>
                        Edit Profile <EditIcon />
                        </Link>
                      </div>
                      <div className="py-1 w-full">
                        <button
                        onClick={() => Logout()}
                        className='flex w-full p-2 text-sm justify-between bg-red-600 text-white rounded-xl'>
                          Logout <DoorOpenIcon />
                        </button>
                      </div>
                  </div>
                </>}
              </Link>
            </>
          ))}
      </div>
    </>
  )
}

export default Navbar