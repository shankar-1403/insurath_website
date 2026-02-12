"use Client";

import React from 'react'
import Logo from "../../public/assets/insurath.png"
import Link from 'next/link';
import { IconPhone, IconMail, IconMapPin, IconClockHour5 } from '@tabler/icons-react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
        <footer className='bg-slate-900 pt-10'>
            <div className="py-10 md:max-w-180 lg:max-w-340 mx-auto bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% rounded-4xl w-full -mt-30">
                <div className='mb-4 lg:mb-8'>
                    <h5 className='font-bold text-lg md:text-xl lg:text-2xl text-white text-center text-shadow-lg'>Stay Updated</h5>
                    <p className='text-sm md:text-base lg:text-lg text-white text-center text-shadow-lg'>Get the latest insurance tips, news, and exclusive offers delivered to your inbox.</p>
                </div>
                <form className="max-w-xl mx-auto">
                    <div className="flex justify-center gap-4">
                        <div className='relative w-[60%]'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/></svg>
                            </div>
                            <input type="email" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-white" placeholder="Enter Your Email"/>
                        </div> 
                        <div>
                            <button className='bg-[#E18126] text-white px-6 py-2 rounded-xl cursor-pointer'>Subscribe</button>
                        </div>  
                    </div>
                </form>
            </div>
            <div className='md:max-w-180 lg:max-w-340 mx-auto py-6'>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-[25%]">
                        <div className='flex justify-start'>    
                            <img src='/assets/insurath.png' alt="Insurath Logo" className="h-30" />
                        </div>
                        <p className='text-white text-base leading-8'>India&apos;s leading insurance aggregator, helping millions find the best insurance coverage at the most competitive prices with transparent processes.</p>
                    </div>
                    <div className="grid grid-cols-3 lg:grid-cols-3 w-full lg:w-[75%]">
                        <div className='col-span-1'>
                            <h5 className='text-xl text-white font-bold mb-10'>Products</h5>
                            <ul className='flex flex-col gap-3'>
                                <li>
                                    <Link className='text-white text-base' href={'/products/health-insurance'}>Health Insurance</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-base' href={'/products/life-insurance'}>Life Insurance</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-base' href={'/products/car-insurance'}>Car Insurance</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-base' href={'/products/bike-insurance'}>Bike Insurance</Link>
                                </li>
                                <li>    
                                    <Link className='text-white text-base' href={'/products/travel-insurance'}>Travel Insurance</Link>
                                </li>
                                <li>    
                                    <Link className='text-white text-base' href={'/products/business-insurance'}>Business Insurance</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-span-1'>
                            <h5 className='text-xl text-white font-bold mb-10'>Company</h5>
                            <ul className='flex flex-col gap-3'>
                                <li>
                                    <Link className='text-white text-base' href={'/products/health-insurance'}>About Us</Link>
                                </li>
                                <li>    
                                    <Link className='text-white text-base' href={'/products/travel-insurance'}>Blog</Link>
                                </li>
                                <li>    
                                    <Link className='text-white text-base' href={'/products/business-insurance'}>Contact Us</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-base' href={'/products/health-insurance'}>Help Center</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-base' href={'/products/life-insurance'}>FAQs</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-span-1'>
                            <h5 className='text-xl text-white font-bold mb-10'>Contact Info</h5>
                            <ul className='flex flex-col gap-3'>
                                <li>
                                    <Link className='text-white text-base' href={'tel:9876543210'}><IconPhone className='inline mr-2' color='#E18126' size={20} />+91-9876543210</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-base' href={'mailto:info@insurath.com'}><IconMail className='inline mr-2' color='#E18126' size={20} />info@insurath.com</Link>
                                </li>
                                <li>
                                    <div className="flex">
                                        <div>
                                            <IconMapPin className='inline mr-2' color='#E18126' size={20} />
                                        </div>
                                        <span className='text-white text-base'>Lodha Supremus, 504, Off Mahakali Caves Rd, Chakala Industrial Area (MIDC), Andheri East, Mumbai, Maharashtra 400093</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex">
                                        <div>
                                            <IconClockHour5 className='inline mr-2' color='#E18126' size={20} />
                                        </div>
                                        <span className='text-white text-base'>Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 4:00 PM</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-5 border-t border-white/20 max-w-180 lg:max-w-340 mx-auto'>
                <div className="flex justify-between items-center">
                    <div className='w-[33.33%]'>
                        <p className="text-white text-base">© {currentYear} Insurath. All rights reserved.</p>
                    </div>
                    <div className='w-[33.33%]'>
                        <p className='text-base text-white text-center'>We Accept: <span className='bg-gray-600 text-white px-2 py-0.5 rounded-md'>VISA</span> <span className='bg-gray-600 text-white px-2 py-0.5 rounded-md'>MC</span> <span className='bg-gray-600 text-white px-2 py-0.5 rounded-md'>UPI</span> <span className='bg-gray-600 text-white px-2 py-0.5 rounded-md'>NB</span></p>
                    </div>
                    <div className='w-[33.33%]'>
                        <div className="flex gap-4 justify-end">
                            <Link href={'/privacy-policy'} className='text-white text-base'>Privacy Policy</Link>
                            <Link href={'/terms-of-service'} className='text-white text-base'>Terms of Service</Link>
                            <Link href={'/terms-of-service'} className='text-white text-base'>IRDAI License</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer
