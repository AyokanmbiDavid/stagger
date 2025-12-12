import { ArrowUpIcon, BookmarkIcon, BookOpenIcon, ChatBubbleBottomCenterIcon, ClockIcon, HomeIcon, MicrophoneIcon, PhoneIcon, VideoCameraIcon, WrenchIcon } from "@heroicons/react/24/outline";


export const Menus = [
    {name: 'Home', icon: <HomeIcon className='w-4 h-4'/>, link: '/',},
    {name: 'Message Me', icon: <ChatBubbleBottomCenterIcon className='h-4 w-4'/>, link: '/message'},
    {name:'Skills', icon: <WrenchIcon className="h-4 w-4" />, link:"/skills"},
    {name: 'My Works', icon: <BookOpenIcon className='w-4 h-4'/>, link: '/work',},
  ];

  // contacts
  export const Contacts = [
    {name:'Telephone', val:'09024572602'},
    {name:'Gmail', val:'davidayokanmbi47@gmail.com'},
    {name:'LinkedIn', val:'https://linkedin.com'}
  ]

// works
   export const MyWorks = [
    {name:'SociaLing', link:'', desc:'it is a social networking application'},
    {name:'TaskDown', link:'', desc:'it helps you keep track of your task with time, sendings mails and notifications.'},
   ]

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
