import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Nav from '../containers/Nav';
import useAuthStore from '../stores/authStore';

const Main = () => {
    const user = useAuthStore((state) => state.user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className="flex h-screen w-screen">
            <Nav />
            <Outlet />
        </div>
    );
};

export default Main;
