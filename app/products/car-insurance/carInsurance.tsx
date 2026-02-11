'use client';

import React,{useState, useEffect, useRef, FC} from 'react';
import {motion} from 'motion/react';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { IconUserFilled,IconCar,IconRoad,IconShieldCheck,IconCash } from '@tabler/icons-react';
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

function CarInsurance() {
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
        }

        if (step === 2) {
            if (!get("vehicle_name")) newErrors.vehicle_name = "Vehicle name is required";
            if (!get("vehicle_model")) newErrors.vehicle_model = "Vehicle model is required";
            if (!get("manufacturing_year")) newErrors.manufacturing_year = "Car manufacturing year is required";
            if (!get("registration_year")) newErrors.registration_year = "Registration year is required";
            if (!get("registration_number")) newErrors.registration_number = "Registration number is required";
            if (!get("exisiting_car_insurance")) newErrors.exisiting_car_insurance = "Existing car insurance is required";
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
            const storedId = localStorage.getItem("car_id");

            const get = (name: string) =>
            (formRef.current?.elements.namedItem(name) as HTMLInputElement)?.value?.trim();

            // -------- STEP 1 --------
            if (step === 1) {
                const firstForm = {
                    full_name: get("full_name"),
                    email_id: get("email_id"),
                    phone_number: get("phone_number"),
                    city: get("city"),
                };

                let response;

                // CREATE
                if (!storedId) {
                    response = await axios.post("/api/car", firstForm);
                    localStorage.setItem("car_id", response.data.id);
                    showSnackbar(response.data.message, "success");

                }
                // UPDATE
                else {
                    response = await axios.patch("/api/car", {
                    id: storedId,
                    ...firstForm,
                    });
                }

                localStorage.setItem("step_one_car", JSON.stringify(firstForm));
                setError({});
                setStep(2);
                return;
            }

            // -------- STEP 2 --------
            if (step === 2 && storedId) {
                const secondForm = {
                    vehicle_name: get("vehicle_name"),
                    vehicle_model: get("vehicle_model"),
                    manufacturing_year: get("manufacturing_year"),
                    registration_year: get("registration_year"),
                    registration_number: get("registration_number"),
                    exisiting_car_insurance: get("exisiting_car_insurance"),
                    claim_history: get("claim_history"),
                    desired_coverage_type: get("desired_coverage_type"),
                };

                const response = await axios.patch("/api/car", {
                    id: storedId,
                    ...secondForm,
                });
                showSnackbar(response.data.message, "success");
                // reset everything
                localStorage.removeItem("car_id");
                localStorage.removeItem("step_one_car");

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
        const step1Data = localStorage.getItem("step_one_car");

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
            question: "What is car insurance and why is it mandatory?",
            answer: "Car insurance is a contract between you and an insurance company that provides financial protection against damages to your vehicle and third-party liabilities. In India, third-party car insurance is mandatory under the Motor Vehicles Act to protect against financial losses from accidents."
        },
        {
            question: "What's the difference between comprehensive and third-party car insurance?",
            answer: "Third-party insurance covers only damages to third parties (other vehicles, property, or people) caused by your vehicle. Comprehensive insurance covers both third-party liabilities and damages to your own vehicle, including theft, natural calamities, and accidents."
        },
        {
            question: "How is the premium calculated for car insurance?",
            answer: "Car insurance premiums are calculated based on factors like the car's make, model, age, engine capacity, location, driver's age and experience, claim history, No Claim Bonus (NCB), and the chosen coverage type. Newer cars and experienced drivers typically pay lower premiums."
        },
        {
            question: "What is No Claim Bonus (NCB) and how does it work?",
            answer: "NCB is a discount on your premium for not making any claims during the policy period. It starts at 20% and can go up to 50% over 5 claim-free years. NCB is transferable when you switch insurers and can significantly reduce your premium."
        },
        {
            question: "What add-on covers are available with car insurance?",
            answer: "Popular add-on covers include zero depreciation, engine protection, roadside assistance, consumables cover, return to invoice, and personal accident cover. These provide additional protection beyond the basic comprehensive coverage."
        },
        {
            question: "How do I make a claim on my car insurance?",
            answer: "To make a claim, inform your insurer immediately after an accident, provide necessary documents (policy copy, driving license, RC, FIR if required), get your vehicle inspected, and choose between cashless (at network garages) or reimbursement claim process."
        }
    ];
    
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - 2010 + 1 },
        (_, index) => currentYear - index
    );

    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-20 md:pt-40 lg:pt-50 pb-20">
                <div className="px-10 md:px-0 md:max-w-2xl lg:max-w-340 mx-auto">
                    <div className="flex gap-4 md:gap-2 lg:gap-6">
                        <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[40%]">
                        <div className="flex items-center justify-start mb-2">
                            <div className="rounded-full border border-black/5 bg-neutral-100">
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 uppercase">
                                <span className="flex gap-1 font-bold text-sm md:text-sm lg:text-base">Vehicle Protection</span>
                            </AnimatedShinyText>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-10">
                            <div className='flex flex-col items-start justify-center gap-10'>
                                <h1 className="text-left text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Protect Your <span className="text-[#E18126]">Vehicle</span></h1>
                                <p className="text-left text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Protect your vehicle with <span className="text-[#E18126]">comprehensive car insurance coverage</span> and expert guidance.</p>
                            </div>
                        </div>
                        </motion.div>
                        <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[60%]">
                        <form ref={formRef} onSubmit={submitForm} className="bg-white shadow-lg rounded-4xl p-6 max-w-xl mx-auto">
                            <h2 className="text-xl md:text-xl lg:text-3xl font-bold mb-4 text-center text-blue-950">Get Your Car Insurance Quote</h2>
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
                                        <span className="text-sm sm:text-base font-bold text-center">Personal Information</span>
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
                                            <IconCar className='w-6 h-6 text-white'/>
                                        </div>
                                        <span className="text-sm sm:text-base font-bold text-center">Vehicle Details</span>
                                    </span>
                                </li>
                            </ol>


                            {step === 1 && (
                            <div className="flex flex-col gap-4">
                                <div>
                                    <input type="text" name="full_name" placeholder="Full Name"  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                    {error.full_name && <span className="text-sm text-red-500">{error.full_name}</span>}
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
                                        <input type="text" name="city" placeholder="City" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.city && <span className="text-sm text-red-500">{error.city}</span>}
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
                                        <input type="text" name="vehicle_name" placeholder="Vehicle Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.vehicle_name && <span className="text-sm text-red-500">{error.vehicle_name}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <input type="text" name="vehicle_model" placeholder="Vehicle Model" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.vehicle_model && <span className="text-sm text-red-500">{error.vehicle_model}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="manufacturing_year" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select manufacturing year</option>
                                            {years.map((year)=>(
                                                <>
                                                    <option key={year} value={year}>{year}</option> 
                                                </>   
                                            ))}
                                        </select>
                                        {error.manufacturing_year && <span className="text-sm text-red-500">{error.manufacturing_year}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="registration_year" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select registration year</option>
                                            {years.map((year)=>(
                                                <>
                                                    <option key={year} value={year}>{year}</option> 
                                                </>   
                                            ))}  
                                        </select>
                                        {error.registration_year && <span className="text-sm text-red-500">{error.registration_year}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <input type="text" name="registration_number" placeholder="Registration Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.registration_number && <span className="text-sm text-red-500">{error.registration_number}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="exisiting_car_insurance" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select existing car insurance</option>
                                            <option value="No existing insurance">No existing insurance</option>             
                                            <option value="Have existing insurance">Have existing insurance</option>             
                                            <option value="Previous insurance expired">Previous insurance expired</option>     
                                        </select>
                                        {error.exisiting_car_insurance && <span className="text-sm text-red-500">{error.exisiting_car_insurance}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="claim_history" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select claim history</option>
                                            <option value="No claims">No claims</option>             
                                            <option value="1-2 claims">1-2 claims</option>             
                                            <option value="3-5 claims">3-5 claims</option>
                                            <option value="5+ claims">5+ claims</option>
                                        </select>
                                        {error.claim_history && <span className="text-sm text-red-500">{error.claim_history}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <select name="desired_coverage_type" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value={""} selected hidden>Select coverage type</option>
                                            <option value="Third Party Only">Third Party Only</option>             
                                            <option value="Comprehensive">Comprehensive</option>
                                        </select>
                                        {error.desired_coverage_type && <span className="text-sm text-red-500">{error.desired_coverage_type}</span>}
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
                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-4">Vehicle Protection</p>
                        <h2 className="text-5xl leading-16 font-bold mb-6 text-blue-950">Protect Your Vehicle with, <PointerHighlight containerClassName="text-[#E18126]">Complete Coverage</PointerHighlight></h2>
                        <p className="text-lg leading-8 text-gray-700 mb-8">Comprehensive car insurance that provides complete protection for your vehicle against accidents, theft, and natural disasters.</p>
                        <div className="flex gap-6 mb-6">
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconShieldCheck className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Comprehensive Coverage</p>
                                    <p className='text-sm text-gray-700'>Complete protection against accidents, theft, natural disasters, and third-party liabilities for your vehicle.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconRoad className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Roadside Assistance</p>
                                    <p className='text-sm text-gray-700'>24/7 roadside assistance and emergency services to help you when you need it most.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconCash className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Cashless Claims</p>
                                    <p className='text-sm text-gray-700'>Hassle-free cashless claims at our extensive network of garages across the country.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[30%]">
                        <div>
                            <div className="relative h-100 w-100 overflow-hidden rounded-4xl">
                                <img src="/assets/car_about.png" alt="about_us_one" className="object-cover h-full w-full"/>
                            </div>
                            <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} className="absolute bg-white h-auto flex flex-col items-center w-30 overflow-hidden rounded-4xl px-4 py-4 -mt-6">
                                <p className="text-xl text-[#1185b7] font-bold text-shadow-sm">1000+</p>
                                <p className='text-base text-gray-500'>Cars</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10 px-10 rounded-4xl max-w-340 mx-auto overflow-hidden'>
                <div className='max-w-2xl mx-auto mb-5'>
                    <p className="uppercase font-bold text-sm text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-4 text-center">Premium Features</p>
                    <h3 className="text-5xl leading-16 font-bold mb-6 text-white text-center text-shadow-lg">Everything You Need for<br/><span className='text-[#E18126]'>Complete Vehicle Protection</span></h3>
                    <p className='text-lg leading-8 text-center text-shadow-lg text-white'>Our comprehensive car insurance plans come with premium features designed to give you complete peace of mind.</p>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Zero depreciation cover</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Engine protection</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Cashless claims</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Consumables</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Return to invoice</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl h-20 flex items-center justify-center">
                                <h4 className='text-base text-white text-center font-bold'>Roadside assistance</h4>
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
                            <h5 className="text-5xl font-bold text-white  text-shadow-lg leading-tight mb-4">Unmatched Benefits for your Vehicle Journey</h5>
                            <p className='text-lg text-shadow-lg text-white leading-8'>Experience unparalleled advantages when you secure your vehicle with our expert guidance and top-tier solutions.</p>
                        </div>

                        <div className="relative w-175 h-125 mx-auto">
                            <EllipseItem text="No claim bonus up to 50%" angle={270} radiusX={400} radiusY={280} />
                            <EllipseItem text="24/7 customer support" angle={330} radiusX={400} radiusY={280} />

                            <EllipseItem text="Quick claim settlement" angle={30} radiusX={400} radiusY={280} />
                            <EllipseItem text="Wide network of garages" angle={90} radiusX={400} radiusY={280} />

                            <EllipseItem text="Online policy management" angle={210} radiusX={400} radiusY={280} />
                            <EllipseItem text="Add-on covers available" angle={150} radiusX={400} radiusY={280} />
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="max-w-340 mx-auto py-20">
                    <div className='mb-4'>
                        <h5 className="text-5xl font-bold text-blue-950 text-center leading-tight mb-4">What&apos;s Covered</h5>
                        <p className='text-lg text-gray-700 text-center mb-5'>Comprehensive coverage that protects your vehicle in various scenarios</p>
                    </div>
                    <div className='flex w-full gap-4'>
                        <div className='rounded-4xl w-[20%] flex flex-col items-center justify-center gap-3 p-4 h-30 bg-linear-to-br from-[#e1802610] from-30% to-[#1185b733] to-90%'>
                            <div className='h-10'><IconShieldCheck color='#E18126' className='w-8 h-8'/></div>
                            <div>
                                <p className='text-lg text-center font-bold text-blue-950'>Own damage<br/>coverage</p>
                            </div>
                        </div>
                        <div className='rounded-4xl w-[20%] flex flex-col items-center justify-center gap-3 p-4 h-30 bg-linear-to-br from-[#e1802610] from-30% to-[#1185b733] to-90%'>
                            <div className='h-10'><IconShieldCheck color='#E18126' className='w-8 h-8'/></div>
                            <div>
                                <p className='text-lg text-center font-bold text-blue-950'>Third-party property damage</p>
                            </div>
                        </div>
                        <div className='rounded-4xl w-[20%] flex flex-col items-center justify-center gap-3 p-4 h-30 bg-linear-to-br from-[#e1802610] from-30% to-[#1185b733] to-90%'>
                            <div className='h-10'><IconShieldCheck color='#E18126' className='w-8 h-8'/></div>
                            <div>
                                <p className='text-lg text-center font-bold text-blue-950'>Third-party bodily injury</p>
                            </div>
                        </div>
                        <div className='rounded-4xl w-[20%] flex flex-col items-center justify-center gap-3 p-4 h-30 bg-linear-to-br from-[#e1802610] from-30% to-[#1185b733] to-90%'>
                            <div className='h-10'><IconShieldCheck color='#E18126' className='w-8 h-8'/></div>
                            <div>
                                <p className='text-lg text-center font-bold text-blue-950'>Personal accident<br/>cover</p>
                            </div>
                        </div>
                        <div className='rounded-4xl w-[20%] flex flex-col items-center justify-center gap-3 p-4 h-30 bg-linear-to-br from-[#e1802610] from-30% to-[#1185b733] to-90%'>
                            <div className='h-10'><IconShieldCheck color='#E18126' className='w-8 h-8'/></div>
                            <div>
                                <p className='text-lg text-center font-bold text-blue-950'>Theft <br/>protection</p>
                            </div>
                        </div>
                        <div className='rounded-4xl w-[20%] flex flex-col items-center justify-center gap-3 p-4 h-30 bg-linear-to-br from-[#e1802610] from-30% to-[#1185b733] to-90%'>
                            <div className='h-10'><IconShieldCheck color='#E18126' className='w-8 h-8'/></div>
                            <div>
                                <p className='text-lg text-center font-bold text-blue-950'>Natural calamity coverage</p>
                            </div>
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

export default CarInsurance
