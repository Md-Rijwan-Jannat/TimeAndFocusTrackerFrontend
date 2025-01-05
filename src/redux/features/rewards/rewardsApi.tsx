import { baseApi } from "@/redux/api/baseApi";

const rewardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all rewards for a user
    getAllUserRewards: builder.query({
      query: (userId) => ({
        url: `/rewards/${userId}/all`,
        method: "GET",
      }),
      providesTags: ["Rewards"],
    }),

    // Get daily rewards for a user
    getDailyUserRewards: builder.query({
      query: (userId) => ({
        url: `/rewards/${userId}/daily`,
        method: "GET",
      }),
      providesTags: ["Rewards"],
    }),

    // Get weekly rewards for a user
    getWeeklyUserRewards: builder.query({
      query: (userId) => ({
        url: `/rewards/${userId}/weekly`,
        method: "GET",
      }),
      providesTags: ["Rewards"],
    }),

    // Get monthly rewards for a user
    getMonthlyUserRewards: builder.query({
      query: (userId) => ({
        url: `/rewards/${userId}/monthly`,
        method: "GET",
      }),
      providesTags: ["Rewards"],
    }),

    // Get a reward by ID
    getRewardById: builder.query({
      query: (rewardId) => ({
        url: `/rewards/${rewardId}`,
        method: "GET",
      }),
      providesTags: ["Rewards"],
    }),

    // Delete a reward by ID
    deleteReward: builder.mutation({
      query: (rewardId) => ({
        url: `/rewards/${rewardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rewards"],
    }),
  }),
});

// Exporting the hooks to use in components
export const {
  useGetAllUserRewardsQuery,
  useGetDailyUserRewardsQuery,
  useGetWeeklyUserRewardsQuery,
  useGetMonthlyUserRewardsQuery,
  useGetRewardByIdQuery,
  useDeleteRewardMutation,
} = rewardsApi;

export default rewardsApi;
