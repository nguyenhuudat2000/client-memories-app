import React from 'react'
import { Navigate } from 'react-router';

const PrivateRouteAuthentication = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('profile'));
  return token ? <Navigate to='/' replace /> : children;
}

export default PrivateRouteAuthentication;