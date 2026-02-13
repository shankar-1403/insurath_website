"use client";

import React, { useState } from "react";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { IconCaretDownFilled,IconCaretRightFilled } from "@tabler/icons-react";

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
  const [productsOpen, setProductsOpen] = useState(false);
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
          {navItems.map((item) => {
            if (item.children) {
              return (
                <>
                  <button onClick={() => setProductsOpen(!productsOpen)} className="text-blue-950 font-bold text-left flex justify-between items-center w-full">{item.name}<IconCaretDownFilled className="w-4 h-4" /></button>
                  {productsOpen && (
                    <div className="flex flex-col space-y-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.link}
                          onClick={() => {
                            setIsOpen(false);
                            setProductsOpen(false);
                          }}
                          className="text-blue-950 text-base font-bold ml-4"
                        >{child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="text-blue-950 text-base font-bold"
              >
                {item.name}
              </Link>
            );
          })}
        </MobileNavMenu>
      </MobileNav>
    </>
  );
}
