import React, { useEffect, useState } from "react";
import "../Account/Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../redux/slices/getMyPostsSlices";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import User from "../User/User";
import { getUserProfile } from "../../redux/slices/getUserSlices";
import { followUnfollowUser } from "../../redux/slices/updateCaptionSlices";
import toast from "react-hot-toast";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { posts, loading } = useSelector((state) => state.myPosts);
  const { user, loading: userLoading } = useSelector(
    (state) => state.userProfile
  );
  const { user: myself } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.caption);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyprofile] = useState(false);

  const followHanlder = async (e) => {
    e.preventDefault();
    setFollowing(!following);
    await dispatch(followUnfollowUser({ id }));
    dispatch(getUserProfile({ id }));
    toast.success(message);
  };

  useEffect(() => {
    dispatch(getUserProfile({ id }));
    dispatch(getUserPosts({ id }));
    if (myself._id === id) {
      setMyprofile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === myself._id) {
          setFollowing(true);
        }
      });
    }
  }, [dispatch, id, myself._id]);

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
                  createdAt={post.createdAt}
                />
              ))
            ) : (
              <Typography variant="h3" sx={{ color: "#fff" }}>
                {user.name} Had Not Made Any Post
              </Typography>
            )}
          </div>
          {userLoading ? (
            <Loader />
          ) : (
            <div className="accountright">
              <Avatar
                src={user.avatar.url}
                sx={{ height: "8vmax", width: "8vmax",border:"3px solid blue" }}
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
                  <Typography>Posts</Typography>
                </Button>
                <Typography>{user.posts.length}</Typography>
              </div>
              {myProfile ? null : (
                <Button
                  variant="contained"
                  onClick={followHanlder}
                  style={{ background: following ? "red" : "blue" }}
                >
                  {following ? "Unfollow" : "Follow"}
                </Button>
              )}

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

export default UserProfile;
