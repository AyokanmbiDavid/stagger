import {  ChatBubbleBottomCenterIcon, ClockIcon, HomeIcon, UserIcon, WrenchIcon } from "@heroicons/react/24/outline";
import {motion} from 'framer-motion'
import { Link } from "react-router-dom";

export const apiUrl = 'https://staggerbackend.onrender.com'

export const userData = JSON.parse(localStorage.getItem('sonaData')) || [];

export function authHeaders() {
  const t = localStorage.getItem('staggerToken')
  return t ? { Authorization: `Bearer ${t}` } : {}
}

export const Menus = [
    {name: 'Home', icon: <HomeIcon className='w-6 h-6'/>, link: '/home',},
    {name: 'Groups', icon: <ChatBubbleBottomCenterIcon className='h-6 w-6'/>, link: '/groups'},
    {name:'Settings', icon: <WrenchIcon className="h-6 w-6" />, link:"/settings"},
    {name: 'Account', icon: <UserIcon className='w-6 h-6'/>, link: '/account',},
  ];

// loading small
export function LoadingSmall () {
  return(
     <div className="w-full flex justify-center items-center">
      <motion.div
       animate={{rotate:[0,360]}}
      transition={{duration: 1,ease: 'easeIn' , repeat: Infinity}}
      className="border-2 rounded-full p-3 border-l-0 border-t-0 border-green-200">

      </motion.div>
          
        </div>
  )
}

// loading big
export function LoadingBig () {
  return(
     <div className="px-4 p-3 text-sm  mt-20 w-full flex justify-center items-center
      ">
        <div className=" p-2 px-4 rounded-full text-green-700 flex gap-2 items-center">
          Loading...
          <motion.div
          animate={{rotate:[0,360]}}
          transition={{duration: 1,ease: 'easeIn' , repeat: Infinity}}
          className="border-2 rounded-full p-3 border-l-0 border-t-0">
          </motion.div>
        </div>
      </div>
  )
}

export let AllGroups = [{
    id:1,
    name: '~Collab'
  },
  {
    id:2,
    name:'~Sensor'
  },
  {
    id: 3,
    name: '~MegaBusiness'
  },
  {
    id:4,
    name:'SmTom Boy'
  }
];
export let AllUsers = [
  {
    id:1,
    name: '~BigDave',
  },
  {
    id:2,
    name:'~AuraNostra~',
  },
  {
    id: 3,
    name: '~SmTom Boy',
  },
  {
    id:4,
    name:'Gaza',
  }
];

export let AllChat = [
      {
        participant: [1,2],
        message: [
          {
            mes: 'hi',
            timeStamp: '9:15 am',
            sender:2,
          },
          {
            mes: 'how do you do',
            timeStamp: '9:15 am',
            sender:1,
          }
        ]
      },
       {
        participant: [1,1],
        sender:2,
        message: [
          {
            mes: 'hi',
            timeStamp: '9:15 am'
          }
        ]
      },
       {
        participant: [1,3],
        message: [
          {
            mes: 'hi',
            timeStamp: '9:15 am',
            sender:2,
          },
          {
            mes: 'where are you',
            timeStamp: '9:15 am',
            sender:1,
          }
        ]
      },
      {
        participant: [2,3],
        message: [
          {
            mes: 'hi',
            timeStamp: '9:15 am',
            sender:2,
          },
          {
            mes: 'where are you',
            timeStamp: '9:15 am',
            sender:1,
          }
        ]
      },{
        participant: [2,2],
        message: [
          {
            mes: 'hi',
            timeStamp: '9:15 am',
            sender:2,
          },
          {
            mes: 'where are you',
            timeStamp: '9:15 am',
            sender:1,
          }
        ]
      },{
        participant: [3,3],
        message: [
          {
            mes: 'hi',
            timeStamp: '9:15 am',
            sender:2,
          },
          {
            mes: 'where are you',
            timeStamp: '9:15 am',
            sender:1,
          }
        ]
      },
]