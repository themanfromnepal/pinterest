"use client";
import { extractDomain } from "@/utils/StringFormatter";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuArrowUpRight } from "react-icons/lu";

type PinItemType = {
  description: string;
  id: string;
  image: string;
  link: string;
  title: string;
  uploadedDate?: string;
  userId?: string;
};

type PinItemProps = {
  pin: PinItemType;
};

const PinItem = ({ pin }: PinItemProps) => {
  const { image, link, title } = pin;
  const [hoverState, setHoverState] = useState(false);

  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-lg group"
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <div className="relative w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={600}
          className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 w-full h-auto"
        />

        <div
          className={clsx(
            "absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out",
            hoverState ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div
        className={clsx(
          "absolute top-0 right-0 p-4 transition-opacity duration-300 ease-in-out",
          hoverState ? "opacity-100" : "opacity-0"
        )}
      >
        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full">
          Save
        </button>
      </div>
      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center gap-2 transition-opacity duration-300 ease-in-out",
          hoverState ? "opacity-100" : "opacity-0"
        )}
      >
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/80 p-2 rounded-full flex items-center gap-2 "
        >
          <LuArrowUpRight className="text-xl text-black" />
          <span className="max-w-20 truncate">{extractDomain(link)}</span>
        </a>
        <button className="ml-auto bg-white/80 p-3 rounded-full">
          <FiUpload className="text-xl text-black" />
        </button>
        <button className="bg-white/80 p-3 rounded-full">
          <HiDotsHorizontal className="text-xl text-black" />
        </button>
      </div>
    </div>
  );
};

export default PinItem;
