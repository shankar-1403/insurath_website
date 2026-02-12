import React from 'react'
import MainNavbar from '@/components/layouts/navbar';
import ContactUs from './contactUs';
import Footer from '@/components/layouts/footer';

function page() {
    return (
        <>
            <MainNavbar/>
            <ContactUs/>
            <Footer/>
        </>
    )
}

export default page
