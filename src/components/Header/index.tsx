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
  className?: string;
}

const HeaderButton = ({
  label,
  onClick,
  active,
  className,
}: HeaderButtonProps) => {
  return (
    <button
      className={clsx(
        "py-2 px-4 rounded-full",
        active ? "bg-black text-white" : "font-bold",
        className && className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const Header = () => {
  const { user, loading, error, signInWithGoogle, logOut } = useFirebaseAuth();

  const { writeDocument } = useFireStore(
    process.env.NEXT_PUBLIC_FIRESTORE_USER_COLLECTION_NAME!
  );

  const router = useRouter();

  useEffect(() => {
    if (user && user.email) {
      const userData = {
        email: user?.email || "",
        userName: user?.displayName || "",
        userImage: user?.photoURL || "",
      };
      writeDocument(user?.email, userData);
    }
  }, [user]);

  return (
    <div className="flex gap-3 md:gap-2 items-center p-6">
      <Image
        src="/pinterest.png"
        alt="logo"
        width={50}
        height={50}
        className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
        priority
        onClick={() => {
          router.push("/");
        }}
      />
      <HeaderButton
        label="Home"
        onClick={() => {
          router.push("/");
        }}
        active={true}
        className="hidden lg:inline-block"
      />
      <HeaderButton
        label="Create"
        onClick={() => {
          user ? router.push("/pin-builder") : signInWithGoogle();
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
