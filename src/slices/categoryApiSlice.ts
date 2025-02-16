import { apiSlice } from "./apiSlice";

import { Category } from "../types/Category";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation<
      {
        messsage: string;
        data: Category;
      },
      {
        name: string;
      }
    >({
      query: (body) => ({
        url: `/api/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Category" as const, id: "LIST" }],
    }),
    getCategories: builder.query<{ message: string; data: Category[] }, void>({
      query: () => {
        return {
          url: `/api/categories`,
          method: "GET",
        };
      },
      providesTags: () => [{ type: "Link" as const, id: "LIST" }],
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } =
  categoryApiSlice;
