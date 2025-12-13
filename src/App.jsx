import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './index.css'
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Home = React.lazy(() => import('./pages/Home.jsx'));
const WelcomePage = React.lazy(() => import('./pages/WelcomePage.jsx'));
const Message = React.lazy(() => import('./pages/Message.jsx'));
const Skills = React.lazy(() => import('./pages/Skills.jsx'));
const Team = React.lazy(() => import('./pages/Team.jsx'))

export default function App() {
  const navigate = useNavigate()

  const isLogged = JSON.parse(localStorage.getItem('sonaData')) || [];

  useEffect(() => {
    if(isLogged.email && isLogged.name){
      navigate('/home')
    }
  }, [])
  

  return (
    <>
      <Routes>
          <Route path='/' element={<WelcomePage/>} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/home' element={<Home/>} />
            <Route path='/message' element={<Message/>} />
            <Route path='/skills' element={<Skills/>} />
            <Route path='/team' element={<Team/>} />
          </Route>
      </Routes>
    </>
  );
}
