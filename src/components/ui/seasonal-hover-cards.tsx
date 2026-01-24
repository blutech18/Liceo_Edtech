import React from "react";
import { cn } from "@/lib/utils";

export interface SeasonCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  onClick?: () => void;
}

interface SeasonalHoverCardsProps {
  cards: SeasonCardProps[];
  className?: string;
}

const SeasonCard = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  className,
  onClick,
}: SeasonCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-end p-6 w-full md:w-1/3 h-[350px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:w-2/3 cursor-pointer",
        "bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A]",
        className,
      )}
      style={{ willChange: "width" }}
    >
      <img
        src={imageSrc}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        alt={imageAlt || title}
        loading="lazy"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#800000]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative md:absolute md:bottom-20 z-10 space-y-2">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide">
          {title}
        </h2>
        <p className="text-sm text-gray-300">{subtitle}</p>
      </div>

      <div className="relative z-10 mt-4 transform translate-y-6 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <p className="text-base text-white/90 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export function SeasonalHoverCards({
  cards,
  className,
}: SeasonalHoverCardsProps) {
  return (
    <div
      className={cn("flex flex-wrap md:flex-nowrap gap-4 w-full", className)}
    >
      {cards.map((card, index) => (
        <SeasonCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
}
