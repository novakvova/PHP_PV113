import { IconPencilPlus } from "@tabler/icons-react";
import { useGetCategoriesQuery } from "../../../services/category.ts";
import Skeleton from "../../helpers/Skeleton.tsx";
import {Button} from "../../ui/Button.tsx";
import {useState} from "react";
import CategoryCreateModal from "../create/CategoryCreateModal.tsx";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/Input.tsx";
import {useDebouncedCallback} from "use-debounce";
import CategoryGrid from "./CategoryGrid.tsx";

const CategoryListPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const { data: categories, isLoading } = useGetCategoriesQuery({
        page: Number(searchParams.get("page")) || 1,
        search: searchParams.get("search") || "",
    });

    const handleSearch = useDebouncedCallback((term) => {
        if (term) {
            searchParams.set("search", term);
            setSearchParams(searchParams);
        } else {
            searchParams.delete("search");
            setSearchParams(searchParams);
        }
    }, 400);

    return (
        <div>
            <div className="mb-3 flex flex-row-reverse">
                <Button variant="outlined" size="lg" onClick={() => setCreateModalOpen(true)}>
                    <IconPencilPlus />
                    Add new category
                </Button>

                <Input
                    defaultValue={searchParams.get("search") || ""}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    className="hidden md:flex"
                    variant="search"
                    placeholder="Search..."
                />
            </div>

                {isLoading && <Skeleton/>}
                {/*{categories?.data?.map(category => (*/}
                {/*    <CategoryItem key={category.id} {...category} />*/}
                {/*))}*/}
                <CategoryGrid
                    categories={categories?.data}
                    totalPages={categories?.last_page}
                    edit={()=>{}}
                    remove={()=>{}}
                    isLoading={isLoading}
                />

            {createModalOpen && <CategoryCreateModal open={createModalOpen} close={() => setCreateModalOpen(false)} />}
        </div>
    );
}

export default CategoryListPage;