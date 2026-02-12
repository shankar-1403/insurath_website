"use client";

import React, { useState } from "react";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle} from "@/components/ui/resizable-navbar";
import Link from "next/link";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Products", 
    children: [
      { name: "Health Insurance", link: "/products/health-insurance" },
      { name: "Life Insurance", link: "/products/life-insurance" },
      { name: "Car Insurance", link: "/products/car-insurance" },
      { name: "Bike Insurance", link: "/products/bike-insurance" },
      { name: "Travel Insurance", link: "/products/travel-insurance" },
      { name: "Business Insurance", link: "/products/business-insurance" },
    ]
   },
  { name: "About Us", link: "/about-us" },
];

export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar>
        {/* Desktop Navbar */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center z-60">
            <Link href="/contact-us">
              <button
                  className="relative overflow-hidden px-6 py-3 bg-blue-950 text-blue-950 rounded-full group transition-colors duration-300 cursor-pointer flex items-center gap-3"
                >
                  {/* Animated background */}
                  <span
                    className="absolute inset-0 bg-[#E18126] 
                              scale-x-0 origin-left 
                              transition-transform duration-300 
                              group-hover:scale-x-100"
                  ></span>
                  {/* Text */}
                  <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
                    Contact Us
                  </span>
                </button>
            </Link>
          </div>
        </NavBody>
      </Navbar>
      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="text-neutral-700"
            >
              {item.name}
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </>
  );
}
