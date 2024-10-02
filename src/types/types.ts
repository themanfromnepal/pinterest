import { PinFormType } from "@/validationScheme/scheme";

type PostUploadType = Omit<PinFormType, "file"> & {
  id: string;
  image: string;
  uploadedDate: string;
  userId: string;
};

export type { PostUploadType };
