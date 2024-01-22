import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/server";

// Async Thunk For Getting All Users
export const getAllUsers = createAsyncThunk("users/all", async (name = "") => {
  const { data } = await axios.get(`${server}/all/users?name=${name}`, {
    withCredentials: true,
  });
  return data;
});



const userSlices = createSlice({
  name: "User",
  initialState: {
    loading: true,
    users: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        state.error = action.error.message;
      });
  },
});

export default userSlices.reducer;
