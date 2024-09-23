"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignupSchema } from "@/library/FormSchema/formSchema";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

interface SignupFormValues {
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  // Initialize useForm with Yup validation resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(SignupSchema),
  });

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  // Form submit handler
  const onSubmit = async ({ email, password }: SignupFormValues) => {
    try {
      await createUserWithEmailAndPassword(email, password);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
