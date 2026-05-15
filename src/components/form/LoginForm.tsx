"use client";

import { WEB_NAME } from "@/libs/constains";
import { useOpenForm } from "@/stores/useOpenForm";
import { useState } from "react";
import EyePassword from "../ui/EyePassword";
import CloseButton from "../ui/CloseButton ";
import { loginAPI } from "@/api/auth.api";
import { useUserStore } from "@/stores/useUserStore";

const LoginForm = () => {
  const { setAccessToken, setUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowpass] = useState(false);

  const { setopenForm } = useOpenForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginAPI({ email, password });
      if (data.accessToken && data.user) {
        setAccessToken(data.accessToken);
        setUser(data.user);
        setopenForm("")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40
      p-4 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-3xl border border-white/30 
        bg-white/40 p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* close button */}
        <CloseButton onClick={() => setopenForm("")} />

        {/* title */}
        <h1
          className="mb-2 text-center text-3xl font-extrabold text-transparent bg-linear-to-r
          from-purple-600 to-pink-500 bg-clip-text"
        >
          🎮 Đăng nhập
        </h1>

        <p className="mb-6 text-center text-sm text-gray-800">
          Chào mừng quay trở lại {WEB_NAME}
        </p>

        {/* email */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Email
          </label>

          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/40 bg-white/50 px-4 py-3
            outline-none backdrop-blur-md transition focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Mật khẩu
          </label>

          <div className="relative">
            <input
              type={isShowPass ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/40 bg-white/50
              px-4 py-3 outline-none backdrop-blur-md transition focus:ring-2 
              focus:ring-purple-400"
            />
            <EyePassword isShow={isShowPass} setIsShow={setIsShowpass} />
          </div>
        </div>

        {/* submit */}
        <button
          type="submit"
          className="cursor-pointer w-full rounded-2xl bg-linear-to-r from-pink-500 
          to-purple-500 py-3 font-bold text-white shadow-lg transition hover:scale-[1.02]
          hover:shadow-xl"
        >
          🚀 Đăng nhập
        </button>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          <p className="text-gray-700">Chưa có tài khoản?</p>

          <button
            onClick={() => {
              setopenForm("register");
            }}
            type="button"
            className="
    cursor-pointer
    font-semibold
    text-purple-600
    transition
    hover:scale-105
    hover:text-pink-500
    hover:underline
  "
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
