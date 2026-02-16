"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    isDesktop,
  }: {
    card: {
      name: string;
      image: string;
      description: string;
      rating: string;
      review: string;
      link: string;
    };
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    isDesktop: boolean;
  }) => (
    <div
      onMouseEnter={() => isDesktop && setHovered(index)}
      onMouseLeave={() => isDesktop && setHovered(null)}
      className={cn(
        "group relative h-100 w-full overflow-hidden rounded-4xl bg-gray-100 transition-all duration-300 ease-out md:h-110 lg:h-130",
        isDesktop &&
          hovered !== null &&
          hovered !== index &&
          "blur-[2px] scale-[0.98]"
      )}
    >
      {/* Background Image */}
      <img
        src={card.image}
        alt={card.name}
        className="pointer-events-none absolute inset-0 h-full w-full md:h-130 lg:h-full md:w-130 lg:w-full object-cover select-none transition-transform duration-500 lg:group-hover:scale-110"
      />
      <div className="absolute hidden lg:block bottom-0 left-0 right-0 z-10">
          <div
            className="
              rounded-b-lg
              px-5 pt-16 pb-6
              text-white
              bg-gradient-to-t
              from-black/90
              via-black/70
              to-transparent
            "
          >
            <h4 className="mb-2 text-lg md:text-xl lg:text-2xl font-semibold">
              {card.name}
            </h4>

            <p className="mb-4 text-base text-white/80">
              {card.description}
            </p>

            <div className="mb-4 flex items-center gap-3">
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs lg:text-sm">
                ⭐ {card.rating}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs lg:text-sm">
                {card.review} reviews
              </span>
            </div>

            <Link href={card.link}>
              <button className="w-full rounded-full bg-white md:py-2 lg:py-2 text-sm md:text-sm lg:text-lg font-semibold text-black cursor-pointer">
                Get Insured
              </button>
            </Link>
          </div>
      </div>

      {/* ================= ALWAYS VISIBLE CONTENT (Mobile + Tablet) ================= */}
      {!isDesktop && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div
            className="
              rounded-b-lg
              px-5 pt-16 pb-6
              text-white
              bg-linear-to-t
              from-black/90
              via-black/70
              to-transparent
            "
          >
            <h4 className="text-lg md:text-xl mb-2 font-bold">
              {card.name}
            </h4>

            <p className="mb-4 text-sm text-white/80">
              {card.description}
            </p>

            <div className="mb-4 flex items-center gap-3">
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs">
                ⭐ {card.rating}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                {card.review} reviews
              </span>
            </div>

            <Link href={card.link}>
              <button className="w-full rounded-full bg-white py-2 md:py-2 text-sm font-bold text-blue-950 cursor-pointer">
                Get Insured
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* ================= DESKTOP HOVER OVERLAY ================= */}
      {isDesktop && (
        <div
          className={cn(
            "absolute inset-0 flex items-end bg-black/60 px-4 py-8 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div
              className="
                rounded-b-lg
                px-5 pt-16 pb-6
                text-white
                bg-linear-to-t
                from-black/90
                via-black/70
                to-transparent
              "
            >
              <h4 className="mb-2 md:text-xl lg:text-2xl font-semibold">
                {card.name}
              </h4>

              <p className="mb-4 text-base text-white/80">
                {card.description}
              </p>

              <div className="mb-4 flex items-center gap-3">
                <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs lg:text-sm">
                  ⭐ {card.rating}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs lg:text-sm">
                  {card.review} reviews
                </span>
              </div>

              <Link href={card.link}>
                <button className="w-full rounded-full bg-white md:py-2 lg:py-2 text-sm md:text-sm lg:text-lg font-semibold text-black cursor-pointer">
                  Get Insured
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
);

Card.displayName = "Card";

type CardType = {
  name: string;
  image: string;
  description: string;
  rating: string;
  review: string;
  link: string;
};

export function FocusCards({ cards }: { cards: CardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-x-30 md:gap-y-5 lg:gap-y-10 mx-auto w-full">
      {cards.map((card, index) => (
        <Card
          key={card.name}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          isDesktop={isDesktop}
        />
      ))}
    </div>
  );
}