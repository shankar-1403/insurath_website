import React from 'react';
import MainNavbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import CarInsurance from './carInsurance';

function page() {
    return (
        <>
            <MainNavbar/>
            <CarInsurance/>
            <Footer/>
        </>
    )
}

export default page
