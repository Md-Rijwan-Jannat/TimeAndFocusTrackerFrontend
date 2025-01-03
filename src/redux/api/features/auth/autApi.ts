import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // SignIn mutation
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signIn",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [],
    }),

    // SignUp mutation
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signUp",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [],
    }),

    // Get profile
    getMe: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [],
    }),
  }),
});

// Exporting the hooks to use in components
export const { useSignInMutation, useSignUpMutation, useGetMeQuery } = authApi;
