import React, { useEffect, useState } from "react";
import "./Register.css";
import { Avatar, Button, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, registerUser } from "../../redux/slices/authSlices";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671159.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais");

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, avatar }));
    dispatch(getMyProfile());
    if (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success("User registered successfully");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <div className="register">
        <form action="" className="registerForm" onSubmit={handleRegister}>
          <Typography variant="h3" sx={{ padding: "2vmax" }}>
            Register Now
          </Typography>

          <Avatar
            src={avatar}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            required
            className="registerInputs"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Your Email"
            value={email}
            className="registerInputs"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            className="registerInputs"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
          <NavLink to={"/login"}>Already Have an Account??</NavLink>
        </form>
      </div>
    </>
  );
};

export default Register;
