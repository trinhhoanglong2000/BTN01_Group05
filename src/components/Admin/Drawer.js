import React from "react";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
const drawerWidth = 200;

export const DrawerAdmin = () => {
  const navigate = useNavigate();
  const goHome = () => {};
  const signout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const options = [
    {
      text: "Accounts",
      onClick: goHome,
      icon: <GroupIcon />,
    },
    {
      text: "Classes",
      onClick: goHome,
      icon: <SchoolIcon />,
    },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          align="center"
          sx={{ width: 60, height: 60, marginTop: 3, marginBottom: 3 }}
          variant="square"
          alt="Remy Sharp"
          src="https://i.ibb.co/JmZbWBK/743532.png"
        />
      </Box>

      <Divider />
      <List>
        {options.map((text, index) => (
          <ListItem button key={text.text} onClick={text.onClick}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Sign out"].map((text, index) => (
          <ListItem button key={text} onClick={signout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
