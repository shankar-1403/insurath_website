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
            if (!get("existing_business_insurance")) newErrors.existing_business_insurance = "Bike name is required";
            if (!get("primary_coverage_type")) newErrors.primary_coverage_type = "Bike model is required";
            if (!get("estimated_property_value")) newErrors.estimated_property_value = "Car manufacturing year is required";
            if (!get("liability_coverage_needs")) newErrors.liability_coverage_needs = "Registration year is required";
            if (!get("cyber_security_coverage")) newErrors.cyber_security_coverage = "Registration number is required";
            if (!get("priority_coverage_area")) newErrors.priority_coverage_area = "Existing car insurance is required";
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
                    existing_business_insurance: get("existing_business_insurance"),
                    primary_coverage_type: get("primary_coverage_type"),
                    estimated_property_value: get("estimated_property_value"),
                    liability_coverage_needs: get("liability_coverage_needs"),
                    cyber_security_coverage: get("cyber_security_coverage"),
                    priority_coverage_area: get("priority_coverage_area"),
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

            setValue("company_name", data.company_name);
            setValue("contact_person", data.contact_person);
            setValue("email_id", data.email_id);
            setValue("phone_number", data.phone_number);
            setValue("business_type", data.business_type);
            setValue("industry", data.industry);
            setValue("annual_revenue", data.annual_revenue);
            setValue("number_of_employees", data.number_of_employees);
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
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-40 md:pt-40 lg:pt-50 pb-20">
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-6">
                        <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full md:w-[40%]">
                        <div className="flex items-center justify-start mb-2">
                            <div className="rounded-full border border-black/5 bg-neutral-100 px-4 py-1 uppercase">
                                <span className="font-bold text-xs text-blue-950">Business Protection</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-10">
                            <div className='flex flex-col items-start justify-center gap-6 md:gap-10'>
                                <h1 className="text-left text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Protect Your<br/><span className="text-[#E18126]">Business</span></h1>
                                <p className="text-left text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Protect your business with <span className="text-[#E18126]">comprehensive insurance coverage</span> tailored to your industry and needs.</p>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-4 w-full'>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-sm md:text-base lg:text-lg text-white'>Property Coverage</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-sm md:text-base lg:text-lg text-white'>Liability Protection</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-sm md:text-base lg:text-lg text-white'>Cyber Security</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </motion.div>
                        <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full md:w-[60%]">
                        <form ref={formRef} onSubmit={submitForm} className="bg-white shadow-lg rounded-4xl p-6 max-w-xl mx-auto">
                            <h2 className="text-xl md:text-xl lg:text-3xl font-bold mb-3 lg:mb-4 text-center text-blue-950">Get Your Business Insurance Quote</h2>
                            <p className='text-sm md:text-base lg:text-lg text-gray-700 text-center mb-6 leading-6 md:leading-8'>Answer a few quick questions to get personalized recommendations</p>
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
                                            <IconUserFilled className='w-4 md:w-6 h-4 md:h-6 text-white'/>
                                        </div>
                                        <span className="text-xs md:text-base lg:text-lg font-bold text-center text-blue-950">Business Information</span>
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
                                            <IconBriefcase className='w-4 md:w-6 h-4 md:h-6 text-white'/>
                                        </div>
                                        <span className="text-xs md:text-base lg:text-lg font-bold text-center text-blue-950">Coverage Needs</span>
                                    </span>
                                </li>
                            </ol>

                            {step === 1 && (
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <input type="text" name="company_name" placeholder="Company Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.company_name && <span className="text-sm text-red-500">{error.company_name}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <input type="text" name="contact_person" placeholder="Contact Person" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.contact_person && <span className="text-sm text-red-500">{error.contact_person}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <input type="text" name="email_id" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.email_id && <span className="text-sm text-red-500">{error.email_id}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <input type="text" name="phone_number" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.phone_number && <span className="text-sm text-red-500">{error.phone_number}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <select name="business_type" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Business Type</option>
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
                                        <select name="industry" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Industry</option>
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <select name="annual_revenue" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Annual Revenue</option>
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
                                        <select name="number_of_employees" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Number of Employees</option>
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
                                    <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-semibold mt-4 cursor-pointer text-sm md:text-base lg:text-lg">{loading ? 'Submitting...':'Next'}</button>
                                </div>
                            </div>  
                            )}
                            {step === 2 && (
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="existing_business_insurance" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select existing business insurance</option>
                                            <option value="No existing coverage">No existing coverage</option>             
                                            <option value="Basic coverage">Basic coverage</option>
                                            <option value="Comprehensive coverage">Comprehensive coverage</option>
                                            <option value="Premium coverage">Premium coverage</option>
                                        </select>
                                        {error.existing_business_insurance && <span className="text-sm text-red-500">{error.existing_business_insurance}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="primary_coverage_type" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select primary coverage type</option>
                                            <option value="General Liability">General Liability</option>             
                                            <option value="Property Insurance">Property Insurance</option>
                                            <option value="Professional Liability">Professional Liability</option>
                                            <option value="Cyber Liability">Cyber Liability</option>
                                            <option value="Comprehensive Package">Comprehensive Package</option>
                                        </select>
                                        {error.primary_coverage_type && <span className="text-sm text-red-500">{error.primary_coverage_type}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <input type="text" name="estimated_property_value" placeholder="Estimated Property value (₹)" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.estimated_property_value && <span className="text-sm text-red-500">{error.estimated_property_value}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="liability_coverage_needs" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select liability coverage needs</option>
                                            <option value="Basic (₹5-10 Lakhs)">Basic (₹5-10 Lakhs)</option> 
                                            <option value="Standard (₹10-25 Lakhs)">Standard (₹10-25 Lakhs)</option> 
                                            <option value="High (₹25-50 Lakhs)">High (₹25-50 Lakhs)</option> 
                                            <option value="Premium (₹50+ Lakhs)">Premium (₹50+ Lakhs)</option> 
                                        </select>
                                        {error.liability_coverage_needs && <span className="text-sm text-red-500">{error.liability_coverage_needs}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="cyber_security_coverage" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select cyber security coverage</option>
                                            <option value="No existing coverage">No existing coverage</option>             
                                            <option value="Basic coverage">Basic coverage</option>
                                            <option value="Comprehensive coverage">Comprehensive coverage</option>
                                            <option value="Premium coverage">Premium coverage</option>
                                        </select>
                                        {error.cyber_security_coverage && <span className="text-sm text-red-500">{error.existing_business_insurance}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="priority_coverage_area" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select priority coverage area</option>
                                            <option value="Property Protection">Property Protection</option>             
                                            <option value="Liability Protection">Liability Protection</option>
                                            <option value="Cyber Security">Cyber Security</option>
                                            <option value="Business Interuption">Business Interuption</option>
                                            <option value="Comprehensive Coverage">Comprehensive Coverage</option>
                                        </select>
                                        {error.priority_coverage_area && <span className="text-sm text-red-500">{error.priority_coverage_area}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" onClick={()=>setStep(1)} className="bg-gray-400 text-white px-4 py-2 rounded-4xl font-semibold mt-4 cursor-pointer text-sm md:text-base lg:text-lg">Back</button>
                                    <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-semibold mt-4 cursor-pointer text-sm md:text-base lg:text-lg">{loading ? 'Submitting...':'Submit'}</button>
                                </div>
                            </div>  
                            )}
                        </form>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="absolute w-full">
                <img src="/assets/element_three.png" alt="element" className='w-full h-full' />
            </div>
            <div className="py-20">
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto flex flex-col lg:flex-row justify-center items-center md:gap-20 lg:gap-40">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full lg:w-[70%]">
                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl text-xs mb-4">Why Business Insurance Matters</p>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl lg:leading-16 font-bold mb-6 text-blue-950 flex flex-col md:flex-row md:gap-2">Your Business, <PointerHighlight pointerClassName="text-[#E18126]" containerClassName="text-[#E18126]">Our Priority</PointerHighlight></h3>
                        <p className="text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-8">Get the right business coverage that fits your needs and budget, with expert guidance to help you choose the best plan.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                            <div className="flex flex-col gap-3 col-span-1 border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconBuildings className='w-8 h-8 md:w-10 md:h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base mb-2 text-blue-950 font-bold">Property Protection</p>
                                    <p className='text-sm text-gray-700'>Comprehensive coverage for your business property, equipment, and inventory against damage and theft.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 col-span-1 border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconWalk className='w-8 h-8 md:w-10 md:h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base mb-2 text-blue-950 font-bold">Liability Coverage</p>
                                    <p className='text-sm text-gray-700'>Protection against lawsuits and claims that could threaten your business&apos;s financial stability.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 col-span-1 border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconUsersGroup className='w-8 h-8 md:w-10 md:h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base mb-2 text-blue-950 font-bold">Employee Protection</p>
                                    <p className='text-sm text-gray-700'>Workers compensation and employee benefits to protect your most valuable asset - your team.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full lg:w-[30%]">
                        <div className='flex justify-center'>
                            <div>
                                <div className="relative w-65 md:h-100 h-65 md:w-100 overflow-hidden rounded-4xl">
                                    <img src="/assets/business_about.webp" alt="Business" className="object-cover w-full h-full"/>
                                </div>
                                <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} className="absolute bg-white h-auto flex flex-col items-center w-40 overflow-hidden rounded-4xl px-4 py-4 -mt-6">
                                    <p className="text-lg md:text-xl text-[#1185b7] font-bold text-shadow-sm">100+</p>
                                    <p className='text-sm md:text-base text-gray-500'>Companies</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className='px-6 pb-10 lg:px-0'>
                <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10 px-4 md:px-10 rounded-4xl md:max-w-165 lg:max-w-340 mx-auto overflow-hidden'>
                    <div className='md:max-w-2xl mx-auto mb-5'>
                        <p className="uppercase font-bold text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-4 text-xs text-center">Premium Features</p>
                        <h4 className="text-2xl md:text-4xl lg:text-5xl lg:leading-16 font-bold mb-6 text-white text-center text-shadow-lg">Comprehensive<br/><span className='text-[#E18126]'>Business Protection</span></h4>
                        <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-center text-shadow-lg text-white'>Our business insurance plans offer extensive coverage to protect every aspect of your business operations.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h5 className='text-sm lg:text-base text-white text-center font-bold'>Property damage <br/>coverage</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h5 className='text-sm lg:text-base text-white text-center font-bold'>Business interruption <br/>insurance</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h5 className='text-sm lg:text-base text-white text-center font-bold'>Professional <br/>liability</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h5 className='text-sm lg:text-base text-white text-center font-bold'>Cyber liability <br/>coverage</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h5 className='text-sm lg:text-base text-white text-center font-bold'>Employee <br/>compensation</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h5 className='text-sm lg:text-base text-white text-center font-bold'>Product <br/>liability</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto py-20">
                    <div className='mb-4 max-w-2xl mx-auto'>
                        <h5 className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-950 text-center leading-tight mb-4">What Our<br/><span className='text-[#E18126]'>Business Insurance Covers</span></h5>
                        <p className='text-sm md:text-base lg:text-lg text-gray-700 text-center mb-5'>Get comprehensive coverage with our business insurance plans designed for every industry and business size.</p>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full gap-4'>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950'>Customized<br/>coverage</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950'>Risk management<br/>support</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950'>Claims<br/>assistance</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950'>Legal<br/>protection</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950'>Financial<br/>security</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] p-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950'>Business<br/>continuity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10'>
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                    <h5 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center lg:leading-16 text-shadow-lg mb-4">Ready to Protect Your Business?</h5>
                    <p className="text-sm md:text-base lg:text-lg text-center leading-6 md:leading-8 text-white text-shadow-lg mb-6">Contact our business insurance experts to find the perfect coverage for your company.</p>
                    <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
                        <div>
                            <button className='bg-white text-[#1185b7] text-sm md:text-base lg:text-lg p-3 md:p-3 lg:p-4 w-40 rounded-4xl cursor-pointer'>Call Us Now</button>
                        </div>
                        <div>
                            <button className='text-white border-2 border-white text-sm md:text-base lg:text-lg p-3 md:p-3 lg:p-4 w-40 rounded-4xl cursor-pointer'>WhatsApp Us</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white'>
                <div className="px-6 md:px-0 md:max-w-165 lg:max-w-340 mx-auto pt-20 pb-30 md:pb-40">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                        <div className="w-full md:w-[50%] lg:w-[40%]">
                            <div className="relative w-full h-80 md:h-100 lg:h-130 rounded-4xl overflow-hidden">
                                {/* Image */}
                                <img src="/assets/faq.png" alt="FAQs" className="w-full h-full object-cover" />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60" />

                                {/* Content */}
                                <div className="absolute inset-0 max-w-md mx-auto flex flex-col justify-center gap-4 md:gap-6 px-6 text-center">
                                    <p className="uppercase font-bold text-xs text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl text-left">Got Questions?</p>
                                    <h5 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white lg:leading-16 text-left">Frequently Asked Questions</h5>
                                    <p className="text-sm md:text-base lg:text-lg text-left leading-6 md:leading-8 text-white">Find quick answers to common business insurance questions</p>
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