'use client';

import React,{useState, useEffect,useRef, FC} from 'react';
import {motion} from 'motion/react';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { IconUserFilled,IconBriefcase,IconBuildings,IconShieldCheck,IconUsersGroup,IconChecks,IconWalk } from '@tabler/icons-react';
import Image from 'next/image';
import axios from 'axios';
import AccordionItem from '@/components/ui/accordion';
import { PointerHighlight } from '@/components/ui/pointer-highlight';

interface EllipseItemProps {
  text: string
  angle: number // degrees
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

function BusinessInsurance() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [step, setStep] = useState(1);
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

        if(step === 1){
            if (!get("company_name")) newErrors.company_name = "Company name is required";
            if (!get("contact_person")) newErrors.contact_person = "Contact person is required";
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

            if (!get("business_type")) newErrors.business_type = "Business Type is required";
            if (!get("industry")) newErrors.industry = "Industry is required";
            if (!get("annual_revenue")) newErrors.annual_revenue = "Annual revenue is required";
            if (!get("number_of_employees")) newErrors.number_of_employees = "Number of employees is required";
        }

        if (step === 2) {
            if (!get("bike_name")) newErrors.bike_name = "Bike name is required";
            if (!get("bike_model")) newErrors.bike_model = "Bike model is required";
            if (!get("manufacturing_year")) newErrors.manufacturing_year = "Car manufacturing year is required";
            if (!get("registration_year")) newErrors.registration_year = "Registration year is required";
            if (!get("registration_number")) newErrors.registration_number = "Registration number is required";
            if (!get("exisiting_bike_insurance")) newErrors.exisiting_bike_insurance = "Existing car insurance is required";
            if (!get("claim_history")) newErrors.claim_history = "Claim history is required";
            if (!get("desired_coverage_type")) newErrors.desired_coverage_type = "Desired coverage type is required";
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
            const storedId = localStorage.getItem("business_id");

            const get = (name: string) =>
            (formRef.current?.elements.namedItem(name) as HTMLInputElement)?.value?.trim();

            // -------- STEP 1 --------
            if (step === 1) {
                const firstForm = {
                    company_name: get("company_name"),
                    contact_person: get("contact_person"),
                    phone_number: get("phone_number"),
                    email_id: get("email_id"),
                    city: get("city"),
                    business_type: get("business_type"),
                    industry: get("industry"),
                    annual_revenue: get("annual_revenue"),
                    number_of_employees: get("number_of_employees"),
                };

                let response;

                // CREATE
                if (!storedId) {
                    response = await axios.post("/api/business", firstForm);
                    localStorage.setItem("business_id", response.data.id);
                    showSnackbar(response.data.message, "success");

                }
                // UPDATE
                else {
                    response = await axios.patch("/api/business", {
                    id: storedId,
                    ...firstForm,
                    });
                }

                localStorage.setItem("step_one_business", JSON.stringify(firstForm));
                setError({});
                setStep(2);
                return;
            }

            // -------- STEP 2 --------
            if (step === 2 && storedId) {
                const secondForm = {
                    bike_name: get("bike_name"),
                    bike_model: get("bike_model"),
                    manufacturing_year: get("manufacturing_year"),
                    registration_year: get("registration_year"),
                    registration_number: get("registration_number"),
                    exisiting_bike_insurance: get("exisiting_bike_insurance"),
                    claim_history: get("claim_history"),
                    desired_coverage_type: get("desired_coverage_type"),
                };

                const response = await axios.patch("/api/business", {
                    id: storedId,
                    ...secondForm,
                });
                showSnackbar(response.data.message, "success");
                // reset everything
                localStorage.removeItem("business_id");
                localStorage.removeItem("step_one_business");

                formRef.current.reset();
                setError({});
                setStep(1);
            }
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const step1Data = localStorage.getItem("step_one_business");

        if (step === 1 && step1Data && formRef.current) {
            const data = JSON.parse(step1Data);

            const setValue = (name: string, value: string) => {
            const field = formRef.current?.elements.namedItem(name) as HTMLInputElement | null;
            if (field) field.value = value || "";
            };

            setValue("full_name", data.full_name);
            setValue("email_id", data.email_id);
            setValue("phone_number", data.phone_number);
            setValue("gender", data.gender);
            setValue("age", data.age);
            setValue("city", data.city);
        }
    }, [step]);

    const faqs = [
        {
            question: "What is business insurance and why do I need it?",
            answer: "Business insurance protects your company from financial losses due to unexpected events like property damage, lawsuits, or business interruptions. It's essential for protecting your investment and ensuring business continuity."
        },
        {
            question: "What types of business insurance are available?",
            answer: "Common types include general liability, property insurance, professional liability, cyber liability, workers' compensation, and business interruption insurance. The right combination depends on your industry and business size."
        },
        {
            question: "How much business insurance do I need?",
            answer: "The amount depends on your business size, industry, assets, and risk exposure. Our experts can help assess your specific needs and recommend appropriate coverage levels."
        },
        {
            question: "What is professional liability insurance?",
            answer: "Professional liability insurance protects against claims of negligence, errors, or omissions in professional services. It's crucial for service-based businesses and professionals."
        },
        {
            question: "Does business insurance cover cyber attacks?",
            answer: "Standard business insurance typically doesn't cover cyber attacks. You need specialized cyber liability insurance to protect against data breaches, cyber extortion, and related losses."
        },
        {
            question: "How do I file a business insurance claim?",
            answer: "Contact your insurance provider immediately when an incident occurs. Document everything, gather evidence, and work with your claims adjuster to ensure a smooth process."
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
                                <span className="flex gap-1 font-bold text-sm md:text-sm lg:text-base">Business Protection</span>
                            </AnimatedShinyText>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-10">
                            <div className='flex flex-col items-start justify-center gap-10'>
                                <h1 className="text-left text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Protect Your<br/><span className="text-[#E18126]">Business</span></h1>
                                <p className="text-left text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Protect your business with <span className="text-[#E18126]">comprehensive insurance coverage</span> tailored to your industry and needs.</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Property Coverage</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Liability Protection</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Cyber Security</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </motion.div>
                        <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[60%]">
                        <form ref={formRef} onSubmit={submitForm} className="bg-white shadow-lg rounded-4xl p-6 max-w-xl mx-auto">
                            <h2 className="text-xl md:text-xl lg:text-3xl font-bold mb-4 text-center text-blue-950">Get Your Business Insurance Quote</h2>
                            <p className='text-lg text-gray-700 text-center mb-6'>Answer a few quick questions to get personalized recommendations</p>
                            <ol className="flex items-center w-full justify-between mb-6 sm:mb-8 px-6">
                                {/* STEP 1 */}
                                <li
                                    className={`flex items-center w-full ${
                                    step >= 2
                                        ? "text-fg-brand after:border-brand-subtle"
                                        : "text-[#E18126] after:border-neutral-300"}`}
                                >
                                    <span className={`flex flex-col items-center justify-center rounded-full shrink-0 transition-all duration-300
                                        w-8 sm:w-10 lg:w-12
                                        ${ step >= 2
                                            ? "bg-brand-softer text-fg-brand"
                                            : "bg-neutral-tertiary text-body"
                                        }`}
                                    >
                                        <div className="bg-[#E18126] rounded-full p-3">
                                            <IconUserFilled className='w-6 h-6 text-white'/>
                                        </div>
                                        <span className="text-sm sm:text-base font-bold text-center">Business Information</span>
                                    </span>
                                </li>

                                {/* STEP 2 */}
                                <li className="flex items-center">
                                    <span
                                    className={`flex flex-col items-center justify-center rounded-full shrink-0 transition-all duration-300
                                        w-8 sm:w-10 lg:w-12
                                        ${step === 2
                                            ? "bg-brand-softer text-fg-brand"
                                            : "bg-neutral-tertiary text-gray-300"
                                        }`}
                                    >
                                        <div className={`bg-[#E18126] rounded-full p-3 ${step === 2 ? 'bg-[#E18126]': 'bg-gray-300'}`}>
                                            <IconBriefcase className='w-6 h-6 text-white'/>
                                        </div>
                                        <span className="text-sm sm:text-base font-bold text-center">Coverage Needs</span>
                                    </span>
                                </li>
                            </ol>

                            {step === 1 && (
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <input type="text" name="company_name" placeholder="Company Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.company_name && <span className="text-sm text-red-500">{error.company_name}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <input type="text" name="contact_person" placeholder="Contact Person" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.contact_person && <span className="text-sm text-red-500">{error.contact_person}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <input type="text" name="email_id" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.email_id && <span className="text-sm text-red-500">{error.email_id}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <input type="text" name="phone_number" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.phone_number && <span className="text-sm text-red-500">{error.phone_number}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <select name="business_type" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select Business Type</option>
                                            <option value="Private Limited">Private Limited</option>             
                                            <option value="Proprietorship">Proprietorship</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="LLP (Limited Liability Partnership)">LLP (Limited Liability Partnership)</option>
                                            <option value="Public Limited">Public Limited</option>
                                            <option value="One Person Company (OPC)">One Person Company (OPC)</option>
                                            <option value="Section 8 Company">Section 8 Company</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {error.business_type && <span className="text-sm text-red-500">{error.business_type}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="industry" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select Industry</option>
                                            <option value="Retail">Retail</option>             
                                            <option value="Manufacturing">Manufacturing</option>
                                            <option value="Professional Services">Professional Services</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Construction">Construction</option>
                                            <option value="Hospitality">Hospitality</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {error.industry && <span className="text-sm text-red-500">{error.industry}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <select name="annual_revenue" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select Annual Revenue</option>
                                            <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>             
                                            <option value="₹1-5 Lakhs">₹1-5 Lakhs</option>
                                            <option value="₹5-10 Lakhs">₹5-10 Lakhs</option>
                                            <option value="₹10-50 Lakhs">₹10-50 Lakhs</option>
                                            <option value="₹50 Lakhs-1 Crore">₹50 Lakhs-1 Crore</option>
                                            <option value="Over ₹1 Crore">Over ₹1 Crore</option>
                                        </select>
                                        {error.annual_revenue && <span className="text-sm text-red-500">{error.annual_revenue}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="number_of_employees" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select Number of Employees</option>
                                            <option value="1-5 employees">1-5 employees</option>             
                                            <option value="6-20 employees">6-20 employees</option>
                                            <option value="21-50 employees">21-50 employees</option>
                                            <option value="51-100 employees">51-100 employees</option>
                                            <option value="100+ employees">100+ employees</option>
                                        </select>
                                        {error.number_of_employees && <span className="text-sm text-red-500">{error.number_of_employees}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-bold mt-4 cursor-pointer">{loading ? 'Submitting...':'Next'}</button>
                                </div>
                            </div>  
                            )}
                            {step === 2 && (
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="existing_business_insurance" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select existing business insurance</option>
                                            <option value="No existing coverage">No existing coverage</option>             
                                            <option value="Basic coverage">Basic coverage</option>
                                            <option value="Comprehensive coverage">Comprehensive coverage</option>
                                            <option value="Premium coverage">Premium coverage</option>
                                        </select>
                                        {error.existing_business_insurance && <span className="text-sm text-red-500">{error.existing_business_insurance}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="primary_coverage_type" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select primary coverage type</option>
                                            <option value="General Liability">General Liability</option>             
                                            <option value="Property Insurance">Property Insurance</option>
                                            <option value="Professional Liability">Professional Liability</option>
                                            <option value="Cyber Liability">Cyber Liability</option>
                                            <option value="Comprehensive Package">Comprehensive Package</option>
                                        </select>
                                        {error.primary_coverage_type && <span className="text-sm text-red-500">{error.primary_coverage_type}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <input type="text" name="estimated_property_value" placeholder="Estimated Property value (₹)" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.estimated_property_value && <span className="text-sm text-red-500">{error.estimated_property_value}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="liability_coverage_needs" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select Desired Coverage Amount</option>
                                            <option value="Basic (₹5-10 Lakhs)">Basic (₹5-10 Lakhs)</option> 
                                            <option value="Standard (₹10-25 Lakhs)">Standard (₹10-25 Lakhs)</option> 
                                            <option value="High (₹25-50 Lakhs)">High (₹25-50 Lakhs)</option> 
                                            <option value="Premium (₹50+ Lakhs)">Premium (₹50+ Lakhs)</option> 
                                        </select>
                                        {error.liability_coverage_needs && <span className="text-sm text-red-500">{error.liability_coverage_needs}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="existing_business_insurance" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select existing business insurance</option>
                                            <option value="No existing coverage">No existing coverage</option>             
                                            <option value="Basic coverage">Basic coverage</option>
                                            <option value="Comprehensive coverage">Comprehensive coverage</option>
                                            <option value="Premium coverage">Premium coverage</option>
                                        </select>
                                        {error.existing_business_insurance && <span className="text-sm text-red-500">{error.existing_business_insurance}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="primary_coverage_type" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select primary coverage type</option>
                                            <option value="General Liability">General Liability</option>             
                                            <option value="Property Insurance">Property Insurance</option>
                                            <option value="Professional Liability">Professional Liability</option>
                                            <option value="Cyber Liability">Cyber Liability</option>
                                            <option value="Comprehensive Package">Comprehensive Package</option>
                                        </select>
                                        {error.primary_coverage_type && <span className="text-sm text-red-500">{error.primary_coverage_type}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" onClick={()=>setStep(1)} className="bg-gray-400 text-white px-4 py-2 rounded-4xl font-bold mt-4 cursor-pointer">Back</button>
                                    <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-bold mt-4 cursor-pointer">{loading ? 'Submitting...':'Submit'}</button>
                                </div>
                            </div>  
                            )}
                        </form>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="absolute">
                <img src="/assets/element_three.png" alt="element" className='w-full h-full' />
            </div>
            <div className="py-20">
                <div className="max-w-340 mx-auto flex justify-center items-center gap-40">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[70%]">
                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-4">Why Business Insurance Matters</p>
                        <h2 className="text-5xl leading-16 font-bold mb-6 text-blue-950 flex gap-2">Your Business, <PointerHighlight containerClassName="text-[#E18126]">Our Priority</PointerHighlight></h2>
                        <p className="text-lg leading-8 text-gray-700 mb-8">Get the right business coverage that fits your needs and budget, with expert guidance to help you choose the best plan.</p>
                        <div className="flex gap-6 mb-6">
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconBuildings className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Property Protection</p>
                                    <p className='text-sm text-gray-700'>Comprehensive coverage for your business property, equipment, and inventory against damage and theft.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconWalk className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Liability Coverage</p>
                                    <p className='text-sm text-gray-700'>Protection against lawsuits and claims that could threaten your business&apos;s financial stability.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconUsersGroup className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Employee Protection</p>
                                    <p className='text-sm text-gray-700'>Workers compensation and employee benefits to protect your most valuable asset - your team.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[30%]">
                        <div>
                            <div className="relative h-100 w-100 overflow-hidden rounded-4xl">
                                <Image src="/assets/business_about.png" alt="about_us_one" priority fill className="object-cover"/>
                            </div>
                            <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} className="absolute bg-white h-auto flex flex-col items-center w-30 overflow-hidden rounded-4xl px-4 py-4 -mt-6">
                                <p className="text-xl text-[#1185b7] font-bold text-shadow-sm">100%</p>
                                <p className='text-base text-gray-500'>Countries</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10 px-10 rounded-4xl max-w-340 mx-auto overflow-hidden'>
                <div className='max-w-2xl mx-auto mb-5'>
                    <p className="uppercase font-bold text-sm text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-4 text-center">Premium Features</p>
                    <h3 className="text-5xl leading-16 font-bold mb-6 text-white text-center text-shadow-lg">Comprehensive<br/><span className='text-[#E18126]'>Business Protection</span></h3>
                    <p className='text-lg leading-8 text-center text-shadow-lg text-white'>Our business insurance plans offer extensive coverage to protect every aspect of your business operations.</p>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Property damage coverage</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Business interruption insurance</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Professional liability</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Cyber liability coverage</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Employee compensation</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Product liability</h4>
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
                            <h5 className="text-5xl font-bold text-white  text-shadow-lg leading-tight mb-4">Business Insurance Benefits</h5>
                            <p className='text-lg text-shadow-lg text-white leading-8'>Get comprehensive coverage with our business insurance plans designed for every industry and business size.</p>
                        </div>

                        <div className="relative w-175 h-125 mx-auto">
                            <EllipseItem text="Customized coverage" angle={270} radiusX={400} radiusY={280} />
                            <EllipseItem text="Risk management support" angle={330} radiusX={400} radiusY={280} />

                            <EllipseItem text="Claims assistance" angle={30} radiusX={400} radiusY={280} />
                            <EllipseItem text="Legal protection" angle={90} radiusX={400} radiusY={280} />

                            <EllipseItem text="Financial security" angle={210} radiusX={400} radiusY={280} />
                            <EllipseItem text="Business continuity" angle={150} radiusX={400} radiusY={280} />
                        </div>

                    </div>
                </div>
            </div>
            <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10'>
                <div className="max-w-180 mx-auto">
                    <h5 className="text-5xl font-bold text-white text-center leading-16 text-shadow-lg mb-4">Ready to Protect Your Business?</h5>
                    <p className="text-lg text-center leading-8 text-white text-shadow-lg mb-6">Contact our business insurance experts to find the perfect coverage for your company.</p>
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
                                    <p className="text-lg text-left leading-8 text-white">Find quick answers to common car insurance questions</p>
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

export default BusinessInsurance