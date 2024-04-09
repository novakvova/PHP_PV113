import * as React from "react";
import { classNames } from "../../utils/classNames.ts";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={classNames(
                "flex w-full rounded-md border px-3 py-2 text-sm outline-0 placeholder:italic placeholder:text-slate-400",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});