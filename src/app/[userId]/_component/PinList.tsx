"use client";
import React from "react";
import PinItem from "./PinItem";

type PinListProps = {
  pins: any[];
};

const PinList = ({ pins }: PinListProps) => {
  return (
    <div className="grid grid-cols-12 gap-5 w-full p-4">
      {pins &&
        pins.map((pin, index) => (
          <div key={index} className="col-span-3">
            <PinItem pin={pin} />
          </div>
        ))}
    </div>
  );
};

export default PinList;
