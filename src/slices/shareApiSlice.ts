import { apiSlice } from "./apiSlice";

import { Share } from "../types/Share";

export const shareApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addShare: builder.mutation<
      {
        messsage: string;
        data: Share;
      },
      {
        linkId: string;
        userId: string;
        isWritable: boolean;
      }
    >({
      query: (body) => ({
        url: `/api/shares`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Share" as const, id: args.linkId },
      ],
    }),
    deleteShare: builder.mutation<{ message: string }, { shareId: string }>({
      query: ({ shareId }) => ({
        url: `/api/shares/${shareId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Share" as const, id: args.shareId },
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
      providesTags: (result, error, args) =>
        result?.data
          ? [
              { type: "Share" as const, id: args.linkId },
              ...result.data.map((share) => ({
                type: "Share" as const,
                id: share.id,
              })),
            ]
          : [{ type: "Share" as const, id: "LIST" }],
    }),
    updateShare: builder.mutation<
      { message: string },
      { shareId: string; isWritable: boolean }
    >({
      query: ({ shareId, isWritable }) => ({
        url: `/api/shares/${shareId}`,
        method: "PUT",
        body: { isWritable },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Share" as const, id: args.shareId },
      ],
    }),
  }),
});

export const {
  useAddShareMutation,
  useDeleteShareMutation,
  useGetSharesQuery,
  useUpdateShareMutation,
} = shareApiSlice;
