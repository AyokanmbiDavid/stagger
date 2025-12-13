import React, { Suspense } from 'react'
import { LoadingBig } from '../components/Exporting'

const Navbar = React.lazy(() => import('../components/Navbar.jsx'))

const Team = () => {
  return (
    <>
      <Navbar/>
      <Suspense fallback={<LoadingBig/>}>
        
      </Suspense>
    </>
  )
}

export default Team