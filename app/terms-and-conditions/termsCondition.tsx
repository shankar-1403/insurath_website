"use client";

import React,{useState} from 'react';
import Link from 'next/link';

function TermsConditions() {
    
    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-40 md:pt-40 lg:pt-50 pb-20">
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                    <div className="flex flex-col justify-center gap-4 md:gap-6 mb-6">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white lg:leading-16 mb-4">Terms & Conditions</h1>
                        
                    </div>
                </div>
            </div>
            <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                <div className="pt-20 pb-5">
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'><span className='font-bold'>Effective Date:</span> 19th february 2026</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Welcome to <span className='font-bold'>Insurath</span>, an insurance advisory platform powered by <span className='font-bold'>Sipany SS Insurance Brokers LLP (License No. 773 | LLPIN: AAT-4069)</span>.</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>By accessing this website, you agree to comply with and be bound by the following terms.</p>
                </div>
                <div className='py-5'>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">1. Nature of Services</h2>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Insurath provides <span className='font-bold'>insurance advisory and assistance services</span> to help users understand insurance products and connect with licensed insurers.</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>We do not underwrite insurance policies.</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>All insurance products are issued by respective insurance companies.</p>
                </div>
                <div className='py-5'>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">2. Regulatory Compliance</h3>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Insurance advisory services are provided under:</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 font-bold'>Sipany SS Insurance Brokers LLP</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>License No. 773</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>LLPIN: AAT-4069</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Validity: 21 Oct 2024 – 20 Oct 2027</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>All services comply with applicable <span className='font-bold'>IRDAI regulations</span>.</p>
                </div>
                <div className='py-5'>
                    <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">3. User Responsibilities</h4>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>By using this website, you agree:</p>
                    <ul>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>To provide accurate and complete information</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Not to misuse the website for unlawful purposes</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Not to submit false or misleading details</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Not to attempt unauthorized access or disrupt services</li>
                    </ul>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">4. No Financial or Legal Guarantee</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>The information provided on this website is for advisory purposes only.</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>We do not guarantee:</p>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Approval of insurance proposals</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Claim settlement outcomes</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Specific premium rates</li>
                    </ul>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Final decisions rest with the insurance provider.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">5. Quotations & Policy Issuance</h5>
                    <ul>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Premium quotes are indicative and subject to insurer underwriting.</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Policy terms, coverage, and exclusions are governed by the insurer.</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Users must review policy documents carefully before purchase.</li>
                    </ul>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">6. Intellectual Property</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>All website content including text, graphics, logos, and design is the property of Insurath and may not be reproduced without permission.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">7. Limitation of Liability</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Insurath shall not be liable for:</p>
                    <ul>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Losses arising from reliance on website information</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Policy rejection or claim disputes</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Technical interruptions or website downtime</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Actions of third-party insurers or service providers</li>
                    </ul>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">8. Third-Party Services</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>We may connect users with insurance companies and service providers. We are not responsible for third-party actions, services, or decisions.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">9. Privacy</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Use of this website is also governed by our Privacy Policy.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">10. Termination of Access</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>We reserve the right to restrict or terminate access to users who violate these terms.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">11. Governing Law & Jurisdiction</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>These terms shall be governed by the laws of India.</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Any disputes shall be subject to the jurisdiction of courts located in <span className='font-bold'>[Insert City, India]</span>.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">12. Updates to Terms</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>We may update these Terms from time to time. Continued use of the website constitutes acceptance of the revised terms.</p>
                </div>
                <div className='py-5 pb-30'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">13. Contact Information</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>For any queries:</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 font-bold'>Insurath</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Powered by Sipany SS Insurance Brokers LLP</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>License No. 773 | LLPIN: AAT-4069</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Email: <Link href={"mailto:info@insurath.com"}>info@insurath.com</Link></p>
                </div>
            </div>
        </>
    )
}

export default TermsConditions
