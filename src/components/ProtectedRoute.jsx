import React from 'react'
import { Navigate, Outlet, replace } from 'react-router-dom'

const ProtectedRoute = () => {
  const isLogged = JSON.parse(localStorage.getItem('sonaData')) || [];

  if (!isLogged.email && !isLogged.name) {
    return <Navigate to={'/'} replace/>;
  }

  return <Outlet/>
}

export default ProtectedRoute