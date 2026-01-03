import { UserIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = (user = {id,username,email,profilePic}, online) => {
  return (
    <>
      <div
        className={`flex items-center gap-3 p-4 cursor-pointer border-b-2 border-slate-200 transition ${
          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
        }`}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
            {user.username.charAt(0).toUpperCase()}
          </div>
          {/* Green Dot for Online Status */}
          {online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{user.username}</h3>
          <p className="text-xs text-gray-500">{online ? "Online" : "Offline"}</p>
        </div>
      </div>
  </>
  )
}

export default UserCard