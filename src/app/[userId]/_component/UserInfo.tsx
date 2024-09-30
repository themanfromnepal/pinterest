"use client";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect } from "react";

type UserInfoProps = {
  user: DocumentData;
};

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={user.userImage || ""}
        alt="UserImage"
        width={100}
        height={100}
        priority={true}
        className="rounded-full"
      />

      <h2 className="font-semibold text-3xl">{user.userName || ""}</h2>
      <h2 className="text-gray-400">{user.email || ""}</h2>
      <button className="bg-gray-200 p-2 px-3 rounded-full font-semibold mt-5">
        Share
      </button>
    </div>
  );
};

export default UserInfo;
