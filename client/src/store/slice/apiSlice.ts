import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/apiUrl.ts";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    tagTypes: ["Auth", "User"],
    endpoints: () => ({}),
});