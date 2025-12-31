import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './index.css'
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Home = React.lazy(() => import('./pages/Home.jsx'));
const WelcomePage = React.lazy(() => import('./pages/WelcomePage.jsx'));
const Settings = React.lazy(() => import('./pages/Settings.jsx'));
const Account = React.lazy(() => import('./pages/Account.jsx'));
const Login = React.lazy(() => import('./pages/Login.jsx'));
const ChatPage = React.lazy(() => import('./pages/ChatPage.jsx'));
const Groups = React.lazy(() => import('./pages/Groups.jsx'))

export default function App() {
 

  return (
    <>
     <div className="px-3 lg:px-[100px]">
       <Routes>
          <Route path='/' element={<WelcomePage/>} />
          <Route path='/login' element={<Login/>} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/home' element={<Home/>} />
            <Route path='/settings' element={<Settings/>} />
            <Route path='/account' element={<Account/>} />
            <Route path='/chat/:chatId' element={<ChatPage/>} />
            <Route path='/groups' element={<Groups/>} />
          </Route>
      </Routes>
     </div>
    </>
  );
}
