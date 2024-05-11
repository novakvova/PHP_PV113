import {NavLink} from "react-router-dom";
import {ReactNode} from "react";
import {classNames} from "../../utils/classNames.ts";

type MenuLinkProps = {
    title: string;
    path: string;
    variants?: "PRIMARY" | "DARK";
    icon?: ReactNode;
};

const MenuItem = ({title, path, icon, variants}: MenuLinkProps) => {
    return (
        <div className="w-full rounded-lg">
            <NavLink
                to={path}
                className={({isActive}: { isActive: boolean }) =>
                    classNames(
                        "flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-semibold text-black hover:bg-gray-200",
                        isActive && "bg-black text-gray-50 shadow-md hover:bg-black",
                        variants === "DARK" && "bg-black text-white  hover:bg-black",
                    )
                }
            >
                {icon}
                {title}
            </NavLink>
        </div>
    );
};

export default MenuItem;