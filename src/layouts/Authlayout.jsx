import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';



const Authlayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className='flex flex-col min-h-screen'>
            <header>
                <Navbar/>
            </header>
            <main className='flex-1 flex flex-col'>
               {isLoading ? (
                    <div className="flex-1 flex justify-center items-center">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <Outlet/>
                )}
            </main>
        </div>
    );
};

export default Authlayout;