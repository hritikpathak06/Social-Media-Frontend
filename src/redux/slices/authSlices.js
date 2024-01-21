import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../constants/server";
import axios from "axios";

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      { withCredentials: true }
    );
    return data;
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, avatar }) => {
    const { data } = await axios.post(
      `${server}/register`,
      { name, email, password, avatar },
      { withCredentials: true }
    );
    return data;
  }
);

// Get My Profile
export const getMyProfile = createAsyncThunk("user/profile", async () => {
  const { data } = await axios.get(`${server}/me`, { withCredentials: true });
  return data.user;
});

// Async Thunk For Loggout user
export const logoutUser = createAsyncThunk("Messages/logout", async () => {
  const { data } = await axios.get(`${server}/logout`,{withCredentials:true});
  return data;
});

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    loading: true,
    isAuthenticated: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
        console.error(action.error.message);
      })

      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
        console.error(action.error.message);
      })

      // My Profile
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
        console.error(action.error.message);
      })

      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
        console.error(action.error.message);
      });
  },
});

export default authSlice.reducer;
