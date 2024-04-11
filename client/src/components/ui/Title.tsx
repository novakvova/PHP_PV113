import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { classNames } from "../../utils/classNames.ts";

const titleVariants = cva("text-xl font-semibold text-center");

export interface TitleProps
    extends React.LabelHTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof titleVariants> {}

const Title = React.forwardRef<HTMLParagraphElement, TitleProps>(({ className, ...props }, ref) => (
    <p ref={ref} className={classNames(titleVariants(), className)} {...props} />
));
export default Title;