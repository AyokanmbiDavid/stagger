import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Image, Mic, Trash2 } from "lucide-react";
import API from "../api/axios";
import axios from "axios";

const ChatWindow = ({ user, onBack, socket, isTyping }) => { // Added isTyping prop
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef();
  const mediaRecorder = useRef(null);
  const typingTimeoutRef = useRef(null); // Ref for typing timeout

  // 1. Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. Fetch history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await API.get(`/api/auth/messages/${user._id}`);
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [user._id]);

  useEffect(() => {
  // Only scroll if the user is already near the bottom
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  // 3. Socket Listener
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (incomingMsg) => {
      if (incomingMsg.senderId === user._id) {
        setMessages((prev) => [...prev, incomingMsg]);
      }
    });
    return () => socket.off("receive_message");
  }, [socket, user._id]);

  // --- NEW: Typing Indicator Logic ---
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);

    if (!socket) return;

    // Emit "typing" event
    socket.emit("typing", { receiverId: user._id, senderId: localStorage.getItem("userId") });

    // Clear existing timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Set timeout to emit "stop_typing" after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { receiverId: user._id, senderId: localStorage.getItem("userId") });
    }, 2000);
  };

  // 4. Handle Text Send
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Stop typing immediately when sending
    socket.emit("stop_typing", { receiverId: user._id, senderId: localStorage.getItem("userId") });

    const messageData = { receiverId: user._id, text: newMessage, messageType: "text" };
    try {
      const { data } = await API.post("/messages/send", messageData);
      socket.emit("send_message", data);
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (err) { console.error(err); }
  };

  // 5. Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "stagger_chat"); 

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", formData);
      const { data } = await API.post("/messages/send", {
        receiverId: user._id,
        mediaUrl: res.data.secure_url,
        messageType: "image",
      });
      socket.emit("send_message", data);
      setMessages((prev) => [...prev, data]);
    } catch (err) { console.error(err); }
  };

  // 6. Voice Note Upload
  const sendVoiceNote = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("upload_preset", "stagger_chat");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/your_cloud_name/video/upload", formData);
      const { data } = await API.post("/messages/send", {
        receiverId: user._id,
        mediaUrl: res.data.secure_url,
        messageType: "audio",
      });
      socket.emit("send_message", data);
      setMessages((prev) => [...prev, data]);
    } catch (err) { console.error("Voice upload failed", err); }
  };

  // 7. Start/Stop Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        sendVoiceNote(blob);
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) { console.error("Mic access denied", err); }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      {/* --- Updated Header with Typing Status --- */}
      <div className="h-16 flex items-center px-4 gap-3 bg-white shadow-sm shrink-0">
        <button onClick={onBack} className="md:hidden text-gray-600"><ArrowLeft size={24} /></button>
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-bold text-gray-700 leading-none">{user.username}</span>
          <span className={`text-xs mt-1 ${isTyping ? "text-green-500 font-medium italic animate-pulse" : "text-gray-400"}`}>
            {isTyping ? "typing..." : "online"}
          </span>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg._id} ref={scrollRef} className={`flex ${msg.senderId === user._id ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${msg.senderId === user._id ? "bg-white text-gray-800 rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none"}`}>
              {msg.text && <p className="text-sm">{msg.text}</p>}
              {msg.messageType === "image" && <img src={msg.mediaUrl} alt="sent" className="rounded-lg max-h-60 w-full object-cover mt-1" />}
              {msg.messageType === "audio" && <audio src={msg.mediaUrl} controls className="w-full mt-1 h-8" />}
              <span className="text-[10px] opacity-60 block text-right mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-white shadow-sm flex items-center gap-2 shrink-0">
        <label className="p-2 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer">
          <Image size={20} /><input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
        
        <button 
          type="button" 
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className={`p-2 rounded-full transition ${isRecording ? "text-red-500 bg-red-100 animate-pulse" : "text-gray-500 hover:bg-gray-100"}`}
        >
          <Mic size={20} />
        </button>

        <input
          value={newMessage}
          onChange={handleInputChange} // Changed to handleInputChange
          placeholder={isRecording ? "Recording..." : "Type a message..."}
          className={`flex-1 p-2 rounded-full px-4 focus:outline-none text-sm ${isRecording ? "bg-red-50" : "bg-gray-100"}`}
        />
        
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"><Send size={20} /></button>
      </form>
    </div>
  );
};

export default ChatWindow;