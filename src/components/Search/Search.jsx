import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../User/User";
import "./Search.css";
import { getAllUsers } from "../../redux/slices/userSlices";

const Search = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };
  return (
    <>
      <div className="search">
        <form className="searchForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            Social Aap
          </Typography>

          <input
            type="text"
            value={name}
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <Button disabled={loading} type="submit">
            Search
          </Button>

          <div className="searchResults">
            {users &&
              users.map((user) => (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
