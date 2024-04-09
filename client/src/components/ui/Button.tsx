import React from "react";
import { classNames } from "../../utils/classNames.ts";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "DEFAULT" | "TOGGLE" | "PRIMARY";
    size?: "SMALL" | "MEDIUM" | "LARGE";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={classNames(
                    "flex items-center justify-center p-3 hover:rounded-xl   hover:bg-gray-200",
                    className,
                    size === "SMALL" ? "h-12 w-12 " : "",
                    variant === "DEFAULT" ? " " : "",
                )}
                {...props}
            />
        );
    },
);