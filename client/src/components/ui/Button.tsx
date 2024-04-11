import React from "react";
import { classNames } from "../../utils/classNames.ts";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold disabled:opacity-50 gap-3",
    {
        variants: {
            variant: {
                default: "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br",
                cancel: "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br",
                outlined: "border border-black border-dashed hover:bg-gray-200", //+++
                icon: "hover:bg-gray-200", //+++
            },
            size: {
                default: "h-10 px-5",
                sm: "h-9 px-3",
                lg: "h-10 w-52 px-5", //+++
                icon: "h-12 w-12 p-3", //+++
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return <button ref={ref} className={classNames(buttonVariants({ variant, size, className }))} {...props} />;
    },
);