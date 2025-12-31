import React, { Suspense } from 'react'
import { LoadingBig } from '../components/Exporting.jsx'

const Navbar = React.lazy(() => import('../components/Navbar.jsx'))

const Skills = () => {
  return (
    <>
    <Suspense fallback={<LoadingBig/>}>
      <div className="w-full relative h-screen flex">
        <Navbar/>

        <div className="w-full"></div>
      </div>
    </Suspense>
    </>
  )
}

export default Skills