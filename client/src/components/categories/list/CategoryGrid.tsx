import EmptyData from "../../EmptyData.tsx";
import Pagination from "../../Pagination.tsx";
import CategoryCard from "./CategoryCard.tsx";
import Skeleton from "../../helpers/Skeleton.tsx";
import { ICategory } from "../../../interfaces/category";

type CategoryGridProps = {
    categories: ICategory[] | undefined;
    totalPages: number | undefined;
    isLoading: boolean;
    edit: (id: number) => void;
    remove: (id: number) => void;
};

const CategoryGrid = ({ categories, isLoading, remove, edit, totalPages }: CategoryGridProps) => {
    return (
        <>
            <div className="flex flex-col items-center sm:grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                {isLoading && Array.from(Array(4).keys()).map((index) => <Skeleton key={index} />)}
                {categories?.map((category) => (
                    <CategoryCard key={category.id} edit={edit} remove={remove} category={category} />
                ))}
            </div>
            {categories?.length === 0 && <EmptyData />}
            <Pagination totalPages={totalPages || 0} />
        </>
    );
};

export default CategoryGrid;