// PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust import path

const PrivateRoute: React.FC = () => {
    const {currentUser} = useSelector((state: RootState) => state.user);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
