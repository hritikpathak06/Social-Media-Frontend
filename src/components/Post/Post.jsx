import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Post.css";
import { BiComment, BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { CgMoreVertical } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  commentOnPost,
  likeAndDislike,
} from "../../redux/slices/messageSlices";
import toast from "react-hot-toast";
import { getPostsOfFollowingUser } from "../../redux/slices/getPostOfFollowingUsers";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import { getAllMyPosts } from "../../redux/slices/getMyPostsSlices";
import { updateCaption } from "../../redux/slices/updateCaptionSlices";

const Post = ({
  postId,
  captions,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDeleted = false,
  isAccount = false,
  createdAt,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [comment, setComment] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [caption, setCaption] = useState(captions);
  const [captionToggle, setCaptionToggle] = useState(false);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);

  const formattedDate = new Date(createdAt).toLocaleString();

  // Like Or Unlike the posts handler
  const handleLike = async () => {
    setLiked(!liked);
    dispatch(likeAndDislike(postId));
    if (isAccount) {
      dispatch(getAllMyPosts());
    } else {
      await dispatch(getPostsOfFollowingUser());
    }
    toast.success(message);
  };

  // Add or Update Comment Handler
  const addCommentHandler = async (event) => {
    event.preventDefault();
    console.log(postId);
    console.log(comment);
    await dispatch(commentOnPost({ postId, comment }));
    if (isAccount) {
      dispatch(getAllMyPosts());
    } else {
      dispatch(getPostsOfFollowingUser());
    }
    toast.success(message);
  };

  // Update Caption Handler
  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateCaption({ postId, caption }));
    toast.success("Caption Upated Successfully");
    dispatch(getAllMyPosts());
  };

  // Delete Post Handler
  const deletePostHandler = (e) => {
    e.preventDefault();
    console.log("Post deleted");
    toast.error("Currently this function is not available right now...");
  };

  // UseEffect
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <>
      <div className="post">
        <div className="postHeader">
          <Typography
            fontWeight={100}
            color={"#000"}
            style={{
              alignSelf: "center",
              marginLeft: "20px",
              color: "gray",
              fontWeight: "bolder",
            }}
          >
            {formattedDate}
          </Typography>
          {isAccount ? (
            <Button onClick={() => setCaptionToggle(true)}>
              <CgMoreVertical />
            </Button>
          ) : null}
        </div>
        <img src={postImage} alt="post" />
        <div className="postDetails">
          <Avatar
            src={ownerImage}
            alt="user"
            sx={{ height: "3vmax", width: "3vmax" }}
          />
          <NavLink to={`/user/${ownerId}`}>
            <Typography fontWeight={700}>{ownerName}</Typography>
          </NavLink>
          <Typography
            fontWeight={100}
            color={"#000"}
            style={{ alignSelf: "center" }}
          >
            {captions}
          </Typography>
        </div>
        <Button
          style={{
            border: "none",
            background: "#fff",
            cursor: "pointer",
            margin: "1vmax 2vamx",
          }}
          disabled={likes.length === 0}
          onClick={() => setLikesUser(true)}
        >
          <Typography>{likes.length}..Likes</Typography>
        </Button>
        <div className="postFooter">
          <Button onClick={handleLike}>
            {liked ? <BiSolidLike style={{ color: "red" }} /> : <BiLike />}
          </Button>
          <Button onClick={() => setCommentToggle(true)}>
            <BiComment />
          </Button>
          <Button onClick={deletePostHandler}>
            {isDeleted ? <MdDelete /> : null}
          </Button>
        </div>
        <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
          <div className="DialogBox">
            <Typography variant="h4">Liked By</Typography>
            {likes &&
              likes.map((like) => (
                <User
                  key={like._id}
                  userId={like._id}
                  name={like.name}
                  avatar={like.avatar.url}
                />
              ))}
          </div>
        </Dialog>
        <Dialog
          open={commentToggle}
          onClose={() => setCommentToggle(!commentToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Comments</Typography>
            <form className="commentForm" onSubmit={addCommentHandler}>
              <input
                type="text"
                placeholder="Add Your Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <Button type="submit" variant="contained">
                Add
              </Button>
            </form>
            {comments &&
              comments.map((c) => (
                <CommentCard
                  key={c._id}
                  userId={c.user._id}
                  postId={postId}
                  avatar={c.user.avatar.url}
                  commentId={c._id}
                  comment={c.comment}
                  name={c.user.name}
                  isAccount={isAccount}
                />
              ))}
          </div>
        </Dialog>
        <Dialog
          open={captionToggle}
          onClose={() => setCaptionToggle(!captionToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Update Your Caption</Typography>
            <form className="commentForm" onSubmit={updateCaptionHandler}>
              <input
                type="text"
                placeholder="Update Your Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
              <Button type="submit" variant="contained">
                Update
              </Button>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Post;
