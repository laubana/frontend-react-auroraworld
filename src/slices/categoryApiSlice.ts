import { apiSlice } from "./apiSlice";

import { Category } from "../types/Category";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ message: string; data: Category[] }, void>({
      query: () => {
        return {
          url: `/api/categories`,
          method: "GET",
        };
      },
      providesTags: () => [{ type: "Category" as const, id: "LIST" }],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApiSlice;
