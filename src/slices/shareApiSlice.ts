import { apiSlice } from "./apiSlice";

import { Share } from "../types/Share";

type SignUpPayload = {
  linkId: string;
  userId: string;
  isWritable: boolean;
};

type SignInRes = {
  messsage: string;
  data: SignUpPayload;
};

export const shareApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addShare: builder.mutation<SignInRes, SignUpPayload>({
      query: (body) => ({
        url: `/api/shares`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Share" as const, id: "LIST" }],
    }),
    getLinkShares: builder.query<
      { message: string; data: Share[] },
      { linkId: string }
    >({
      query: ({ linkId }) => {
        return {
          url: `/api/link-shares/${linkId}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Share" as const, id: "LIST" },
              ...result.data.map((share) => ({
                type: "Share" as const,
                id: share.id,
              })),
            ]
          : [{ type: "Share" as const, id: "LIST" }],
    }),
  }),
});

export const { useAddShareMutation, useGetLinkSharesQuery } = shareApiSlice;
