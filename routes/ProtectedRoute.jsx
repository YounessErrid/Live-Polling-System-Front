import React from 'react'
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
    const Logedin = false;
  return Logedin ? <Outlet/> : <Navigate to="/Login"/>
}
export default ProtectedRoute;
