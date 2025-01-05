import { baseApi } from "../../api/baseApi";

const focusSessionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new focus session
    createFocusSession: builder.mutation({
      query: (sessionData) => ({
        url: "/focus-sessions",
        method: "POST",
        body: sessionData,
      }),
      invalidatesTags: ["FocusSessions"],
    }),

    // Get active focus session for a user
    getActiveSession: builder.query({
      query: (userId) => ({
        url: `/focus-sessions/${userId}/active`,
        method: "GET",
      }),
      providesTags: ["FocusSessions"],
    }),

    // Get active focus session for a user
    getPausedSession: builder.query({
      query: (userId) => ({
        url: `/focus-sessions/${userId}/paused`,
        method: "GET",
      }),
      providesTags: ["FocusSessions"],
    }),

    // Get a focus session by ID
    getFocusSessionById: builder.query({
      query: (sessionId) => ({
        url: `/focus-sessions/${sessionId}`,
        method: "GET",
      }),
      providesTags: ["FocusSessions"],
    }),

    // Update a focus session by ID
    updateFocusSession: builder.mutation({
      query: ({ sessionId, updates }) => ({
        url: `/focus-sessions/${sessionId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["FocusSessions"],
    }),

    // Delete a focus session by ID
    deleteFocusSession: builder.mutation({
      query: (sessionId) => ({
        url: `/focus-sessions/${sessionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FocusSessions"],
    }),

    // List all focus sessions for a user
    listFocusSessions: builder.query({
      query: (userId) => ({
        url: `/focus-sessions/${userId}/list`,
        method: "GET",
      }),
      providesTags: ["FocusSessions"],
    }),

    // Update focus session status for a user
    updateFocusSessionStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/focus-sessions/${userId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["FocusSessions"],
    }),

    // Pause a focus session for a user
    pauseFocusSession: builder.mutation({
      query: (userId) => ({
        url: `/focus-sessions/${userId}/pause`,
        method: "PUT",
      }),
      invalidatesTags: ["FocusSessions"],
    }),

    // Start a focus session for a user
    startFocusSession: builder.mutation({
      query: (userId) => ({
        url: `/focus-sessions/${userId}/start`,
        method: "PUT",
      }),
      invalidatesTags: ["FocusSessions"],
    }),
  }),
});

// Export hooks for the API endpoints
export const {
  useCreateFocusSessionMutation,
  useGetActiveSessionQuery,
  useGetPausedSessionQuery,
  useGetFocusSessionByIdQuery,
  useUpdateFocusSessionMutation,
  useDeleteFocusSessionMutation,
  useListFocusSessionsQuery,
  useUpdateFocusSessionStatusMutation,
  usePauseFocusSessionMutation,
  useStartFocusSessionMutation,
} = focusSessionsApi;

export default focusSessionsApi;
