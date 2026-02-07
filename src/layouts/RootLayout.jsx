import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';


const RootLayout = () => {
    const navigation = useNavigation();
    
    
    const isLoading = navigation.state === "loading";

    return (
        <div className="font-outfit">
            <Navbar />
            
            <main className="min-h-[calc(100vh-300px)]">
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[60vh]">
                       
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <Outlet />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default RootLayout;