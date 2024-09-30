"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { HiSearch, HiChat } from "react-icons/hi";
import { HiBell } from "react-icons/hi2";
import clsx from "clsx";
import { firebaseDb } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import useFirebaseAuth from "@/firebase/useFirebaseAuth";
import useFireStore from "@/firebase/useFirestore";
import { useRouter } from "next/navigation";

interface HeaderButtonProps {
  label: string;
  onClick: () => void;
  active: boolean;
}

const HeaderButton = ({ label, onClick, active }: HeaderButtonProps) => {
  return (
    <button
      className={clsx(
        "py-2 px-4 rounded-full",
        active ? "bg-black text-white" : "font-bold"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const Header = () => {
  const { user, loading, error, signInWithGoogle, logOut } = useFirebaseAuth();

  const router = useRouter();

  return (
    <div className="flex gap-3 md:gap-2 items-center p-6">
      <Image
        src="/pinterest.png"
        alt="logo"
        width={50}
        height={50}
        className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
      />
      <HeaderButton label="Home" onClick={() => {}} active={true} />
      <HeaderButton
        label="Create"
        onClick={() => {
          router.push("/pin-builder");
        }}
        active={false}
      />

      <div className="bg-[#e9e9e9] p-3 gap-3 items-center rounded-full w-full hidden md:flex">
        <HiSearch className="text-[25px] text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none"
        />
      </div>
      <HiSearch className="text-[25px] text-gray-500 md:hidden" />
      <HiBell className="text-[40px] text-gray-500" />
      <HiChat className="text-[40px] text-gray-500" />
      {user ? (
        <Image
          src={user?.photoURL || ""}
          alt="user-image"
          width={50}
          height={50}
          className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
          onClick={() => router.push("/" + user?.email)}
        />
      ) : (
        <button onClick={signInWithGoogle}>Login</button>
      )}
    </div>
  );
};

export default Header;
