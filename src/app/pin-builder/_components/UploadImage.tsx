"use client";
import Image from "next/image";
import React, { useState } from "react";
import { HiArrowUpCircle } from "react-icons/hi2";

type UploadImageProps = {
  setFile: (file: File) => void;
};

const UploadImage = ({ setFile }: UploadImageProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="h-[450px] bg-[#e9e9e9] rounded-lg">
      <label className="m-5 flex flex-col justify-center items-center cursor-pointer h-[90%] border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600">
        {!selectedFile ? (
          <div className="flex items-center flex-col">
            <HiArrowUpCircle className="text-xl" />
            <h2 className="font-semibold">Click to Upload</h2>
          </div>
        ) : (
          <Image
            src={window.URL.createObjectURL(selectedFile)}
            alt="selected-image"
            width={500}
            height={800}
            className="object-contain h-[90%]"
          />
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              const selectedFile = files[0];
              setSelectedFile(selectedFile);
              setFile(selectedFile);
            }
          }}
        />
      </label>
    </div>
  );
};

export default UploadImage;
