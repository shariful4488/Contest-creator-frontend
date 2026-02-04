import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';


const Authlayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header>
                <Navbar/>
            </header>
            <main>
               <Outlet/>
            </main>

            
        </div>
    );
};

export default Authlayout;