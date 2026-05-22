"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import Loader from "@/components/ui/Loader";

import { useUserStore } from "@/stores/useUserStore";
import { refreshTokenAPI } from "@/api/auth.api";
import { showError } from "@/libs/toast";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const pathname = usePathname();

  const { user, accessToken, isHydrated, setUser, setAccessToken, logout } =
    useUserStore();

  const [isLoading, setIsLoading] = useState(true);

  const publicRoutes = ["/"];

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!isHydrated) return;

    const refreshLogin = async () => {
      try {
        // có token rồi
        if (accessToken) {
          setIsLoading(false);

          return;
        }

        // không có user
        if (!user) {
          setIsLoading(false);

          if (!isPublicRoute) {
            router.replace("/");
          }

          return;
        }

        // gọi refresh
        const res = await refreshTokenAPI();

        setAccessToken(res.accessToken);

        setUser(res.user);
      } catch (error) {
        logout();

        if (!isPublicRoute) {
          showError("Phiên đăng nhập đã hết hạn!");
          router.replace("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    refreshLogin();
  }, [
    accessToken,
    isHydrated,
    isPublicRoute,
    logout,
    router,
    setAccessToken,
    setUser,
    user,
  ]);

  // zustand chưa hydrate
  if (!isHydrated) {
    return <Loader />;
  }

  // loading refresh
  if (isLoading) {
    return <Loader />;
  }

  // private route chưa login
  if (!isPublicRoute && !user) {
    return <Loader />;
  }

  return children;
};

export default AuthGuard;
