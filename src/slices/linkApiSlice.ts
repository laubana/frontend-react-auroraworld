import { apiSlice } from "./apiSlice";

import { Link } from "../types/Link";

export const linkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLink: builder.mutation<
      {
        message: string;
        data: Link;
      },
      {
        categoryId: string;
        name: string;
        url: string;
      }
    >({
      query: (body) => ({
        url: `/api/link`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Link", id: "LIST-OWN" }],
    }),
    deleteLink: builder.mutation<{ message: string }, { linkId: string }>({
      query: ({ linkId }) => ({
        url: `/api/link/${linkId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Link", id: "LIST-OWN" }],
    }),
    getLinks: builder.query<
      { message: string; data: Link[] },
      {
        mode: "own" | "shared-unwritable" | "shared-writable";
        categoryId: string;
        name: string;
      }
    >({
      query: ({ mode, categoryId, name }) => {
        return {
          url: `/api/links?mode=${mode}&categoryId=${categoryId}&name=${name}`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, args) => [
        { type: "Link", id: `LIST-${args.mode.toUpperCase()}` },
      ],
    }),
    updateLink: builder.mutation<
      { message: string },
      { linkId: string; categoryId: string; name: string; url: string }
    >({
      query: ({ linkId, categoryId, name, url }) => ({
        url: `/api/link/${linkId}`,
        method: "PUT",
        body: { categoryId, name, url },
      }),
      invalidatesTags: () => [
        { type: "Link", id: "LIST-OWN" },
        { type: "Link", id: "LIST-SHARED-WRITABLE" },
      ],
    }),
  }),
});

export const {
  useAddLinkMutation,
  useDeleteLinkMutation,
  useGetLinksQuery,
  useUpdateLinkMutation,
} = linkApiSlice;
