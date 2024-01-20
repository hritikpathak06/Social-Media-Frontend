import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/server";

// Async Thunk for like and dislike the post
export const likeAndDislike = createAsyncThunk(
  "Message/likeAndDislike",
  async (id) => {
    const { data } = await axios.get(`${server}/post/${id}`, {
      withCredentials: true,
    });
    return data;
  }
);


// Async Thunk for Comment on the post
export const commentOnPost = createAsyncThunk(
  "Messages/comment",
  async ({postId, comment}) => {
    try {
      const response = await axios.put(`${server}/post/comment/${postId}`, { comment }, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Unknown error occurred' };
    }
  }
);


// Async Thunk for deleting the comment on the post
export const deleteCommentFromPost = createAsyncThunk(
  "Messages/delete",
  async ({ postId, commentId }) => {
    try {
      const response = await axios.delete(`${server}/post/comment/${postId}`, {
        data: { commentId },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Unknown error occurred' };
    }
  }
);



const messageSlices = createSlice({
  name: "Message",
  initialState: {
    loading: true,
    message: "",
    error: null,
  },
  extraReducers: (builder) => {
    // For like And Dislike the post
    builder.addCase(likeAndDislike.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(likeAndDislike.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(likeAndDislike.rejected, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = action.error.message;
    });

    
    // For comment on the post
    builder.addCase(commentOnPost.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(commentOnPost.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(commentOnPost.rejected, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = action.error.message;
    })


    // For Deleting Comments From the post
    builder.addCase(deleteCommentFromPost.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(deleteCommentFromPost.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(deleteCommentFromPost.rejected, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = action.error.message;
    })
  },
});

export default messageSlices.reducer;
