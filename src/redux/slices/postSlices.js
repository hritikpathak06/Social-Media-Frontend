import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../constants/server";
import axios from "axios";

// Async Thunk For Creating New Post
export const createPost = createAsyncThunk(
  "post/create",
  async ({ caption, image }) => {
    const { data } = await axios.post(
      `${server}/post/upload`,
      { caption, image },
      {
        withCredentials: true,
      }
    );
    return data;
  }
);

const postSlices = createSlice({
  name: "Post",
  initialState: {
    loading: true,
    post: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.post = null;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = true;
        state.post = null;
        state.error = action.error.message;
      });
  },
});

export default postSlices.reducer;
