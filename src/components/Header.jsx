import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#FFF", padding: "10px 200px" }}>
      <Link to="/">
        <img src={logo} />
      </Link>
    </div>
  );
};

export default Header;
