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
          <Route path="/account" element={isAuthenticated ? <Account /> : <Login />} />
          <Route path="/newpost" element={isAuthenticated ? <NewPost /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
