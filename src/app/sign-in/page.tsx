"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SigninSchema } from "@/library/FormSchema/formSchema";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

interface SigninFormValues {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // Initialize useForm with Yup validation resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: yupResolver(SigninSchema),
  });

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  // Form submit handler
  const onSubmit = async ({ email, password }: SigninFormValues) => {
    try {
      await signInWithEmailAndPassword(email, password);
      reset();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-2 mt-1 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full p-2 mt-1 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
