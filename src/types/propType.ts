// Button props
export type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonProps = {
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
