"use client";

import { loginAPI } from "@/api/auth.api";
import { WEB_NAME } from "@/libs/constains";
import { loginSchema } from "@/libs/validate";
import { useOpenForm } from "@/stores/useOpenForm";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";
import CloseButton from "../ui/CloseButton ";
import EyePassword from "../ui/EyePassword";
import { showSuccess } from "@/libs/toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { setAccessToken, setUser } = useUserStore();
  const { setopenForm } = useOpenForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPass, setIsShowpass] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    try {
      setLoading(true);

      const data = await loginAPI({
        email: result.data.email,
        password: result.data.password,
      });

      if (data.accessToken && data.user) {
        setAccessToken(data.accessToken);
        setUser(data.user);

        router.push("/main");

        showSuccess("Đăng nhập thành công 🎉");
        setopenForm("");
      }
    } catch (error: any) {
      setErrors({
        general: error?.response?.data?.message || "Đăng nhập thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed inset-0 z-50 flex items-center justify-center
      bg-black/40 p-4 backdrop-blur-sm
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
        {/* close button */}
        <CloseButton onClick={() => setopenForm("")} />

        {/* title */}
        <h1
          className="
          mb-2 text-center text-3xl font-extrabold
          text-transparent bg-linear-to-r
          from-purple-600 to-pink-500 bg-clip-text
        "
        >
          🎮 Đăng nhập
        </h1>

        <p className="mb-6 text-center text-sm text-gray-800">
          Chào mừng quay trở lại {WEB_NAME}
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

        {/* email */}
        <div className="mb-4">
          <label
            className="
            mb-2 block text-sm font-semibold text-gray-800
          "
          >
            Email
          </label>

          <input
            type="text"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              w-full rounded-2xl border bg-white/50
              px-4 py-3 outline-none backdrop-blur-md
              transition focus:ring-2
              ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/40 focus:ring-pink-400"
              }
            `}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* password */}
        <div className="mb-6">
          <label
            className="
            mb-2 block text-sm font-semibold text-gray-800
          "
          >
            Mật khẩu
          </label>

          <div className="relative">
            <input
              type={isShowPass ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`
                w-full rounded-2xl border bg-white/50
                px-4 py-3 outline-none backdrop-blur-md
                transition focus:ring-2
                ${
                  errors.password
                    ? "border-red-400 focus:ring-red-300"
                    : "border-white/40 focus:ring-purple-400"
                }
              `}
            />

            <EyePassword isShow={isShowPass} setIsShow={setIsShowpass} />
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="
          w-full cursor-pointer rounded-2xl
          bg-linear-to-r from-pink-500 to-purple-500
          py-3 font-bold text-white shadow-lg
          transition hover:scale-[1.02]
          hover:shadow-xl disabled:cursor-not-allowed
          disabled:opacity-70
        "
        >
          {loading ? "Đang đăng nhập..." : "🚀 Đăng nhập"}
        </button>

        {/* register */}
        <div
          className="
          mt-4 flex items-center justify-center
          gap-2 text-sm
        "
        >
          <p className="text-gray-700">Chưa có tài khoản?</p>

          <button
            type="button"
            onClick={() => setopenForm("register")}
            className="
              cursor-pointer font-semibold
              text-purple-600 transition
              hover:scale-105 hover:text-pink-500
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
