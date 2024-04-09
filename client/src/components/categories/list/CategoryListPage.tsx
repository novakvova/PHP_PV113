import CategoryItem from "./CategoryItem.tsx";

const CategoryListPage = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <div>
                    <CategoryItem/>
                </div>
                <div>
                    <CategoryItem/>
                </div>
                <div>
                    <CategoryItem/>
                </div>
                <div>
                    <CategoryItem/>
                </div>
                <div>
                    <CategoryItem/>
                </div>
                <div>
                    <CategoryItem/>
                </div>
                <div>
                    <CategoryItem/>
                </div>
            </div>
        </>
    );
}

export default CategoryListPage;