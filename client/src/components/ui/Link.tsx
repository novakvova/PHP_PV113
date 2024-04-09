import * as React from "react";
import { classNames } from "../../utils/classNames.ts";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, ...props }, ref) => {
    return <a ref={ref} className={classNames("flex items-center justify-center text-black", className)} {...props} />;
});