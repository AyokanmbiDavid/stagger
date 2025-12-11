import React from 'react'
import { Navigate, Outlet, replace } from 'react-router-dom'

const ProtectedRoute = () => {
  const isLogged = JSON.parse(localStorage.getItem('sociaLingLogin')) || false;

  if (!isLogged) {
    return <Navigate to={'/login'} replace/>;
  }

  return <Outlet/>
}

export default ProtectedRoute