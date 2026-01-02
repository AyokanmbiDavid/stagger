import { useEffect, useState } from "react";
import API from "../api/axios";

const Sidebar = ({ onSelectUser, socket, selectedUserId }) => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]); // Track online IDs
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    // 1. Fetch all users from DB
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/auth/users");
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
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b font-bold text-xl text-blue-600">Chats</div>
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUserId === user._id;

          return (
            <div
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer border-b transition ${
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
      </div>
    </div>
  );
};

export default Sidebar;