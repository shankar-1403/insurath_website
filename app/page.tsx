"use client"; 

import MainNavbar from "@/components/layouts/navbar";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import {IconShieldFilled,IconCoins,IconCash,IconArrowRight} from "@tabler/icons-react";
import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import Link from "next/link";
import { LightRays } from "@/components/ui/light-rays";
import CardCarousel from "@/components/ui/carousel";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import Footer from "@/components/layouts/footer";
import { DotPattern } from "@/components/ui/dot-pattern";
import customer from "@/public/assets/customers.png";
import claims from "@/public/assets/claims.png";
import choose from "@/public/assets/why_choose.png";
import partners from "@/public/assets/partners.png";
import settlement from "@/public/assets/settlement_ratios.png";
import customer_support from "@/public/assets/customer_support.png";
import customer_rating from "@/public/assets/customer_rating.png";
import health_insurance from "@/public/assets/health_insurance.png";
import life_insurance from "@/public/assets/life_insurance.png";
import business_insurance from "@/public/assets/business_insurance.png";
import travel_insurance from "@/public/assets/travel_insurance.png";
import car_insurance from "@/public/assets/car_insurance.png";
import bike_insurance from "@/public/assets/bike_insurance.png";
import Image from "next/image";

const CompaniesCard = ({data}: {data: string}) => {
  return (
    <figure
      className={cn(
        "relative w-64 h-30 cursor-pointer overflow-hidden rounded-4xl border p-4 border-slate-900 hover:shadow-lg hover:scale-105 transition-transform duration-300",
      )}
    >
      <div className="flex items-center justify-center h-full">
        <p className="text-2xl text-slate-900 font-bold text-center">{data}</p>
      </div>
    </figure>
  )
}

export default function Home() {
  const services = [
    { name: "Health Insurance", image: health_insurance, description: "Comprehensive health coverage for you and your family with cashless treatment at 10,000+ hospitals nationwide.",rating:"4.8",review:"1250",link:"/" },
    { name: "Life Insurance", image: life_insurance, description: "Secure your family's future with comprehensive life insurance coverage and flexible premium options.",rating:"4.7",review:"980",link:"/" },
    { name: "Car Insurance", image: car_insurance, description: "Complete protection for your car with comprehensive coverage and quick claim settlement.",rating:"4.6",review:"2100",link:"/" },
    { name: "Bike Insurance", image: bike_insurance, description: "Affordable two-wheeler insurance with comprehensive coverage and instant policy delivery.",rating:"4.5",review:"1800",link:"/" },
    { name: "Travel Insurance", image: travel_insurance, description: "Travel worry-free with comprehensive travel insurance covering medical emergencies and trip cancellations.",rating:"4.7",review:"750",link:"/" },
    { name: "Business Insurance", image: business_insurance, description: "Comprehensive business insurance protecting your company assets, employees, and operations.",rating:"4.9",review:"450",link:"/" },
  ];

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

  const companies = [{title:"SBI Life"},{title:"HDFC Life"},{title:"ICICI Prudential"},{title:"Max Bupa"},{title:"Bajaj Allianz"},{title:"Tata AIG"},{title:"Aditya Birla"},{title:"Reliance General"}];

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
      <motion.div animate={{ y: [0, 40, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }} className="absolute top-150 right-20 rotate-20">
        <IconCoins size={100} color="#E18126" opacity={0.1} />
      </motion.div>
      <motion.div animate={{ y: [0, 80, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }} className="absolute top-120 left-20 rotate-10">
        <IconCash size={100} color="#E18126" opacity={0.1} />
      </motion.div>
      <div className="bg-linear-to-br from-[#0B111F] via-[#025877] to-[#884001] h-auto pt-50 pb-20">
        <div className="max-w-360 mx-auto">
          <div className="flex gap-6">
            <div className="w-[60%]">
              <div className="flex items-center justify-start mb-2">
                <div className="rounded-full border border-black/5 bg-neutral-100">
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 uppercase">
                    <span className="flex gap-1 font-bold">Protection for All</span>
                  </AnimatedShinyText>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-10">
                <h1 className="text-left text-white text-7xl font-bold">Insurance Made<br/><span className="text-[#E18126]">Simple & Affordable</span></h1>
                <p className="text-left text-white text-2xl">Get expert guidance and find the perfect insurance policies from top companies. <span className="text-[#E18126]">Protect what matters most to you</span> with personalized recommendations and comprehensive coverage.</p>
              </div>
              <div className="flex gap-6 mt-20">
                <div>
                  <button className="text-lg bg-[#E18126] text-white px-6 py-3 rounded-4xl font-bold">Learn More</button>
                </div>
              </div>
            </div>
            <div className="w-[40%]">
              <form action="submit" className="bg-white shadow-lg rounded-4xl p-6">
                <h2 className="text-3xl font-bold mb-4">Request a Free Quote</h2>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                  <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                  <input type="number" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                    <option>Select Insurance Type</option>
                    <option value="life">Life Insurance</option>             
                    <option value="health">Health Insurance</option>
                    <option value="auto">Auto Insurance</option>
                    <option value="home">Home Insurance</option>
                    <option value="travel">Travel Insurance</option>
                    <option value="business">Business Insurance</option>
                  </select>
                  <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-bold mt-4">Get Expert Consultation</button>
                </div>  
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto py-10">
        <div className="max-w-360 mx-auto flex justify-center items-center flex-col gap-10">
          <div className="grid grid-cols-6 gap-4">
              <div className="bg-white/80 border border-[#E18126] backdrop-blur-2xl rounded-4xl p-6 text-center overflow-hidden">
                <Image src={customer} priority className="h-65" alt={"customers"}/>
                <NumberTicker value={50} className="text-4xl font-bold text-[#E18126]"/><span className="text-4xl font-bold text-[#E18126]">k+</span>
                <p className="text-base font-bold">Happy Customers</p>
              </div>
            <div className="bg-white/80 border border-[#E18126] backdrop-blur-2xl rounded-4xl p-6 text-center overflow-hidden">
              <Image src={claims} priority className="h-65" alt={"claims"}/>
              <NumberTicker value={500} className="text-4xl font-bold text-[#E18126]"/>
              <p className="text-base font-bold">Claims Settled</p>
            </div>
            <div className="bg-white/80 border border-[#E18126] backdrop-blur-2xl rounded-4xl p-6 text-center overflow-hidden">
              <Image src={partners} priority className="h-65" alt={"partners"}/>
              <NumberTicker value={25} className="text-4xl font-bold text-[#E18126]"/>
              <p className="text-base font-bold">Insurance Partners</p>
            </div>
            <div className="bg-white/80 border border-[#E18126] backdrop-blur-2xl rounded-4xl p-6 text-center overflow-hidden">
              <Image src={settlement} priority className="h-65" alt={"settlement"}/>
              <NumberTicker value={25} className="text-4xl font-bold text-[#E18126]"/><span className="text-4xl font-bold text-[#E18126]">%</span>
              <p className="text-base font-bold">Claim Settlement Ratio</p>
            </div>
            <div className="bg-white/80 border border-[#E18126] backdrop-blur-2xl rounded-4xl p-6 text-center overflow-hidden">
              <Image src={customer_support} priority className="h-65" alt={"customer_support"}/>
              <NumberTicker value={24} className="text-4xl font-bold text-[#E18126]"/><span  className="text-4xl font-bold text-[#E18126]">/</span><NumberTicker value={7} className="text-4xl font-bold text-[#E18126]"/>
              <p className="text-base font-bold">Customer Support</p>
            </div>
            <div className="bg-white/80 border border-[#E18126] backdrop-blur-2xl rounded-4xl p-6 text-center overflow-hidden">
              <Image src={customer_rating} priority className="h-65" alt={"customer_ratings"}/>
              <NumberTicker value={48} className="text-4xl font-bold text-[#E18126]"/>
              <p className="text-base font-bold">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 h-auto py-20">
        <div className="max-w-360 mx-auto flex justify-center items-center flex-col gap-10">
          <div className="flex items-center justify-center">
            <div className="rounded-full border border-black/5 bg-neutral-100">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 uppercase">
                <span className="flex gap-1 font-bold">Comprehensive Coverage</span>
              </AnimatedShinyText>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
              <div>
                <h3 className="text-center text-white text-6xl font-bold mb-4">Choose Your Insurance Protection</h3>
              </div>
              <div>
                <p className="text-center text-white text-2xl">We offer a comprehensive range of insurance products to protect what matters most to you.Compare and choose the best plan for your needs.</p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-10">
              {services.map((service) => (
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1]}} viewport={{ once: true }} key={service.name} className="col-span-2 bg-white/10 backdrop-blur-2xl rounded-4xl p-6 hover:bg-white/20 transition cursor-pointer">
                  <div className="flex items-center justify-center">
                    <Image alt={service.name} src={service.image} priority className="h-60 w-50"/>
                  </div>
                  <div className="h-30">
                    <h4 className="text-2xl font-bold mb-2 text-white">{service.name}</h4>
                    <p className="text-white text-lg">{service.description}</p>
                  </div>
                  <div className="flex items-center mt-8">
                      <svg className="w-5 h-5 text-[#E18126]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
                      <p className="ms-2 text-sm font-bold text-white">{service.rating}</p>
                      <span className="w-1 h-1 mx-1.5 bg-[#E18126] rounded-full"></span>
                      <span className="text-sm font-medium text-white underline hover:no-underline">{service.review} reviews</span>
                  </div>
                  <Link href={service.link}>
                    <button className="bg-[#E18126] text-white px-4 py-2 rounded-full mt-4 hover:bg-[#c06a1a] transition cursor-pointer">Read More</button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto py-20">
        <div className="max-w-360 relative mx-auto py-10">
          <div className="flex flex-col gap-6 mb-8">
            <h4 className="text-6xl font-bold">Why Choose Insurath?</h4>
            <p className="text-2xl">We are committed to providing you with the best insurance experience with our innovative platform and exceptional service.</p>
          </div>
          <div className="flex gap-8 w-full">
            <div className="w-[50%] flex flex-col gap-6">
              <Image src={choose} priority className="h-160 rounded-4xl" alt={"choose insurath"}/>
              <motion.div className="absolute bottom-2 left-3 bg-white/80 border-white backdrop-blur-md p-4 rounded-4xl shadow-lg">
                <p className="text-lg font-bold text-[#E18126]">Join 50,000+ Satisfied Customers</p>
              </motion.div>
            </div>
            <div className="w-[50%]">
              <ul className="flex flex-col gap-4">
                <motion.li initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} viewport={{ once: true }} className="flex items-start gap-2 border border-[#E18126] rounded-4xl p-4">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div>
                    <p className="text-lg font-bold">100% Secure & Trusted</p>
                    <p className="text-lg">Your data is protected with bank-level security and we are licensed by IRDAI.</p>
                  </div>
                </motion.li>
                <motion.li initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} viewport={{ once: true }} className="flex items-start gap-2 border border-[#E18126] rounded-4xl p-4">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div>
                    <p className="text-lg font-bold">Instant Quotes</p>
                    <p className="text-lg">Get quotes from 25+ insurance companies in just 2 minutes.</p>
                  </div>
                </motion.li>
                <motion.li initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} viewport={{ once: true }} className="flex items-start gap-2 border border-[#E18126] rounded-4xl p-4">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div>
                    <p className="text-lg font-bold">Expert Support</p>
                    <p className="text-lg">Our insurance experts guide you through every step of the process.</p>
                  </div>
                </motion.li>
                <motion.li initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} viewport={{ once: true }} className="flex items-start gap-2 border border-[#E18126] rounded-4xl p-4">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div>
                    <p className="text-lg font-bold">Best Prices</p>
                    <p className="text-lg">Compare and save up to 40% on your insurance premiums.</p>
                  </div>
                </motion.li>
                <motion.li initial={{ x: -60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} viewport={{ once: true }} className="flex items-start gap-2 border border-[#E18126] rounded-4xl p-4">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div>
                    <p className="text-lg font-bold">Customer First</p>
                    <p className="text-lg">We prioritize your needs and provide 24/7 customer support.</p>
                  </div>
                </motion.li>
                 <motion.li initial={{ x: -70, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} viewport={{ once: true }} className="flex items-start gap-2 border border-[#E18126] rounded-4xl p-4">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div>
                    <p className="text-lg font-bold">Fast Claims</p>
                    <p className="text-lg">Quick and hassle-free claim settlement process.</p>
                  </div>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-20 px-10 bg-slate-900 w-full overflow-hidden rounded-4xl max-w-360 mx-auto">
        <div className="flex">
          <div className="w-[70%]">
            <div className="flex flex-col justify-center gap-4">
              <h5 className="text-5xl text-white font-bold mb-6">Ready to Get Started?</h5>
              <p className="text-2xl text-white">Join thousands of satisfied customers who trust Insurath for their insurance needs.</p>
            </div>
          </div>
          <div className="w-[30%] flex items-center justify-end">
            <div className="group relative w-60 cursor-pointer text-left text-lg text-white py-3 flex items-center justify-between">
              <span>Get Started</span>
              <IconArrowRight color="#E18126" className="w-5 h-5"/>

              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white" />

              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#E18126] transition-all duration-300 ease-out group-hover:w-full" />
            </div>
          </div>
        </div>
        <LightRays />
      </div>
      <div className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col justify-center gap-6 mb-6">
            <h5 className="text-6xl font-bold text-center">What Our Customers Say</h5>
            <p className="text-2xl text-center">Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience with Insurath.</p>
          </div>
        </div>
        <div className="max-w-360 mx-auto">
          <CardCarousel items={customers} />
        </div>
      </div>
      <div className="py-20 bg-white">
        <div className="max-w-360 mx-auto">
          <div className="flex flex-col gap-6 justify-center mb-14">
            <div className="flex justify-center">
              <div className="rounded-full border border-black/5 bg-slate-900">
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 uppercase">
                  <span className="flex gap-1 font-bold text-white">Trusted Partners</span>
                </AnimatedShinyText>
              </div>
            </div>
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              <h5 className="text-6xl font-bold text-center leading-18">Trusted by Leading<br/><span className="text-[#E18126]">Insurance Companies</span></h5>
              <p className="text-2xl text-center">We partner with India&apos;s most trusted insurance companies to bring you the best coverage options at competitive prices.</p>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {companies.map((data,index) => (
                <CompaniesCard key={index+1} data={data.title} {...data} />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
          </div>
        </div>
      </div>
      <div className="relative py-20 overflow-hidden">
        {/* content */}
        <div className="relative z-10 flex gap-10 max-w-360 mx-auto">
          <div className="w-1/2">
            <div className="flex flex-col gap-6 mb-8">
              <h5 className="text-6xl font-bold">
                Get Expert Insurance <br />
                <span className="text-[#E18126]">Consultation Today</span>
              </h5>
              <p className="text-2xl text-justify">Don&apos;t wait to protect what matters most. <span className="text-[#E18126]">Get personalized guidance</span> from our insurance experts and find the perfect coverage for your needs.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-transparent border border-[#E18126] rounded-4xl p-5">
                <div className="flex">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div className="ms-2">
                    <p className="text-lg font-bold">Quick Response</p>
                    <p className="text-lg">Get expert consultation within 24 hours</p>
                  </div>
                </div>
              </div>
              <div className="bg-transparent border border-[#E18126] rounded-4xl p-5">
                <div className="flex">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div className="ms-2">
                    <p className="text-lg font-bold">100% Secure & Free</p>
                    <p className="text-lg">Your data is protected and our consultation is completely free</p>
                  </div>
                </div>
              </div>
              <div className="bg-transparent border border-[#E18126] rounded-4xl p-5">
                <div className="flex">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div className="ms-2">
                    <p className="text-lg font-bold">Expert Guidance</p>
                    <p className="text-lg">Get personalized recommendations from our insurance experts</p>
                  </div>
                </div>
              </div>
              <div className="bg-transparent border border-[#E18126] rounded-4xl p-5">
                <div className="flex">
                  <IconShieldFilled className="w-6 h-6 text-[#E18126]"/>
                  <div className="ms-2">
                    <p className="text-lg font-bold">24/7 Support</p>
                    <p className="text-lg">Round-the-clock assistance for all your insurance needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <form action="submit" className="bg-white shadow-lg rounded-4xl p-6">
              <h5 className="text-3xl font-bold mb-4">Get Expert Consultation</h5>
              <p className="text-2xl mb-8">Fill in your details and we&apos;ll get back to you within 24 hours with personalized insurance guidance.</p>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                <input type="number" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" />
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126] cursor-pointer">
                  <option>Select Insurance Type</option>
                  <option value="life">Life Insurance</option>             
                  <option value="health">Health Insurance</option>
                  <option value="auto">Auto Insurance</option>
                  <option value="home">Home Insurance</option>
                  <option value="travel">Travel Insurance</option>
                  <option value="business">Business Insurance</option>
                </select>
                <textarea name="message" id="message" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E18126]" rows={7} placeholder="Message"></textarea>
                <button type="submit" className="bg-[#E18126] text-white px-4 py-2 rounded-4xl font-bold mt-4">Get Expert Consultation</button>
              </div>  
            </form>
          </div>
        </div>

        {/* dot pattern background */}
        <DotPattern
          width={18}
          height={18}
          cx={1.5}
          cy={1.5}
          cr={1.5}
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
