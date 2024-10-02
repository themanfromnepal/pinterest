"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import UserTag from "./UserTag";
import { User } from "firebase/auth";
import { type PinFormType, pinSchema } from "@/validationScheme/scheme";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import useFireStore from "@/firebase/useFirestore";
import { useRouter } from "next/navigation";

type PinBuilderFormProps = {
  user: User;
};

const PinBuilderForm = ({ user }: PinBuilderFormProps) => {
  const { uploadPost, loading, error } = useFireStore(
    process.env.NEXT_PUBLIC_FIRESTORE_POST_STORAGE_COLLECTION_NAME!
  );

  const router = useRouter();

  const onSubmit = (data: PinFormType) => {
    if (user) {
      uploadPost(user?.email!, data);
      router.push("/");
    }
  };

  const methods = useForm<PinFormType>({
    resolver: yupResolver(pinSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      file: undefined,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white p-16 rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center mb-6">
          {error && error}
          {loading ? (
            <button
              disabled={true}
              type="button"
              className="bg-red-500 p-2 px-3 text-white font-semibold rounded-lg ml-auto flex items-center disabled:cursor-not-allowed"
            >
              <div className="animate-spin rounded-full h-5 w-5 border-b-4 border-dotted border-white mr-2"></div>{" "}
              Loading
            </button>
          ) : (
            <button
              className="bg-red-500 p-2 px-3 text-white font-semibold rounded-lg ml-auto"
              type="submit"
            >
              Save
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <UploadImage setFile={(file: File) => setValue("file", file)} />

          <div className="col-span-2">
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="Add your title"
                {...register("title")}
                className={clsx(
                  "text-[35px] outline-none font-bold w-full border-b-2 border-gray-400 placeholder-gray-400"
                )}
              />
              {errors.title && (
                <div className="text-red-500 text-sm">
                  {errors.title.message}
                </div>
              )}

              <h2 className="text-sm mb-8 w-full text-gray-400">
                The first 40 what usually show up in feeds
              </h2>
              <UserTag user={user} />
              <textarea
                {...register("description")}
                placeholder="Tell everyone what your pin is about"
                className={clsx(
                  "outline-none w-full mt-8 pb-4 text-[14px] border-b border-gray-400 placeholder-gray-400"
                )}
              />
              {errors.description && (
                <div className="text-red-500 text-sm">
                  {errors.description.message}
                </div>
              )}
              <input
                type="text"
                placeholder="Add a Destination Link"
                className={clsx(
                  "outline-none w-full border-b-2 border-gray-400 placeholder-gray-400"
                )}
                {...register("link")}
              />
              {errors.link && (
                <div className="text-red-500 text-sm">
                  {errors.link.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default PinBuilderForm;
