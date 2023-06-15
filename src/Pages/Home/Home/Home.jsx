import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import Feedback from '../Feedback/Feedback';
import AllPopularClasses from '../PopularClasses/AllPopularClasses';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> MS Music | Home</title>
            </Helmet>
            <Banner></Banner>
            <AllPopularClasses></AllPopularClasses>
            <PopularInstructors></PopularInstructors>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;