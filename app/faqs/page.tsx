import React from 'react';
import MainNavbar from '@/components/layouts/navbar';
import Faqs from './faqs';
import Footer from '@/components/layouts/footer';

function page() {
  return (
    <>
      <MainNavbar/>
      <Faqs/>
      <Footer/>
    </>
  )
}

export default page
