"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Service = {
  name: string;
  designation: string;
  rating: number;
  description: string;
};

interface Props {
  items: Service[];
}

const GAP = 24;
const AUTO_SCROLL_INTERVAL = 4000;

export default function CardCarousel({ items }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);

  const [cardWidth, setCardWidth] = useState(420);
  const [visibleCards, setVisibleCards] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const calculate = () => {
      const wrapperW = wrapperRef.current!.offsetWidth;

      setVisibleCards(1);
      setCardWidth(wrapperW);
    };

    calculate();

    const observer = new ResizeObserver(calculate);
    observer.observe(wrapperRef.current);

    window.addEventListener("resize", calculate);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculate);
    };
  }, []);

  const totalCardWidth = cardWidth + GAP;

  const clonedItems = [...items, ...items, ...items];
  const middleOffset = items.length * totalCardWidth;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.scrollBehavior = "auto";
    container.scrollLeft = middleOffset;

    requestAnimationFrame(() => {
      container.style.scrollBehavior = "smooth";
    });
  }, [middleOffset]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (container.scrollLeft >= middleOffset * 2) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft = middleOffset;
      requestAnimationFrame(() => {
        container.style.scrollBehavior = "smooth";
      });
    }

    if (container.scrollLeft <= 0) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft = middleOffset;
      requestAnimationFrame(() => {
        container.style.scrollBehavior = "smooth";
      });
    }
  };

  const scrollByOne = (dir: "left" | "right") => {
    containerRef.current?.scrollBy({
      left: dir === "left" ? -totalCardWidth : totalCardWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isHoveringRef.current) {
        scrollByOne("right");
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [totalCardWidth]);

  return (
    <div
      ref={wrapperRef}
      className="relative lg:max-w-180 lg:mx-auto"
      onMouseEnter={() => (isHoveringRef.current = true)}
      onMouseLeave={() => (isHoveringRef.current = false)}
    >

      {/* VIEWPORT */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{
          width:
            visibleCards * cardWidth +
            GAP * (visibleCards - 1),
        }}
      >
        {/* TRACK */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-6 py-4 overflow-hidden snap-x snap-mandatory scroll-smooth"
        >
          {clonedItems.map((item, index) => (
            <div
              key={index}
              className="shrink-0 snap-start rounded-4xl border-2 border-[#E18126] 
                         bg-transparent p-4 md:p-6 shadow-lg 
                         hover:bg-radial-gradient transition 
                         relative group overflow-hidden"
              style={{ width: cardWidth }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--x",
                  `${e.clientX - rect.left}px`
                );
                e.currentTarget.style.setProperty(
                  "--y",
                  `${e.clientY - rect.top}px`
                );
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 
                           transition-opacity duration-300 
                           group-hover:opacity-100"
                style={{
                  background: `radial-gradient(
                    600px circle at var(--x) var(--y),
                    rgba(225,129,38,0.35),
                    transparent 70%
                  )`,
                }}
              />

              <div className="absolute w-25 md:w-30 h-20 md:h-25 bg-[#E18126] right-0 top-0 rounded-bl-[6rem] flex items-center justify-center">
                <img src="/assets/inverted_coma.png" alt="comma" className="w-10 md:h-15 h-10 md:w-15"/>
              </div>

              <div className="mb-2">
                <h5 className="text-lg md:text-xl lg:text-2xl text-blue-950 font-bold">
                  {item.name}
                </h5>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  {item.designation}
                </p>
              </div>

              <div className="flex mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#E18126]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm md:text-base text-gray-600 leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* LEFT BUTTON */}
      <button
        onClick={() => scrollByOne("left")}
        className="absolute left-[38%] md:left-[44%] lg:-left-6 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2 
                   rounded-full bg-blue-950 p-2 lg:p-3 shadow-lg 
                   hover:scale-110 transition z-20 cursor-pointer"
      >
        <ChevronLeft color="white" className="w-5 h-5"/>
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => scrollByOne("right")}
        className="absolute right-[38%] md:right-[44%] lg:-right-6 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/2 
                   rounded-full bg-blue-950 p-2 lg:p-3 shadow-lg 
                   hover:scale-110 transition z-20 cursor-pointer"
      >
        <ChevronRight color="white" className="w-5 h-5"/>
      </button>
    </div>
  );
}
