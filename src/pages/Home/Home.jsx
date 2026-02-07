import React, { useState } from 'react';
import Banner from '../../components/Banner';
import PopularContests from '../../components/PopularContests';
import Winner from '../../components/Winner';
import TopCreators from '../../components/TopCreators';


const Home = () => {

    const [searchText, setSearchText] = useState("");


    return (
        <div>
            <div className='min-h-screen'>
                <Banner onSearch={(text)=> setSearchText(text)} />
            </div>
            <PopularContests searchText={searchText}/>
            <TopCreators/>
            <Winner/>
            
        </div>
    );
};

export default Home;