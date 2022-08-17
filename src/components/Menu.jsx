import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Link, useLocation } from "react-router-dom";

const useStyles = createUseStyles({
  menu: {
    backgroundColor: "#c61d23",
    display: "flex",
    alignItems: "center",
    padding: "0 200px",
  },
  menuItem: {
    color: "#FFF",
    fontSize: "15px",
    textDecoration: "none",
    padding: "15px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(159 1 7)",
      color: "#FFF",
    },
  },
});

const Menu = (props) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.menu}>
      <a
        className={classes.menuItem}
        href="https://tuyensinh.vanlanguni.edu.vn/"
        target="_blank"
      >
        TUYỂN SINH 2022
      </a>
      <Link
        to="/hocba"
        className={classes.menuItem}
        style={
          location.pathname == "/hocba" || location.pathname == "/" || location.pathname == "/preview"
            ? { backgroundColor: "rgb(159 1 7)" }
            : {}
        }
      >
        XÉT HỌC BẠ THPT
      </Link>
      <Link
        to="/hosocuatoi"
        className={classes.menuItem}
        style={
          location.pathname == "/hosocuatoi"
            ? { backgroundColor: "rgb(159 1 7)" }
            : {}
        }
      >
        HỒ SƠ CỦA TÔI
      </Link>
    </div>
  );
};

export default Menu;
