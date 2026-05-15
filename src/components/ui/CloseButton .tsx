"use client";

import { X } from "lucide-react";

type CloseButtonProps = {
  onClick: () => void;

  size?: number;
};

const CloseButton = ({
  onClick,
  size = 20,
}: CloseButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      cursor-pointer
      absolute top-4 right-4
      flex h-10 w-10 items-center justify-center
      rounded-full
      bg-linear-to-r
      from-red-400 to-pink-500
      text-white
      shadow-md
      transition
      hover:scale-110
      hover:rotate-90
    "
    >
      <X size={size} />
    </button>
  );
};

export default CloseButton;