import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className = "", id, ...props }, ref) => {
    const textareaId = id || props.name;
    return (
      <div>
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block font-body text-sm font-medium text-dark"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full rounded-lg border border-border-gray bg-white px-4 py-3 font-body text-sm text-dark outline-none transition-colors focus:border-green-primary ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
