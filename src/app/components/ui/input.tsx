import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block font-body text-sm font-medium text-dark"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-lg border border-border-gray bg-white px-4 py-3 font-body text-sm text-dark outline-none transition-colors focus:border-green-primary ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
