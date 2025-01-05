import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    role: string | null;
    avatar_url: string | null;
  };
  token: string | null;
}

const initialState: AuthState = {
  user: {
    id: null,
    name: null,
    email: null,
    role: null,
    avatar_url: null,
  },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: {
          id: string;
          name: string;
          email: string;
          role: string;
          avatar_url: string;
        };
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearCredentials: (state) => {
      state.user = {
        id: null,
        name: null,
        email: null,
        role: null,
        avatar_url: null,
      };
      state.token = null;
    },
  },
});

export const getUser = (state: { auth: AuthState }) => state.auth.user;
export const getToken = (state: { auth: AuthState }) => state.auth.token;
export const getUserRole = (state: { auth: AuthState }) => state.auth.user.role;
export const isAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
