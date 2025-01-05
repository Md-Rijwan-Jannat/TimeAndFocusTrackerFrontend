import { baseApi } from "../../api/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get daily metrics
    getDailyMetrics: builder.query({
      query: () => ({
        url: "/analytics/daily",
        method: "GET",
      }),
      providesTags: ["FocusSessions"],
    }),

    // Get weekly metrics
    getWeeklyMetrics: builder.query({
      query: () => ({
        url: "/analytics/weekly",
        method: "GET",
      }),
      providesTags: ["FocusSessions"],
    }),

    // Get monthly metrics
    getMonthlyMetrics: builder.query({
      query: () => ({
        url: "/analytics/monthly",
        method: "GET",
      }),
      providesTags: ["FocusSessions"],
    }),

    // Get streak metrics
    getStreakMetrics: builder.query({
      query: () => ({
        url: "/analytics/streak",
        method: "GET",
      }),
      providesTags: ["FocusSessions"],
    }),
  }),
});

// Exporting the hooks to use in components
export const {
  useGetDailyMetricsQuery,
  useGetWeeklyMetricsQuery,
  useGetMonthlyMetricsQuery,
  useGetStreakMetricsQuery,
} = analyticsApi;
