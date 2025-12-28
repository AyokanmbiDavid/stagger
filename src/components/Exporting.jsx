import {  ChatBubbleBottomCenterIcon, ClockIcon, HomeIcon, UserIcon, WrenchIcon } from "@heroicons/react/24/outline";
import {motion} from 'framer-motion'

export const apiUrl = 'http://localhost:3000'

export const userData = JSON.parse(localStorage.getItem('sonaData')) || [];

export const Menus = [
    {name: 'Dashboard', icon: <HomeIcon className='w-6 h-6'/>, link: '/home',},
    {name: 'Message Us', icon: <ChatBubbleBottomCenterIcon className='h-6 w-6'/>, link: '/message'},
    {name:'Skills', icon: <WrenchIcon className="h-6 w-6" />, link:"/skills"},
    {name: 'Account', icon: <UserIcon className='w-6 h-6'/>, link: '/account',},
  ];

  // frontend skills

   export const frontendSkills = [
    {name: 'HTML', desc: 'What the user see and touch'},
    {name: 'CSS', desc: 'the structure and look of the website'},
    {name: 'JavaScript', desc: 'the main bone of the website'},
    {name: 'Boostrap', desc: 'A css libary'},
    {name: 'Tailwind', desc: 'A css library (better)'},
    {name: 'Api', desc: 'get,put,push,delete data from backend'},
    {name: 'ReactJs', desc: 'A javaScript framework'}
   ]

  //  backend Skills
  export const backendSkills = [
    {name: 'NodeJs', desc: 'javaScript for backend'},
    {name: 'ExpressJs', desc: 'Express for routing'},
    {name: 'JsonwebToken', desc: 'secure token generation'},
    {name: 'GoogleAuth', desc: 'For google login and signup'},
    {name: 'Mern-stack', desc: 'Databse MongoDb'},
  ]

// loading small
export function LoadingSmall () {
  return(
     <div className="w-full flex justify-center items-center">
      <motion.div
       animate={{rotate:[0,360]}}
      transition={{duration: 1,ease: 'easeIn' , repeat: Infinity}}
      className="border-2 rounded-full p-3 border-l-0 border-t-0 border-green-600">

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
