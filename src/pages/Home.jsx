import React from 'react'

const WelcomePage = React.lazy(() => import('../components/WelcomePage.jsx'));
const AboutMe = React.lazy(() => import('../components/AboutMe.jsx'));
const Contact = React.lazy(() => import('../components/Contacts.jsx'))

const Home = () => {
  return (
    <>
    <div className="">
      <WelcomePage/>
      <AboutMe/>
      <Contact/>
    </div>
    </>
  )
}

export default Home