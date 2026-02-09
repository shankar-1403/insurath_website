"use client";

import React, { useState, useEffect } from "react";
import MainNavbar from "@/components/layouts/navbar";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import {IconShieldFilled,IconCash,IconArrowRight,IconCheckbox} from "@tabler/icons-react";
import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import axios from 'axios';
import { LightRays } from "@/components/ui/light-rays";
import CardCarousel from "@/components/ui/carousel";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import Footer from "@/components/layouts/footer";
import { DotPattern } from "@/components/ui/dot-pattern";
import Image from "next/image";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { FocusCards } from "@/components/ui/focus-cards";


const CompaniesCard = ({data}: {data: string}) => {
  return (
    <figure
      className={cn(
        "relative w-64 h-30 overflow-hidden rounded-4xl border p-4 border-blue-950 hover:shadow-lg hover:scale-105 transition-transform duration-300",
      )}
    >
      <div className="flex items-center justify-center h-full">
        <Image src={data} alt={'Image'} width={120} height={120} />
      </div>
    </figure>
  )
}
export default function Home() {
  const [formData, setFormData] = useState({full_name:"", email_id:"", phone_number:"", insurance_type:""});
  const [formDataTwo, setFormDataTwo] = useState({full_name_two:"", email_id_two:"", phone_number_two:"", insurance_type_two:"",message:""})
  type FormErrors = Partial<Record<keyof typeof formData, string>>;
  type FormErrorsTwo = Partial<Record<keyof typeof formDataTwo, string>>;
  const [error, setError] = useState<FormErrors>({})
  const [errorTwo, setErrorTwo] = useState<FormErrorsTwo>({})
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormDataTwo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const validateFormData = ()=>{
    const errors: FormErrors = {};
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

      if(!formData.insurance_type.trim()){
        errors.insurance_type = "Insurance Type is required"
      }
    return errors;
  }

  const validateFormDataTwo = ()=>{
    const errors: FormErrorsTwo = {};
      if(!formDataTwo.full_name_two.trim()){
        errors.full_name_two = "Full Name is required"
      } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formDataTwo.full_name_two)){
        errors.full_name_two = "Enter a valid name";
      }

      if (!formDataTwo.email_id_two.trim()) {
        errors.email_id_two = "Email is required";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDataTwo.email_id_two)
      ) {
        errors.email_id_two = "Enter a valid email address";
      }

      if(!formDataTwo.phone_number_two.trim()){
        errors.phone_number_two = 'Phone Number is required';
      } else if (!/^\d{10,12}$/.test(formDataTwo.phone_number_two)) {
        errors.phone_number_two = "Phone number must be 12 digits";
      }

      if(!formDataTwo.insurance_type_two.trim()){
        errors.insurance_type_two = "Insurance Type is required"
      }

      if(!formDataTwo.message.trim()){
        errors.message = "Message is required"
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
      const payload = {
        full_name: formData.full_name,
        email_id: formData.email_id,
        phone_number: formData.phone_number,
        insurance_type: formData.insurance_type,
        type: 'Home Banner',
      }
      await axios.post("/api/home/first", payload);
      setFormData({full_name:"", email_id:"", phone_number:"", insurance_type:""});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitFormTwo = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateFormDataTwo();
    if (Object.keys(validationErrors).length > 0) {
      setErrorTwo(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        full_name_two: formDataTwo.full_name_two,
        email_id_two: formDataTwo.email_id_two,
        phone_number_two: formDataTwo.phone_number_two,
        insurance_type_two: formDataTwo.insurance_type_two,
        message:formDataTwo.message,
        type: 'Home Footer',
      }
      await axios.post("/api/home/second", payload);
      setFormDataTwo({ full_name_two: "", email_id_two: "", phone_number_two: "", insurance_type_two:"",message:""});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    { name: "Health Insurance", image: "/assets/health.png", description: "Comprehensive health coverage for you and your family with cashless treatment at 10,000+ hospitals nationwide.",rating:"4.8",review:"1250",link:"/" },
    { name: "Life Insurance", image: '/assets/life.png', description: "Secure your family's future with comprehensive life insurance coverage and flexible premium options.",rating:"4.7",review:"980",link:"/" },
    { name: "Car Insurance", image: "/assets/car.png", description: "Complete protection for your car with comprehensive coverage and quick claim settlement.",rating:"4.6",review:"2100",link:"/" },
    { name: "Bike Insurance", image: "/assets/bike.png", description: "Affordable two-wheeler insurance with comprehensive coverage and instant policy delivery.",rating:"4.5",review:"1800",link:"/" },
    { name: "Travel Insurance", image: "/assets/travel.png", description: "Travel worry-free with comprehensive travel insurance covering medical emergencies and trip cancellations.",rating:"4.7",review:"750",link:"/" },
    { name: "Business Insurance", image: "/assets/business.png", description: "Comprehensive business insurance protecting your company assets, employees, and operations.",rating:"4.9",review:"450",link:"/" },
  ];

  const chooseUs = [
    {number:"01",title:"100% Secure & Trusted", description:"Your data is protected with bank-level security and we are licensed by IRDAI."},
    {number:"02",title:"Instant Quotes", description:"Get quotes from 25+ insurance companies in just 2 minutes."},
    {number:"03",title:"Expert Support", description:"Our insurance experts guide you through every step of the process."},
    {number:"04",title:"Best Prices", description:"Compare and save up to 40% on your insurance premiums."},
    {number:"05",title:"Customer First", description:"We prioritize your needs and provide 24/7 customer support."},
    {number:"06",title:"Fast Claims", description:"Quick and hassle-free claim settlement process."},
  ]

  const customers = [
    { name: "Rajesh Kumar", designation:"Software Engineer", rating: 5, description: "I was skeptical about online insurance until I tried Insurath. My wife needed emergency surgery last year, and I was worried about the claim process. But Insurath made it so smooth - they even called me to check if everything was okay. The claim was settled in just 3 days, and I didn't have to run around with documents. Now I've insured my entire family with them." },
    { name: "Priya Sharma", designation:"Business Owner", rating: 5, description: "When I started my textile business 5 years ago, I didn't understand insurance at all. Insurath's team spent 2 hours explaining different policies to me in simple Hindi. They helped me choose the right coverage for my factory and showroom. Last year, when there was a fire in our warehouse, their claim process was so quick that I could restart operations within a week." },
    { name: "Amit Patel", designation:"Marketing Director",rating: 5, description: "I travel 15-20 days a month for work. Before Insurath, I used to buy travel insurance from different companies each time. Now I have an annual policy that covers all my trips. Last month, I had food poisoning in Bangkok and had to be hospitalized. Insurath's 24/7 helpline was amazing - they coordinated everything with the hospital and I didn't pay a single rupee from my pocket." },
    { name: "Sunita Reddy", designation:"Principal", rating: 5, description: "As a teacher, my salary is limited but I wanted to secure my family's future. Insurath helped me find a life insurance policy that costs just ₹2,500 per month but gives me ₹50 lakh coverage. Their agent came to my home on a Sunday to explain everything. My husband was initially against it, but now he's also planning to get insured through them." },
    { name: "Dr. Vikram Singh", designation:"Cardiologist", rating: 5, description: "I've been treating patients for 20 years and I've seen families struggle with medical bills. That's why I always recommend good health insurance. Insurath's health plans are comprehensive and their hospital network is excellent. I've personally used their cashless facility for my own family, and the experience was seamless. The best part is their transparent pricing - no hidden charges." },
    { name: "Meera Joshi", designation:"HR Director", rating: 5, description: "Managing group insurance for 500+ employees was a nightmare before Insurath. We had to deal with multiple agents and different claim processes. Insurath gave us a single platform where employees can check their coverage, download cards, and even file claims online. Our employees love the convenience, and our HR team saves 10 hours every week. The cost savings are significant too." },
    { name: "Arjun Gupta", designation:"CA & Financial Advisor", rating: 5, description: "I've been a CA for 15 years and I've seen many insurance companies. What sets Insurath apart is their honesty. They don't push unnecessary products or hide terms and conditions. I've recommended them to over 50 of my clients, and every single one is happy. Their claim settlement ratio is impressive, and their customer service is available even on weekends. That's rare in this industry." },
    { name: "Kavita Nair", designation:"Homemaker", rating: 5, description: "I never understood insurance until my neighbor told me about Insurath. Their agent explained everything so clearly that even I could understand. I started with a small health insurance for ₹1,200 per month. When my daughter had to be hospitalized for dengue, the entire bill of ₹45,000 was covered. I didn't have to worry about money during such a stressful time. Now I've also taken life insurance for my husband." },
  ] 

  const companies = [{image:"/assets/hdfclife.png"},{image:"/assets/icici.png"}, {image:"/assets/lic.png"}, {image:"/assets/sbilife.png"}, {image:"/assets/tataaig.png"}, {image:"/assets/maxlife.png"},{image:"/assets/kotak.png"},{image:"/assets/future.png"},];

  return (
    <>
      <MainNavbar/>
      <motion.div animate={{ y: [0, 40, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }} className="absolute top-40 left-20 -rotate-20">
        <IconShieldFilled size={100} color="#E18126" opacity={0.1} />
      </motion.div>
      <motion.div animate={{ y: [0, 80, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }} className="absolute top-80 lg:top-120 left-20 rotate-10">
        <IconCash size={100} color="#E18126" opacity={0.1} />
      </motion.div>
      <div className="bg-linear-to-br from-blue-950 via-[#1186B7] to-[#884001] h-screen flex justify-center items-center">
        <div className="px-10 md:px-0 md:max-w-180 lg:max-w-340 mx-auto">
          <div className="flex gap-4 md:gap-2 lg:gap-6">
            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="md:w-[50%] lg:w-[60%]">
              <div className="flex items-center justify-start mb-2">
                <div className="rounded-full border border-black/5 bg-neutral-100">
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 uppercase">
                    <span className="flex gap-1 font-bold text-sm">Protection for All</span>
                  </AnimatedShinyText>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-10">
                <h1 className="text-left text-white text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-lg">Insurance Made<br/><span className="text-[#E18126]">Simple & Affordable</span></h1>
                <p className="text-left text-white text-lg md:text-lg lg:text-2xl text-shadow-lg leading-8">Get expert guidance and find the perfect insurance policies from top companies. <span className="text-[#E18126]">Protect what matters most to you</span> with personalized recommendations and comprehensive coverage.</p>
              </div>
              <div className="flex gap-6 mt-15 md:mt-15 lg:mt-20">
                <div>
                  <InteractiveHoverButton>Learn More</InteractiveHoverButton>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="md:w-[50%] w-[40%]">
              <form onSubmit={submitForm} className="bg-white shadow-lg rounded-4xl p-6">
                <h2 className="text-xl md:text-xl lg:text-3xl text-blue-950 font-bold mb-4">Get Expert Consultation</h2>
                  <div className="flex flex-col gap-4">
                    <div>
                      <input type="text" name="full_name" onChange={handleChange} value={formData.full_name} placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                      {error.full_name && <span className="text-sm text-red-500">{error.full_name}</span>}
                    </div>
                    <div>
                      <input type="email" name="email_id" onChange={handleChange} value={formData.email_id} placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                      {error.email_id && <span className="text-sm text-red-500">{error.email_id}</span>}
                    </div>
                    <div>
                      <input type="text" name="phone_number" onChange={handleChange} value={formData.phone_number} placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                      {error.phone_number && <span className="text-sm text-red-500">{error.phone_number}</span>}
                    </div>
                    <div>
                      <select name="insurance_type" onChange={handleChange} value={formData.insurance_type} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                        <option>Select Insurance Type</option>
                        <option value="Life Insurance">Life Insurance</option>             
                        <option value="Health Insurance">Health Insurance</option>
                        <option value="Car Insurance">Car Insurance</option>
                        <option value="Bike Insurance">Bike Insurance</option>
                        <option value="Travel Insurance">Travel Insurance</option>
                        <option value="Business Insurance">Business Insurance</option>
                      </select>
                      {error.insurance_type && <span className="text-sm text-red-500">{error.insurance_type}</span>}
                    </div>
                    <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-bold mt-4 cursor-pointer text-sm md:text-base lg:text-lg">{loading ? 'Submitting...':'Get Expert Consultation'}</button>
                  </div>  
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="py-20">
        <div className="absolute w-full pointer-events-none select-none">
          <img src={'/assets/element.png'} alt="element" className="w-full"/>
        </div>
        <div className="md:max-w-180 lg:max-w-340 mx-auto flex flex-col lg:flex-row justify-center items-center gap-40">
          <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full flex items-center justify-center lg:w-[40%]">
            <div>
              <div className="relative ml-20 lg:ml-0 h-100 lg:h-130 w-100 lg:w-130 overflow-hidden rounded-br-full rounded-tr-full rounded-bl-full">
                <Image src="/assets/aboutus_one.png" alt="about_us_one" priority fill className="object-cover"/>
              </div>
              <div className="absolute rounded-br-full h-40 lg:h-60 w-40 lg:w-60 overflow-hidden rounded-tl-full rounded-bl-full -mt-30 lg:-mt-50">
                <Image src={"/assets/aboutus_two.png"} alt="about_us_two" priority fill className="object-cover"/>
              </div>
              <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} className="absolute bg-white h-auto w-50 lg:w-70 overflow-hidden rounded-tr-4xl rounded-bl-4xl md:-mt-20 lg:-mt-20 ml-50 lg:ml-80 p-2">
                <div className="border-2 border-[#E18126] flex gap-4 rounded-tr-4xl rounded-bl-4xl px-3 lg:px-4 py-4 lg:py-6">
                  <div>
                    <span className="text-[#E18126] text-4xl lg:text-6xl font-bold">15</span>
                  </div>
                  <div>
                    <span className="text-base lg:text-xl text-blue-950 font-bold">Years of Experience</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} className="w-full lg:w-[60%]">
            <span className="uppercase font-bold text-sm text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-4">About Company</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl leading-16 font-bold mb-1 text-[#1185B7]">Insurath - <span className="text-[#E18126]">Suraksha Har Mod Par</span></h2>
            <p className="md:text-lg lg:text-2xl font-bold leading-8 text-blue-950 mb-4">Smart insurance coverage designed for every journey.</p>
            <p className="text-sm md:text-base lg:text-lg leading-8 text-gray-700 mb-4">At Insurath, we help individuals, families, and businesses make confident insurance decisions. By working with trusted insurance providers, we guide our customers toward coverage that suits their needs, responsibilities, and life stages.</p>
            <p className="text-sm md:text-base lg:text-lg leading-8 text-gray-700 mb-4">Our focus is on clarity, transparency, and long-term protection. From understanding policy options to ongoing support, we ensure a smooth and reliable insurance experience so you stay protected at every turn.</p>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex gap-3 items-center">
                <div>
                  <IconCheckbox size={20} color="#E18126"/>
                </div>
                <div>
                  <p className="text-sm md:text-base lg:text-lg text-blue-950 font-bold">Protection for every stage of life</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div>
                  <IconCheckbox size={20} color="#E18126"/>
                </div>
                <div>
                  <p className="text-sm md:text-base lg:text-lg text-blue-950 font-bold">Wide range of trusted insurance partners</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div>
                  <IconCheckbox size={20} color="#E18126"/>
                </div>
                <div>
                  <p className="text-sm md:text-base lg:text-lg text-blue-950 font-bold">Experienced & qualified advisors</p>
                </div>
              </div>
            </div>
            <button className="bg-[#E18126] text-white px-6 py-2 rounded-4xl font-bold mt-4 hover:cursor-pointer text-sm md:text-base lg:text-lg">Discover More</button>
          </motion.div>
        </div>
      </div>
      <div className="bg-white h-auto py-20">
        <div className="md:max-w-180 lg:max-w-340 mx-auto flex justify-center items-center flex-col">
          <div className="md:max-w-2xl lg:max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-center">
              <span className="uppercase font-bold text-sm text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-0.5 after:bg-[#E18126] after:ml-2 after:align-middle after:rounded-xl mb-4">Comprehensive Coverage</span>
            </div>
            <div>
              <div className="flex flex-col md:gap-2 lg:gap-6 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-center text-blue-950 text-2xl md:text-4xl lg:text-5xl font-bold mb-4 flex justify-center gap-3">Choose Your{" "}<PointerHighlight pointerClassName="text-[#E18126]">Insurance Protection</PointerHighlight></h3>
                </div>
                <div>
                  <p className="text-center text-sm md:text-base lg:text-lg leading-8 text-gray-700">We offer a comprehensive range of insurance products to protect what matters most to you. Compare and choose the best plan for your needs.</p>
                </div>
              </div>
            </div>
          </div>
          <FocusCards cards={services} />
        </div>
      </div>
      <div className="h-auto">
        <div className="max-w-340 relative mx-auto py-20">
          <div className="flex flex-col gap-6 mb-8 max-w-xl mx-auto">
            <h4 className="text-5xl text-blue-950 font-bold text-center">Why Choose Insurath?</h4>
            <p className="text-lg leading-8 text-center">We are committed to delivering a smooth and reliable insurance experience through exceptional service.</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {chooseUs.map((item) => (
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} key={item.title} className="col-span-1 p-6 transition border-t-3 border-l-3  rounded-br-4xl rounded-tr-4xl rounded-bl-4xl border-[#E18126]">
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <span className="font-bold text-6xl text-[#E18126]">{item.number}</span>
                  </div>
                <div>
                  <p className="text-2xl text-blue-950 font-bold mb-2">{item.title}</p>
                  <p className="text-lg text-gray-700 leading-8">{item.description}</p>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        </div>
        <div className="pb-10">
          <div className="relative p-10 bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% w-full overflow-hidden rounded-4xl max-w-340 mx-auto">
            <div className="flex">
              <div className="w-[70%]">
                <div className="flex flex-col justify-center gap-4">
                  <h5 className="text-5xl text-white font-bold mb-4">Ready to Get Started?</h5>
                  <p className="text-lg text-white">Join thousands of satisfied customers who trust Insurath for their insurance needs.</p>
                </div>
              </div>
              <div className="w-[30%] flex items-center justify-end">
                <div className="group relative w-60 cursor-pointer text-left text-lg text-white hover:text-[#E18126] py-3 flex items-center justify-between">
                  <span>Get Started</span>
                  <IconArrowRight color="#E18126" className="w-5 h-5"/>

                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white" />

                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#E18126] transition-all duration-300 ease-out group-hover:w-full" />
                </div>
              </div>
            </div>
            <LightRays />
          </div>
        </div>
      </div>
      <div className="py-20 bg-white">
        <div className="max-w-340 mx-auto">
          <div className="flex">
            <div className="w-[40%]">
              <div className="flex flex-col justify-center gap-6 mb-6">
                <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-4">Stories of Protection</p>
                <h5 className="text-5xl font-bold text-blue-950 leading-16">What they&apos;re talking about us?</h5>
                <p className="text-lg text-gray-700 leading-8">Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience with Insurath.</p>
              </div>
            </div>
            <div className="w-[60%]">
              <CardCarousel items={customers} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-linear-to-br from-[#1185b7] from-20% via-[#07587b] via-50%  to-blue-950 to-90% py-10">
        <div className="max-w-340 mx-auto">
          <div className="flex gap-6 items-center justify-between">
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <img src={'/assets/happy_customers.png'} alt="Happy Customers" className="h-full"/>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex">
                  <NumberTicker value={50000} className="text-white text-4xl font-bold"/><span className="text-white text-4xl font-bold">+</span>
                </div>
                <p className="text-white text-base">Happy Customers</p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <img src={'/assets/claims_settled.png'} alt="Claims Settled" className="h-full"/>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex">
                  <NumberTicker value={500} className="text-white text-4xl font-bold"/><span className="text-white text-4xl font-bold">+</span>
                </div>
                <p className="text-white text-base">Claims Settled</p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <img src={'/assets/insurance_partners.png'} alt="Insurance Partners" className="h-full"/>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex">
                  <NumberTicker value={25} className="text-white text-4xl font-bold"/><span className="text-white text-4xl font-bold">+</span>
                </div>
                <p className="text-white text-base">Insurance Partners</p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <img src={'/assets/claim_settlement_ratio.png'} alt="Claim Settlement Ratio" className="h-full"/>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex">
                  <NumberTicker value={92} className="text-white text-4xl font-bold"/><span className="text-white text-4xl font-bold">+</span>
                </div>
                <p className="text-white text-base">Claim Settlement Ratio</p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <img src={'/assets/customer_support.png'} alt="Customer Support" className="h-full"/>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex">
                  <NumberTicker value={24} className="text-white text-4xl font-bold"/><span className="text-white text-4xl font-bold">/</span><NumberTicker value={7} className="text-white text-4xl font-bold"/>
                </div>
                <p className="text-white text-base">Customer Support</p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <img src={'/assets/customer_rating.png'} alt="Customer Rating" className="h-full"/>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex">
                  <NumberTicker value={48} className="text-white text-4xl font-bold"/><span className="text-white text-4xl font-bold">+</span>
                </div>
                <p className="text-white text-base">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white relative">
        <div className="absolute w-full z-10 pointer-events-none select-none">
          <img src={'/assets/element_two.png'} alt="element" className="w-full"/>
        </div>
        <div className="py-20 max-w-340 mx-auto">
          <div className="flex flex-col gap-6 justify-center mb-14">
            <div className="flex justify-center">
              <p className="uppercase font-bold text-gray-700 after:content-[''] after:inline-block after:w-6 after:h-1 after:bg-[#E18126] after:ml-5 after:align-middle after:rounded-xl mb-4">Trusted Partners</p>
            </div>
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
              <h5 className="text-5xl font-bold text-blue-950 leading-16 text-center">Trusted by Leading<br/><span className="text-[#E18126]">Insurance Companies</span></h5>
              <p className="text-lg text-gray-700 leading-8 text-center">We partner with India&apos;s most trusted insurance companies to bring you the best coverage options at competitive prices.</p>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:50s]">
              {companies.map((data,index) => (
                <CompaniesCard key={index+1} data={data.image} {...data} />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
          </div>
        </div>
      </div>
      <div className="relative pt-20 pb-40 overflow-hidden">
        {/* content */}
        <div className="relative z-10 flex gap-10 max-w-340 mx-auto">
          <div className="w-1/2">
            <div className="flex flex-col gap-6 mb-8">
              <h5 className="text-5xl leading-18 font-bold text-blue-950">
                Get Expert Insurance <br />
                <span className="text-[#E18126]">Consultation Today</span>
              </h5>
              <p className="text-lg text-blue-950 leading-8">Don&apos;t wait to protect what matters most. <span className="text-[#E18126]">Get personalized guidance</span> from our insurance experts and find the perfect coverage for your needs.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-transparent border border-[#E18126] rounded-4xl p-5">
                <div className="flex">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div className="ms-2">
                    <p className="text-xl text-blue-950 font-bold">Quick Response</p>
                    <p className="text-lg text-blue-950">Get expert consultation within 24 hours</p>
                  </div>
                </div>
              </div>
              <div className="bg-transparent border border-[#E18126] rounded-4xl p-5">
                <div className="flex">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div className="ms-2">
                    <p className="text-xl text-blue-950 font-bold">100% Secure & Free</p>
                    <p className="text-lg text-blue-950">Your data is protected and our consultation is completely free</p>
                  </div>
                </div>
              </div>
              <div className="bg-transparent border border-[#E18126] rounded-4xl p-5">
                <div className="flex">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div className="ms-2">
                    <p className="text-xl text-blue-950 font-bold">Expert Guidance</p>
                    <p className="text-lg text-blue-950">Get personalized recommendations from our insurance experts</p>
                  </div>
                </div>
              </div>
              <div className="bg-transparent border border-[#E18126] rounded-4xl p-5">
                <div className="flex">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div className="ms-2">
                    <p className="text-xl text-blue-950 font-bold">24/7 Support</p>
                    <p className="text-lg text-blue-950">Round-the-clock assistance for all your insurance needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <form onSubmit={submitFormTwo} className="bg-white shadow-lg rounded-4xl p-6">
              <h5 className="text-3xl font-bold mb-4 text-blue-950">Get Expert Consultation</h5>
              <p className="text-lg text-blue-950 mb-8">Fill in your details and we&apos;ll get back to you within 24 hours with personalized insurance guidance.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <input type="text" name="full_name_two" onChange={handleChange} value={formDataTwo.full_name_two} placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                  {errorTwo.full_name_two && <span className="text-sm text-red-500">{errorTwo.full_name_two}</span>}
                </div>
                <div>
                  <input type="email" name="email_id_two" onChange={handleChange} value={formDataTwo.email_id_two} placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                  {errorTwo.email_id_two && <span className="text-sm text-red-500">{errorTwo.email_id_two}</span>}
                </div>
                <div>
                  <input type="text" name="phone_number_two" onChange={handleChange} value={formDataTwo.phone_number_two} placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                  {errorTwo.phone_number_two && <span className="text-sm text-red-500">{errorTwo.phone_number_two}</span>}
                </div>
                <div>
                  <select name="insurance_type_two" onChange={handleChange} value={formDataTwo.insurance_type_two} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                    <option>Select Insurance Type</option>
                    <option value="Life Insurance">Life Insurance</option>             
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Car Insurance">Car Insurance</option>
                    <option value="Bike Insurance">Bike Insurance</option>
                    <option value="Travel Insurance">Travel Insurance</option>
                    <option value="Business Insurance">Business Insurance</option>
                  </select>
                  {errorTwo.insurance_type_two && <span className="text-sm text-red-500">{errorTwo.insurance_type_two}</span>}
                </div>
                <div>
                  <textarea name="message" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" onChange={handleChange} value={formDataTwo.message} rows={7} placeholder="Message"></textarea>
                  {errorTwo.message && <span className="text-sm text-red-500">{errorTwo.message}</span>}
                </div>
                <button type="submit" className="bg-[#E18126] text-white px-4 py-2 w-full rounded-4xl font-bold mt-4 cursor-pointer">{loading ? 'Submitting...':'Get Expert Consultation'}</button>
              </div>  
            </form>
          </div>
        </div>

        <DotPattern
          width={16}
          height={16}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "pointer-events-none absolute inset-0 z-0",
            "mask-[linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />
      </div>
      <Footer/>
    </>
  );
}
