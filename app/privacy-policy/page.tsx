import React from 'react';
import MainNavbar from '@/components/layouts/navbar';
import PrivacyPolicy from './privacyPolicy';
import Footer from '@/components/layouts/footer';

function page() {
  return (
    <>
        <MainNavbar/>
        <PrivacyPolicy/>
        <Footer/>
    </>
  )
}

export default page
