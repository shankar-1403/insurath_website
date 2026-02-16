"use client";

import React, { useState, useRef } from "react";
import Link from 'next/link';
import { IconPhone, IconMail, IconMapPin, IconClockHour5 } from '@tabler/icons-react';
import axios from 'axios';

type Errors = Partial<Record<string, string>>;
type SnackbarType = "success" | "error";

function Footer() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [error, setError] = useState<Errors>({});
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = React.useState<{open: boolean; message: string; type: SnackbarType; }>({ open: false, message: "", type: "success", });

    const showSnackbar = (message: string, type: SnackbarType = "success") => {
      setSnackbar({ open: true, message, type });

      setTimeout(() => {
          setSnackbar((prev) => ({ ...prev, open: false }));
      }, 3000);
    };

    const validateFormData = () => {
        const newErrors: Errors = {};

        const get = (name: string) =>
        (formRef.current?.elements.namedItem(name) as HTMLInputElement)?.value?.trim();

        if (!get("email_id")) {
            newErrors.email_id = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(get("email_id"))) {
            newErrors.email_id = "Enter a valid email address";
        }

        setError(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrorField = document.querySelector("[data-error='true']");
            firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
            return false;
        }

        return true;
    };  

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        if (!validateFormData()) return;
        setLoading(true);
        try {
            const payload = {
            email_id: (formRef.current.elements.namedItem("email_id") as HTMLInputElement)?.value,
            }
            const res = await axios.post("/api/subscribe", payload);
            showSnackbar(res.data.message, "success");
            formRef.current.reset();
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    const currentYear = new Date().getFullYear();
    return (
        <>
        <footer className='bg-slate-900 pt-10'>
            <div className='px-8 md:px-0'>
                <div className="py-6 md:py-10 px-4 md:px-10 lg:px-20 md:max-w-165 mx-auto bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% rounded-4xl w-full -mt-30">
                    <div className='mb-4 lg:mb-8'>
                        <h5 className='font-bold text-lg md:text-xl lg:text-2xl text-white text-left text-shadow-lg'>Stay Updated</h5>
                        <p className='text-sm md:text-base lg:text-base text-white text-left text-shadow-lg'>Get the latest insurance tips, news, and exclusive offers delivered to your inbox.</p>
                    </div>
                    <form ref={formRef} onSubmit={submitForm}>
                        <div className="flex flex-col md:flex-row items-start justify-between md:justify-center gap-4">
                            <div className='w-full md:w-[70%]'>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/></svg>
                                    </div>
                                    <input type="text" name='email_id' className="block w-full ps-9 pe-2 py-2 md:ps-9 md:pe-3 md:py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-full focus:ring-brand focus:border-brand shadow-xs text-white placeholder:text-white" placeholder="Enter Your Email"/>
                                </div>
                                <div className="relative">
                                    {error.email_id && <span className="text-sm text-red-500">{error.email_id}</span>}
                                </div>
                            </div> 
                            <div className='w-full md:w-[30%]'>
                                <div>
                                    <button type='submit' className='relative overflow-hidden bg-[#E18126] text-white px-4 md:px-5 py-2 text-sm md:text-base lg:text-lg rounded-full w-full group transition-colors duration-300 cursor-pointer'>
                                        <span className="absolute inset-0 bg-blue-950 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                                        <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
                                            {loading ? 'Subscribing...':'Subscribe'}
                                        </span>
                                    </button>
                                </div>
                            </div>  
                        </div>
                    </form>
                </div>
            </div>
            <div className='px-8 md:px-0 md:max-w-165 lg:max-w-340 mx-auto py-6'>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-[25%]">
                        <div className='flex justify-start'>    
                            <img src='/assets/insurath.png' alt="Insurath Logo" className="h-30" />
                        </div>
                        <p className='text-white text-sm md:text-base leading-8'>India&apos;s leading insurance aggregator, helping millions find the best insurance coverage at the most competitive prices with transparent processes.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-0 w-full lg:w-[75%]">
                        <div className='col-span-1'>
                            <h5 className='text-lg md:text-xl text-white font-bold mb-4 md:mb-10'>Products</h5>
                            <ul className='flex flex-col gap-3'>
                                <li>
                                    <Link className='text-white text-sm md:text-base' href={'/products/health-insurance'}>Health Insurance</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-sm md:text-base' href={'/products/life-insurance'}>Life Insurance</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-sm md:text-base' href={'/products/car-insurance'}>Car Insurance</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-sm md:text-base' href={'/products/bike-insurance'}>Bike Insurance</Link>
                                </li>
                                <li>    
                                    <Link className='text-white text-sm md:text-base' href={'/products/travel-insurance'}>Travel Insurance</Link>
                                </li>
                                <li>    
                                    <Link className='text-white text-sm md:text-base' href={'/products/business-insurance'}>Business Insurance</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-span-1'>
                            <h5 className='text-lg md:text-xl text-white font-bold mb-4 md:mb-10'>Company</h5>
                            <ul className='flex flex-col gap-3'>
                                <li>
                                    <Link className='text-white text-sm md:text-base' href={'/about-us'}>About Us</Link>
                                </li>
                                <li>    
                                    <Link className='text-white text-sm md:text-base' href={'/contact-us'}>Contact Us</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-sm md:text-base' href={'/'}>Help Center</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-span-1'>
                            <h5 className='text-lg md:text-xl text-white font-bold mb-4 md:mb-10'>Contact Info</h5>
                            <ul className='flex flex-col gap-3'>
                                <li>
                                    <Link className='text-white text-sm md:text-base' href={'tel:9876543210'}><IconPhone className='inline mr-2' color='#E18126' size={20} />+91-9876543210</Link>
                                </li>
                                <li>
                                    <Link className='text-white text-sm md:text-base' href={'mailto:info@insurath.com'}><IconMail className='inline mr-2' color='#E18126' size={20} />info@insurath.com</Link>
                                </li>
                                <li>
                                    <div className="flex">
                                        <div>
                                            <IconMapPin className='inline mr-2' color='#E18126' size={20} />
                                        </div>
                                        <span className='text-white text-sm md:text-base'>Lodha Supremus, 504, Off Mahakali Caves Rd, Chakala Industrial Area (MIDC), Andheri East, Mumbai, Maharashtra 400093</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex">
                                        <div>
                                            <IconClockHour5 className='inline mr-2' color='#E18126' size={20} />
                                        </div>
                                        <span className='text-white text-sm md:text-base'>Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 4:00 PM</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-5 border-t border-white/20 px-8 md:px-0 md:max-w-165 lg:max-w-340 mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className='col-span-1 md:col-span-1 lg:col-span-1'>
                        <p className="text-white text-sm lg:text-base">© {currentYear} Insurath. All rights reserved.</p>
                    </div>
                    <div className='col-span-1 md:col-span-1 lg:col-span-1'>
                        <div className="flex gap-4 md:justify-end">
                            <Link href={'/privacy-policy'} className='text-white text-sm lg:text-base'>Privacy Policy</Link>
                            <Link href={'/terms-of-service'} className='text-white text-sm lg:text-base'>Terms of Service</Link>
                            <Link href={'/terms-of-service'} className='text-white text-sm lg:text-base'>IRDAI License</Link>
                        </div>
                    </div>
                </div>
            </div>
            {snackbar.open && (
                <div className="fixed inset-0 bottom-6 z-50 flex items-end justify-center pointer-events-none">
                    <div
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg text-white
                        transition-all animate-slide-up
                        ${snackbar.type === "success" ? "bg-green-800" : "bg-red-800"}`}
                    >
                        <span className="text-sm md:text-base lg:text-lg font-medium">{snackbar.message}</span>
                    </div>
                </div>
            )}
        </footer>
        </>
    )
}

export default Footer
