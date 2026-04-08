"use client";

import React, { useState, useRef } from "react";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { IconCaretDownFilled, IconShield } from "@tabler/icons-react";

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
  { name: "Make A Claim", link: "/" },
  { name: "Pos Corner", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "Contact Us", link: "/contact-us" },
];

const mobNavItems = [
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
  { name: "Make A Claim", link: "/" },
  { name: "Pos Corner", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "Contact Us", link: "/contact-us" },
];

const items = [
  {
    name: "Login",
    children: [
      { name: "Admin Login", link: "/" },
      { name: "Customer Login", link: "/" },
      { name: "Employee Login", link: "/" },
      { name: "HR Login", link: "/" },
      { name: "POS Login", link: "/" },
    ],
  },
];

export default function MainNavbar() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  return (
    <>
      <div ref={ref}>
        <Navbar>
          {/* Desktop Navbar */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-6 z-50">
              <div>
                {items.map((item,idx) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setOpen(idx)}
                    onMouseLeave={() => setOpen(null)}
                  >
                    <div
                      className={`px-4 py-2 text-lg font-bold cursor-pointer flex items-center gap-2 ${
                        visible
                          ? "text-blue-950 hover:text-[#E18126]"
                          : "text-white hover:text-[#E18126]"
                      }`}
                    >
                      <span className="group relative flex items-center gap-2">
                        {item.name}
                        <IconCaretDownFilled className="w-4 h-4" />

                        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#E18126] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </div>

                    <AnimatePresence>
                      {item.children && open === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1 top-full mt-2 w-60 -translate-x-1/2 rounded-xl bg-white shadow-xl border overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.link}
                              className="block px-4 py-3 text-lg hover:bg-neutral-100 hover:text-[#E18126] text-blue-950 font-bold"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </NavBody>
        </Navbar>
      </div>
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
          {mobNavItems.map((item) => {
            if (item.children) {
              return (
                <>
                  <button onClick={() => setProductsOpen(!productsOpen)} className="text-blue-950 font-bold text-left flex justify-between items-center w-full">{item.name}<IconCaretDownFilled className="w-4 h-4" color="#162556"/></button>
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
                          className="text-blue-950 text-base font-bold flex gap-2 items-center"
                        ><IconShield className="w-4 h-4" color="#E18126"/>{child.name}
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
