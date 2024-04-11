import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../utils/apiUrl.ts";
import {ICategory, ICreateCategory} from "../interfaces/category";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => "/categories",
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
    }),
});
export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;