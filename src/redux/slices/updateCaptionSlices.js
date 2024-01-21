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

// Async Thunk For Updating the profile
export const updateProfile = createAsyncThunk(
  "user/updateprofile",
  async ({ name, email, avatar }) => {
    const { data } = await axios.put(
      `${server}/update/profile`,
      { name, email, avatar },
      { withCredentials: true }
    );
    return data;
  }
);


// Async Thunk For Updating the password
export const updatePassword = createAsyncThunk(
  "user/updatepassword",
  async ({ oldPassword, newPassword }) => {
    const { data } = await axios.put(
      `${server}/update/password`,
      { oldPassword, newPassword },
      { withCredentials: true }
    );
    return data;
  }
);

// Follow / Unfollow User
export const followUnfollowUser = createAsyncThunk(
  "user/followunfollow",
  async({id}) => {
    const {data} = await axios.get(`${server}/follow/${id}`,{withCredentials:true})
    return data.message
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

      // Delete Post
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

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        // state.message = "",
        state.error = action.error.message;
      })

      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        // state.message = "",
        state.error = action.error.message;
      })

      // Follow|| Unfollow User
      .addCase(followUnfollowUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUnfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(followUnfollowUser.rejected, (state, action) => {
        state.loading = false;
        // state.message = "",
        state.error = action.error.message;
      });
  },
});

export default updateCaptionSlices.reducer;
