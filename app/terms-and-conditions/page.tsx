import React from 'react';
import MainNavbar from '@/components/layouts/navbar';
import TermsConditions from './termsCondition';
import Footer from '@/components/layouts/footer';

function page() {
  return (
    <>
        <MainNavbar/>
        <TermsConditions/>
        <Footer/>
    </>
  )
}

export default page
