import React from 'react';
import MainNavbar from '@/components/layouts/navbar';
import AboutUs from './aboutUs';
import Footer from '@/components/layouts/footer';

function page() {
    return (
        <>
            <MainNavbar/>
            <AboutUs/>
            <Footer/>
        </>
    )
}

export default page
