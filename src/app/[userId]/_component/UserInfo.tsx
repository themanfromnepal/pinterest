"use client";
import useFirebaseAuth from "@/firebase/useFirebaseAuth";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PinList from "./PinList";
import useFireStore from "@/firebase/useFirestore";

type UserInfoProps = {
  user: DocumentData;
};

const UserInfo = ({ user }: UserInfoProps) => {
  const { logOut, loading } = useFirebaseAuth();

  const router = useRouter();

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  const { queryDocuments, loading: PinLoading } = useFireStore(
    process.env.NEXT_PUBLIC_FIRESTORE_POST_STORAGE_COLLECTION_NAME!
  );

  const getPostFromDb = async () => {
    const pins = await queryDocuments("userId", "==", user?.email);
    setPinData(pins);
    console.log(pins);
  };
  const [pinData, setPinData] = useState<any[] | null>(null);

  useEffect(() => {
    if (user && user?.email) {
      getPostFromDb();
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
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
        <div className="flex items-center gap-2">
          <button className="bg-gray-200 p-2 px-3 rounded-full font-semibold">
            Share
          </button>
          <button
            className="bg-gray-200 p-2 px-3 rounded-full font-semibold"
            onClick={() => handleLogout()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Logout"}
          </button>
        </div>
      </div>
      {!PinLoading && pinData ? (
        <div className="w-full">
          <PinList pins={pinData} />
        </div>
      ) : (
        "Loading Pins..."
      )}
    </div>
  );
};

export default UserInfo;
