import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/server";


// Async Thunk For Fetching Users Posts
export const getUserProfile = createAsyncThunk("user/post", async ({id}) => {
  const { data } = await axios.get(`${server}/user/${id}`, { withCredentials: true });
  return data;
});


const userProfileSlices = createSlice({
  name: "UserProfile",
  initialState: {
    loading: true,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export default userProfileSlices.reducer;
