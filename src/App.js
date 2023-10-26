import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PrivateRouteAuthentication from './privateRoute/PrivateRouteAuthentication';
// import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './styles.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/auth/Login' element={
            <PrivateRouteAuthentication>
              <Login />
            </PrivateRouteAuthentication>
          } />
          <Route path='/auth/register' element={
            <PrivateRouteAuthentication>
              <Register />
            </PrivateRouteAuthentication>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
