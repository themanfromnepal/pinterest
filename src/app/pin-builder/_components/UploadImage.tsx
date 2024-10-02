"use client";
import { PinFormType } from "@/validationScheme/scheme";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import { HiArrowUpCircle } from "react-icons/hi2";

type UploadImageProps = {
  setFile: (file: File) => void;
};

const UploadImage = ({ setFile }: UploadImageProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<PinFormType>();

  const file = watch("file"); // Get the current value of the file input

  return (
    <div className="h-[450px] bg-[#e9e9e9] rounded-lg relative">
      <label className="m-5 flex flex-col justify-center items-center cursor-pointer h-[90%] border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600">
        {!file || !(file instanceof File) ? (
          <div className="flex items-center flex-col">
            <HiArrowUpCircle className="text-xl" />
            <h2 className="font-semibold">Click to Upload</h2>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={URL.createObjectURL(file)} // Only use the file if it's valid
              alt="selected-image"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          {...register("file", {
            required: "File is required",
            validate: {
              fileType: (value) =>
                value &&
                value instanceof File &&
                value.type.startsWith("image/")
                  ? true
                  : "Only image files are allowed",
            },
          })}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              const selectedFile = files[0];
              setFile(selectedFile); // Set file in parent component if necessary
              setValue("file", selectedFile, { shouldValidate: true }); // Update form context value
            }
          }}
        />
      </label>
      {/* Display error if validation fails */}
      {errors.file && (
        <p className="text-red-500 text-sm mt-2">{errors.file.message}</p>
      )}
    </div>
  );
};

export default UploadImage;
