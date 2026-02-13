"use client";

import React,{useState} from 'react';
import {motion} from "motion/react";
import { NumberTicker } from '@/components/ui/number-ticker';
import { IconTargetArrow,IconHeart, IconShield } from '@tabler/icons-react';
import AccordionItem from '@/components/ui/accordion';

function AboutUs() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    
    const faqs = [
        {
            question: "What makes Insurath different from other insurance providers?",
            answer: "We focus on personalized service, transparent pricing, and comprehensive coverage options. Our team of experts works closely with you to understand your unique needs and find the perfect insurance solution."
        },
        {
            question: "How long has Insurath been in business?",
            answer: "Insurath has been serving customers for over 15 years, helping thousands of individuals and families find the right insurance coverage for their needs."
        },
        {
            question: "What types of insurance do you offer?",
            answer: "We offer comprehensive insurance solutions including life, health, motor, travel, and business insurance. Our team can help you find coverage for any situation."
        },
        {
            question: "How can I get in touch with your team?",
            answer: "You can reach us through our website, phone, email, or WhatsApp. Our customer service team is available to help you with any questions or concerns."
        },
        {
            question: "Do you offer online insurance quotes?",
            answer: "Yes, we provide instant online quotes for most insurance products. You can also schedule a consultation with our experts for personalized advice."
        },
        {
            question: "What is your customer satisfaction rate?",
            answer: "We maintain a 98% customer satisfaction rate, which reflects our commitment to providing excellent service and support to all our clients."
        }
    ];
    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-40 md:pt-40 lg:pt-50 pb-20">
                <div className="px-10 md:px-0 md:max-w-2xl lg:max-w-340 mx-auto">
                    <div className="flex justify-center gap-4 md:gap-2 lg:gap-6">
                        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }}>
                            
                            <div className="flex flex-col items-center justify-center gap-10">
                                <div className='flex flex-col items-center justify-center gap-10'>
                                    <h1 className="text-center text-white text-4xl md:text-5xl lg:text-7xl font-bold text-shadow-lg">About Insurath</h1>
                                    <p className="text-center text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Your trusted partner in finding the <span className="text-[#E18126]">perfect insurance coverage</span> for your needs.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className='py-20'>
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-180 mx-auto">
                    <div className="flex flex-col justify-center gap-4 md:gap-6 mb-6">
                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl text-xs text-center">Our Mission</p>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl text-center font-bold text-blue-950 lg:leading-16">Protecting What Matters Most</h2>
                        <p className='text-sm md:text-base lg:text-lg text-center leading-6 md:leading-8 text-gray-700'>At Insurath, we believe that everyone deserves access to the right insurance coverage at the right price. Our mission is to simplify the complex world of insurance and help you make informed decisions that protect what matters most to you.</p>
                    </div>
                </div>
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 md:mx-auto">
                    <div className="flex flex-col md:flex-col lg:flex-row gap-20">
                        <div className='w-full lg:w-[40%]'>
                            <div className='flex flex-col md:flex-row lg:flex-col gap-10'>
                                <div>
                                    <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 5, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className='flex flex-col items-start gap-4 p-2 rounded-tr-4xl rounded-bl-4xl border-t-6 border-l-6 border-[#1185b7]'>
                                        <div className="rounded-tr-4xl rounded-bl-4xl border-t-2 border-l-2 border-[#1185b7] p-4">
                                            <div className='flex gap-6 items-center'>
                                                <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% rounded-full p-2'>
                                                    <IconTargetArrow className='md:w-10 lg:w-12 md:h-10 lg:h-12' color='white'/>
                                                </div>
                                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 mb-2">Our Vision</h3>
                                            </div>
                                            <div>
                                                <p className='text-sm md:text-base lg:text-lg text-blue-950 leading-6 md:leading-8'>To become India&apos;s most trusted insurance platform, making insurance accessible, understandable, and affordable for everyone.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                                <div>
                                    <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className='flex flex-col items-start gap-4 p-2 rounded-tr-4xl rounded-bl-4xl border-t-6 border-l-6 border-[#1185b7]'>
                                        <div className="rounded-tr-4xl rounded-bl-4xl border-t-2 border-l-2 border-[#1185b7] p-4">
                                            <div className='flex gap-6 items-center'>
                                                <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% rounded-full p-2'>
                                                    <IconHeart className='md:w-10 lg:w-12 md:h-10 lg:h-12' color='white'/>
                                                </div>
                                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 mb-2">Our Values</h3>
                                            </div>
                                            <div>
                                                <p className='text-sm md:text-base lg:text-lg text-blue-950 leading-6 md:leading-8'>Integrity, transparency, and customer-centricity guide everything we do. We believe in building long-term relationships based on trust and mutual respect.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full lg:w-[60%]'>
                            <div className="relative w-full h-100 md:h-120 rounded-4xl overflow-hidden">
                                {/* Image */}
                                <img src="/assets/vision.png" alt="vision" className="w-full h-full object-cover" />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60" />

                                {/* Content */}
                                <div className="absolute inset-0 lg:max-w-xl mx-auto flex flex-col justify-center items-center py-10 px-6 text-center">
                                    <div className='bg-[#E18126] rounded-full p-3 md:p-6'>
                                        <IconShield color='white' className='md:w-10 lg:w-14 md:h-10 lg:h-14'/>
                                    </div>
                                    <h5 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white lg:leading-16 text-center mb-4">Insurath - Suraksha Har Mod Par</h5>
                                    <p className="text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-center text-white">At Insurath, we simplify insurance so you can make decisions with clarity and confidence. Whether you’re protecting yourself, your family, or your business, we connect you with the right coverage tailored to your goals and stage of life.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="relative px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto py-20">
                    <div className="max-w-140 mx-auto">
                        <div className="flex flex-col justify-center gap-4 md:gap-6 mb-6">
                            <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl text-center text-xs">Our Values</p>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-blue-950 lg:leading-16">What Drives Us</h2>
                            <p className='text-sm md:text-base lg:text-lg text-center leading-6 md:leading-8 text-gray-700'>Our core values shape every interaction and decision we make, ensuring we always put our customers first.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="col-span-1">
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="bg-white rounded-4xl p-2 shadow-lg">
                                <div className="border-2 border-[#E18126] rounded-3xl p-4">
                                    <div className='bg-[#E18126] p-2 rounded-full w-16 h-16 flex justify-center items-center mb-4'>
                                        <img src="/assets/trust_reliability.png" alt="Trust & Reliability" className='w-full h-full'/>
                                    </div>
                                    <h3 className='text-lg md:text-xl lg:text-2xl text-blue-950 font-bold mb-2'>Trust & Reliability</h3>
                                    <div className='h-1 w-16 bg-linear-to-r from-[#E18126] to-[#1185b7] rounded-full mb-4'></div>
                                    <p className='text-sm md:text-base lg:text-lg text-gray-700 leading-6 md:leading-8'>We build lasting relationships based on trust, transparency, and reliable service.</p>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-span-1">
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 4, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="bg-white rounded-4xl p-2 shadow-lg">
                                <div className="border-2 border-[#E18126] rounded-3xl p-4">
                                    <div className='bg-[#E18126] p-2 rounded-full w-16 h-16 flex justify-center items-center mb-4'>
                                        <img src="/assets/customer_first.png" alt="Customer First" className='w-full h-full'/>
                                    </div>
                                    <h3 className='text-lg md:text-xl lg:text-2xl text-blue-950 font-bold mb-2'>Customer First</h3>
                                    <div className='h-1 w-16 bg-linear-to-r from-[#E18126] to-[#1185b7] rounded-full mb-4'></div>
                                    <p className='text-sm md:text-base textlg:-lg text-gray-700 leading-6 md:leading-8'>Our customers are at the heart of everything we do, and their success is our success.</p>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-span-1">
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 6, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="bg-white rounded-4xl p-2 shadow-lg">
                                <div className="border-2 border-[#E18126] rounded-3xl p-4">
                                    <div className='bg-[#E18126] p-2 rounded-full w-16 h-16 flex justify-center items-center mb-4'>
                                        <img src="/assets/excellence.png" alt="Excellence" className='w-full h-full'/>
                                    </div>
                                    <h3 className='text-lg md:text-xl lg:text-2xl text-blue-950 font-bold mb-2'>Excellence</h3>
                                    <div className='h-1 w-16 bg-linear-to-r from-[#E18126] to-[#1185b7] rounded-full mb-4'></div>
                                    <p className='text-sm md:text-base lg:text-lg text-gray-700 leading-6 md:leading-8'>We strive for excellence in every interaction and continuously improve our services.</p>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-span-1">
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 8, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="bg-white rounded-4xl p-2 shadow-lg">
                                <div className="border-2 border-[#E18126] rounded-3xl p-4">
                                    <div className='bg-[#E18126] p-2 rounded-full w-16 h-16 flex justify-center items-center mb-4'>
                                        <img src="/assets/integrity.png" alt="Integrity" className='w-full h-full'/>
                                    </div>
                                    <h3 className='text-lg md:text-xl lg:text-2xl text-blue-950 font-bold mb-2'>Integrity</h3>
                                    <div className='h-1 w-16 bg-linear-to-r from-[#E18126] to-[#1185b7] rounded-full mb-4'></div>
                                    <p className='text-sm md:text-base lg:text-lg text-gray-700 leading-6 md:leading-8'>We conduct business with the highest ethical standards and complete transparency.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10">
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-between">
                    <div className="col-span-1 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <img src={'/assets/happy_customers.png'} alt="Happy Customers" className="h-full"/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex">
                        <NumberTicker value={50000} className="text-white text-xl md:text-2xl lg:text-4xl font-bold"/><span className="text-white text-xl md:text-3xl lg:text-4xl font-bold">+</span>
                        </div>
                        <p className="text-white text-sm lg:text-base">Happy Customers</p>
                    </div>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <img src={'/assets/claims_settled.png'} alt="Claims Settled" className="h-full"/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex">
                        <NumberTicker value={500} className="text-white text-xl md:text-2xl lg:text-4xl font-bold"/><span className="text-white text-xl md:text-2xl lg:text-4xl font-bold">+</span>
                        </div>
                        <p className="text-white text-sm lg:text-base">Claims Settled</p>
                    </div>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <img src={'/assets/insurance_partners.png'} alt="Insurance Partners" className="h-full"/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex">
                        <NumberTicker value={25} className="text-white text-xl md:text-2xl lg:text-4xl font-bold"/><span className="text-white text-xl md:text-2xl lg:text-4xl font-bold">+</span>
                        </div>
                        <p className="text-white text-sm lg:text-base">Insurance Partners</p>
                    </div>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <img src={'/assets/claim_settlement_ratio.png'} alt="Claim Settlement Ratio" className="h-full"/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex">
                        <NumberTicker value={92} className="text-white text-xl md:text-2xl lg:text-4xl font-bold"/><span className="text-white text-xl md:text-2xl lg:text-4xl font-bold">%</span>
                        </div>
                        <p className="text-white text-sm lg:text-base">Claim Settlement Ratio</p>
                    </div>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <img src={'/assets/customer_support.png'} alt="Customer Support" className="h-full"/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex">
                        <NumberTicker value={24} className="text-white text-xl md:text-2xl lg:text-4xl font-bold"/><span className="text-white text-xl md:text-2xl lg:text-4xl font-bold">/</span><NumberTicker value={7} className="text-white text-xl md:text-2xl lg:text-4xl font-bold"/>
                        </div>
                        <p className="text-white text-sm lg:text-base">Customer Support</p>
                    </div>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <img src={'/assets/customer_rating.png'} alt="Customer Rating" className="h-full"/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex">
                        <NumberTicker value={4.8} decimalPlaces={1} className="text-white text-xl md:text-2xl lg:text-4xl font-bold"/><span className="text-white text-xl md:text-2xl lg:text-4xl font-bold">+</span>
                        </div>
                        <p className="text-white text-sm lg:text-base">Customer Rating</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {/* <div className="py-20 bg-white">
                <div className="max-w-340 mx-auto">
                    <div className="max-w-180 mx-auto">
                        <div className="flex flex-col justify-center gap-6 mb-6">
                            <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl text-center">Meet Our Team</p>
                            <h3 className="text-5xl font-bold text-blue-950 text-center">The People Behind Insurath</h3>
                            <p className='text-lg text-center text-gray-700 leading-6 md:leading-8'>Our experienced team of insurance professionals is dedicated to helping you find the perfect coverage.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-1">
                            <div className='w-full overflow-hidden'>
                                <img src="/assets/travel_about.png" alt="Rajesh Kumar" className='w-full h-full'/>
                            </div>
                            <div>
                                <h4 className='text-2xl text-blue-950 font-bold'>Rajesh Kumar</h4>
                                <p className='text-[#E18126] text-sm font-bold'>Founder & CEO</p>
                                <p className='text-gray-700 text-sm mb-2'>15+ years in Insurance</p>
                                <p className='text-sm text-blue-950'>Expert in life and health insurance with a passion for helping families secure their future.</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className='w-full overflow-hidden'>
                                <img src="/assets/travel_about.png" alt="Priya Sharma" className='w-full h-full'/>
                            </div>
                            <div>
                                <h4 className='text-2xl text-blue-950 font-bold'>Priya Sharma</h4>
                                <p className='text-[#E18126] text-sm font-bold'>Head of Operations</p>
                                <p className='text-gray-700 text-sm mb-2'>12+ years in Insurance</p>
                                <p className='text-sm text-blue-950'>Specializes in motor insurance and has helped thousands of customers find the right coverage.</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className='w-full overflow-hidden'>
                                <img src="/assets/travel_about.png" alt="Amit Patel" className='w-full h-full'/>
                            </div>
                            <div>
                                <h4 className='text-2xl text-blue-950 font-bold'>Amit Patel</h4>
                                <p className='text-[#E18126] text-sm font-bold'>Senior Insurance Advisor</p>
                                <p className='text-gray-700 text-sm mb-2'>10+ years in Insurance</p>
                                <p className='text-sm text-blue-950'>Expert in business insurance and risk management for small and medium enterprises.</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className='w-full overflow-hidden'>
                                <img src="/assets/travel_about.png" alt="Sneha Reddy" className='w-full h-full'/>
                            </div>
                            <div>
                                <h4 className='text-2xl text-blue-950 font-bold'>Sneha Reddy</h4>
                                <p className='text-[#E18126] text-sm font-bold'>Customer Success Manager</p>
                                <p className='text-gray-700 text-sm mb-2'>8+ years in Insurance</p>
                                <p className='text-sm text-blue-950'>Dedicated to ensuring customer satisfaction and smooth claim processes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='bg-white'>
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto pt-20 pb-30 md:pb-40">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                        <div className="w-full md:w-[50%] lg:w-[40%]">
                            <div className="relative w-full h-130 rounded-4xl overflow-hidden">
                                {/* Image */}
                                <img src="/assets/faq.png" alt="FAQs" className="w-full h-full object-cover" />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60" />

                                {/* Content */}
                                <div className="absolute inset-0 max-w-md mx-auto flex flex-col justify-center gap-4 md:gap-6 px-6 text-center">
                                    <p className="uppercase font-bold text-xs text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl text-left">Got Questions?</p>
                                    <h5 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white lg:leading-16 text-left">Frequently Asked Questions</h5>
                                    <p className="text-sm md:text-base lg:text-lg text-left leading-6 md:leading-8 text-white">Find quick answers to common insurance questions</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:w-[50%] lg:w-[60%]'>
                            <div className="lg:max-w-2xl lg:mx-auto flex flex-col gap-4">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onToggle={() =>
                                        setOpenIndex(openIndex === index ? null : index)
                                    }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs
