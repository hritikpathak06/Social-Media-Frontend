import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/server";

// Async Thunk For Getting My Posts
export const getAllMyPosts = createAsyncThunk(
    "myposts/all",
    async() => {
        const {data} = await axios.get(`${server}/myposts`,{withCredentials:true});
        console.log(data);
        return data.posts
    }
)

// Async Thunk For Getting User Posts
export const getUserPosts = createAsyncThunk(
    "user/posts",
    async({id}) => {
     const {data} = await axios.get(`${server}/userposts/${id}`,{withCredentials:true});
     return data.posts
    }
)


const getMyPostSlices = createSlice({
    name:"myposts",
    initialState:{
        loading:true,
        posts:null,
        error:null
    },
    extraReducers:(builder) => {
        builder
        .addCase(getAllMyPosts.pending,(state) => {
            state.loading = true;
            state.posts = null;
            state.error = null;
        })
        .addCase(getAllMyPosts.fulfilled,(state,action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = null;
        })
        .addCase(getAllMyPosts.rejected,(state,action) => {
            state.loading = false;
            state.posts = null;
            state.error = action.error.message
        })

        .addCase(getUserPosts.pending,(state) => {
            state.loading = true;
            state.posts = null;
            state.error = null;
        })
        .addCase(getUserPosts.fulfilled,(state,action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = null;
        })
        .addCase(getUserPosts.rejected,(state,action) => {
            state.loading = false;
            state.posts = null;
            state.error = action.error.message
        })
    }
})


export default getMyPostSlices.reducer;