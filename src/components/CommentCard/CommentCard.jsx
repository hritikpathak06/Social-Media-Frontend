import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { deleteCommentFromPost } from "../../redux/slices/messageSlices";
import { getPostsOfFollowingUser } from "../../redux/slices/getPostOfFollowingUsers";
import toast from "react-hot-toast";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  // Delete Comment Handler
  const deleteCommentHandle = () => {
    dispatch(deleteCommentFromPost({ postId, commentId }));
    if (isAccount) {
      console.log("MY Profile")
    } else {
      dispatch(getPostsOfFollowingUser());
    }
    toast.success(message);
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography sx={{marginLeft:"1rem"}}>{comment}</Typography>

      {isAccount ? (
        <Button onClick={deleteCommentHandle}>
          <MdDelete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandle}>
          <MdDelete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
