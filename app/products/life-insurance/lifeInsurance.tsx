'use client';

import React,{useState, useEffect,useRef, FC} from 'react';
import {motion} from 'motion/react';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { IconUserFilled,IconCheckbox,IconChecks,IconMenu3,IconShieldCheck,IconCommand } from '@tabler/icons-react';
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

function LifeInsurance() {
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

            if (!get("gender")) newErrors.gender = "Gender is required";
            if (!get("age")) newErrors.age = "Age is required";
            if (!get("city")) newErrors.city = "City is required";
        }

        if (step === 2) {
            if (!get("family_size")) newErrors.family_size = "Family size is required";
            if (!get("income_range")) newErrors.income_range = "Income Range is required";
            if (!get("exisitng_life_insurance")) newErrors.exisitng_life_insurance = "Existing Life Insurance is required";
            if (!get("health_condition")) newErrors.health_condition = "Health Condition is required";
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
            const storedId = localStorage.getItem("life_id");

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
                    response = await axios.post("/api/life", firstForm);
                    localStorage.setItem("life_id", response.data.id);
                    showSnackbar(response.data.message, "success");

                }
                // UPDATE
                else {
                    response = await axios.patch("/api/life", {
                    id: storedId,
                    ...firstForm,
                    });
                }

                localStorage.setItem("step_one_life", JSON.stringify(firstForm));
                setError({});
                setStep(2);
                return;
            }

            // -------- STEP 2 --------
            if (step === 2 && storedId) {
                const secondForm = {
                    family_size: get("family_size"),
                    income_range: get("income_range"),
                    exisitng_life_insurance: get("exisitng_life_insurance"),
                    health_condition: get("health_condition"),
                    desired_coverage_amount: get("desired_coverage_amount"),
                };

                const response = await axios.patch("/api/life", {
                    id: storedId,
                    ...secondForm,
                });
                showSnackbar(response.data.message, "success");
                // reset everything
                localStorage.removeItem("life_id");
                localStorage.removeItem("step_one_life");

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
        const step1Data = localStorage.getItem("step_one_life");

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
            question: "What is life insurance and why do I need it?",
            answer: "Life insurance is a contract between you and an insurance company where you pay regular premiums in exchange for a death benefit that will be paid to your beneficiaries upon your death. It provides financial security for your loved ones and helps cover expenses like mortgage payments, education costs, and daily living expenses."
        },
        {
            question: "What types of life insurance are available?",
            answer: "There are several types of life insurance including term life (pure protection for a specific period), whole life (permanent coverage with cash value), endowment plans (savings + protection), and unit-linked insurance plans (ULIPs) that combine insurance with investment."
        },
        {
            question: "How much life insurance coverage do I need?",
            answer: "A general rule of thumb is to have coverage equal to 10-15 times your annual income. However, the exact amount depends on your financial obligations, debts, future expenses, and your family's needs. Our experts can help you calculate the right coverage amount."
        },
        {
            question: "What factors affect life insurance premiums?",
            answer: "Premiums are based on factors like age, gender, health status, occupation, lifestyle habits (smoking, alcohol), family medical history, coverage amount, policy term, and type of policy. Younger and healthier individuals typically pay lower premiums."
        },
        {
            question: "Can I get life insurance if I have pre-existing health conditions?",
            answer: "Yes, you can still get life insurance with pre-existing conditions, but you may pay higher premiums or have exclusions. Some conditions may require medical underwriting, while others might be covered with additional riders."
        },
        {
            question: "What happens if I miss premium payments?",
            answer: "Most policies have a grace period (usually 30 days) to pay overdue premiums. If you miss payments beyond the grace period, your policy may lapse. Some policies offer automatic premium loan or reduced paid-up options to prevent complete loss of coverage."
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
                                <span className="flex gap-1 font-bold text-sm md:text-sm lg:text-base">Life Protection</span>
                            </AnimatedShinyText>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-10">
                            <div className='flex flex-col items-start justify-center gap-10'>
                                <h1 className="text-left text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Protect Your <span className="text-[#E18126]">Family&apos;s Future</span></h1>
                                <p className="text-left text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Secure your family&apos;s future with <span className="text-[#E18126]">comprehensive life insurance coverage</span> and expert guidance.</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>High Sum Assured</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Family Protection</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Tax Benefits</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </motion.div>
                        <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[60%]">
                        <form ref={formRef} onSubmit={submitForm} className="bg-white shadow-lg rounded-4xl p-6 max-w-xl mx-auto">
                            <h2 className="text-xl md:text-xl lg:text-3xl font-bold mb-4 text-center text-blue-950">Get Your Life Insurance Quote</h2>
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
                                            <IconCheckbox className='w-6 h-6 text-white'/>
                                        </div>
                                        <span className="text-sm sm:text-base font-bold text-center">Insurance Needs</span>
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
                                    <div className='col-span-1'>
                                        <input type="number" name="age" placeholder="Age"  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.age && <span className="text-sm text-red-500">{error.age}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="gender" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled selected hidden>Select gender</option>
                                            <option value="Male">Male</option>             
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {error.gender && <span className="text-sm text-red-500">{error.gender}</span>}
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
                                        <select name="family_size" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled selected hidden>Select family size</option>
                                            <option value="Individual">Individual</option>             
                                            <option value="Couple">Couple</option>
                                            <option value="Family (3 members)">Family (3 members)</option>
                                            <option value="Family (4 members)">Family (4 members)</option>
                                            <option value="Family (5+ members)">Family (5+ members)</option>
                                        </select>
                                        {error.family_size && <span className="text-sm text-red-500">{error.family_size}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="income_range" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled selected hidden>Select income range</option>
                                            <option value="₹2-5 Lakhs">₹2-5 Lakhs</option>             
                                            <option value="₹5-10 Lakhs">₹5-10 Lakhs</option>
                                            <option value="₹10-25 Lakhs">₹10-25 Lakhs</option>    
                                            <option value="₹25-50 Lakhs">₹25-50 Lakhs</option>    
                                            <option value="₹50+ Lakhs">₹50+ Lakhs</option>
                                        </select>
                                        {error.income_range && <span className="text-sm text-red-500">{error.income_range}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="exisitng_life_insurance" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled selected hidden>Select existing life insurance</option>
                                            <option value="No existing insurance">No existing insurance</option>             
                                            <option value="Have existing insurance">Have existing insurance</option>             
                                            <option value="Previous insurance expired">Previous insurance expired</option>             
                                        </select>
                                        {error.exisitng_life_insurance && <span className="text-sm text-red-500">{error.exisitng_life_insurance}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="health_condition" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled selected hidden>Select health condition</option>
                                            <option value="No health condition">No health condition</option>             
                                            <option value="Diabetes">Diabetes</option>             
                                            <option value="Hypertension">Hypertension</option>             
                                            <option value="Heart conditions">Heart conditions</option>             
                                            <option value="Other conditions">Other conditions</option>      
                                        </select>
                                        {error.health_condition && <span className="text-sm text-red-500">{error.health_condition}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="desired_coverage_amount" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option value="" disabled selected hidden>Select desired coverage amount</option>
                                            <option value="₹10-25 Lakhs">₹10-25 Lakhs</option>    
                                            <option value="₹25-50 Lakhs">₹25-50 Lakhs</option>    
                                            <option value="₹50-100 Lakhs">₹50-100 Lakhs</option>             
                                            <option value="₹50-100 Lakhs">₹50-100 Lakhs</option>             
                                            <option value="₹100-500 Lakhs">₹100-500 Lakhs</option>             
                                            <option value="₹500+ Lakhs">₹500+ Lakhs</option>             
                                        </select>
                                        {error.desired_coverage_amount && <span className="text-sm text-red-500">{error.desired_coverage_amount}</span>}
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
            <div className="absolute w-full">
                <img src="/assets/element_three.png" alt="element" className='w-full h-full' />
            </div>
            <div className="py-20">
                <div className="max-w-340 mx-auto flex justify-center items-center gap-40">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[70%]">
                        <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-4">Family Protection</p>
                        <h2 className="text-5xl leading-16 font-bold mb-6 text-blue-950">Secure Your Family&apos;s, <PointerHighlight pointerClassName="text-[#E18126]" containerClassName="text-[#E18126]">Financial Future</PointerHighlight></h2>
                        <p className="text-lg leading-8 text-gray-700 mb-8">Life insurance provides financial security and peace of mind, ensuring your loved ones are protected even in your absence.</p>
                        <div className="flex gap-6 mb-6">
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconShieldCheck className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Financial Security</p>
                                    <p className='text-sm text-gray-700'>Ensure your family&apos;s financial stability with comprehensive life insurance coverage that protects their future.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconMenu3 className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Flexible Coverage Options</p>
                                    <p className='text-sm text-gray-700'>Choose from various term lengths and coverage amounts that adapt to your changing life circumstances.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconCommand className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Peace of Mind</p>
                                    <p className='text-sm text-gray-700'>Rest easy knowing your family is financially protected with our comprehensive life insurance solutions.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[30%]">
                        <div>
                            <div className="relative h-100 w-100 overflow-hidden rounded-4xl">
                                <Image src="/assets/life_about.png" alt="about_us_one" priority fill className="object-cover"/>
                            </div>
                            <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} className="absolute bg-white h-auto flex flex-col items-center w-30 overflow-hidden rounded-4xl px-4 py-4 -mt-6">
                                <p className="text-xl text-[#1185b7] font-bold text-shadow-sm">500+</p>
                                <p className='text-base text-gray-500'>Families</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10 px-10 rounded-4xl max-w-340 mx-auto overflow-hidden'>
                <div className='max-w-2xl mx-auto mb-5'>
                    <p className="uppercase font-bold text-sm text-white after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-4 text-center">Premium Features</p>
                    <h3 className="text-5xl leading-16 font-bold mb-6 text-white text-center text-shadow-lg">Everything You Need for<br/><span className='text-[#E18126]'>Complete Life Protection</span></h3>
                    <p className='text-lg leading-8 text-center  text-shadow-lg text-white'>Our comprehensive life insurance plans come with premium features designed to give you complete peace of mind.</p>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                <h4 className='text-base text-white text-center font-bold'>High sum <br/>assured</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                <h4 className='text-base text-white text-center font-bold'>Flexible premium payment options</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                <h4 className='text-base text-white text-center font-bold'>Term and whole life options</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                <h4 className='text-base text-white text-center font-bold'>Accidental death benefit</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                <h4 className='text-base text-white text-center font-bold'>Critical illness  <br/>rider</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-transparent rounded-tr-4xl rounded-bl-4xl p-1 border-x border-t-2 border-b-2">
                            <div className="border-2 border-[#E18126] px-3 py-4 rounded-tr-3xl rounded-bl-3xl">
                                <h4 className='text-base text-white text-center font-bold'>Waiver of premium option</h4>
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
                            <h5 className="text-5xl font-bold text-white  text-shadow-lg leading-tight mb-4">Unmatched Benefits for your Life Journey</h5>
                            <p className='text-lg text-shadow-lg text-white leading-8'>Experience unparalleled advantages when you secure your family&apos;s future with our expert guidance and top-tier solutions.</p>
                        </div>

                        <div className="relative w-175 h-125 mx-auto">
                            <EllipseItem text="Tax benefits under Section 80C" angle={270} radiusX={400} radiusY={280} />
                            <EllipseItem text="Maturity benefits" angle={330} radiusX={400} radiusY={280} />

                            <EllipseItem text="Death benefit to nominees" angle={30} radiusX={400} radiusY={280} />
                            <EllipseItem text="Loan against policy" angle={90} radiusX={400} radiusY={280} />

                            <EllipseItem text="Surrender value" angle={210} radiusX={400} radiusY={280} />
                            <EllipseItem text="Bonus additions" angle={150} radiusX={400} radiusY={280} />
                        </div>

                    </div>
                </div>
            </div>
            <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10'>
                <div className="max-w-180 mx-auto">
                    <h5 className="text-5xl font-bold text-white text-center leading-16 text-shadow-lg mb-4">Need More Information?</h5>
                    <p className="text-lg text-center leading-8 text-white text-shadow-lg mb-6">Our life insurance experts are here to help you choose the right coverage for your family&apos;s needs.</p>
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
                                    <p className="text-lg text-left leading-8 text-white">Find quick answers to common life insurance questions</p>
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

export default LifeInsurance
