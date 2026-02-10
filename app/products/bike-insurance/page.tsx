import React from 'react';
import MainNavbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import BikeInsurance from './bikeInsurance';

function page() {
    return (
        <>
            <MainNavbar/>
            <BikeInsurance/>
            <Footer/>
        </>
    )
}

export default page
