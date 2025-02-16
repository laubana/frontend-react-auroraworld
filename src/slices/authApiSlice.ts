import { apiSlice } from "./apiSlice";

import { User } from "../types/User";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.mutation<
      {
        message: string;
        data: {
          accessToken: string;
          id: string;
          email: string;
        };
      },
      void
    >({
      query: () => ({
        url: `/auth/refresh`,
        method: "GET",
      }),
      invalidatesTags: () => [
        { type: "User" },
        { type: "Category" },
        { type: "Link" },
        { type: "Share" },
      ],
    }),
    signIn: builder.mutation<
      {
        message: string;
        data: {
          accessToken: string;
          id: string;
          email: string;
        };
      },
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: `/auth/sign-in`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [
        { type: "User" },
        { type: "Category" },
        { type: "Link" },
        { type: "Share" },
      ],
    }),
    signOut: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `/auth/sign-out`,
        method: "POST",
      }),
      invalidatesTags: () => [
        { type: "User" },
        { type: "Category" },
        { type: "Link" },
        { type: "Share" },
      ],
    }),
    signUp: builder.mutation<
      { message: string; data: User },
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRefreshMutation,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} = authApiSlice;
