"use client";

import React from 'react';
import {motion} from "motion/react"
import { IconTargetArrow,IconHeart, IconShield } from '@tabler/icons-react';

function AboutUs() {
    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-20 md:pt-40 lg:pt-50 pb-20">
                <div className="px-10 md:px-0 md:max-w-2xl lg:max-w-340 mx-auto">
                    <div className="flex justify-center gap-4 md:gap-2 lg:gap-6">
                        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }}>
                            
                            <div className="flex flex-col items-center justify-center gap-10">
                                <div className='flex flex-col items-center justify-center gap-10'>
                                    <h1 className="text-center text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">About Insurath</h1>
                                    <p className="text-center text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Your trusted partner in finding the <span className="text-[#E18126]">perfect insurance coverage</span> for your needs.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className='py-20'>
                <div className="max-w-180 mx-auto">
                    <div className="flex flex-col justify-center gap-6 mb-6">
                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl text-center">Our Mission</p>
                        <h2 className="text-5xl font-bold text-blue-950 leading-16">Protecting What Matters Most</h2>
                        <p className='text-lg text-center leading-8 text-gray-700'>At Insurath, we believe that everyone deserves access to the right insurance coverage at the right price. Our mission is to simplify the complex world of insurance and help you make informed decisions that protect what matters most to you.</p>
                    </div>
                </div>
                <div className="max-w-340 mx-auto">
                    <div className="flex gap-20">
                        <div className='flex gap-10 flex-col w-[40%]'>
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 5, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className='flex items-center gap-4 p-2 rounded-tr-4xl rounded-bl-4xl shadow-lg bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90%'>
                                <div className="border-2 border-white rounded-tr-3xl rounded-bl-3xl p-4">
                                    <div className='flex gap-6 items-center'>
                                        <IconTargetArrow className='w-12 h-12' color='white'/>
                                        <h3 className="text-3xl font-bold text-white mb-2">Our Vision</h3>
                                    </div>
                                    <div>
                                        <p className='text-lg text-white leading-8'>To become India&apos;s most trusted insurance platform, making insurance accessible, understandable, and affordable for everyone.</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className='flex items-center gap-4 p-2 rounded-tr-4xl rounded-bl-4xl shadow-lg bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90%'>
                                <div className="border-2 border-white rounded-tr-3xl rounded-bl-3xl p-4">
                                    <div className='flex gap-6 items-center'>
                                        <IconHeart className='w-12 h-12' color='white'/>
                                        <h3 className="text-3xl font-bold text-white mb-2">Our Values</h3>
                                    </div>
                                    <div>
                                        <p className='text-lg text-white leading-8'>Integrity, transparency, and customer-centricity guide everything we do. We believe in building long-term relationships based on trust and mutual respect.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className='w-[60%]'>
                            <div className="relative w-full h-110 rounded-4xl overflow-hidden">
                                {/* Image */}
                                <img src="/assets/faq.png" alt="FAQs" className="w-full h-full object-cover" />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60" />

                                {/* Content */}
                                <div className="absolute inset-0 max-w-md mx-auto flex flex-col justify-center items-center px-6 text-center">
                                    <div className='bg-[#E18126] rounded-full p-6'>
                                        <IconShield color='white' className='w-14 h-14'/>
                                    </div>
                                    <h5 className="text-5xl font-bold text-white leading-16 text-center mb-4">Trusted Protection</h5>
                                    <p className="text-lg text-left leading-8 text-white">For over 15 years, we&apos;ve been helping families and businesses protect what matters most to them with comprehensive insurance solutions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20">
                <div className="max-w-340 mx-auto">
                    <div className="max-w-140 mx-auto">
                        <div className="flex flex-col justify-center gap-6 mb-6">
                            <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl text-center">Our Values</p>
                            <h2 className="text-5xl font-bold text-center text-blue-950 leading-16">What Drives Us</h2>
                            <p className='text-lg text-center leading-8 text-gray-700'>Our core values shape every interaction and decision we make, ensuring we always put our customers first.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-8">
                        <div className="col-span-1">
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="bg-white rounded-4xl p-2 shadow-lg">
                                <div className="border-2 border-[#E18126] rounded-3xl p-4">
                                    <div className='bg-[#E18126] p-2 rounded-full w-15 h-15 flex justify-center items-center mb-4'>
                                        <IconShield color='white' className='w-10 h-10'/>
                                    </div>
                                    <h3 className='text-2xl text-blue-950 font-bold mb-2'>Trust & Reliability</h3>
                                    <div className='h-1 w-16 bg-linear-to-r from-[#E18126] to-[#1185b7] rounded-full mb-4'></div>
                                    <p className='text-lg text-gray-700 leading-8'>We build lasting relationships based on trust, transparency, and reliable service.</p>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-span-1">
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 4, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="bg-white rounded-4xl p-2 shadow-lg">
                                <div className="border-2 border-[#E18126] rounded-3xl p-4">
                                    <div className='bg-[#E18126] p-2 rounded-full w-15 h-15 flex justify-center items-center mb-4'>
                                        <IconShield color='white' className='w-10 h-10'/>
                                    </div>
                                    <h3 className='text-2xl text-blue-950 font-bold mb-2'>Customer First</h3>
                                    <div className='h-1 w-16 bg-linear-to-r from-[#E18126] to-[#1185b7] rounded-full mb-4'></div>
                                    <p className='text-lg text-gray-700 leading-8'>Our customers are at the heart of everything we do, and their success is our success.</p>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-span-1">
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 6, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="bg-white rounded-4xl p-2 shadow-lg">
                                <div className="border-2 border-[#E18126] rounded-3xl p-4">
                                    <div className='bg-[#E18126] p-2 rounded-full w-15 h-15 flex justify-center items-center mb-4'>
                                        <IconShield color='white' className='w-10 h-10'/>
                                    </div>
                                    <h3 className='text-2xl text-blue-950 font-bold mb-2'>Excellence</h3>
                                    <div className='h-1 w-16 bg-linear-to-r from-[#E18126] to-[#1185b7] rounded-full mb-4'></div>
                                    <p className='text-lg text-gray-700 leading-8'>We strive for excellence in every interaction and continuously improve our services.</p>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-span-1">
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 8, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="bg-white rounded-4xl p-2 shadow-lg">
                                <div className="border-2 border-[#E18126] rounded-3xl p-4">
                                    <div className='bg-[#E18126] p-2 rounded-full w-15 h-15 flex justify-center items-center mb-4'>
                                        <IconShield color='white' className='w-10 h-10'/>
                                    </div>
                                    <h3 className='text-2xl text-blue-950 font-bold mb-2'>Integrity</h3>
                                    <div className='h-1 w-16 bg-linear-to-r from-[#E18126] to-[#1185b7] rounded-full mb-4'></div>
                                    <p className='text-lg text-gray-700 leading-8'>We conduct business with the highest ethical standards and complete transparency.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs
