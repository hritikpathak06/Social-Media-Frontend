import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import { getPostsOfFollowingUser } from "../../redux/slices/getPostOfFollowingUsers";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { getAllUsers } from "../../redux/slices/userSlices";
import { Typography } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector(
    (state) => state.getPostOfFollowing
  );

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getPostsOfFollowingUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <div className="homeleft">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post._id}
                  postId={post._id}
                  captions={post.caption}
                  postImage={post.image.url}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage={post.owner.avatar.url}
                  ownerName={post.owner.name}
                  ownerId={post.owner._id}
                />
              ))
            ) : (
              <Typography>No Post Posted By Your Friends</Typography>
            )}
          </div>
          <div className="homeright">
            {users &&
              users.map((user) => (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
