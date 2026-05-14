type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonProps = {
  children: React.ReactNode;

  variant?: ButtonVariant;
  size?: ButtonSize;

  fullWidth?: boolean;

  disabled?: boolean;

  scale?: 100 | 105 | 110 | 125 | 150;

  onClick?: () => void;

  className?: string;

  type?: "button" | "submit" | "reset";
};
const scaleClasses = {
  100: "hover:scale-100",
  105: "hover:scale-105",
  110: "hover:scale-110",
  125: "hover:scale-125",
  150: "hover:scale-150",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-blue-600
    hover:bg-blue-500
    text-white
    shadow-blue-500/30
  `,

  secondary: `
    bg-zinc-700
    hover:bg-zinc-600
    text-white
  `,

  success: `
    bg-green-600
    hover:bg-green-500
    text-white
    shadow-green-500/30
  `,

  danger: `
    bg-red-600
    hover:bg-red-500
    text-white
    shadow-red-500/30
  `,

  ghost: `
    bg-white/10
    hover:bg-white/20
    backdrop-blur-md
    text-white
    border border-white/20
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: `
    px-3
    py-2
    text-sm
    rounded-lg
  `,

  md: `
    px-5
    py-3
    text-base
    rounded-xl
  `,

  lg: `
    px-7
    py-4
    text-lg
    rounded-2xl
  `,
};

export default function Button({
  children,

  scale = 100,

  variant = "primary",
  size = "md",

  fullWidth = false,

  disabled = false,

  onClick,

  className = "",

  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        items-center
        justify-center

        font-semibold

        transition-all
        duration-200

        active:scale-95

        shadow-lg

        disabled:opacity-50
        disabled:pointer-events-none
        
        md:cursor-pointer

        ${variantClasses[variant]}
        ${sizeClasses[size]}

        ${fullWidth ? "w-full" : ""}

        ${scaleClasses[scale]}

        ${className}
      `}
    >
      {children}
    </button>
  );
}
