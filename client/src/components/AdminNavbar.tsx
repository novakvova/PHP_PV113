import React, { useState } from "react";
import { IconBell, IconMenu2, IconSettings, IconSquareRoundedX, IconUser } from "@tabler/icons-react";
import { classNames } from "../utils/classNames.ts";
import MenuItem from "./ui/MenuItem.tsx";
import { Button } from "./ui/Button.tsx";
import Breadcrumb from "./Breadcrumb.tsx";
import Drawer from "./ui/Drawer.tsx";
import {useAppSelector} from "../store";
import {selectCurrentUser} from "../store/slice/authSlice.ts";
import UserCurrent from "./user/UserCurrent.tsx";

type AdminNavbarProps = {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminNavbar = ({ showSidebar, setShowSidebar }: AdminNavbarProps) => {
    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const user = useAppSelector(selectCurrentUser);

    return (
        <nav className="px-3 py-6">
            <div className="container flex max-w-full items-center  md:pl-10 md:pr-8">
                <div className="flex items-center md:hidden">
                    <button onClick={() => setShowSidebar(true)}>
                        <IconMenu2 />
                    </button>
                    <div
                        className={classNames(
                            "absolute top-2 z-50 transition-all duration-1000 md:hidden",
                            showSidebar ? "left-56 opacity-100" : "-left-10 opacity-0",
                        )}
                    >
                        <button onClick={() => setShowSidebar(false)}>
                            <IconSquareRoundedX />
                        </button>
                    </div>
                </div>

                <div className="flex w-full items-center justify-end lg:justify-between">
                    <Breadcrumb />

                    <div className="flex gap-5">
                        {!user ? (
                            <MenuItem title="Sign In" path={"/login"} icon={<IconUser />} variants="DARK" />
                        ) : (
                            <UserCurrent {...user} />
                        )}
                        <Button>
                            <IconBell />
                        </Button>
                        <Button onClick={() => setOpenSettings(!openSettings)}>
                            <IconSettings />
                        </Button>
                    </div>
                </div>
            </div>

            <Drawer open={openSettings} close={() => setOpenSettings(false)} />
        </nav>
    );
};

export default AdminNavbar;