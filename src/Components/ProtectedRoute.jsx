import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from './Context/UserContext';


const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth()


    if (isAuthenticated) {
        return isAuthenticated && (
            <Outlet />)
    }
    else {
        Navigate('/login')
    }



};

export default ProtectedRoute;
