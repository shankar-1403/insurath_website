"use client";

import React,{useState, useRef} from 'react';
import {motion} from "motion/react";
import axios from 'axios';
import Link from 'next/link';
import { IconPhone, IconMail, IconMapPin, IconClockHour5, IconBrandWhatsapp } from '@tabler/icons-react';

type Errors = Partial<Record<string, string>>;
type SnackbarType = "success" | "error";

function ContactUs() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [error, setError] = useState<Errors>({});
    const [loading, setLoading] = useState(false);
    const [accepted, setAccepted] = useState(true);
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

        if (!get("full_name")) newErrors.full_name = "Full name is required";
        if (!get("email_id")) {
            newErrors.email_id = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(get("email_id"))) {
            newErrors.email_id = "Enter a valid email address";
        }

        if (!get("phone_number")) {
            newErrors.phone_number = "Mobile number is required";
        } else if (!/^\d{10,12}$/.test(get("phone_number"))) {
            newErrors.phone_number = "Enter a valid Mobile number";
        }

        if (!get("insurance_type")) newErrors.insurance_type = "Insurance Type is required";
        if (!get("subject")) newErrors.subject = "Subject is required";
        if (!get("message")) newErrors.message = "Message is required";

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
            full_name: (formRef.current.elements.namedItem("full_name") as HTMLInputElement)?.value,
            email_id: (formRef.current.elements.namedItem("email_id") as HTMLInputElement)?.value,
            phone_number: (formRef.current.elements.namedItem("phone_number") as HTMLInputElement)?.value,
            insurance_type: (formRef.current.elements.namedItem("insurance_type") as HTMLInputElement)?.value,
            subject: (formRef.current.elements.namedItem("subject") as HTMLInputElement)?.value,
            message: (formRef.current.elements.namedItem("message") as HTMLInputElement)?.value,
            communication_preference: (formRef.current.elements.namedItem("communication_preference") as HTMLInputElement)?.checked ? "Accepted for communication preference" : "Not Accepted for communication preference",
        }
        const res = await axios.post("/api/contact", payload);
        showSnackbar(res.data.message, "success");
        formRef.current.reset();
        } catch (error) {
        console.error("Form submission error:", error);
        } finally {
        setLoading(false);
        }
    };
    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-20 md:pt-40 lg:pt-50 pb-20">
                <div className="px-10 md:px-0 md:max-w-2xl lg:max-w-340 mx-auto">
                    <div className="flex justify-center gap-4 md:gap-2 lg:gap-6">
                        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }}>
                            
                            <div className="flex flex-col items-center justify-center gap-10">
                                <div className='flex flex-col items-center justify-center gap-10'>
                                    <h1 className="text-center text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Contact Us</h1>
                                    <p className="text-center text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Get in touch with our <span className="text-[#E18126]">insurance experts</span> for personalized assistance</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className='pt-20 pb-40'>
                <div className="max-w-340 mx-auto">
                    <div className="flex gap-20">
                        <div className='flex gap-10 flex-col w-[50%]'>
                            <form ref={formRef} onSubmit={submitForm} className='bg-white p-4 rounded-4xl shadow-lg'>
                                <div className='border-2 border-[#E18126] rounded-2xl p-6'>
                                    <div className='mb-4'>
                                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-2 text-center">Send us a Message</p>
                                        <h2 className='text-5xl font-bold leading-18 text-blue-950 text-center'>Get in touch</h2>
                                        <p className='text-lg leading-8 text-gray-700 text-center'>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className='col-span-1'>
                                                <input type="text" name="full_name" placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                                {error.full_name && <span className="text-sm text-red-500">{error.full_name}</span>}
                                            </div>
                                            <div className='col-span-1'>
                                                <input type="text" name="email_id"  placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                                {error.email_id && <span className="text-sm text-red-500">{error.email_id}</span>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <input type="text" name="phone_number" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                                {error.phone_number && <span className="text-sm text-red-500">{error.phone_number}</span>}
                                            </div>
                                            <div>
                                                <select name="insurance_type" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                                    <option value="" disabled selected hidden>Select insurance type</option>
                                                    <option value="Health Insurance">Health Insurance</option>             
                                                    <option value="Life Insurance">Life Insurance</option>
                                                    <option value="Car Insurance">Car Insurance</option>
                                                    <option value="Bike Insurance">Bike Insurance</option>
                                                    <option value="Travel Insurance">Travel Insurance</option>
                                                    <option value="Business Insurance">Business Insurance</option>
                                                </select>
                                                {error.insurance_type && <span className="text-sm text-red-500">{error.insurance_type}</span>}
                                            </div>
                                        </div>
                                        <div>
                                            <select name="subject" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                                <option value="" disabled selected hidden>Select subject</option>
                                                <option value="Get a quote">Get a quote</option>             
                                                <option value="Claim Support">Claim Support</option>
                                                <option value="Policy Renewal">Policy Renewal</option>
                                                <option value="Complaint">Complaint</option>
                                                <option value="Feedback">Feedback</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {error.subject && <span className="text-sm text-red-500">{error.subject}</span>}
                                        </div>
                                        <div>
                                            <textarea name="message" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" rows={7} placeholder="Message"></textarea>
                                            {error.message && <span className="text-sm text-red-500">{error.message}</span>}
                                        </div>
                                        <div>
                                            <div className="flex items-start gap-2">
                                                <div>
                                                    <input type="checkbox" checked={accepted} id='communication_preference' name='communication_preference' onChange={(e) => setAccepted(e.target.checked)} className="w-4 h-4 accent-[#E18126] focus:ring-[#E18126] cursor-pointer"/>
                                                </div>
                                                <div>
                                                    <label htmlFor='communication_preference' className='text-gray-700 text-sm cursor-pointer'>I hereby authorize to receive notifications via SMS / Messages / Promotional / Informational messages</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="bg-[#E18126] text-white px-4 py-2 w-full rounded-4xl font-bold mt-4 cursor-pointer">{loading ? 'Submitting...':'Submit'}</button>
                                    </div>  
                                </div>
                            </form>
                        </div>
                        <div className='w-[50%]'>
                            <div className="grid grid-cols-2 gap-4">
                                <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% p-6 rounded-4xl flex gap-4 col-span-2'>
                                    <div>
                                        <div className='bg-[#E18126] p-2 rounded-full'>
                                            <IconMapPin className='w-10 h-10' color='white'/>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-white text-xl font-bold mb-2'>Our Office Address</h3>
                                        <p className='text-white text-base'>Lodha Supremus, 520, Off Mahakali Caves Rd, Chakala Industrial Area (MIDC), Andheri East, Mumbai, Maharashtra 400093</p>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white p-2 rounded-tr-4xl rounded-bl-4xl">
                                    <div className='border-l-2 border-r-2 flex border-[#E18126] p-4 gap-4  rounded-tr-4xl rounded-bl-4xl'>
                                        <div>
                                            <div className='bg-[#E18126] p-2 rounded-full'>
                                                <IconPhone className='w-8 h-8' color='white'/>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='text-blue-950 text-xl font-bold'>Phone</h3>
                                            <p className='text-sm text-gray-700 font-semibold mb-1'>Call us directly</p>
                                            <Link href={'tel:9876543210'} className='text-blue-950 text-base font-bold'>+91-9876543210</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white p-2 rounded-tr-4xl rounded-bl-4xl">
                                    <div className='border-l-2 border-r-2 flex border-[#E18126] p-4 gap-4  rounded-tr-4xl rounded-bl-4xl'>
                                        <div>
                                            <div className='bg-[#E18126] p-2 rounded-full'>
                                                <IconMail className='w-8 h-8' color='white'/>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='text-blue-950 text-xl font-bold'>Email</h3>
                                            <p className='text-sm text-gray-700 font-semibold mb-1'>Send us a message</p>
                                            <Link href={'mailto:info@insurath.com'} className='text-blue-950 text-base font-bold'>info@insurath.com</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white p-2 rounded-tr-4xl rounded-bl-4xl">
                                    <div className='border-l-2 border-r-2 flex border-[#E18126] p-4 gap-4  rounded-tr-4xl rounded-bl-4xl'>
                                        <div>
                                            <div className='bg-[#E18126] p-2 rounded-full'>
                                                <IconClockHour5 className='w-8 h-8' color='white'/>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='text-blue-950 text-xl font-bold'>Hours</h3>
                                            <p className='text-sm text-gray-700 font-semibold mb-1'>Mon-Fri: 9AM-6PM</p>
                                            <p className='text-blue-950 text-base font-bold'>Sat: 10AM-4PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white p-2 rounded-tr-4xl rounded-bl-4xl">
                                    <div className='border-l-2 border-r-2 flex border-[#E18126] p-4 gap-4  rounded-tr-4xl rounded-bl-4xl'>
                                        <div>
                                            <div className='bg-green-500 p-2 rounded-full'>
                                                <IconBrandWhatsapp className='w-8 h-8' color='white'/>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='text-blue-950 text-xl font-bold'>WhatsApp</h3>
                                            <p className='text-sm text-gray-700 font-semibold mb-1'>24/7 Support</p>
                                            <Link href={'mailto'} className='text-blue-950 text-base font-bold underline'>Chat Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        </>
    )
}

export default ContactUs