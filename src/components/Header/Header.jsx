import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <>
      <div className="header">
        <NavLink to={"/"} onClick={() => setTab("/")}>
          {tab === "/" ? <FaHome style={{ color: "black" }} /> : <MdHome />}
        </NavLink>
        <NavLink to={"/newpost"} onClick={() => setTab("/newpost")}>
          {tab === "/newpost" ? (
            <IoIosAdd style={{ color: "black" }} />
          ) : (
            <IoMdAdd />
          )}
        </NavLink>
        <NavLink to={"/search"} onClick={() => setTab("/search")}>
          {tab === "/search" ? (
            <FaSearch style={{ color: "black" }} />
          ) : (
            <IoSearch />
          )}
        </NavLink>
        <NavLink to={"/account"} onClick={() => setTab("/account")}>
          {tab === "/account" ? (
            <MdAccountCircle style={{ color: "black" }} />
          ) : (
            <RiAccountPinCircleFill />
          )}
        </NavLink>
      </div>
    </>
  );
};

export default Header;
