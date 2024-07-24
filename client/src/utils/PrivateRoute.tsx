// PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust import path

const PrivateRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
