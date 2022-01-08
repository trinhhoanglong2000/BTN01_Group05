import React, { useEffect, useState, useContext } from "react";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export default function SimpleBadge(socket) {
  const [notifications, setNotifications] = useState([]);
  React.useEffect(() => {
    socket.socket?.on("getNotification", data => {
      console.log("Hi")
      setNotifications(prev => [...prev, data])
    })
  }, [socket.socket])
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 80;

  //============================ Component Function
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editprofile = () => {
    console.log("Check")
  };
  //========================== return
  return (
    <div>
      <Badge badgeContent={notifications.length} color="primary">
        <IconButton
          onClick={handleClick}
        >
          <MailIcon color="action" />
        </IconButton>
        {/* <MailIcon color="action" /> */}
      </Badge>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{

        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '50ch',
          },
          elevation: 0,
          sx: {

            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 64,
              height: 64,
              ml: -0.5,
              mr: 1,
            },
            "& .Mui-disabled": {
              opacity: "1!important",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifications.map((data,key) => (
          <MenuItem key={key} onClick={handleClose}>
            {data.message}
          </MenuItem>
        ))}
      </Menu>

    </div>
  );
}