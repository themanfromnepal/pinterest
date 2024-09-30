"use client";
import React from "react";
import PinBuilderForm from "./_components/PinBuilderForm";
import { DocumentData } from "firebase/firestore";

type PinBuilderProps = {
  user: DocumentData;
};

const PinBuilder = ({ user }: PinBuilderProps) => {
  return (
    <div className="bg-[#e9e9e9] min-h-screen p-8 px-16 md:[px-40]">
      <PinBuilderForm />
    </div>
  );
};

export default PinBuilder;
