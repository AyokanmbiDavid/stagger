import React from 'react'
import { Navigate, Outlet, replace } from 'react-router-dom'

const ProtectedRoute = () => {
  const isLogged = true
  //  JSON.parse(localStorage.getItem('staggerLog')) || [];

  if (!isLogged) {
    return <Navigate to={'/'} replace/>;
  }

  return <Outlet/>
}

export default ProtectedRoute