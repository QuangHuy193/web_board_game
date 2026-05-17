"use client";

import { Coins, LogOut } from "lucide-react";

import { useUserStore } from "@/stores/useUserStore";
import { openConfirm } from "@/libs/confirm";

type UserNameProps = {
  displayCoin?: boolean;
};

const UserName = ({ displayCoin = false }: UserNameProps) => {
  const { user, setAccessToken, setUser } = useUserStore();

  if (!user) return null;

  const handleLogout = async () => {
    openConfirm({
      title: "Đăng xuất?",
      description: "Bạn sẽ cần đăng nhập lại",

      onConfirm: () => {
        setAccessToken(null);
        setUser(null);
      },
    });
  };

  return (
    <div
      className="
      flex items-center gap-3
      rounded-2xl
      border border-white/20
      bg-white/10
      px-4 py-2
      shadow-lg
      backdrop-blur-md
    "
    >
      {/* avatar fake */}
      <div
        className="
        flex h-11 w-11
        items-center justify-center
        rounded-full
        bg-linear-to-r
        from-pink-500
        to-purple-500
        text-lg font-bold text-white
        shadow-md
      "
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* info */}
      <div className="flex flex-col">
        <p
          className="
          max-w-32 truncate
          text-sm font-bold
          text-white
        "
        >
          {user.name}
        </p>
        {displayCoin && (
          <div
            className="
          flex items-center gap-1
          text-xs font-semibold
          text-amber-300
        "
          >
            <Coins size={14} />

            <span>{user.coin}</span>
          </div>
        )}
      </div>
      <div>
        <LogOut
          onClick={handleLogout}
          className="m-1 cursor-pointer text-red-500 hover:scale-110"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserName;
