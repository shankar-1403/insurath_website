'use client';

import React,{useState, useEffect} from 'react';
import {motion} from 'motion/react';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { IconUserFilled,IconCheckbox,IconChecks,IconBuildingHospital,IconStethoscope,IconBabyCarriage } from '@tabler/icons-react';
import Image from 'next/image';
import axios from 'axios';

function HealthInsurance() {

    const [formData, setFormData] = useState({full_name:"", email_id:"", phone_number:"",age:"",city:"",gender:"", coverage_type:"",existing_health_insurance:"",pre_existing_conditions:"",desired_coverage_amount:""});
    const [step, setStep] = useState(1);
    type FormErrors = Partial<Record<keyof typeof formData, string>>;
    const [error, setError] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    }

    const validateFormData = ()=>{
        const errors: FormErrors = {};
        if(step === 1){
            if(!formData.full_name.trim()){
                errors.full_name = "Full Name is required"
            } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.full_name)){
                errors.full_name = "Enter a valid name";
            }

            if (!formData.email_id.trim()) {
                errors.email_id = "Email is required";
            } else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)
            ) {
                errors.email_id = "Enter a valid email address";
            }

            if(!formData.phone_number.trim()){
                errors.phone_number = 'Phone Number is required';
            } else if (!/^\d{10,12}$/.test(formData.phone_number)) {
                errors.phone_number = "Phone number must be 12 digits";
            }

            if(!formData.gender.trim()){
                errors.gender = "Gender is required"
            }

            if(!formData.age.trim()){
                errors.age = "Age is required"
            }

             if(!formData.city.trim()){
                errors.city = "City is required"
            }
        }

        if (step === 2) {
            if (!formData.coverage_type.trim()) {
                errors.coverage_type = "Please specify coverage type";
            }

            if (!formData.existing_health_insurance.trim()) {
                errors.existing_health_insurance =
                "Please specify existing health insurance";
            }

            if (!formData.pre_existing_conditions.trim()) {
                errors.pre_existing_conditions = "Please specify pre-existing conditions";
            }

            if (!formData.desired_coverage_amount.trim()) {
                errors.desired_coverage_amount =
                "Please specify desired coverage amount";
            }
        }
        return errors;
    }

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateFormData();
        if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
        return;
        }

        setLoading(true);

        try {
        const storedId = localStorage.getItem("id");

        // -------- STEP 1 --------
        if (step === 1) {
            const firstForm = {
                full_name: formData.full_name,
                email_id: formData.email_id,
                phone_number: formData.phone_number,
                gender: formData.gender,
                age: formData.age,
                city: formData.city,
            };

            let response;

            // CREATE
            if (!storedId) {
            response = await axios.post("/api/health", firstForm);
            localStorage.setItem("id", response.data.id);
            setError({})
            }
            // UPDATE
            else {
                response = await axios.patch("/api/health", {
                    id: storedId,
                    ...firstForm,
                });
                setError({})
            }

            // persist step 1 data
            localStorage.setItem("step1", JSON.stringify(firstForm));

            // keep form state in sync
            setFormData((prev) => ({
            ...prev,
            ...firstForm,
            }));

            setStep(2);
            return;
        }

        // -------- STEP 2 --------
        if (step === 2 && storedId) {
            await axios.patch("/api/health", {
                id: storedId,
                coverage_type: formData.coverage_type,
                existing_health_insurance: formData.existing_health_insurance,
                pre_existing_conditions: formData.pre_existing_conditions,
                desired_coverage_amount:formData.desired_coverage_amount
            });

            localStorage.clear();
            setStep(1);
            setError({})
            setFormData({ full_name: "", email_id: "", phone_number: "", gender:"", age:"", city:"", coverage_type: "", existing_health_insurance: "",pre_existing_conditions:"",desired_coverage_amount:""});
        }
        } catch (error) {
        console.error("Form submission error:", error);
        } finally {
        setLoading(false);
        }
    };


    useEffect(() => {
        const storedId = localStorage.getItem("id");
        const step1Data = localStorage.getItem("step1");

        if (storedId && step1Data) {
        setFormData((prev) => ({
            ...prev,
            ...JSON.parse(step1Data),
        }));
        setStep(2);
        } else {
        setStep(1);
        }
    }, []);
    
    return (
        <>
            <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] pt-20 md:pt-40 lg:pt-50 pb-20">
                <div className="px-10 md:px-0 md:max-w-2xl lg:max-w-340 mx-auto">
                    <div className="flex gap-4 md:gap-2 lg:gap-6">
                        <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[40%]">
                        <div className="flex items-center justify-start mb-2">
                            <div className="rounded-full border border-black/5 bg-neutral-100">
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 uppercase">
                                <span className="flex gap-1 font-bold text-sm md:text-sm lg:text-base">Health Protection</span>
                            </AnimatedShinyText>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-10">
                            <div className='flex flex-col items-start justify-center gap-10'>
                                <h1 className="text-left text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Protect Your <span className="text-[#E18126]">Health</span></h1>
                                <p className="text-left text-white text-lg md:text-lg lg:text-2xl text-shadow-lg">Expert health insurance guidance with <span className="text-[#E18126]">cashless treatment at 10,000+ hospitals</span> nationwide</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Cashless Treatment</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Pre & Post Hospitalization</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 bg-white/20 py-2 px-4 rounded-4xl'>
                                    <div>
                                        <IconChecks className='h-6 w-6' color='#E18126'/>
                                    </div>
                                    <div>
                                        <span className='text-lg text-white'>Maternity Benefits</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </motion.div>
                        <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[60%]">
                        <form onSubmit={submitForm} className="bg-white shadow-lg rounded-4xl p-6 max-w-xl mx-auto">
                            <h2 className="text-xl md:text-xl lg:text-3xl font-bold mb-4 text-center">Get Your Health Insurance Quote</h2>
                            <p className='text-base text-gray-700 text-center mb-6'>Answer a few quick questions to get personalized recommendations</p>
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
                                    <input type="text" name="full_name" onChange={handleChange} value={formData.full_name} placeholder="Full Name"  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                    {error.full_name && <span className="text-sm text-red-500">{error.full_name}</span>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <input type="email" name="email_id" onChange={handleChange} value={formData.email_id} placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.email_id && <span className="text-sm text-red-500">{error.email_id}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <input type="text" name="phone_number" onChange={handleChange} value={formData.phone_number} placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.phone_number && <span className="text-sm text-red-500">{error.phone_number}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <input type="number" name="age" onChange={handleChange} value={formData.age} placeholder="Age"  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                                        {error.age && <span className="text-sm text-red-500">{error.age}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="gender" onChange={handleChange} value={formData.gender} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option>Select Gender</option>
                                            <option value="Male">Male</option>             
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {error.gender && <span className="text-sm text-red-500">{error.gender}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <input type="text" name="city" onChange={handleChange} value={formData.city} placeholder="City" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
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
                                        <select name="coverage_type" onChange={handleChange} value={formData.coverage_type} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option>Select Coverage Type</option>
                                            <option value="Individual">Individual</option>             
                                            <option value="Floater">Floater</option>
                                        </select>
                                        {error.coverage_type && <span className="text-sm text-red-500">{error.coverage_type}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="existing_health_insurance" onChange={handleChange} value={formData.existing_health_insurance} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option>Select Existing Health Insurance</option>
                                            <option value="No existing insurance">No existing insurance</option>             
                                            <option value="Have existing insurance">Have existing insurance</option>
                                            <option value="Previous insurance expired">Previous insurance expired</option>
                                        </select>
                                        {error.existing_health_insurance && <span className="text-sm text-red-500">{error.existing_health_insurance}</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-1'>
                                        <select name="pre_existing_conditions" onChange={handleChange} value={formData.pre_existing_conditions} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option>Select Pre-existing Conditions</option>
                                            <option value="No pre-existing conditions">No pre-existing conditions</option>             
                                            <option value="Diabetes">Diabetes</option>             
                                            <option value="Hypertension">Hypertension</option>             
                                            <option value="Heart conditions">Heart conditions</option>             
                                            <option value="Other conditions">Other conditions</option>             
                                        </select>
                                        {error.pre_existing_conditions && <span className="text-sm text-red-500">{error.pre_existing_conditions}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <select name="desired_coverage_amount" onChange={handleChange} value={formData.desired_coverage_amount} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                                            <option>Select Desired Coverage Amount</option>
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
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[70%]">
                        <p className="uppercase font-bold text-gray-600 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-4">Why Health Insurance Matters</p>
                        <h2 className="text-5xl leading-16 font-bold mb-6 text-blue-950">Your Health, <span className='text-[#E18126]'>Our Priority</span></h2>
                        <p className="text-lg leading-10 text-gray-700 mb-8">Get the right health coverage that fits your needs and budget, with expert guidance to help you choose the best plan.</p>
                        <div className="flex gap-6 mb-6">
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconBuildingHospital className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Cashless Treatment</p>
                                    <p className='text-sm text-gray-600'>Get treated at 10,000+ network hospitals without paying upfront - we settle directly with the hospital.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconStethoscope className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Pre & Post Hospitalization</p>
                                    <p className='text-sm text-gray-600'>Get treated at 10,000+ network hospitals without paying upfront - we settle directly with the hospital.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-[33.33%] border border-[#E18126] rounded-4xl p-4">
                                <div>
                                    <IconBabyCarriage className='w-10 h-10' color="#E18126"/>
                                </div>
                                <div>
                                    <p className="text-base mb-2 text-blue-950 font-bold">Maternity & Newborn Care</p>
                                    <p className='text-sm text-gray-600'>Get treated at 10,000+ network hospitals without paying upfront - we settle directly with the hospital.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-[30%]">
                        <div>
                            <div className="relative h-100 w-100 overflow-hidden rounded-4xl">
                                <Image src="/assets/aboutus_one.png" alt="about_us_one" priority fill className="object-cover"/>
                            </div>
                            <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} className="absolute bg-white h-auto flex gap-2 w-40 overflow-hidden rounded-4xl px-4 py-4 -mt-6">
                                <div>
                                    <p className="text-xl text-[#1185b7] font-bold">10,000+</p>
                                    <p className='text-base text-gray-500'>Hospitals</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className='bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-20 px-10 rounded-4xl max-w-340 mx-auto'>
                <div className='max-w-3xl mx-auto mb-4'>
                    <p className="uppercase font-bold text-white text-center after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-4">Why Choose Us</p>
                    <h3 className="text-5xl leading-16 font-bold mb-6 text-white text-center">Unmatched Benefits for <br/><span className='text-[#E18126]'>Your Health Journey</span></h3>
                    <p className='text-lg leading-10 text-center text-white'>Experience unparalleled advantages when you secure your health with our expert guidance and top-tier solutions.</p>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <div className='col-span-1'>
                        <div className="bg-white rounded-4xl p-1">
                            <div className='h-20 border-2 border-[#E18126] rounded-4xl p-2'>
                                <h4 className='text-lg text-blue-950 text-center font-bold'>Tax benefits under Section 80D</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-white rounded-4xl p-1">
                            <div className='h-20 border-2 border-[#E18126] rounded-4xl p-2'>
                                <h4 className='text-lg text-blue-950 text-center font-bold'>No claim <br/>bonus</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-white rounded-4xl p-1">
                            <div className='h-20 border-2 border-[#E18126] rounded-4xl p-2'>
                                <h4 className='text-lg text-blue-950 text-center font-bold'>Restoration benefit once per year</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-white rounded-4xl p-1">
                            <div className='h-20 border-2 border-[#E18126] rounded-4xl p-2'>
                                <h4 className='text-lg text-blue-950 text-center font-bold'>Alternative treatment coverage</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-white rounded-4xl p-1">
                            <div className='h-20 border-2 border-[#E18126] rounded-4xl p-2'>
                                <h4 className='text-lg text-blue-950 text-center font-bold'>Mental health coverage</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className="bg-white rounded-4xl p-1">
                            <div className='h-20 border-2 border-[#E18126] rounded-4xl p-2'>
                                <h4 className='text-lg text-blue-950 text-center font-bold'>Critical illness coverage</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HealthInsurance