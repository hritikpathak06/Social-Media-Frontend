import React, { useEffect, useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, loginUser } from "../../redux/slices/authSlices";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("ritik@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
    dispatch(getMyProfile());
    // window.location.reload();
  };
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("user logged in successfully");
      navigate("/");
    }
    if (error) {
      toast.error("Something went wrong");
    }
  }, [isAuthenticated, error, navigate]);
  return (
    <>
      <div className="login">
        <form action="" className="loginForm" onSubmit={handleLogin}>
          <h3 className="__login__title">Social Media</h3>
          <input
            type="text"
            placeholder="Enter Your Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
          <NavLink to={"/register"}>Don't Have an account??</NavLink>
        </form>
      </div>
    </>
  );
};

export default Login;
