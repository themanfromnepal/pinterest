import * as yup from "yup";

export const pinSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title can't be longer than 100 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description can't be longer than 300 characters")
    .required("Description is required"),
  link: yup.string().url().required("Must be a valid URL").nullable(),
  file: yup
    .mixed<File>()
    .nullable()
    .required("File is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        value instanceof File &&
        ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      );
    }),
});

export type PinFormType = yup.InferType<typeof pinSchema>;

export const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type SignUpFormType = yup.InferType<typeof SignupSchema>;

export const SigninSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type SignInFormType = yup.InferType<typeof SigninSchema>;
