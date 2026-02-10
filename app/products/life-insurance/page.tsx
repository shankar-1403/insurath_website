import React from 'react';
import MainNavbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import LifeInsurance from './lifeInsurance';

function page() {
  return (
    <>
      <MainNavbar/>
      <LifeInsurance/>
      <Footer/>
    </>
  )
}

export default page