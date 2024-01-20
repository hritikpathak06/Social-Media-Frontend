import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Post.css";
import { BiComment, BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
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

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDeleted = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [comment, setComment] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);

  const handleLike = async () => {
    setLiked(!liked);
    dispatch(likeAndDislike(postId));
    if (isAccount) {
      console.log("MY ACCOUNT");
    } else {
      await dispatch(getPostsOfFollowingUser());
    }
    toast.success(message);
  };

  const addCommentHandler = async (event) => {
    event.preventDefault();
    console.log(postId);
    console.log(comment);
    await dispatch(commentOnPost({ postId, comment }));
    if (isAccount) {
      console.log("MY ACCOUNT");
    } else {
      dispatch(getPostsOfFollowingUser());
    }
    toast.success(message);
  };

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
          {isAccount ? (
            <Button>
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
            {caption}
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
          <Button>{isAccount ? <MdDelete /> : null}</Button>
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
      </div>
    </>
  );
};

export default Post;
