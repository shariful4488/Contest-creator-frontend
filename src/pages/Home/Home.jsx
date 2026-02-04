import React from 'react';
import Banner from '../../components/Banner';
import PopularContests from '../../components/PopularContests';

const Home = () => {
    return (
        <div>
            <div className='min-h-screen'>
                <Banner/>
            
            </div>
            <PopularContests/>
        </div>
    );
};

export default Home;