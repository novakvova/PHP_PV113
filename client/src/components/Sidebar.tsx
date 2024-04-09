import { ReactNode, useState } from "react";
import MenuItem from "./ui/MenuItem.tsx";
import {
    IconDashboard,
    IconHome,
    IconHomeStats,
    IconListCheck,
    IconMessageShare,
    IconTruckDelivery,
    IconUsers,
} from "@tabler/icons-react";
import AdminNavbar from "./AdminNavbar.tsx";
import { classNames } from "../utils/classNames.ts";
import { Link } from "./ui/Link.tsx";

type MenuItem = {
    title: string;
    path: string;
    icon: ReactNode;
};

const menu: MenuItem[] = [
    {
        title: "Home",
        path: "/",
        icon: <IconHome />,
    },
    {
        title: "Posts",
        path: "/posts",
        icon: <IconMessageShare />,
    },
    {
        title: "Users",
        path: "/users",
        icon: <IconUsers />,
    },
    {
        title: "Tasks",
        path: "/tasks",
        icon: <IconListCheck />,
    },
    {
        title: "Stats",
        path: "/stats",
        icon: <IconHomeStats />,
    },
    {
        title: "Orders",
        path: "/orders",
        icon: <IconTruckDelivery />,
    },
];

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    return (
        <>
            <div className="md:ml-64">
                <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            </div>
            <div
                className={classNames(
                    "fixed top-0 z-10 h-screen w-64 flex-row flex-nowrap overflow-hidden overflow-y-auto bg-white px-6 py-4 shadow-xl transition-all duration-1000 md:left-0",
                    showSidebar ? "left-0" : "-left-64",
                )}
            >
                <div className="relative min-h-full flex-col flex-nowrap items-stretch px-0">
                    <Link href="/" className="font-bold text-black">
                        <IconDashboard />
                        <h1 className="font-title text-xl text-gray-900">Admin Dashboard</h1>
                    </Link>

                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />
                        <ul className="flex min-w-full list-none flex-col gap-y-5">
                            {menu.map((menuItem) => (
                                <MenuItem key={menuItem.title} title={menuItem.title} path={menuItem.path} icon={menuItem.icon} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;