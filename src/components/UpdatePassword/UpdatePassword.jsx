// import "./UpdatePassword.css";
// import React, { useEffect, useState } from "react";
// import { Typography, Button } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { updatePassword } from "../../redux/slices/updateCaptionSlices";

// const UpdatePassword = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const dispatch = useDispatch();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(updatePassword(oldPassword, newPassword));
//   };

//   return (

//   );
// };

// export default UpdatePassword;

import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/slices/updateCaptionSlices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { loading, message, error } = useSelector((state) => state.caption);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword({ oldPassword, newPassword }));
    toast.success(message);
    navigate("/account");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      <div className="updatePassword">
        <form className="updatePasswordForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            Update Password
          </Typography>

          <input
            type="password"
            placeholder="Old Password"
            required
            value={oldPassword}
            className="updatePasswordInputs"
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            required
            className="updatePasswordInputs"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button type="submit">Change Password</Button>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
