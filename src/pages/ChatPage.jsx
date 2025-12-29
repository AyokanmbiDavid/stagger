import React, { Suspense, useEffect, useState } from 'react'
import { apiUrl, LoadingBig, LoadingSmall, authHeaders } from '../components/Exporting.jsx';
import { ArrowRightIcon, BellIcon, CalendarIcon, ChatBubbleLeftIcon, MagnifyingGlassIcon, PaperAirplaneIcon, PlusIcon, WrenchIcon } from '@heroicons/react/24/outline';
import {motion} from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {ReactTyped} from 'react-typed'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const ChatPage = () => {
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, senderName: 'AuraNostra', text: "Hey — this is the receiver's message. How are you?", time: new Date().toISOString(), isMine: false },
    { id: 2, senderName: 'You', text: "I'm good — thanks! This is my message.", time: new Date().toISOString(), isMine: true }
  ])
  const { chatId } = useParams()
  const [convoId, setConvoId] = useState(null)
  const messagesRef = React.useRef(null)
  const textareaRef = React.useRef(null)
  const [inputHeight, setInputHeight] = useState(56)
  const [activeDropdownId, setActiveDropdownId] = useState(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [toastNotice, setToastNotice] = useState(null)

  const formatTime = iso => {
    try {
      const d = new Date(iso)
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch (e) { return '' }
  }

  useEffect(() => {
    // scroll to bottom when messages change (reversed list: bottom = scrollTop 0)
    const el = messagesRef.current
    if (!el) return
    const atBottom = el.scrollTop <= 50
    requestAnimationFrame(() => {
      if (atBottom) el.scrollTop = 0
    })
  }, [messages])


  // load conversation on mount
  useEffect(() => {
    const load = async () => {
      try {
        const me = JSON.parse(localStorage.getItem('staggerUser') || '{}')
        if (!me || !me._id) return

        // try treat chatId as conversation id
        let convo = null
        try {
          const res = await axios.get(`${apiUrl}/chats/${chatId}`, { headers: authHeaders() })
          convo = res.data
        } catch (e) {
          // not a conversation id — treat chatId as other user's id
        }

        if (!convo) {
          // fetch user conversations and find one that includes chatId
          const res = await axios.get(`${apiUrl}/chats/user/${me._id}`, { headers: authHeaders() })
          const convos = res.data || []
          convo = convos.find(c => c.participants.some(p => (p._id || p) === chatId || (String(p._id || p) === String(chatId))))
        }

        if (!convo) {
          // create a new conversation between me and chatId
          const createRes = await axios.post(`${apiUrl}/chats`, { participants: [me._id, chatId] }, { headers: authHeaders() })
          convo = createRes.data
        }

        if (convo) {
          setConvoId(convo._id || convo.id || chatId)
          const mapped = (convo.messages || []).map(m => ({ id: m._id || Date.now(), senderName: m.senderName, text: m.text, time: m.timestamp || m.time || new Date().toISOString(), isMine: String(m.sender) === String(me._id) }))
          setMessages(mapped)
        }
      } catch (err) {
        console.error('Failed to load conversation', err)
      }
    }
    load()
  }, [chatId])

  useEffect(() => {
    function onDocClick(e) {
      // close dropdown if clicked outside
      if (!e.target.closest || !document) return
      const dd = document.getElementById('msg-dropdown')
      if (dd && !dd.contains(e.target)) setActiveDropdownId(null)
    }
    if (activeDropdownId) document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [activeDropdownId])

  const showToast = (msg, ms = 1800) => {
    setToastNotice(msg)
    setTimeout(() => setToastNotice(null), ms)
  }

  // keep padding bottom in sync with input height so last message isn't covered
  useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    el.style.paddingBottom = `${inputHeight + 24}px`
  }, [inputHeight])

  const handleSend = () => {
    const trimmed = inputText.trim()
    if (!trimmed) return
    const stored = localStorage.getItem('staggerLog')
    let username = 'You'
    try { username = stored ? JSON.parse(stored).username || 'You' : 'You' } catch (e) {}
    if (editingId) {
      // save edit
      setMessages(prev => prev.map(x => x.id === editingId ? { ...x, text: trimmed, time: new Date().toISOString() } : x))
      setEditingId(null)
      showToast('Message updated')
      // clear input
      setInputText('')
      const ta = textareaRef.current
      if (ta) { ta.style.height = ''; setInputHeight(56) }
      return
    }

    const next = { sender: JSON.parse(localStorage.getItem('staggerUser') || '{}')._id, senderName: username, text: trimmed }

    // post to backend
    if (convoId) {
      axios.post(`${apiUrl}/chats/${convoId}/messages`, next, { headers: authHeaders() })
        .then(res => {
          const created = res.data
          const mapped = { id: created._id || Date.now(), senderName: created.senderName, text: created.text, time: created.timestamp || new Date().toISOString(), isMine: true }
          setMessages(m => [...m, mapped])
        }).catch(err => {
          console.error('send message failed', err)
        })
    } else {
      // fallback local
      setMessages(m => [...m, { id: Date.now(), senderName: username, text: trimmed, time: new Date().toISOString(), isMine: true }])
    }
    setInputText('')
    // reset textarea size
    const ta = textareaRef.current
    if (ta) { ta.style.height = ''; setInputHeight(56) }
  }

  const onMessageOptions = (e, m) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    // position dropdown near the message (right aligned), clamp to viewport
    const menuW = 140
    const padding = 8
    const top = rect.top + window.scrollY + 8
    let left = rect.right - menuW
    const maxLeft = window.scrollX + window.innerWidth - menuW - padding
    if (left > maxLeft) left = Math.max(rect.left, maxLeft)
    if (left < window.scrollX + padding) left = window.scrollX + padding
    setDropdownPos({ top, left })
    setActiveDropdownId(m.id)
  }

  const handleDelete = id => {
    setMessages(prev => prev.filter(x => x.id !== id))
    setActiveDropdownId(null)
    if (editingId === id) { setEditingId(null); setEditingText('') }
    showToast('Message deleted')
  }

  const handleCopy = async text => {
    try {
      await navigator.clipboard.writeText(text)
      showToast('Copied to clipboard')
    } catch (e) {
      showToast('Copy failed')
    }
    setActiveDropdownId(null)
  }

  const handleEdit = m => {
    // move message text into main input for editing
    setEditingId(m.id)
    setInputText(m.text)
    // auto-resize textarea
    requestAnimationFrame(() => {
      const ta = textareaRef.current
      if (!ta) return
      ta.style.height = 'auto'
      const h = Math.min(ta.scrollHeight, 150)
      ta.style.height = h + 'px'
      setInputHeight(h + 16)
      ta.focus()
    })
    setActiveDropdownId(null)
  }
  return (
    <>
    <Suspense fallback={<LoadingBig/>}>
      <div className="relative w-full h-screen flex flex-col">
        {/* top */}
        <div className="p-2 py-3 border-b-2 border-b-slate-300 lg:hidden">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
              <Link to={'/home'}>
                <ArrowRightIcon className='w-6 text-slate-600 rotate-180'/>
              </Link>
              ~AuraNostra
            </h1>
            </div>
        </div>

        {/*  body - messages container */}
        <div className="w-full border-0 rounded-xl my-2 p-2 flex-1 flex flex-col gap-2 min-h-0">
          <div ref={messagesRef} className="flex-1 overflow-y-auto pb-28 flex flex-col-reverse gap-2">
            {messages.slice().reverse().map(m => (
              <motion.div
                key={m.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.12 }}
                className={`flex relative ${m.isMine ? 'justify-end' : 'justify-start'}`}>
                <div onClick={(e) => onMessageOptions(e, m)} className={`cursor-pointer max-w-[75%] p-2 text-sm rounded-lg break-words overflow-hidden ${m.isMine ? 'bg-green-500 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                  <div className="text-[11px] font-semibold mb-1">{m.isMine ? 'You' : m.senderName}</div>
                  <div className="whitespace-pre-wrap break-words">{m.text}</div>
                  <div className={`text-[10px] mt-1 ${m.isMine ? 'text-white/80 text-right' : 'text-slate-600 text-left'}`}>{formatTime(m.time)}</div>
                </div>

                {/* dropdown for this message */}
                {activeDropdownId === m.id && (
                  <div id="msg-dropdown" style={{ top: dropdownPos.top, left: dropdownPos.left }} className="fixed z-50 bg-white rounded-md shadow-lg w-36 text-sm">
                    <button onClick={() => handleDelete(m.id)} className="w-full text-left px-3 py-2 hover:bg-slate-100">Delete</button>
                    <button onClick={() => handleEdit(m)} className="w-full text-left px-3 py-2 hover:bg-slate-100">Edit</button>
                    <button onClick={() => handleCopy(m.text)} className="w-full text-left px-3 py-2 hover:bg-slate-100">Copy</button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* toast notice */}
        {toastNotice && (
          <div className="fixed top-6 right-6 z-60 bg-black/80 text-white px-3 py-2 rounded-md">{toastNotice}</div>
        )}

        {/* input section - pinned to bottom */}
        <div className="fixed bottom-4 left-0 right-0 px-4 lg:hidden">
          <div className="max-w-3xl mx-auto flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={e => {
                  // auto-resize
                  setInputText(e.target.value)
                  const ta = textareaRef.current
                  if (!ta) return
                  ta.style.height = 'auto'
                  const h = Math.min(ta.scrollHeight, 150)
                  ta.style.height = h + 'px'
                  setInputHeight(h + 16)
                }}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                rows={1}
                placeholder='Type a message...'
                className='w-full resize-none rounded-xl border-2 border-slate-300 p-3 focus:outline-green-600 max-h-[150px]'/>
            </div>
            {editingId ? (
              <motion.button
                onClick={handleSend}
                whileTap={{scale: 0.96}}
                className='p-3 bg-green-600 rounded-xl text-white font-semibold border-3 border-green-700 border-b-5 border-b-green-800'>
                <CheckIcon className='w-5' />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSend}
                whileTap={{scale: 0.96}}
                className='p-3 bg-green-600 rounded-xl text-white font-semibold border-3 border-green-700 border-b-5 border-b-green-800'>
                <PaperAirplaneIcon className='w-5 rotate-300' />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </Suspense>
    </>
  )
}

export default ChatPage