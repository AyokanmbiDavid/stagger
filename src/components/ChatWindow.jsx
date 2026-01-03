import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Image, Mic, Trash2, MoreVertical, Edit2, X } from "lucide-react";
import API from "../api/axios";
import axios from "axios";
import { LoadingSmall } from '../components/Exporting.jsx'

const ChatWindow = ({ user, onBack, socket, isTyping }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null); // Tracks which message is being edited
  const [activeMenu, setActiveMenu] = useState(null); // Tracks which message menu is open
  
  const scrollRef = useRef();
  const mediaRecorder = useRef(null);
  const typingTimeoutRef = useRef(null);

  // --- 1. History & Scrolling ---
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/api/messages/${user._id}`);
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [user._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 2. Socket Listeners ---
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (incomingMsg) => {
      if (incomingMsg.senderId === user._id) {
        setMessages((prev) => [...prev, incomingMsg]);
      }
    });
    
    // Listen for deletions/edits from the other side
    socket.on("message_deleted", (messageId) => {
        setMessages((prev) => prev.filter(m => m._id !== messageId));
    });

    socket.on("message_edited", (updatedMsg) => {
        setMessages((prev) => prev.map(m => m._id === updatedMsg._id ? updatedMsg : m));
    });

    return () => {
        socket.off("receive_message");
        socket.off("message_deleted");
        socket.off("message_edited");
    };
  }, [socket, user._id]);

  // --- 3. CRUD Actions ---

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setLoading(true);

    try {
      if (editingMessage) {
        // EDIT MODE
        const { data } = await API.put(`/api/messages/edit/${editingMessage._id}`, { text: newMessage });
        setMessages(prev => prev.map(m => m._id === data._id ? data : m));
        socket.emit("edit_message", data);
        setEditingMessage(null);
      } else {
        // SEND MODE
        const messageData = { receiverId: user._id, text: newMessage, messageType: "text" };
        const { data } = await API.post("/api/messages/send", messageData);
        socket.emit("send_message", data);
        setMessages((prev) => [...prev, data]);
      }
      setNewMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await API.delete(`/api/messages/delete/${messageId}`);
      setMessages(prev => prev.filter(m => m._id !== messageId));
      socket.emit("delete_message", { messageId, receiverId: user._id });
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm("Clear all messages with this user?")) return;
    try {
      await API.delete(`/api/messages/clear/${user._id}`);
      setMessages([]);
    } catch (err) {
      console.error("Clear chat failed", err);
    }
  };

  const startEdit = (msg) => {
    setEditingMessage(msg);
    setNewMessage(msg.text);
    setActiveMenu(null);
  };

  // --- UI Helpers ---
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (!socket) return;
    socket.emit("typing", { receiverId: user._id });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { receiverId: user._id });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      {/* Header */}
      <div className="h-16 flex items-center px-4 gap-3 bg-white shadow-sm shrink-0">
        <button onClick={onBack} className="md:hidden text-gray-600"><ArrowLeft size={24} /></button>
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-bold text-gray-700">{user.username}</span>
          <span className={`text-xs ${isTyping ? "text-green-500 italic animate-pulse" : "text-gray-400"}`}>
            {isTyping ? "typing..." : "online"}
          </span>
        </div>
        {/* Clear Chat Button */}
        <button onClick={handleClearChat} className="p-2 text-gray-400 hover:text-red-500 transition">
            <Trash2 size={20} />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg._id} className={`flex ${msg.senderId === user._id ? "justify-start" : "justify-end"} group relative`}>
            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm relative ${msg.senderId === user._id ? "bg-white text-gray-800 rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none"}`}>
              
              {/* Message Context Menu (Only for your own messages) */}
              {msg.senderId !== user._id && (
                  <button 
                    onClick={() => setActiveMenu(activeMenu === msg._id ? null : msg._id)}
                    className="absolute -left-8 top-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical size={16} />
                  </button>
              )}

              {activeMenu === msg._id && (
                  <div className="absolute left-[-100px] top-0 bg-white shadow-lg border rounded-lg z-10 py-1 text-black text-xs">
                      <button onClick={() => startEdit(msg)} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"><Edit2 size={12}/> Edit</button>
                      <button onClick={() => handleDeleteMessage(msg._id)} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left text-red-500"><Trash2 size={12}/> Delete</button>
                  </div>
              )}

              {msg.text && <p className="text-sm">{msg.text}</p>}
              {msg.messageType === "image" && <img src={msg.mediaUrl} className="rounded-lg mt-1" alt="" />}
              {msg.messageType === "audio" && <audio src={msg.mediaUrl} controls className="mt-1 h-8" />}
              
              <div className="flex items-center justify-end gap-1 mt-1 opacity-60 text-[10px]">
                {msg.isEdited && <span>(edited)</span>}
                <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Form */}
      <div className="bg-white p-2">
          {editingMessage && (
              <div className="flex items-center justify-between px-4 py-1 bg-gray-50 text-xs text-blue-600 rounded-t-lg">
                  <span>Editing message...</span>
                  <button onClick={() => {setEditingMessage(null); setNewMessage("");}}><X size={14}/></button>
              </div>
          )}
          <form onSubmit={handleSend} className="p-2 flex items-center gap-2">
            <label className="cursor-pointer text-gray-500"><Image size={20} /><input type="file" className="hidden" onChange={(e) => {/* your upload logic */}} /></label>
            <textarea
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1 p-2 bg-gray-100 rounded-xl resize-none h-10 focus:outline-none"
            />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded-full">
              {loading ? <LoadingSmall /> : <Send size={20} />}
            </button>
          </form>
      </div>
    </div>
  );
};

export default ChatWindow;