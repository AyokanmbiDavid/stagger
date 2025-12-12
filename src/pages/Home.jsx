import React, { Suspense } from 'react'
import { LoadingBig } from '../components/Exporting.jsx';

const WelcomePage = React.lazy(() => import('../components/WelcomePage.jsx'));
const AboutMe = React.lazy(() => import('../components/AboutMe.jsx'));
const Contact = React.lazy(() => import('../components/Contacts.jsx'))

const Home = () => {
  return (
    <>
    <Suspense fallback={<LoadingBig/>}>
      <div className="">
      <WelcomePage/>
      <AboutMe/>
      <Contact/>
    </div>
    </Suspense>
    </>
  )
}

export default Home