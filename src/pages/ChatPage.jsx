import React, { Suspense, useEffect, useState } from 'react'
import { AllChat, AllUsers, LoadingBig, LoadingSmall } from '../components/Exporting.jsx'
import { data, Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, PaperAirplaneIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = React.lazy(() => import('../components/Navbar.jsx'))

const ChatPage = () => {
  const id = useParams();
  const [loading, setLoading] = useState(false);
  let senderId = JSON.parse(localStorage.getItem("staggerLog")).id
  let recieverId = id.chatId
  const [chatUser, setChatUser] = useState(AllUsers.filter(e => e.id == recieverId));
  const [filtUserchat, setFilterUserchat] = useState(AllChat.filter(e => e.participant.find(e => e == recieverId))[0].message)
  const [selected, setSelect] = useState();

  const [Form, setForm] = useState({
    mes: '',
    timeStamp: new Date().getHours().toLocaleString() + ':' + new Date().getMinutes().toLocaleString(),
    sender: [senderId]
  })

  useEffect(() => {
    setLoading(true);
    try {
      setLoading(false);
    } catch (e) {
      setLoading(false)
    }
  
  }, [])
  

  async function  submitText(e) {
    e.preventDefault();
    if (filtUserchat) {  
      if (Form.mes) {
        filtUserchat.push(Form)
      }
    } else {
      AllChat.push({
          participant: [senderId,recieverId],
        message: [
          Form
        ]
      });
    }
    setForm({...Form, 
      'mes' : ''
    })
  }

  async function selectMess (e) {
    if (selected == filtUserchat.indexOf(e)) {
      setSelect()
    } else {
      setSelect(filtUserchat.indexOf(e))
    }
  }

  async function deleteMess(selected) {
    setFilterUserchat(filtUserchat.map(e => e.id != 1));
    setSelect()
  }

  return (
    <>
      <Suspense fallback={<LoadingBig/>}>
        <div className="w-full h-screen relative flex">
          <Navbar/>

          <div className="relative w-full p-2 max-md:mt-15 ">
            {/* top navbar */}
            <div className="w-full px-2 py-1 flex z-10 bg-white justify-between border-b-3 border-slate-300">
              {selected ? 
              <>
                <div className="flex items-center justify-between w-full bg-white">
                  <div className="flex gap-2">
                    <XMarkIcon className='w-5' onClick={() => setSelect()}/>
                    
                    <h1 className="text-lg text-slate-700">
                      Selected
                    </h1>
                  </div>

                  
                  <div className="flex items-center gap-5">
                    <TrashIcon className='w-5 text-red-500 hover:bg-red-100' 
                    onClick={() => deleteMess()}
                  />
                  <PencilIcon className='w-5 text-yellow-600 hover:bg-yellow-100' />
                  </div>
                </div>
              </> :
              <div className="flex items-center gap-2 bg-white">
                <Link to={'/home'}
                className='p-2 rounded-md hover:bg-slate-100'>
                  <ArrowLeftIcon className='w-5 text-slate-800'/>
                </Link>

                <h1 className="text-lg text-slate-700">
                  {loading ? <LoadingSmall/> :
                  chatUser[0].name}
                </h1>
              </div>}
              
              {/* main body */}
              <div className="w-full absolute bottom-20 left-0 ">
                <div className="flex flex-col max-h-[530px] overflow-y-auto">
                  {filtUserchat.length != 0 ?
                  <>
                    {filtUserchat.map((e) => (
                      <div 
                      onClick={() => selectMess(e)}
                      className={`border-b-2 w-full border-slate-200 p-2 flex flex-col  ${e.sender == 2 ? 'items-start' : 'items-end'}`}>
                          <h1 className="text-lg max-w-7/10">
                            {e.mes}
                          </h1>
                          <h1 className="text-green-500">
                            {e.timeStamp}
                          </h1>
                          {e.sender == 2 && 
                          <h1 className='text-sm'>
                            {chatUser[0].name}
                            </h1>}
                      </div>
                    ))}
                  </>
                : 
                <h1 className='text-center w-full py-3 text-slate-700'></h1>}
                </div>
              </div>

              {/* input */}
              <form
              onSubmit={submitText}
              className="absolute left-0 w-full bottom-2 flex items-center gap-2 border-t-2 border-slate-200 p-2">
                    <input type="text"
                    placeholder='Type here..'
                    value={Form.mes}
                    onChange={(e) => {setForm({...Form,
                    'mes': e.target.value})
                    }}
                    className="w-full rounded-xl bg-slate-100 border-0 p-3" />

                    <button 
                    className="p-3 rounded-xl bg-green-500">
                      <PaperAirplaneIcon className='w-5 text-white rotate-[300deg]' />
                    </button>
              </form>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default ChatPage