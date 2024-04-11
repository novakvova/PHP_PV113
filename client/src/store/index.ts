import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "../services/category.ts";

export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoryApi.middleware),
});

//рекомендація
setupListeners(store.dispatch);