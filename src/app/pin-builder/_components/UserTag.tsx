"use client";
import React from "react";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

type UserTagProps = {
  user: DocumentData;
};

const UserTag = ({ user }: UserTagProps) => {
  return (
    <div className="flex gap-3 items-center">
      <Image
        src={user.userImage || ""}
        alt="User Tag Image"
        width={45}
        height={45}
        className="rounded-full"
        priority={true}
      />
      <div>
        <h2 className="text-sm font-medium">{user.userName || ""}</h2>
        <h2 className="text-xs">{user.email || ""}</h2>
      </div>
    </div>
  );
};

export default UserTag;
