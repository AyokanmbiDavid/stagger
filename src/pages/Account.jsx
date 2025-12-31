import React, { Suspense } from 'react'
import { LoadingBig } from '../components/Exporting.jsx'

const Navbar = React.lazy(() => import('../components/Navbar.jsx'))
const Account = () => {
  return(
    <>
    <Suspense fallback={<LoadingBig/>}>
      <div className="w-full relative h-screen flex">
        <Navbar/>

      </div>
    </Suspense>
    </>
  )
}

export default Account