import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import { getMyProfile } from "./redux/slices/authSlices";
import Register from "./components/Register/Register";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import NewPost from "./components/NewPost/NewPost";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import UserProfile from "./components/UserProfile/UserProfile";
import Search from "./components/Search/Search";

const App = () => {
  useEffect(() => {
    store.dispatch(getMyProfile());
  }, []);

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        {isAuthenticated && <Header />}
        <Toaster />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route
            path="/account"
            element={isAuthenticated ? <Account /> : <Login />}
          />
          <Route
            path="/newpost"
            element={isAuthenticated ? <NewPost /> : <Login />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Account /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Account /> : <Register />}
          />
          <Route
            path="/update/profile"
            element={isAuthenticated ? <UpdateProfile /> : <Login />}
          />
          <Route
            path="/update/password"
            element={isAuthenticated ? <UpdatePassword /> : <Login />}
          />
          <Route
            path="/user/:id"
            element={isAuthenticated ? <UserProfile /> : <Login />}
          />
          <Route
            path="/search"
            element={isAuthenticated ? <Search /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
