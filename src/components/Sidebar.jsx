import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const useStyles = createUseStyles({
  link: {
    color: "#FFF",
    textDecoration: "none",
  },
});

const customMUI = {
  item: {
    color: "#FFF",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      color: "#FFF",
    },
  },
  selected: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "#FFF",
  },
};

const Sidebar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Drawer
      sx={{
        width: props.drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.drawerWidth,
          boxSizing: "border-box",
          background:
            "linear-gradient(0deg, rgba(36,70,222,1) 0%, rgba(222,24,32,1) 100%)",
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={() => props.handleDrawerClose()}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon sx={{ color: "#FFF" }} />
          ) : (
            <ChevronRightIcon sx={{ color: "#FFF" }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <Link className={classes.link} to="/xettuyen-vlu-admin/admission">
          <ListItem
            button
            sx={
              location.pathname == "/xettuyen-vlu-admin" ||
              location.pathname == "/xettuyen-vlu-admin/" ||
              location.pathname.includes("/xettuyen-vlu-admin/admission")
                ? { ...customMUI.item, ...customMUI.selected }
                : customMUI.item
            }
          >
            <ListItemIcon>
              <AssignmentIndIcon sx={{ fontSize: "25px", color: "#FFF" }} />
            </ListItemIcon>
            <ListItemText primary={"Hồ sơ"} />
          </ListItem>
        </Link>
        {props.role === "Admin" ? (
          <React.Fragment>
            <Link className={classes.link} to="/xettuyen-vlu-admin/phase">
              <ListItem
                button
                sx={
                  location.pathname.includes("/xettuyen-vlu-admin/phase")
                    ? { ...customMUI.item, ...customMUI.selected }
                    : customMUI.item
                }
              >
                <ListItemIcon>
                  <EventNoteIcon sx={{ fontSize: "25px", color: "#FFF" }} />
                </ListItemIcon>
                <ListItemText primary={"Đợt xét tuyển"} />
              </ListItem>
            </Link>
            <Link
              className={classes.link}
              to="/xettuyen-vlu-admin/schedule"
            >
              <ListItem
                button
                sx={
                  location.pathname.includes("/xettuyen-vlu-admin/schedule")
                    ? { ...customMUI.item, ...customMUI.selected }
                    : customMUI.item
                }
              >
                <ListItemIcon>
                  <ManageHistoryIcon sx={{ fontSize: "25px", color: "#FFF" }} />
                </ListItemIcon>
                <ListItemText primary={"Lịch trình"} />
              </ListItem>
            </Link>
            <Link
              className={classes.link}
              to="/xettuyen-vlu-admin/notification"
            >
              <ListItem
                button
                sx={
                  location.pathname.includes("/xettuyen-vlu-admin/notification")
                    ? { ...customMUI.item, ...customMUI.selected }
                    : customMUI.item
                }
              >
                <ListItemIcon>
                  <ScheduleSendIcon sx={{ fontSize: "25px", color: "#FFF" }} />
                </ListItemIcon>
                <ListItemText primary={"Thông báo"} />
              </ListItem>
            </Link>
          </React.Fragment>
        ) : (
          ""
        )}
      </List>
      <Divider />
      {props.role === "Admin" ? (
        <React.Fragment>
          <List>
            <Link className={classes.link} to="/xettuyen-vlu-admin/account">
              <ListItem
                button
                sx={
                  location.pathname.includes("/xettuyen-vlu-admin/account")
                    ? { ...customMUI.item, ...customMUI.selected }
                    : customMUI.item
                }
              >
                <ListItemIcon>
                  <ManageAccountsIcon
                    sx={{ fontSize: "25px", color: "#FFF" }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Tài khoản"} />
              </ListItem>
            </Link>
          </List>
        </React.Fragment>
      ) : (
        ""
      )}
    </Drawer>
  );
};

export default Sidebar;
