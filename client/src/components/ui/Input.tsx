import * as React from "react";
import { classNames } from "../../utils/classNames.ts";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva("flex text-md  disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "border px-3 py-1 rounded-sm",
            search: "border rounded-md px-3 py-2", //+++
            file: " file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400", //+++
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, type, ...props }, ref) => {
    return <input type={type} className={classNames(inputVariants({ variant, className }))} ref={ref} {...props} />;
});