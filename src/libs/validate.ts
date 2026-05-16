import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),

  password: z
    .string()
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa")
    .regex(/[a-z]/, "Phải có ít nhất 1 chữ thường")
    .regex(/[0-9]/, "Phải có ít nhất 1 số"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Tên tối thiểu 3 ký tự")
      .max(20, "Tên tối đa 20 ký tự"),

    email: z
      .string()
      .trim()
      .min(1, "Email không được để trống")
      .email("Email không hợp lệ"),

    password: z
      .string()
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa")
      .regex(/[a-z]/, "Phải có ít nhất 1 chữ thường")
      .regex(/[0-9]/, "Phải có ít nhất 1 số"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
