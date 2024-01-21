import React, { useEffect, useState } from "react";
import "./NewPost.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/slices/postSlices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAllMyPosts } from "../../redux/slices/getMyPostsSlices";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.post);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createPost({ caption, image }));
    toast.success("Post Created Successfully");
    dispatch(getAllMyPosts());
    navigate("/account");
  };

  useEffect(() => {
    if (error) {
      toast.error("Payload is too large...please try with different image");
    }
  }, [error]);

  return (
    <>
      <div className="newPost">
        <form className="newPostForm" onSubmit={submitHandler}>
          <Typography variant="h3">New Post</Typography>

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="post" />}

          <input
            type="text"
            placeholder="Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Processing" : "Post"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
