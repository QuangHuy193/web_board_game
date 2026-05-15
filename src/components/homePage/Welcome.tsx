"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { WEB_NAME } from "@/libs/constains";

const Welcome = () => {
  const router = useRouter();
 

  const handleStart = () => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/main");
    } else {
      //TODO hiện toast dạng thông tin khuyên đăng nhập
      router.push("/main");
    }
  };
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-8
      "
    >
      {/* Curved text */}
      <div className="relative w-175 h-50 uppercase">
        <svg viewBox="0 0 700 220" className="absolute inset-0 w-full h-full">
          <path id="curve" d="M 40 180 Q 350 10 660 180" fill="transparent" />

          <text
            className="fill-cyan-200 text-[32px] font-black tracking-[2px]"
            style={{
              filter: `drop-shadow(0 0 8px rgba(255,255,255,0.9))
          drop-shadow(0 0 20px rgba(34,211,238,0.8))`,
            }}
          >
            <textPath
              href="#curve"
              startOffset="50%"
              textAnchor="middle"
              textLength="580"
            >
              CHÀO MỪNG ĐẾN VỚI {WEB_NAME}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Button */}
      <Button
        onClick={handleStart}
        scale={110}
        variant="ghost"
        size="lg"
        className="backdrop-blur-xl border border-white/20 px-10"
      >
        Bắt đầu hành trình nào!
      </Button>    
    </div>
  );
};

export default Welcome;
