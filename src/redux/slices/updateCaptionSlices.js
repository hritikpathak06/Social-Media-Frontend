import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/server";

// Async Thunk For Updating The Caption
export const updateCaption = createAsyncThunk(
  "Caption/updateCaption",
  async ({ postId, caption }) => {
    const { data } = await axios.put(
      `${server}/post/${postId}`,
      { caption },
      { withCredentials: true }
    );
    return data;
  }
);

//   Async Thunk For deleting the posts
export const deletePost = createAsyncThunk(
  "Caption/delete",
  async ({ postId }) => {
    const { data } = await axios.delete(`${server}/post/${postId}`, {
      withCredentials: true,
    });
    return data;
  }
);

const updateCaptionSlices = createSlice({
  name: "Caption",
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCaption.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCaption.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(updateCaption.rejected, (state, action) => {
        state.loading = false;
        // state.message = "",
        state.error = action.error.message;
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        // state.message = "",
        state.error = action.error.message;
      })
  },
});

export default updateCaptionSlices.reducer;
