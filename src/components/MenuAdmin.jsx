import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { styled } from "@mui/material/styles";
import { BiUser } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  menu: {
    height: "70px",
    backgroundColor: "#c61d23",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 200px",
  },
  icon: {
    fontSize: "40px",
    color: "#FFF",
  },
  profileMenuOption: {
    fontSize: "15px",
    cursor: "pointer",
    padding: "5px 15px",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#808080",
    },
  },
  link: {
    textDecoration: "none",
    color: "#000",
    "&:hover": {
      color: "#000",
    },
  },
});

const customMUI = {
  iconButton: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  },
};

const MenuAdmin = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.menu}>
      <div style={{ padding: "15px" }}>
        {props.open ? (
          ""
        ) : (
          <IconButton
            sx={customMUI.iconButton}
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawerOpen}
          >
            <MenuIcon style={{ color: "#FFF", fontSize: "35px" }} />
          </IconButton>
        )}
      </div>

      <div
        id="profileMenu"
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleClick}
      >
        <BiUser className={classes.icon} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "5px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              color: "#FFF",
              fontSize: "14px",
              fontWeight: " bold",
            }}
          >
            {props.role}
            <IoMdArrowDropdown style={{ fontSize: "15px" }} />
          </span>
          <span
            style={{
              color: "#FFF",
              fontSize: "15px",
            }}
          >
            {props.user}
          </span>
        </div>
      </div>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profileMenu",
        }}
        sx={{
          marginTop: "15px",
          "&. css-ciy9n4-MuiPaper-root-MuiAppBar-root": {
            backgroundColor: "red !important",
            padding: "200px !important",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/xettuyen-vlu-admin/profile">
            <AccountCircleIcon sx={{ marginRight: "10px" }} />
            Thông tin tài khoản
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handleLogout();
          }}
        >
          <LogoutIcon sx={{ marginRight: "10px" }} />
          Đăng xuất
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuAdmin;
