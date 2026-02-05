import React from 'react';
import Banner from '../../components/Banner';
import PopularContests from '../../components/PopularContests';
import Winner from '../../components/Winner';
import TopCreators from '../../components/TopCreators';

const Home = () => {
    return (
        <div>
            <div className='min-h-screen'>
                <Banner/>
            </div>
            <PopularContests/>
            <TopCreators/>
            <Winner/>
        </div>
    );
};

export default Home;