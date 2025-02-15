import { apiSlice } from "./apiSlice";

import { User } from "../types/User";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<{ message: string; data: User[] }, void>({
      query: () => {
        return {
          url: `/api/users`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              { type: "User" as const, id: "LIST" },
              ...result.data.map((user) => ({
                type: "User" as const,
                id: user.id,
              })),
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;
