import React from 'react';
import TravelInsurance from './travelInsurance';
import MainNavbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';

function page() {
    return (
        <>
            <MainNavbar/>
            <TravelInsurance/>
            <Footer/>
        </>
    )
}

export default page
