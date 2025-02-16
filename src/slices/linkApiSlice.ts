import { apiSlice } from "./apiSlice";

import { Link } from "../types/Link";

export const linkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLink: builder.mutation<
      {
        messsage: string;
        data: Link;
      },
      {
        categoryId: string;
        name: string;
        url: string;
      }
    >({
      query: (body) => ({
        url: `/api/links`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Link" as const, id: "LIST-OWN" }],
    }),
    deleteLink: builder.mutation<{ message: string }, { linkId: string }>({
      query: ({ linkId }) => ({
        url: `/api/links/${linkId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Link" as const, id: "LIST-OWN" }],
    }),
    getLinks: builder.query<
      { message: string; data: Link[] },
      { mode: string; categoryId: string; name: string }
    >({
      query: ({ mode, categoryId, name }) => {
        return {
          url: `/api/links?mode=${mode}&categoryId=${categoryId}&name=${name}`,
          method: "GET",
        };
      },
      providesTags: (result, error, args) => [
        { type: "Link" as const, id: `LIST-${args.mode.toUpperCase()}` },
      ],
    }),
    updateLink: builder.mutation<
      { message: string },
      { linkId: string; categoryId: string; name: string; url: string }
    >({
      query: ({ linkId, categoryId, name, url }) => ({
        url: `/api/links/${linkId}`,
        method: "PUT",
        body: { categoryId, name, url },
      }),
      invalidatesTags: () => [{ type: "Link" as const, id: "LIST-OWN" }],
    }),
  }),
});

export const {
  useAddLinkMutation,
  useDeleteLinkMutation,
  useGetLinksQuery,
  useUpdateLinkMutation,
} = linkApiSlice;
