import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { setAuth } from "./authSlice";

import { RootState } from "../configs/storeConfig";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    const accessToken = state.auth.accessToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const oldResponse = await baseQuery(args, api, extraOptions);

  if (oldResponse.error?.status === 401) {
    const refreshResponse = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResponse && refreshResponse.data) {
      const refreshData = refreshResponse.data as {
        message: string;
        data: {
          accessToken: string;
          id: string;
          email: string;
        };
      };

      api.dispatch(setAuth({ ...refreshData.data }));

      const newResponse = await baseQuery(args, api, extraOptions);

      return newResponse;
    } else {
      api.dispatch(setAuth({ accessToken: "", email: "", id: "" }));

      return oldResponse;
    }
  }

  return oldResponse;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
  tagTypes: ["Auth"],
});
