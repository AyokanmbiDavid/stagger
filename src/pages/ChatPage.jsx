import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useSocket } from "../hooks/useSocket";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // Track if the other person is typing
  const userId = localStorage.getItem("userId");
  
  // 1. Initialize Socket and Connection State
  const { socket, onlineUsers, isConnected } = useSocket(userId);

  // 2. Listen for "Typing" events from the server
  useEffect(() => {
    if (!socket) return;

    socket.on("user_typing", ({ senderId }) => {
      if (senderId === selectedUser?._id) {
        setIsTyping(true);
      }
    });

    socket.on("user_stop_typing", ({ senderId }) => {
      if (senderId === selectedUser?._id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [socket, selectedUser]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      
      {/* PROFESSIONAL ADDITION: Connection Status Bar */}
      {!isConnected && (
        <div className="bg-amber-500 text-white text-[10px] py-1 text-center font-bold tracking-widest uppercase animate-pulse">
          Connecting to secure server...
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR: Visible on Desktop, Hidden on Mobile if chat is open */}
        <div className={`${selectedUser ? "hidden" : "block"} md:block w-full md:w-80 h-full border-r bg-white`}>
          <Sidebar 
            socket={socket} 
            onlineUsers={onlineUsers}
            onSelectUser={(user) => setSelectedUser(user)} 
            selectedUserId={selectedUser?._id}
          />
        </div>

        {/* CHAT WINDOW: Hidden on Mobile if no user selected */}
        <div className={`${!selectedUser ? "hidden" : "block"} flex-1 h-full bg-white relative`}>
          {selectedUser ? (
            <ChatWindow 
              user={selectedUser} 
              socket={socket} 
              isTyping={isTyping} // Pass typing status to header
              onBack={() => setSelectedUser(null)} 
            />
          ) : (
            /* Empty State for Desktop */
            <div className="hidden md:flex flex-col items-center justify-center h-full text-gray-400 bg-slate-50">
               <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
               </div>
               <p className="text-lg font-medium">Select a friend to start chatting</p>
               <p className="text-sm">Your messages are secured with end-to-end encryption</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;