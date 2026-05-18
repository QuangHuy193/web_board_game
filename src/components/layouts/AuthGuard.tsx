"use client";

import { useUserStore } from "@/stores/useUserStore";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useEffect, useState } from "react";

const AuthGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const pathname = usePathname();

  const user = useUserStore(
    (state) => state.user
  );

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const publicRoutes = ["/"];

  const isPublicRoute =
    publicRoutes.includes(pathname);

  useEffect(() => {
    if (
      mounted &&
      !isPublicRoute &&
      !user
    ) {
      router.replace("/");
    }
  }, [
    mounted,
    isPublicRoute,
    user,
    router,
  ]);

  if (!mounted) return null;

  if (!isPublicRoute && !user) {
    return null;
  }

  return children;
};

export default AuthGuard;