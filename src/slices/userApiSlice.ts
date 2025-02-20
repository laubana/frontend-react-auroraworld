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
      providesTags: () => [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;
