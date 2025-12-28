import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './index.css'
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Home = React.lazy(() => import('./pages/Home.jsx'));
const WelcomePage = React.lazy(() => import('./pages/WelcomePage.jsx'));
const Skills = React.lazy(() => import('./pages/Skills.jsx'));
const Account = React.lazy(() => import('./pages/Account.jsx'));
const Login = React.lazy(() => import('./pages/Login.jsx'));
const ChatPage = React.lazy(() => import('./pages/ChatPage.jsx'));

export default function App() {
  const navigate = useNavigate()
  

  return (
    <>
     <div className="px-3">
       <Routes>
          <Route path='/' element={<WelcomePage/>} />
          <Route path='/login' element={<Login/>} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/home' element={<Home/>} />
            <Route path='/skills' element={<Skills/>} />
            <Route path='/account' element={<Account/>} />
            <Route path='/chat/:chatId' element={<ChatPage/>} />
          </Route>
      </Routes>
     </div>
    </>
  );
}
