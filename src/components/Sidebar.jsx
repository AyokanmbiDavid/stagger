import { useEffect, useState } from "react";
import API from "../api/axios";
import UserCard from "./UserCard";
import Navbar from "./Navbar";

const Sidebar = ({ onSelectUser, socket, selectedUserId }) => {
  const [users, setUsers] = useState([
    {_id:1,username:'Big Dave',email:'david@gmail.com', unread: false},
    {_id:2,username:'Aura',email:'aura@gmail.com', unread: false},
  ]);
  const [onlineUsers, setOnlineUsers] = useState([]); // Track online IDs
  const currentUserId = localStorage.getItem("userId");
  const [filtUser, setFiltuser] = useState();
  const [FiltType, setFilttype] = useState('all')

  useEffect(() => {
    // 1. Fetch all users from DB
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/api/auth/users");
        setUsers(data.filter(u => u._id !== currentUserId));
      } catch (err) { console.error(err); }
    };
    fetchUsers();

    // 2. Listen for online status updates from Socket
    if (socket) {
      socket.on("getOnlineUsers", (userIds) => {
        setOnlineUsers(userIds);
      });
    }

    return () => socket?.off("getOnlineUsers");
  }, [socket, currentUserId]);

  return (
    <>
      <div className="flex relative justify-around">
        <Navbar/>

    <div className="flex flex-col h-screen bg-white px-2 w-full">
      <div className="p-4 py-3 font-bold text-xl text-green-600">Chats</div>

      {/* search bar */}
      <div className="w-full flex justify-center my-2">
        <input type="text"
        className="w-full rounded-xl p-3 bg-slate-100 border-2 border-slate-200 text-sm"
        onChange={(e) => setFiltuser(users.filter(d => d.username.toLowerCase().includes(e.target.value.toLowerCase())))}
        placeholder="Searn Users"/>
      </div>

      {/* filter type */}
      <div className="w-full flex my-2">
        {[{name:"All", set:"all"},{name:"Unread", set:"unread"},].map((filt, i) => (
          <>
            <div 
            onClick={() => setFilttype(filt.set)}
            className={`p-1 px-4 text-sm cursor-pointer ${FiltType == filt.set ? 'bg-green-100 rounded-full ' : ''}`}>
              {filt.name}
            </div>
          </>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!filtUser ?
        <>
          {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUserId === user._id;

          return (
            <div
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer border-b-2 border-slate-200 transition ${
                isSelected ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {/* Green Dot for Online Status */}
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{user.username}</h3>
                <p className="text-xs text-gray-500">{isOnline ? "Online" : "Offline"}</p>
              </div>
            </div>
          );
        })}
        </> :
        <>
        {filtUser.length !=0 ?
        <>
        {filtUser.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUserId === user._id;

          return (
            <div
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer border-b-2 border-slate-200 transition ${
                isSelected ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {/* Green Dot for Online Status */}
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{user.username}</h3>
                <p className="text-xs text-gray-500">{isOnline ? "Online" : "Offline"}</p>
              </div>
            </div>
          );
        })}
        </>: 
        <h1 className="py-3 text-center text-red-600">User not found</h1>}
        </>}
      </div>
    </div>
      </div>
    </>
  );
};

export default Sidebar;