import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/server";

// Get Post Of Following Users
export const getPostsOfFollowingUser = createAsyncThunk(
  "getPostOfFollowingUsers/posts",
  async () => {
    const { data } = await axios.get(`${server}/posts`, {
      withCredentials: true,
    });
    return data.posts;
  }
);


const getPostOfFollowingSlices = createSlice({
  name: "User",
  initialState: {
    loading: true,
    posts: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsOfFollowingUser.pending, (state) => {
        state.loading = true;
        state.posts = null;
        state.error = null;
      })
      .addCase(getPostsOfFollowingUser.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getPostsOfFollowingUser.rejected, (state, action) => {
        state.loading = false;
        state.posts = null;
        state.error = action.payload;
      });
  },
});

export default getPostOfFollowingSlices.reducer;
