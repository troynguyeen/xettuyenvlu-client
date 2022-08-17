import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const HeaderAdmin = (props) => {
  return (
    <div style={{ backgroundColor: "#FFF", padding: "10px 200px" }}>
      {props.location.pathname === "/xettuyen-vlu-admin/login" ? (
        <Link
          to={
            props.user !== null
              ? "/xettuyen-vlu-admin"
              : "/xettuyen-vlu-admin/login"
          }
        >
          <img src={logo} />
        </Link>
      ) : (
        <Link to="/xettuyen-vlu-admin">
          <img src={logo} />
        </Link>
      )}
    </div>
  );
};

export default HeaderAdmin;
