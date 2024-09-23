import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
export const GET = useAuthState(auth);
