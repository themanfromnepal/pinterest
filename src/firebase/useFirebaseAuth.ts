// useFirebaseAuth.ts
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "@/firebase/config"; // Your Firebase configuration

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      setUser(result.user); // Set the logged-in user
      setError(null); // Clear errors on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(firebaseAuth);
      setUser(null); // Clear user on sign-out
      setError(null); // Clear errors on sign-out
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // If already logged in, set the user
      } else {
        setUser(null); // If logged out, clear the user
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, loading, error, signInWithGoogle, logOut };
};
export default useFirebaseAuth;
