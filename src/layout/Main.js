import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">Email Password Authentication</span>
                </div>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;