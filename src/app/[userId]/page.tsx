"use client";
import { useState } from "react";
import useFireStore from "@/firebase/useFirestore";
import { formatEmailFromParam } from "@/utils/StringFormatter";
import { useEffect } from "react";
import UserInfo from "./_component/UserInfo";
import { DocumentData } from "firebase/firestore";

type Params = {
  userId: string;
};

export default function Main({ params }: { params: Params }) {
  const { readDocument } = useFireStore(
    process.env.NEXT_PUBLIC_FIRESTORE_USER_COLLECTION_NAME!
  );

  const readingUserFromFirestore = async () => {
    const user = await readDocument(formatEmailFromParam(params.userId));

    if (!user) {
      setUserInfo(null);
    } else {
      setUserInfo(user);
    }
  };

  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_FIRESTORE_USER_COLLECTION_NAME!);
    console.log(formatEmailFromParam(params.userId));
    readingUserFromFirestore();
  }, []);

  return <>{userInfo && <UserInfo user={userInfo} />}</>;
}
