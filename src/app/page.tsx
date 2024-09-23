"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user] = useAuthState(auth);
  console.log(user);

  const router = useRouter();

  if (!user) {
    router.replace("/sign-in");
  }
  return (
    <div>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign Out
      </button>

      <div>Home Page</div>
    </div>
  );
}
