"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import logo from "../../public/assets/insurath.png";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {IconCaretDownFilled} from "@tabler/icons-react";

interface NavChildItem {
  name: string;
  link: string;
}

interface NavItem {
  name: string;
  link?: string;          
  children?: NavChildItem[];
}


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn(`hidden lg:block fixed inset-x-0 top-5 z-60 w-full border-2 transition-all duration-300 ease-out ${visible ? "bg-white/80 border-white backdrop-blur-md shadow-lg" : "border-transparent"} rounded-full mx-auto max-w-340`, className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children }: NavBodyProps) => {
  return (
    <div className="relative flex-row items-center justify-between self-start px-4 py-2 lg:flex">
      {children}
    </div>
  );
};

export const NavItems = ({ items }: { items: NavItem[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  return (
    <div className="absolute inset-0 hidden lg:flex items-center justify-center gap-8">
      {items.map((item, idx) => (
        <div
          key={item.name}
          className="relative"
          onMouseEnter={() => setOpen(idx)}
          onMouseLeave={() => setOpen(null)}
        >
          {item.link ? (
            <div ref={ref}>
              <Link
                href={item.link}
                className={`px-4 py-2 text-lg ${visible ? "text-blue-950 hover:text-[#E18126]":"text-white hover:text-[#E18126]"} font-bold cursor-pointer`}
              >
                <div className="group relative cursor-pointer text-left text-lg py-3 flex items-center justify-between">
                  <span>{item.name}</span>

                  <span className="absolute left-0 bottom-0 h-0.5 w-full" />

                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#E18126] transition-all duration-300 ease-out group-hover:w-full" />
                </div>
              </Link>
            </div>
          ) : (
            <span className={`px-4 py-2 text-lg ${visible ? "text-blue-950 hover:text-[#E18126]":"text-white hover:text-[#E18126]"} font-bold cursor-pointer flex items-center gap-1`}>
              <div className="group relative cursor-pointer text-left text-lg py-3 flex gap-2 items-center">
                  <span>{item.name}</span>
                  <div>
                  <IconCaretDownFilled className="w-4 h-4" />
                  </div>
                  <span className="absolute left-0 bottom-0 h-0.5 w-full" />
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#E18126] transition-all duration-300 ease-out group-hover:w-full" />
              </div>
            </span>
          )}
          {/* Dropdown */}
          <AnimatePresence>
            {item.children && open === idx && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-1/2 top-full mt-2 w-60 -translate-x-1/2 rounded-xl bg-white shadow-xl border"
              >
                {item.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.link}
                    className="block px-4 py-3 text-lg hover:bg-neutral-100 hover:text-[#E18126] font-bold"
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
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  return (
    <motion.div
      ref={ref}
      className={cn(`z-50 flex w-full max-w-3xl mx-auto top-5 flex-col items-center justify-between px-0 py-2 fixed lg:hidden ${visible ? "bg-white/80 border-white backdrop-blur-md shadow-lg" : "border-transparent"} rounded-full
      `, className )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-24 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <div className="px-6">
      <IconX className="text-[#E18126]" onClick={onClick} />
    </div>
  ) : (
    <div className="px-6">
      <IconMenu2 className="text-[#E18126]" onClick={onClick} />
    </div>
  );
};

export const NavbarLogo = () => {
  return (
    <Link href="/" className="relative z-20 flex items-center"
    >
      <Image src={logo} alt="Insurath" height={90} />
    </Link>
  );
};