import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // Get user by ID
    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // Update user details
    updateUser: builder.mutation({
      query: ({ userId, userDetails }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: userDetails,
      }),
      invalidatesTags: ["Users"],
    }),

    // Delete user by ID
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks for the API endpoints
export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

export default userApi;
