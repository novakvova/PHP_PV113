import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { classNames } from "../../utils/classNames.ts";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
    <label ref={ref} className={classNames(labelVariants(), className)} {...props} />
));
export default Label;