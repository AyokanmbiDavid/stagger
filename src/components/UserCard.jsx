import { UserIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({id,name}) => {
  return (
    <>
     <Link
     to={`/chat/${id}`}
     className="w-full border-b-3 border-slate-200 p-3 hover:bg-green-100 duration-300 cursor-pointer">
          <div className="flex gap-2 items-center text-slate-600">
            <UserIcon className='w-4'/>
            <h1 className="text-slate-700">
            {name}
          </h1>
          </div>
      </Link>
  </>
  )
}

export default UserCard