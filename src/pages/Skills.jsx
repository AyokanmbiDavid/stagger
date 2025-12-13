import React, { Suspense } from 'react'
import { LoadingBig } from '../components/Exporting.jsx'

const Navbar = React.lazy(() => import('../components/Navbar.jsx'))

const Skills = () => {
  return (
    <>
    <Navbar/>
      <Suspense fallback={<LoadingBig/>}>

      </Suspense>
    </>
  )
}

export default Skills