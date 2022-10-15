import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h2 className='text-center my-5'>My simple email password authentication</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;