import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../utils/apiUrl.ts";
import {ICategory, ICategoryResponse, ICreateCategory, IEditCategory} from "../interfaces/category";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryResponse, { page: number; search: string }>({
            query: ({ page, search }) => `/categories?page=${page}&search=${search}`,
            providesTags: ["Category"],
        }),
        addCategory: builder.mutation({
            query: (category: ICreateCategory) => {
                const categoryFormData = new FormData();
                categoryFormData.append("image", category.image);
                categoryFormData.append("name", category.name);
                categoryFormData.append("description", category.description);

                return {
                    url: "/categories/create",
                    method: "POST",
                    body: categoryFormData,
                };
            },
            //Привязуємося до тега, якщо нічого не змінилося(залишаємо стера, якщо є зміни то оновляємо)
            invalidatesTags: ["Category"],
        }),

        editCategory: builder.mutation({
            query: ({ id, category }: { id: number; category: IEditCategory }) => {
                const categoryFormData = new FormData();
                if (category.image) {
                    categoryFormData.append("image", category.image);
                }
                categoryFormData.append("name", category.name);
                //categoryFormData.append("description", category.description);

                return {
                    url: `/categories/edit/${id}`,
                    method: "POST",
                    body: categoryFormData,
                };
            },
            invalidatesTags: ["Category"],
        }),

        getCategory: builder.query<ICategory, number>({
            query: (id) => `/categories/${id}`,
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});
export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useEditCategoryMutation,
    useGetCategoryQuery,
} = categoryApi;