import React, { useState } from "react";
import "./UpdateProfile.css";
import { Avatar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slices/updateCaptionSlices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../redux/slices/authSlices";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState();
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  // Update Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, avatar }));
    toast.success("Profile Updated Successfully");
    dispatch(getMyProfile());
    navigate("/account");
  };

  return (
    <>
      <div className="updateProfile">
        <form className="updateProfileForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            Update Profile
          </Typography>
          <Avatar
            src={avatarPrev}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            type="text"
            value={name}
            placeholder="Name"
            className="updateProfileInputs"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="updateProfileInputs"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Update</Button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
