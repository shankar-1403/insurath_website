"use client";

import React,{useState} from 'react';
import Link from 'next/link';

function PrivacyPolicy() {
    
    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-40 md:pt-40 lg:pt-50 pb-20">
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                    <div className="flex flex-col justify-center gap-4 md:gap-6 mb-6">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white lg:leading-16 mb-4">Privacy Policy</h1>
                    </div>
                </div>
            </div>
            <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                <div className='pt-20 pb-5'>
                    <div className="flex flex-col justify-center gap-4 md:gap-6 mb-6">
                        <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'><span className='font-bold'>Effective Date:</span> 19th february 2026</p>
                        <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Welcome to <span className='font-bold'>Insurath</span> (“we,” “our,” “us”), an insurance advisory platform powered by <span className='font-bold'>Sipany SS Insurance Brokers LLP (License No. 773 | LLPIN: AAT-4069)</span>.</p>
                        <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>We respect your privacy and are committed to protecting your personal data in accordance with applicable Indian laws including the <span className='font-bold'>Digital Personal Data Protection Act, 2023</span> and regulatory guidelines issued by IRDAI.</p>
                        <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>By using our website, you agree to the practices described in this Privacy Policy.</p>
                    </div>
                </div>
                <div className='py-5'>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">1. Information We Collect</h2>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>We may collect the following types of information:</p>
                    <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-blue-950 lg:leading-16 mb-2">Personal Information</h3>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Full name</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Phone number</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Email address</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>City & location</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Date of birth</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Business or employment details (if applicable)</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Insurance requirements and financial information relevant to policy advisory</li>
                    </ul>
                    <h4 className="text-xl md:text-2xl lg:text-2xl font-bold text-blue-950 lg:leading-16 mb-2">Technical Information</h4>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>IP address</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Browser type & device information</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Pages visited and time spent</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Cookies & usage analytics</li>
                    </ul>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">2. How We Use Your Information</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Your information is used to:</p>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Provide insurance advisory services</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Understand your insurance requirements</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Connect you with suitable insurance solutions</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Respond to inquiries and customer support requests</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Improve our website and services</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Send important updates and service communications</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Comply with legal and regulatory requirements</li>
                    </ul>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>We do <span className='font-bold'>not sell your personal data</span>.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">3. Sharing of Information</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Your data may be shared with:</p>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'><span className='font-bold'>Sipany SS Insurance Brokers LLP</span> for policy advisory and servicing</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Insurance companies for quotations and policy issuance</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Regulatory authorities when required by law</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Technology and service providers supporting our operations</li>
                    </ul>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>All data sharing is done strictly for service fulfillment and compliance.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">4. Data Security</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>We implement appropriate technical and organizational safeguards to protect your personal information from:</p>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Unauthorized access</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Misuse</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Alteration</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Loss or disclosure</li>
                    </ul>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>However, no online platform can guarantee absolute security.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">5. Cookies & Tracking Technologies</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Our website may use cookies to:</p>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Enhance user experience</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Analyze site traffic</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Improve performance</li>
                    </ul>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>You may disable cookies in your browser settings.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">6. Data Retention</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>We retain personal data only for as long as necessary to:</p>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Provide advisory services</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Meet regulatory obligations</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Resolve disputes and enforce agreements</li>
                    </ul>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">7. Your Rights</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Under applicable data protection laws, you may:</p>
                    <ul className='mb-4'>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Request access to your personal data</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Request correction or updates</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Withdraw consent (where applicable)</li>
                        <li className='text-sm md:text-base lg:text-lg list-disc ml-4 text-gray-700'>Request deletion of your data (subject to legal requirements)</li>
                    </ul>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>To exercise your rights, contact us at the details below.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">8. Third-Party Links</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>
                </div>
                <div className='py-5'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">9. Updates to This Policy</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>We may update this Privacy Policy from time to time. Updates will be posted on this page with the revised effective date.</p>
                </div>
                <div className='pt-5 pb-30'>
                    <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 lg:leading-16 mb-2">10. Contact Information</h5>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 font-bold'>Insurath</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Powered by <span className='font-bold'>Sipany SS Insurance Brokers LLP</span></p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>License No.: 773</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>LLPIN: AAT-4069</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-4'>Validity: 21 Oct 2024 – 20 Oct 2027</p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Email: <Link href={"mailto:info@insurath.com"}>info@insurath.com</Link></p>
                    <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700'>Address: Todi Mansion, 10th Floor, Room No - 1002A1, Lu Shun Sarani, Kolkata, West Bengal - 700073</p>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy
