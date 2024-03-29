import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyPosts } from "../../redux/slices/getMyPostsSlices";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import User from "../User/User";
import { logoutUser } from "../../redux/slices/authSlices";
import toast from "react-hot-toast";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading } = useSelector((state) => state.myPosts);
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  // Handle Logout
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    navigate("/login");
    toast.success("user logged out successfully");
  };

  useEffect(() => {
    dispatch(getAllMyPosts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="account">
          <div className="accountleft">
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
                  isAccount="true"
                  isDeleted="true"
                  createdAt={post.createdAt}
                />
              ))
            ) : (
             <Typography variant="h3" sx={{color:"#fff"}}>Create a post to show Case Your Friends</Typography>
            )}
          </div>
          {userLoading ? (
            <Loader />
          ) : (
            <div className="accountright">
              <Avatar
                src={user.avatar.url}
                sx={{ height: "8vmax", width: "8vmax" ,border:"3px solid blue"}}
              />
              <Typography variant="h4">{user.name}</Typography>
              <div>
                <Button onClick={() => setFollowersToggle(true)}>
                  <Typography>Followers</Typography>
                </Button>
                <Typography>{user.followers.length}</Typography>
              </div>
              <div>
                <Button onClick={() => setFollowingToggle(true)}>
                  <Typography>Followings</Typography>
                </Button>
                <Typography>{user.following.length}</Typography>
              </div>
              <div>
                <Button disabled>
                  <Typography color={"#fff"}>Posts</Typography>
                </Button>
                <Typography>{user.posts.length}</Typography>
              </div>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
              <NavLink to={"/update/profile"}>Edit Profile</NavLink>
              <NavLink to={"/update/password"}>Change Password</NavLink>
              <Button variant="text" sx={{ margin: "2vmax", color: "red" }}
              onClick={() => toast.error("Sorry ! This Function Is now available right now.We are working on it")}
              >
                Delete My Profile
              </Button>

              <Dialog
                open={followersToggle}
                onClose={() => setFollowersToggle(!followersToggle)}
              >
                <div className="DialogBox">
                  <Typography variant="h4">Followed By</Typography>
                  {user && user.followers.length > 0 ? (
                    user.followers.map((follower) => (
                      <User
                        key={follower._id}
                        userId={follower._id}
                        name={follower.name}
                        avatar={follower.avatar.url}
                      />
                    ))
                  ) : (
                    <Typography>You Have No Followers</Typography>
                  )}
                </div>
              </Dialog>
              <Dialog
                open={followingToggle}
                onClose={() => setFollowingToggle(!followingToggle)}
              >
                <div className="DialogBox">
                  <Typography variant="h4">Followings</Typography>
                  {user && user.following.length > 0 ? (
                    user.following.map((following) => (
                      <User
                        key={following._id}
                        userId={following._id}
                        name={following.name}
                        avatar={following.avatar.url}
                      />
                    ))
                  ) : (
                    <Typography>You Are Not Following Anyone...</Typography>
                  )}
                </div>
              </Dialog>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Account;
