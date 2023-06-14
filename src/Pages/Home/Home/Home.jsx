import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import Feedback from '../Feedback/Feedback';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> MS Music | Home</title>
            </Helmet>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;