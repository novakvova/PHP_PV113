import { IconEdit, IconExternalLink, IconTrash } from "@tabler/icons-react";
import { DropdownMenu, DropdownMenuItem } from "../../ui/DropdownMenu.tsx";
import Title from "../../ui/Title.tsx";
import { Link } from "react-router-dom";
import { ICategory } from "../../../interfaces/category";
import { API_URL } from "../../../utils/apiUrl.ts";

type CategoryCardProps = {
    category: ICategory;
    edit: (id: number) => void;
    remove: (id: number) => void;
};

const CategoryCard = (props: CategoryCardProps) => {
    const { category, remove, edit } = props;
    const { id, name, image } = category;

    return (
        <div className="relative flex w-full max-w-[315px] flex-col rounded-lg border border-gray-200 bg-white shadow">
            <div className="absolute top-1 right-1 z-10">
                <DropdownMenu>
                    <DropdownMenuItem onClick={() => edit(id)}>
                        <IconEdit />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => remove(id)} className="text-red-600 hover:text-red-100">
                        <IconTrash />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenu>
            </div>

            <div className="group/item absolute w-full h-full">
                <Link aria-label={`Open category ${name}`} to={`/categories/${id}`}>
                    <div className="absolute bg-black/70 text-white opacity-0 top-1/3 w-full invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 ease-in">
                        <Title className="cursor-pointer py-6 font-title">
                            Show category <IconExternalLink />
                        </Title>
                    </div>
                </Link>
            </div>

            <img
                className="h-64 w-full rounded-t-lg object-cover object-top"
                src={`${API_URL}/upload/600_${image}`}
                alt={name}
                loading="lazy"
            />
            <div className="flex flex-grow flex-col overflow-hidden m-5">
                <h5 className="mb-2 text-2xl font-bold uppercase truncate tracking-tight text-gray-900 dark:text-white">
                    {name}
                </h5>
                {/*<p className="mb-3 flex-grow font-normal truncate text-gray-700 dark:text-gray-400">{description}</p>*/}
            </div>
        </div>
    );
};

export default CategoryCard;