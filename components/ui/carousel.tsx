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
      const viewportW = window.innerWidth;
      const wrapperW = wrapperRef.current!.offsetWidth;

      if (viewportW < 640) {
        setVisibleCards(1);
        setCardWidth(wrapperW);
      } else if (viewportW < 1024) {
        setVisibleCards(1);
        setCardWidth((wrapperW));
      } else {
        setVisibleCards(1);
        setCardWidth((wrapperW));
      }
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

  /* Clone list for infinite scroll */
  const clonedItems = [...items, ...items, ...items];
  const middleOffset = items.length * totalCardWidth;

  /* Initial positioning */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.scrollBehavior = "auto";
    container.scrollLeft = middleOffset;

    requestAnimationFrame(() => {
      container.style.scrollBehavior = "smooth";
    });
  }, [middleOffset]);

  /* Infinite correction */
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
  };

  const scrollByOne = (dir: "left" | "right") => {
    containerRef.current?.scrollBy({
      left: dir === "left" ? -totalCardWidth : totalCardWidth,
      behavior: "smooth",
    });
  };

  /* Auto scroll */
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
      className="relative w-full"
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
            <div key={index} className="shrink-0 snap-start rounded-4xl border-2 border-[#E18126] bg-transparent p-6 shadow-lg hover:bg-radial-gradient transition relative group overflow-hidden"
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
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(
                    600px circle at var(--x) var(--y),
                    rgba(225,129,38,0.35),
                    transparent 70%
                  )`,
                }}
              />
              <div className="absolute w-30 h-25 bg-[#E18126] right-0 top-0 rounded-bl-[6rem] flex items-center justify-center">
                <img src="/assets/inverted_coma.png" alt="comma" className="h-15 w-15"/>
              </div>
              <div className="mb-2">
                <h5 className="text-base md:text-2xl text-slate-900 font-semibold mb-1">
                  {item.name}
                </h5>
                <p className="text-sm md:text-base text-slate-600">{item.designation}</p>
              </div>
              
              <div className="flex mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 flex text-[#E18126]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
                ))}
              </div>
              <p className="text-sm md:text-base lg:text-base text-black leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ARROWS */}
      <div className="relative flex justify-center z-10">
        <button
          onClick={() => scrollByOne("left")}
          className="flex absolute -ml-12 z-10 rounded-full bg-white p-2 shadow hover:scale-110 transition cursor-pointer"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => scrollByOne("right")}
          className="flex absolute -mr-12 z-10 rounded-full bg-white p-2 shadow hover:scale-110 transition cursor-pointer"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
