import {configureStore} from "@reduxjs/toolkit";
import authSlices from "./slices/authSlices";
import getPostOfFollowingUsers from "./slices/getPostOfFollowingUsers";
import userSlices from "./slices/userSlices";
import messageSlices from "./slices/messageSlices";
import getMyPostsSlices from "./slices/getMyPostsSlices";
import postSlices from "./slices/postSlices";

const store = configureStore({
    reducer:{
      auth:authSlices,
      getPostOfFollowing:getPostOfFollowingUsers,
      users:userSlices,
      messages:messageSlices,
      myPosts:getMyPostsSlices,
      post:postSlices
    }
});


export default store;