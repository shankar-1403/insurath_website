'use client';

import React,{useState, useEffect,useLayoutEffect, useRef, FC} from 'react';
import {motion} from 'motion/react';
import { IconUserFilled,IconCheckbox,IconChecks,IconBuildingHospital,IconStethoscope,IconBabyCarriage,IconShieldCheck } from '@tabler/icons-react';
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
    const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");

    useLayoutEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < 768) {
            setDevice("mobile");
        } else if (window.innerWidth < 1024) {
            setDevice("tablet");
        } else {
            setDevice("desktop");
        }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    const responsiveRadiusX =
        device === "mobile"
        ? radiusX * 0.55
        : device === "tablet"
        ? radiusX * 0.6
        : radiusX;

    const responsiveRadiusY = radiusY;

    const rad = (angle * Math.PI) / 180;

    let verticalAdjust = responsiveRadiusY;

    if (angle === 90 || angle === 270) {
        if (device === "mobile") {
            verticalAdjust = radiusY * 0.45;   // 📱 more flat
        } 
        else if (device === "tablet") {
            verticalAdjust = radiusY * 0.9;    // 📲 reduced from original
        } 
        else {
            verticalAdjust = radiusY * 1.2;    // 💻 original
        }
    }

    const baseX = Math.cos(rad) * responsiveRadiusX;
    const baseY = Math.sin(rad) * verticalAdjust;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
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
      <div className="flex items-center gap-4 bg-white p-1 rounded-4xl h-16 md:h-18 lg:h-20 w-40 lg:w-full shadow-lg -translate-x-1/2 -translate-y-1/2">
        <div className="border-2 border-[#E18126] p-1 rounded-3xl flex h-full justify-center items-center gap-1">
            <div>
                <IconShieldCheck className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#E18126]" />
            </div>
            <p className={`text-sm md:text-base lg:text-lg font-bold text-blue-950 ${device === 'desktop' ? 'whitespace-nowrap': 'whitespace-wrap'}`}>
                {text}
            </p>
        </div>
      </div>
    </motion.div>
  );
};

type Errors = Partial<Record<string, string>>;
type SnackbarType = "success" | "error";

function HealthInsurance() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [step, setStep] = useState(1);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [error, setError] = useState<Errors>({})
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

            if (!get("gender")) newErrors.gender = "Gender is required";
            if (!get("age")) newErrors.age = "Age is required";
            if (!get("city")) newErrors.city = "City is required";
        }

        if (step === 2) {
             if (!get("coverage_type")) newErrors.coverage_type = "Coverage Type is required";
            if (!get("existing_health_insurance")) newErrors.existing_health_insurance = "Existing Health Insurance is required";
            if (!get("pre_existing_conditions")) newErrors.pre_existing_conditions = "Pre-Existing Conditions is required";
            if (!get("desired_coverage_amount")) newErrors.desired_coverage_amount = "Desired Coverage Amount is required";
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
            const storedId = localStorage.getItem("health_id");

            const get = (name: string) =>
            (formRef.current?.elements.namedItem(name) as HTMLInputElement)?.value?.trim();

            // -------- STEP 1 --------
            if (step === 1) {
                const firstForm = {
                    full_name: get("full_name"),
                    email_id: get("email_id"),
                    phone_number: get("phone_number"),
                    gender: get("gender"),
                    age: get("age"),
                    city: get("city"),
                };

                let response;

                // CREATE
                if (!storedId) {
                    response = await axios.post("/api/health", firstForm);
                    localStorage.setItem("health_id", response.data.id);
                    showSnackbar(response.data.message, "success");

                }
                // UPDATE
                else {
                    response = await axios.patch("/api/health", {
                    id: storedId,
                    ...firstForm,
                    });
                }

                localStorage.setItem("step_one_health", JSON.stringify(firstForm));
                setError({});
                setStep(2);
                return;
            }

            // -------- STEP 2 --------
            if (step === 2 && storedId) {
                const secondForm = {
                    coverage_type: get("coverage_type"),
                    existing_health_insurance: get("existing_health_insurance"),
                    pre_existing_conditions: get("pre_existing_conditions"),
                    desired_coverage_amount: get("desired_coverage_amount"),
                };

                const response = await axios.patch("/api/health", {
                    id: storedId,
                    ...secondForm,
                });
                showSnackbar(response.data.message, "success");
                // reset everything
                localStorage.removeItem("health_id");
                localStorage.removeItem("step_one_health");

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
        const step1Data = localStorage.getItem("step_one_health");

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
            question: "What is health insurance and why do I need it?",
            answer: "Health insurance is a type of insurance that covers medical expenses incurred due to illness or injury. It provides financial protection against high medical costs and ensures you get quality healthcare without worrying about expenses."
        },
        {
            question: "What is cashless treatment?",
            answer: "Cashless treatment allows you to get medical treatment at network hospitals without paying upfront. The insurance company directly settles the bills with the hospital, making the process hassle-free for you."
        },
        {
            question: "What is the waiting period in health insurance?",
            answer: "Waiting period is the time you need to wait before certain benefits become available. Pre-existing diseases usually have a 2-4 year waiting period, while maternity benefits have a 9-month to 2-year waiting period."
        },
        {
            question: "Can I get health insurance if I have pre-existing conditions?",
            answer: "Yes, you can get health insurance even with pre-existing conditions. However, there will be a waiting period before coverage for these conditions begins. Some insurers may also charge higher premiums."
        },
        {
            question: "What is the difference between individual and family floater plans?",
            answer: "Individual plans cover one person, while family floater plans cover multiple family members under a single policy with a shared sum insured. Family floater plans are usually more cost-effective for families.    "
        }
    ];

    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-40 md:pt-40 lg:pt-50 pb-20">
                <div className="px-8 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2 lg:gap-6">
                        <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full md:w-[40%]">
                        <div className="flex items-center justify-start mb-2">
                            <div className="rounded-full border border-black/5 bg-neutral-100">
                                <div className="inline-flex items-center justify-center px-4 py-1 uppercase">
                                    <span className="flex gap-1 font-bold text-xs">Health Protection</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-10">
                            <div className='flex flex-col items-start justify-center gap-6 md:gap-10'>
                                <h1 className="text-left text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Protect Your <span className="text-[#E18126]">Health</span></h1>
                                <p className="text-left text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Expert health insurance guidance with <span className="text-[#E18126]">cashless treatment at 10,000+ hospitals</span> nationwide</p>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-4'>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-sm md:text-base lg:text-lg text-white'>Cashless Treatment</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-sm md:text-base lg:text-lg text-white'>Pre & Post Hospitalization</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-sm md:text-base lg:text-lg text-white'>Maternity Benefits</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </motion.div>
                        <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full md:w-[60%]">
                        <form ref={formRef} onSubmit={submitForm} className="bg-white shadow-lg rounded-4xl p-6 max-w-xl mx-auto">
                            <h2 className="text-xl md:text-xl lg:text-3xl font-bold mb-3 lg:mb-4 text-center text-blue-950">Get Your Health Insurance Quote</h2>
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
                                        <span className="text-xs md:text-base lg:text-lg font-bold text-center text-blue-950">Personal Information</span>
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
                                            <IconCheckbox className='w-4 md:w-6 h-4 md:h-6 text-white'/>
                                        </div>
                                        <span className="text-xs md:text-base lg:text-lg font-bold text-center text-blue-950">Insurance Needs</span>
                                    </span>
                                </li>
                            </ol>


                            {step === 1 && (
                            <div className="flex flex-col gap-4">
                                <div>
                                    <input type="text" name="full_name" placeholder="Full Name"  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                    {error.full_name && <span className="text-sm text-red-500">{error.full_name}</span>}
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
                                    <div className='col-span-1'>
                                        <input type="number" name="age" placeholder="Age"  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.age && <span className="text-sm text-red-500">{error.age}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="gender" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Gender</option>
                                            <option value="Male">Male</option>             
                                            <option value="Female">Female</option>
                                            <option value="Prefer not to say">Prefer not to say</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {error.gender && <span className="text-sm text-red-500">{error.gender}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <input type="text" name="city" placeholder="City" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.city && <span className="text-sm text-red-500">{error.city}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-bold mt-4 cursor-pointer text-sm md:text-base lg:text-lg">{loading ? 'Submitting...':'Next'}</button>
                                </div>
                            </div>  
                            )}
                            {step === 2 && (
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="coverage_type" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Coverage Type</option>
                                            <option value="Individual">Individual</option>             
                                            <option value="Floater">Floater</option>
                                        </select>
                                        {error.coverage_type && <span className="text-sm text-red-500">{error.coverage_type}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="existing_health_insurance" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Existing Health Insurance</option>
                                            <option value="No existing insurance">No existing insurance</option>             
                                            <option value="Have existing insurance">Have existing insurance</option>
                                            <option value="Previous insurance expired">Previous insurance expired</option>
                                        </select>
                                        {error.existing_health_insurance && <span className="text-sm text-red-500">{error.existing_health_insurance}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="pre_existing_conditions" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Pre-existing Conditions</option>
                                            <option value="No pre-existing conditions">No pre-existing conditions</option>             
                                            <option value="Diabetes">Diabetes</option>             
                                            <option value="Hypertension">Hypertension</option>             
                                            <option value="Heart conditions">Heart conditions</option>             
                                            <option value="Other conditions">Other conditions</option>             
                                        </select>
                                        {error.pre_existing_conditions && <span className="text-sm text-red-500">{error.pre_existing_conditions}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="desired_coverage_amount" defaultValue={""} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled hidden>Select Desired Coverage Amount</option>
                                            <option value="₹2-5 Lakhs">₹2-5 Lakhs</option>    
                                            <option value="₹5-10 Lakhs">₹5-10 Lakhs</option>    
                                            <option value="₹10-25 Lakhs">₹10-25 Lakhs</option>    
                                            <option value="₹25-50 Lakhs">₹25-50 Lakhs</option>    
                                            <option value="₹50+ Lakhs">₹50+ Lakhs</option>    
                                        </select>
                                        {error.desired_coverage_amount && <span className="text-sm text-red-500">{error.desired_coverage_amount}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" onClick={()=>setStep(1)} className="bg-gray-400 text-white px-4 py-2 rounded-4xl font-bold mt-4 cursor-pointer text-sm md:text-base lg:text-lg">Back</button>
                                    <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-bold mt-4 cursor-pointer text-sm md:text-base lg:text-lg">{loading ? 'Submitting...':'Submit'}</button>
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
                <div className="px-8 md:px-0 md:max-w-165 lg:max-w-340 mx-auto flex flex-col lg:flex-row justify-center items-center md:gap-20 lg:gap-40">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full lg:w-[70%]">
                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl text-xs mb-4">Why Health Insurance Matters</p>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl lg:leading-16 font-bold mb-6 text-blue-950 flex flex-col md:flex-row md:gap-2">Your Health, <PointerHighlight pointerClassName="text-[#E18126]" containerClassName="text-[#E18126]">Our Priority</PointerHighlight></h2>
                        <p className="text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-gray-700 mb-8">Get the right health coverage that fits your needs and budget, with expert guidance to help you choose the best plan.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                            <div className="flex flex-col gap-3 col-span-1 border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconBuildingHospital className='w-8 h-8 md:w-10 md:h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base mb-2 text-blue-950 font-bold">Cashless Treatment</p>
                                    <p className='text-sm text-gray-700'>Get treated at 10,000+ network hospitals without paying upfront - we settle directly with the hospital.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 col-span-1 border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconStethoscope className='w-8 h-8 md:w-10 md:h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base mb-2 text-blue-950 font-bold">Pre & Post Hospitalization</p>
                                    <p className='text-sm text-gray-700'>Coverage for medical expenses before and after hospitalization, ensuring complete care continuity.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 col-span-1 border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconBabyCarriage className='w-8 h-8 md:w-10 md:h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base mb-2 text-blue-950 font-bold">Maternity & Newborn Care</p>
                                    <p className='text-sm text-gray-700'>Specialized coverage for maternity expenses, newborn care, and family planning needs.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full lg:w-[30%]">
                        <div className='flex justify-center'>
                            <div>
                                <div className="relative w-65 md:h-100 h-65 md:w-100 overflow-hidden rounded-4xl">
                                    <Image src="/assets/health_about.png" alt="about_us_one" priority fill className="object-cover"/>
                                </div>
                                <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} className="absolute bg-white h-auto flex flex-col items-center w-40 overflow-hidden rounded-4xl px-4 py-4 -mt-6">
                                    <p className="text-lg md:text-xl text-[#1185b7] font-bold text-shadow-sm">10,000+</p>
                                    <p className='text-sm md:text-base text-gray-500'>Hospitals</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className='px-8 pb-10 lg:px-0'>
                <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10 px-10 rounded-4xl md:max-w-165 lg:max-w-340 mx-auto overflow-hidden'>
                    <div className='max-w-2xl mx-auto mb-5'>
                        <p className="uppercase font-bold text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-4 text-xs text-center">Why Choose Us</p>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl lg:leading-16 font-bold mb-6 text-white text-center text-shadow-lg">Unmatched Benefits for <br/><span className='text-[#E18126]'>Your Health Journey</span></h3>
                        <p className='text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-center  text-shadow-lg text-white'>Experience unparalleled advantages when you secure your health with our expert guidance and top-tier solutions.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h4 className='text-xs md:text-sm lg:text-base text-white text-center font-bold'>Tax benefits under<br/>Section 80D</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h4 className='text-xs md:text-sm lg:text-base text-white text-center font-bold'>No claim<br/>bonus</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h4 className='text-xs md:text-sm lg:text-base text-white text-center font-bold'>Restoration benefit<br/>once per year</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h4 className='text-xs md:text-sm lg:text-base text-white text-center font-bold'>Alternative treatment<br/>coverage</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h4 className='text-xs md:text-sm lg:text-base text-white text-center font-bold'>Mental health<br/>coverage</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                                <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                    <h4 className='text-xs md:text-sm lg:text-base text-white text-center font-bold'>Critical illness<br/>coverage</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="px-8 md:px-0 md:max-w-165 lg:max-w-340 mx-auto py-20">
                    <div className='mb-4'>
                        <h5 className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-950 text-center leading-tight mb-4">What&apos;s Covered</h5>
                        <p className='text-sm md:text-base lg:text-lg text-gray-700 text-center mb-5'>Comprehensive coverage that protects your vehicle in various scenarios</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 w-full gap-4'>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950 whitespace-wrap md:whitespace-nowrap'>Medicine costs</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950 whitespace-wrap md:whitespace-nowrap'>Emergency treatment</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950 whitespace-wrap md:whitespace-nowrap'>ICU charges covered</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950 whitespace-wrap md:whitespace-nowrap'>Room rent benefits</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] py-2 px-2 md:px-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950 whitespace-wrap md:whitespace-nowrap'>Diagnostic tests</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-4xl col-span-1 border border-[#E18126] p-1'>
                            <div className='rounded-3xl border border-[#E18126] p-2 h-full'>
                                <div className='relative flex flex-col items-center justify-center gap-3 rounded-4xl'>
                                    <IconShieldCheck color='#E18126' className='w-8 h-8'/>
                                    <p className='text-sm md:text-base text-center font-bold text-blue-950 whitespace-wrap md:whitespace-nowrap'>Surgery expenses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10'>
                <div className="px-8 md:px-0 md:max-w-165 lg:max-w-340 mx-auto">
                    <h5 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center lg:leading-16 text-shadow-lg mb-4">Ready to Protect Your Health?</h5>
                    <p className="text-sm md:text-base lg:text-lg text-center leading-6 md:leading-8 text-white text-shadow-lg mb-6">Our expert advisors are here to help you choose the best health insurance plan tailored to your needs. Contact us today for a personalized consultation.</p>
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
                            <div className="relative w-full h-130 rounded-4xl overflow-hidden">
                                {/* Image */}
                                <img src="/assets/faq.png" alt="FAQs" className="w-full h-full object-cover" />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60" />

                                {/* Content */}
                                <div className="absolute inset-0 max-w-md mx-auto flex flex-col justify-center gap-4 md:gap-6 px-6 text-center">
                                    <p className="uppercase font-bold text-xs text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl text-left">Got Questions?</p>
                                    <h5 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white lg:leading-16 text-left">Frequently Asked Questions</h5>
                                    <p className="text-sm md:text-base lg:text-lg text-left leading-6 md:leading-8 text-white">Find quick answers to common health insurance questions</p>
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

export default HealthInsurance