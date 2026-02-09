import React from 'react'
import MainNavbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import HealthInsurance from './healthInsurance';

function route() {
  return (
    <>
        <MainNavbar/>
            <HealthInsurance/>
        <Footer/>
    </>
  )
}

export default route