import React, { useState } from 'react';
import Banner from '../../components/Banner';
import PopularContests from '../../components/PopularContests';
import Winner from '../../components/Winner';
import TopCreators from '../../components/TopCreators';
// import Statistics from '../../components/Statistics';
import HowItWorks from '../../components/HowItWorks';
import Newsletter from '../../components/Newsletter';

const Home = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <div>
        <Banner onSearch={(text) => setSearchText(text)} />
      </div>

      {/* <Statistics /> */}

      <div className="space-y-20 pb-20"> 
        <PopularContests searchText={searchText} />
        <HowItWorks/>
        <TopCreators />
        <Winner />
        <Newsletter/>
      </div>
    </div>
  );
};

export default Home;
