import { apiSlice } from "./apiSlice";

import { Share } from "../types/Share";

export const shareApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addShare: builder.mutation<
      {
        message: string;
        data: Share;
      },
      {
        linkId: string;
        userId: string;
        isWritable: boolean;
      }
    >({
      query: (body) => ({
        url: `/api/share`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: "Share", id: args.linkId },
      ],
    }),
    addShares: builder.mutation<
      {
        message: string;
        data: Share;
      },
      {
        linkIds: string[];
        userIds: string[];
        isWritable: boolean;
      }
    >({
      query: (body) => ({
        url: `/api/shares`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Link" }, { type: "Share" }],
    }),
    deleteShare: builder.mutation<{ message: string }, { shareId: string }>({
      query: ({ shareId }) => ({
        url: `/api/share/${shareId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: "Share", id: args.shareId },
      ],
    }),
    getShares: builder.query<
      { message: string; data: Share[] },
      { linkId: string }
    >({
      query: (body) => {
        return {
          url: `/api/shares/${body.linkId}`,
          method: "GET",
        };
      },
      providesTags: (result, _error, args) =>
        result?.data
          ? [
              { type: "Share" as const, id: args.linkId },
              ...result.data.map((share) => ({
                type: "Share" as const,
                id: share.id,
              })),
            ]
          : [{ type: "Share" as const, id: args.linkId }],
    }),
    updateShare: builder.mutation<
      { message: string },
      { shareId: string; isWritable: boolean }
    >({
      query: ({ shareId, isWritable }) => ({
        url: `/api/share/${shareId}`,
        method: "PUT",
        body: { isWritable },
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: "Share", id: args.shareId },
      ],
    }),
  }),
});

export const {
  useAddShareMutation,
  useAddSharesMutation,
  useDeleteShareMutation,
  useGetSharesQuery,
  useUpdateShareMutation,
} = shareApiSlice;
