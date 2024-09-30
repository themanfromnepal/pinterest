"use client";
import React from "react";
import PinBuilderForm from "./_components/PinBuilderForm";
import useFirebaseAuth from "@/firebase/useFirebaseAuth";
import { useRouter } from "next/navigation";

const PinBuilder = () => {
  const { user } = useFirebaseAuth();
  const router = useRouter();

  // if (!user) {
  //   router.push("/");
  // }
  return (
    <div className="bg-[#e9e9e9] min-h-screen p-8 px-16 md:[px-40]">
      {user && <PinBuilderForm user={user} />}
    </div>
  );
};

export default PinBuilder;
