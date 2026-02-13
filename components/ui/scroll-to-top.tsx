"use client";

import { useState, useEffect } from "react";
import { IconArrowUp,IconBrandWhatsapp } from "@tabler/icons-react"; 

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling animation
    });
  };

  // Function to toggle visibility based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Show button after scrolling 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 lg:bottom-4 right-1 lg:right-4 z-30">
      <div className={`fixed ${isVisible ? 'bottom-20 lg:bottom-24' : 'bottom-4 lg:bottom-4'} transition-all duration-400 ease-in-out right-1 lg:right-4 z-100`}>
          <button className="p-2 lg:p-3 bg-green-500 text-white rounded-full cursor-pointer flex items-center">
              <IconBrandWhatsapp className="w-7 h-7 lg:w-8 lg:h-8" />
          </button>
      </div>
      {isVisible && (
        <button onClick={scrollToTop} className="p-2 lg:p-3 rounded-full bg-[#1186B7] text-white shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-600 ease-in transform hover:scale-105" aria-label="Scroll to top">
        <IconArrowUp className="w-7 h-7 lg:w-8 lg:h-8"/>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
