'use client';

import React,{useState, useEffect, useRef, FC} from 'react';
import {motion} from 'motion/react';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { IconUserFilled,IconCheckbox,IconWorld,IconShieldCheck,IconUsersGroup,IconChecks } from '@tabler/icons-react';
import Image from 'next/image';
import axios from 'axios';
import AccordionItem from '@/components/ui/accordion';
import { PointerHighlight } from '@/components/ui/pointer-highlight';

interface EllipseItemProps {
  text: string
  angle: number
  radiusX: number
  radiusY: number
}

const EllipseItem: FC<EllipseItemProps> = ({
  text,
  angle,
  radiusX,
  radiusY,
}) => {
    const rad = (angle * Math.PI) / 180
    const baseX = Math.cos(rad) * radiusX
    const baseY = Math.sin(rad) * radiusY

    return (
        <motion.div className="absolute top-1/2 left-1/2"
            initial={{ x: baseX, y: baseY }}
            animate={{
                x: [baseX - 8, baseX + 8, baseX - 8],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: angle * 0.015,
            }}
        >
        <div className="flex items-center gap-4 bg-white p-1 rounded-4xl h-20 shadow-lg -translate-x-1/2 -translate-y-1/2">
            <div className='border-2 border-[#E18126] p-1 rounded-3xl flex h-full justify-center items-center gap-2'>
                <IconShieldCheck className="w-8 h-8 text-[#E18126]" />
                <p className="text-lg font-bold text-blue-950 whitespace-nowrap">{text}</p>
            </div>
        </div>
        </motion.div>
    )
}

type Errors = Partial<Record<string, string>>;
type SnackbarType = "success" | "error";

function TravelInsurance() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [openIndex, setOpenIndex] = useState<number | null>(null);
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

        if (!get("city")) newErrors.city = "City is required";
        if (!get("age")) {
            newErrors.age = "Age is required";
        } else if (get("age").length > 3){
            newErrors.age = "Enter a valid age";
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
            const get = (name: string) =>
            (formRef.current?.elements.namedItem(name) as HTMLInputElement)?.value?.trim();

                const payload = {
                    full_name: get("full_name"),
                    email_id: get("email_id"),
                    phone_number: get("phone_number"),
                    age: get("age"),
                    city: get("city"),
                };

                // CREATE
                const response = await axios.post("/api/travel", payload);
                showSnackbar(response.data.message, "success");


                setError({});

        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setLoading(false);
        }
    };


    const faqs = [
        {
            question: "What is travel insurance and why do I need it?",
            answer: "Travel insurance provides financial protection against unexpected events during your trip, including medical emergencies, trip cancellations, baggage loss, and other travel-related risks. It ensures you can travel with peace of mind."
        },
        {
            question: "What does travel insurance cover?",
            answer: "Travel insurance typically covers medical emergencies, trip cancellation/interruption, baggage loss/delay, flight delays, emergency evacuation, and 24/7 assistance services. Coverage varies by plan and destination."
        },
        {
            question: "When should I buy travel insurance?",
            answer: "It's best to buy travel insurance as soon as you book your trip. This ensures maximum coverage, including trip cancellation benefits if you need to cancel before departure due to covered reasons."
        },
        {
            question: "Does travel insurance cover pre-existing conditions?",
            answer: "Some travel insurance plans cover pre-existing conditions if you meet certain criteria, such as purchasing the policy within a specific time frame and being medically stable. Check the policy terms for details."
        },
        {
            question: "What is not covered by travel insurance?",
            answer: "Common exclusions include extreme sports (unless specifically covered), alcohol/drug-related incidents, war/terrorism, pre-existing conditions (unless covered), and losses due to reckless behavior."
        },
        {
            question: "How do I make a claim?",
            answer: "Contact your insurance provider immediately when an incident occurs. Keep all receipts, medical reports, and documentation. Most providers offer 24/7 helpline support and online claim submission options."
        }
    ];

    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-20 md:pt-40 lg:pt-50 pb-20">
                <div className="px-10 md:px-0 md:max-w-2xl lg:max-w-340 mx-auto">
                    <div className="flex gap-4 md:gap-2 lg:gap-6">
                        <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[40%]">
                        <div className="flex items-center justify-start mb-2">
                            <div className="rounded-full border border-black/5 bg-neutral-100">
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 uppercase">
                                <span className="flex gap-1 font-bold text-sm md:text-sm lg:text-base">Travel Protection</span>
                            </AnimatedShinyText>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-10">
                            <div className='flex flex-col items-start justify-center gap-10'>
                                <h1 className="text-left text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Travel<br/><span className="text-[#E18126]">Worry-Free</span></h1>
                                <p className="text-left text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Travel worry-free with <span className="text-[#E18126]">comprehensive travel insurance</span> covering medical emergencies and trip cancellations.</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Instant Policy</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Zero Depreciation</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Roadside Assistance</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </motion.div>
                        <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[60%]">
                            <form ref={formRef} onSubmit={submitForm} className="bg-white shadow-lg rounded-4xl p-6 max-w-xl mx-auto">
                                <h2 className="text-xl md:text-xl lg:text-3xl font-bold mb-4 text-center text-blue-950">Get Your Travel Insurance Quote</h2>
                                <p className='text-lg text-gray-700 text-center mb-6'>Answer a few quick questions to get personalized recommendations</p>

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <input type="text" name="full_name" placeholder="Full Name"  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.full_name && <span className="text-sm text-red-500">{error.full_name}</span>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <input type="email" name="email_id" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                            {error.email_id && <span className="text-sm text-red-500">{error.email_id}</span>}
                                        </div>
                                        <div className="col-span-1">
                                            <input type="text" name="phone_number" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                            {error.phone_number && <span className="text-sm text-red-500">{error.phone_number}</span>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <input type="text" name="age" placeholder="Age" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                            {error.age && <span className="text-sm text-red-500">{error.age}</span>}
                                        </div>
                                        <div className="col-span-1">
                                            <input type="text" name="city" placeholder="City" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                            {error.city && <span className="text-sm text-red-500">{error.city}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-bold mt-4 cursor-pointer">{loading ? 'Submitting...':'Submit'}</button>
                                    </div>
                                </div>  
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="absolute w-full">
                <img src="/assets/element_three.png" alt="element" className='w-full h-full' />
            </div>
            <div className="py-20">
                <div className="max-w-340 mx-auto flex justify-center items-center gap-40">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[70%]">
                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-4">Why Travel Insurance Matters</p>
                        <h2 className="text-5xl leading-16 font-bold mb-6 text-blue-950 flex gap-2">Your Travel, <PointerHighlight pointerClassName="text-[#E18126]" containerClassName="text-[#E18126]">Our Priority</PointerHighlight></h2>
                        <p className="text-lg leading-8 text-gray-700 mb-8">Get the right travel coverage that fits your needs and budget, with expert guidance to help you choose the best plan.</p>
                        <div className="flex gap-6 mb-6">
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconWorld className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Worldwide Coverage</p>
                                    <p className='text-sm text-gray-700'>Protection across 190+ countries with comprehensive medical and emergency coverage.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconShieldCheck className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Trip Protection</p>
                                    <p className='text-sm text-gray-700'>Coverage for trip cancellation, interruption, and delays due to various reasons.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconUsersGroup className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Family Coverage</p>
                                    <p className='text-sm text-gray-700'>Protect your entire family with comprehensive travel insurance plans.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[30%]">
                        <div>
                            <div className="relative h-100 w-100 overflow-hidden rounded-4xl">
                                <img src="/assets/travel_about.png" alt="travel" className="w-full h-full"/>
                            </div>
                            <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} className="absolute bg-white h-auto flex flex-col items-center w-30 overflow-hidden rounded-4xl px-4 py-4 -mt-6">
                                <p className="text-xl text-[#1185b7] font-bold text-shadow-sm">190+</p>
                                <p className='text-base text-gray-500'>Countries</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10 px-10 rounded-4xl max-w-340 mx-auto overflow-hidden'>
                <div className='max-w-2xl mx-auto mb-5'>
                    <p className="uppercase font-bold text-sm text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-4 text-center">Premium Features</p>
                    <h3 className="text-5xl leading-16 font-bold mb-6 text-white text-center text-shadow-lg">Comprehensive<br/><span className='text-[#E18126]'>Travel Protection</span></h3>
                    <p className='text-lg leading-8 text-center text-shadow-lg text-white'>Our travel insurance plans offer extensive coverage to ensure your journey is safe and worry-free.</p>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Medical emergency coverage</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Trip cancellation protection</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Baggage loss coverage</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Flight delay compensation</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Emergency evacuation</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>24/7 <br/>assistance</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className="max-w-340 mx-auto py-20">
                <div className="relative py-20">
                {/* Shared center point */}
                    <div className="relative w-full flex justify-center items-center">
                        
                        {/* Heading (center anchor) */}
                        <div className="absolute max-w-xl text-center bg-[#1185b7] rounded-full h-120 w-120 flex flex-col justify-center items-center p-10">
                            <h5 className="text-5xl font-bold text-white  text-shadow-lg leading-tight mb-4">Travel Insurance Benefits</h5>
                            <p className='text-lg text-shadow-lg text-white leading-8'>Get comprehensive coverage with our travel insurance plans designed for every type of traveler.</p>
                        </div>

                        <div className="relative w-175 h-125 mx-auto">
                            <EllipseItem text="Coverage for pre-existing conditions" angle={270} radiusX={400} radiusY={280} />
                            <EllipseItem text="Adventure sports coverage" angle={330} radiusX={400} radiusY={240} />

                            <EllipseItem text="Family coverage options" angle={30} radiusX={400} radiusY={240} />
                            <EllipseItem text="Business trip protection" angle={90} radiusX={400} radiusY={280} />

                            <EllipseItem text="Student travel insurance" angle={210} radiusX={400} radiusY={240} />
                            <EllipseItem text="Senior citizen coverage" angle={150} radiusX={400} radiusY={240} />
                        </div>

                    </div>
                </div>
            </div>
            <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10'>
                <div className="max-w-180 mx-auto">
                    <h5 className="text-5xl font-bold text-white text-center leading-16 text-shadow-lg mb-4">Need More Information?</h5>
                    <p className="text-lg text-center leading-8 text-white text-shadow-lg mb-6">Our car insurance experts are here to help you choose the right coverage for your vehicle.</p>
                    <div className="flex gap-4 justify-center">
                        <div>
                            <button className='bg-white text-[#1185b7] text-lg p-4 w-40 rounded-4xl cursor-pointer'>Call Us Now</button>
                        </div>
                        <div>
                            <button className='text-white border-2 border-white text-lg p-4 w-40 rounded-4xl cursor-pointer'>WhatsApp Us</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white'>
                <div className="max-w-340 mx-auto pt-20 pb-40">
                    <div className="flex">
                        <div className="w-[40%]">
                            <div className="relative w-full h-130 rounded-4xl overflow-hidden">
                                {/* Image */}
                                <img src="/assets/faq.png" alt="FAQs" className="w-full h-full object-cover" />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60" />

                                {/* Content */}
                                <div className="absolute inset-0 max-w-md mx-auto flex flex-col justify-center px-6 text-center">
                                    <p className="uppercase font-bold text-sm text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-2 text-left">Got Questions?</p>
                                    <h5 className="text-5xl font-bold text-white leading-16 text-left mb-4">Frequently Asked Questions</h5>
                                    <p className="text-lg text-left leading-8 text-white">Find quick answers to common travel insurance questions</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-[60%]'>
                            <div className="max-w-2xl mx-auto flex flex-col gap-4">
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

export default TravelInsurance