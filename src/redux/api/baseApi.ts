import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const development = process.env.NEXT_PUBLIC_WORKSPACE;
const localUrl = process.env.NEXT_PUBLIC_BASE_API;
const liveUrl = process.env.NEXT_PUBLIC_LIVE_API;

const baseQuery = fetchBaseQuery({
  baseUrl: `${development === "development" ? localUrl : liveUrl}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["User", "FocusSessions", "Rewards"],
  endpoints: (builder) => ({}),
});
