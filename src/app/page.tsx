"use client"

import LoginForm from "@/components/form/LoginForm";
import RegisterForm from "@/components/form/RegisterForm";
import Welcome from "@/components/homePage/Welcome";
import Button from "@/components/ui/Button";
import { useOpenForm } from "@/stores/useOpenForm";

export default function Home() {
  const { openForm, setopenForm } = useOpenForm();
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/background_home.png')",
      }}
    >
      <div className="fixed top-3 right-3">
        <Button
          variant="primary"
          size="sm"
          scale={105}
          onClick={() => {
            setopenForm("login");
          }}
        >
          Đăng nhập
        </Button>
      </div>
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
