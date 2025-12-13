import {  ChatBubbleBottomCenterIcon, ClockIcon, HomeIcon, UserIcon, WrenchIcon } from "@heroicons/react/24/outline";

export const userData = JSON.parse(localStorage.getItem('sonaData')) || [];

export const Menus = [
    {name: 'Dashboard', icon: <HomeIcon className='w-6 h-6'/>, link: '/home',},
    {name: 'Message Us', icon: <ChatBubbleBottomCenterIcon className='h-6 w-6'/>, link: '/message'},
    {name:'Skills', icon: <WrenchIcon className="h-6 w-6" />, link:"/skills"},
    {name: 'Team', icon: <UserIcon className='w-6 h-6'/>, link: '/team',},
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
     <div className="border border-green-700 text-green-700 p-2 px-4 rounded-full max-md:text-xs">
          Loading... Importing docs.
        </div>
  )
}

// loading big
export function LoadingBig () {
  return(
     <div className="px-4 p-3 text-sm  mt-20 w-full flex justify-center items-center
      ">
        <div className="border border-green-700 p-2 px-4 rounded-full text-green-700">
          Loading...
        </div>
      </div>
  )
}
