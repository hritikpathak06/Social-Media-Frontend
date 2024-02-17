import { Avatar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <Avatar
        src={avatar}
        alt={name}
        sx={{ margin: "10px", border: "3px solid black" }}
      />
      <Typography color={"blue"}>{name}</Typography>
    </Link>
  );
};

export default User;
