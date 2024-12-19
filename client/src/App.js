import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/about';
import Contact from './pages/contact';
import Policy from './pages/policy';
import Pagenotfound from './pages/pagenotfound';
import Register from './pages/Auth/register';
import Login from './pages/Auth/login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>

          <Route path='' element={<Dashboard />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>

    </>
  );
}

export default App;
