"use client";

import LoginForm from "@/components/form/LoginForm";
import RegisterForm from "@/components/form/RegisterForm";
import Welcome from "@/components/homePage/Welcome";
import UserName from "@/components/ui/UserName";
import { useOpenForm } from "@/stores/useOpenForm";
import { useUserStore } from "@/stores/useUserStore";

export default function Home() {
  const { openForm } = useOpenForm();
  const { user } = useUserStore();
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/background_home.png')",
      }}
    >
      <div className="fixed top-3 right-3">{user && <UserName />}</div>
      <div className=" min-h-screen flex items-center justify-center">
        <Welcome />
      </div>
      <div>
        {openForm === "login" ? (
          <LoginForm />
        ) : openForm === "register" ? (
          <RegisterForm />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
