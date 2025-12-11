import { ArrowUpIcon, BookmarkIcon, BookOpenIcon, ChatBubbleBottomCenterIcon, ClockIcon, HomeIcon, MicrophoneIcon, PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/outline";


export const Menus = [
    {name: 'Home', icon: <HomeIcon className='w-4 h-4'/>, link: '/',},
    {name: 'Message Me', icon: <ChatBubbleBottomCenterIcon className='h-4 w-4'/>, link: '/message'},
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

// loading small
export function LoadingSmall () {
  return(
     <div className="border border-green-700 text-green-700 p-2 px-4 rounded-full max-md:text-xs">
          Loading...
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
