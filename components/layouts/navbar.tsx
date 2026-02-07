"use client";

import React, { useState } from "react";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import {IconPhone} from "@tabler/icons-react";

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
  { name: "FAQs", link: "/faqs" },
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
          <div className="flex items-center gap-2 z-60">
            <Link href="/contact">
              <button className="px-4 py-4 bg-blue-950 text-white rounded-full cursor-pointer flex items-center gap-1">
                <IconPhone className="w-6 h-6" /> Contact
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
