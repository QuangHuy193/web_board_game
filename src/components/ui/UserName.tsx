"use client";

import { Coins } from "lucide-react";

import { useUserStore } from "@/stores/useUserStore";

const UserName = () => {
  const { user } = useUserStore();

  if (!user) return null;

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

        <div
          className="
          flex items-center gap-1
          text-xs font-semibold
          text-amber-300
        "
        >
          <Coins size={14} />

          <span>
            {user.coin}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserName;
