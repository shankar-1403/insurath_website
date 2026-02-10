import React from 'react';
import MainNavbar from '@/components/layouts/navbar';
import BusinessInsurance from './businessInsurance';
import Footer from '@/components/layouts/footer';

function page() {
    return (
        <>
            <MainNavbar/>
            <BusinessInsurance/>
            <Footer/>
        </>
    )
}

export default page
