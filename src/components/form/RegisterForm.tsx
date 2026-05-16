"use client";

import { registerSchema } from "@/libs/validate";
import { WEB_NAME } from "@/libs/constains";
import { useOpenForm } from "@/stores/useOpenForm";
import { useState } from "react";

import CloseButton from "../ui/CloseButton ";
import EyePassword from "../ui/EyePassword";

const RegisterForm = () => {
  const { setopenForm } = useOpenForm();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [isShowPass, setIsShowpass] =
    useState(false);

  const [isShowConfirmPass, setIsShowConfirmPass] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrors({});

    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors =
        result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword:
          fieldErrors.confirmPassword?.[0],
      });

      return;
    }

    try {
      setLoading(true);

      console.log(result.data);

      // call register api here

      setopenForm("login");
    } catch (error: any) {
      setErrors({
        general:
          error?.response?.data?.message ||
          "Đăng ký thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed inset-0 z-50 flex items-center
      justify-center bg-black/50 p-4
      backdrop-blur-sm
    "
    >
      <form
        onSubmit={handleSubmit}
        className="overflow-y-scroll max-h-screen scrollbar-thumb-cyan-100
        relative w-full max-w-md rounded-3xl
        border border-white/30 bg-white/40
        p-8 shadow-2xl backdrop-blur-xl
      "
      >
        {/* close */}
        <CloseButton onClick={() => setopenForm("")} />

        {/* title */}
        <h1
          className="
          mb-2 bg-linear-to-r from-purple-600
          to-pink-500 bg-clip-text text-center
          text-3xl font-extrabold text-transparent
        "
        >
          🎮 Đăng ký
        </h1>

        <p className="mb-6 text-center text-sm text-gray-800">
          Tạo tài khoản mới tại {WEB_NAME}
        </p>

        {/* general error */}
        {errors.general && (
          <div
            className="
            mb-4 rounded-2xl border border-red-300
            bg-red-100 px-4 py-3 text-sm text-red-600
          "
          >
            {errors.general}
          </div>
        )}

        {/* name */}
        <div className="mb-4">
          <label
            className="
            mb-2 block text-sm font-semibold
            text-gray-800
          "
          >
            Tên người dùng
          </label>

          <input
            type="text"
            placeholder="Nhập tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`
              w-full rounded-2xl border
              bg-white/70 px-4 py-3
              text-gray-800 outline-none
              transition focus:ring-2
              ${
                errors.name
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/40 focus:ring-pink-400"
              }
            `}
          />

          {errors.name && (
            <p className="mt-2 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* email */}
        <div className="mb-4">
          <label
            className="
            mb-2 block text-sm font-semibold
            text-gray-800
          "
          >
            Email
          </label>

          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              w-full rounded-2xl border
              bg-white/70 px-4 py-3
              text-gray-800 outline-none
              transition focus:ring-2
              ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/40 focus:ring-pink-400"
              }
            `}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            className="
            mb-2 block text-sm font-semibold
            text-gray-800
          "
          >
            Mật khẩu
          </label>

          <div className="relative">
            <input
              type={isShowPass ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className={`
                w-full rounded-2xl border
                bg-white/70 px-4 py-3 pr-12
                text-gray-800 outline-none
                transition focus:ring-2
                ${
                  errors.password
                    ? "border-red-400 focus:ring-red-300"
                    : "border-white/40 focus:ring-purple-400"
                }
              `}
            />

            <EyePassword
              isShow={isShowPass}
              setIsShow={setIsShowpass}
            />
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        {/* confirm password */}
        <div className="mb-6">
          <label
            className="
            mb-2 block text-sm font-semibold
            text-gray-800
          "
          >
            Nhập lại mật khẩu
          </label>

          <div className="relative">
            <input
              type={
                isShowConfirmPass
                  ? "text"
                  : "password"
              }
              placeholder="Nhập lại mật khẩu..."
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className={`
                w-full rounded-2xl border
                bg-white/70 px-4 py-3 pr-12
                text-gray-800 outline-none
                transition focus:ring-2
                ${
                  errors.confirmPassword
                    ? "border-red-400 focus:ring-red-300"
                    : "border-white/40 focus:ring-purple-400"
                }
              `}
            />

            <EyePassword
              isShow={isShowConfirmPass}
              setIsShow={setIsShowConfirmPass}
            />
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="
          w-full cursor-pointer rounded-2xl
          bg-linear-to-r from-pink-500
          to-purple-500 py-3 font-bold
          text-white shadow-lg transition
          hover:scale-[1.02]
          hover:shadow-xl
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
        >
          {loading
            ? "Đang đăng ký..."
            : "🚀 Đăng ký"}
        </button>

        {/* login */}
        <div
          className="
          mt-3 flex items-center justify-center
          gap-2 text-sm
        "
        >
          <p className="text-gray-700">
            Đã có tài khoản?
          </p>

          <button
            type="button"
            onClick={() => setopenForm("login")}
            className="
              cursor-pointer font-semibold
              text-purple-600 transition
              hover:scale-105 hover:text-pink-500
              hover:underline
            "
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;