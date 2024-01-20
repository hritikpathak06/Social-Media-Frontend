import React, { useState } from "react";
import "./NewPost.css";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlices";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ caption, image }));
  };

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
          <Button type="submit">Post</Button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
