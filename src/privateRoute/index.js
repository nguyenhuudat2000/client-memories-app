import React from 'react'
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('profile'));
  return token ? children : <Navigate to='/auth/login' replace />;
}

export default PrivateRoute;