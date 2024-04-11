import CategoryItem from "./CategoryItem.tsx";
import { IconPencilPlus } from "@tabler/icons-react";
import { useGetCategoriesQuery } from "../../../services/category.ts";
import Skeleton from "../../helpers/Skeleton.tsx";
import {Button} from "../../ui/Button.tsx";
import {useState} from "react";
import CategoryCreateModal from "../create/CategoryCreateModal.tsx";

const CategoryListPage = () => {

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetCategoriesQuery();

    return (
        <>
            <div className="mb-3 flex flex-row-reverse">
                <Button variant="outlined" size="lg" onClick={() => setCreateModalOpen(true)}>
                    <IconPencilPlus />
                    Add new category
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {isLoading && <Skeleton/>}
                {data?.map(category => (
                    <CategoryItem key={category.id} {...category} />
                ))}
            </div>
            {createModalOpen && <CategoryCreateModal open={createModalOpen} close={() => setCreateModalOpen(false)} />}
        </>
    );
}

export default CategoryListPage;