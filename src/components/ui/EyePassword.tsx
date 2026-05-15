"use client";

import { Eye, EyeOff } from "lucide-react";

type EyePasswordProps = {
  isShow: boolean;

  setIsShow: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const EyePassword = ({
  isShow,
  setIsShow,
}: EyePasswordProps) => {
  return (
    <button
      type="button"
      onClick={() =>
        setIsShow((prev) => !prev)
      }
      className="
      absolute right-3 top-1/2 -translate-y-1/2
      cursor-pointer
      text-gray-500
      transition
      hover:text-purple-500
    "
    >
      {isShow ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  );
};

export default EyePassword;