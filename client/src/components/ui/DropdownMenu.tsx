import { Menu, Transition } from "@headlessui/react";
import { IconDotsVertical } from "@tabler/icons-react";
import React, { Fragment } from "react";
import { classNames } from "../../utils/classNames.ts";

type DropdownMenuProps = {
    children: React.ReactNode;
};
const DropdownMenu = ({ children }: DropdownMenuProps) => {
    return (
        <Menu as="div" className="relative">
            <div>
                <Menu.Button
                    aria-label="open menu"
                    className="inline-flex rounded-full justify-center bg-black/70 p-2 text-sm font-medium text-white hover:bg-black/90 "
                >
                    <IconDotsVertical />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {children}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

type DropdownMenuItemProps = {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
};

const DropdownMenuItem = (props: DropdownMenuItemProps) => {
    const { children, onClick, className } = props;

    return (
        <div className="p-1">
            <Menu.Item>
                {({ active }) => (
                    <button
                        onClick={onClick}
                        aria-label="menu item"
                        className={classNames(
                            "group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2",
                            active ? "bg-black text-white" : "text-gray-900",
                            className,
                        )}
                    >
                        {children}
                    </button>
                )}
            </Menu.Item>
        </div>
    );
};

export { DropdownMenu, DropdownMenuItem };