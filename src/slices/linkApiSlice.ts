import { apiSlice } from "./apiSlice";

import { Link } from "../types/Link";

type SignUpPayload = {
  category: string;
  name: string;
  url: string;
};

type SignInRes = {
  messsage: string;
  data: Link;
};

export const linkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLink: builder.mutation<SignInRes, SignUpPayload>({
      query: (body) => ({
        url: `/api/links`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Link" as const, id: "LIST" }],
    }),
    getOwnLinks: builder.query<{ message: string; data: Link[] }, void>({
      query: () => {
        return {
          url: `/api/own-links`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Link" as const, id: "LIST" },
              ...result.data.map((link) => ({
                type: "Link" as const,
                id: link.id,
              })),
            ]
          : [{ type: "Link" as const, id: "LIST" }],
    }),
  }),
});

export const { useAddLinkMutation, useGetOwnLinksQuery } = linkApiSlice;
