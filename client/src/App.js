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
import Forgotpassword from './pages/Auth/forgotpassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory.js';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders.js';
import Profile from './pages/user/Profile.js';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/users' element={<Users />} />
        </Route>



        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
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
