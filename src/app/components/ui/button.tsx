import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-green-primary text-white hover:bg-green-hover",
  secondary:
    "bg-near-black text-white hover:bg-dark",
  outline:
    "border-[1.5px] border-near-black text-near-black hover:bg-light-gray",
  ghost:
    "text-dark hover:bg-light-gray",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2 text-sm rounded-lg",
  md: "px-8 py-3.5 text-base rounded-[10px]",
  lg: "px-10 py-4 text-base rounded-[10px]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-heading font-bold transition-colors disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
