import { Link, useLocation } from "react-router-dom";
import { IconHome } from "@tabler/icons-react";

const Breadcrumb = () => {
    const location: string = useLocation().pathname;
    const pathParts: string[] = location.split("/").filter((part) => part);

    const breadcrumbs: { path: string; label: string }[] = pathParts.map((part, index) => {
        const path = `/${pathParts.slice(0, index + 1).join("/")}`;
        return { path, label: part.toUpperCase() };
    });

    return (
        <div className="hidden items-center justify-center lg:flex">
            <nav className="rounded-md bg-white text-sm font-bold">
                <ol className="flex list-none items-center justify-center p-0">
                    <li className="flex items-center">
                        <Link to="/" className="text-gray-600 transition-colors duration-300 hover:text-black">
                            <IconHome />
                        </Link>
                        {breadcrumbs.length > 0 && <span className="mx-2">/</span>}
                    </li>
                    {breadcrumbs.map((item, index) => (
                        <li key={index} className="flex items-center">
                            <Link to={item.path} className="text-gray-600 transition-colors duration-300 hover:text-black">
                                {item.label}
                            </Link>
                            {index !== breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;