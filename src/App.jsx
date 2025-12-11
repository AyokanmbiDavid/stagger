import { Route, Routes } from 'react-router-dom';
import React from 'react';

const Navbar = React.lazy(() => import('./components/Navbar.jsx'));
const Home = React.lazy(() => import('./pages/Home.jsx'));
const Message = React.lazy(() => import('./pages/Message.jsx'));
const Works = React.lazy(() => import('./pages/Works.jsx'));

export default function App() {

  return (
    <>
    <Navbar/>
    <div className="mt-15">
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/message' element={<Message/>} />
          <Route  path='/work' element={<Works/>}/>
      </Routes>
    </div>
      
    </>
  );
}
