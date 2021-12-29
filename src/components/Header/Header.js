import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import IconButton from "@mui/material/IconButton";

import Avatar from "@mui/material/Avatar";
import { useNavigate, Navigate, useParams } from "react-router";
import { default as Drawer } from "../Drawer/Drawer";

import { getAccount } from "../../api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { default as ManageAccount } from "./Dialog/ManageAccount";
import SimpleBadge from "./Badge/Badge";
import ColorToggleButton from "./ToggleButton/ToggleButton";
export default function Header() {
  const params = useParams();

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [auth, setAuth] = useState(true);
  const [account, setAccount] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const editprofile = () => {
    setOpenDialog(true);
  };

  useEffect(() => GetAccount(), []);
  const GetAccount = async () => {
    let data = {};
    try {
      data = await getAccount();
    } catch (error) {
      console.log(error);
    }
    if (data.success) {
      setAccount(data.data[0]);
    } else {
      if (data.message === "jwt expired") localStorage.clear();
      setAuth(false);
    }
  };
  return (
    <>
      {!auth && <Navigate to="/login" />}
      <ManageAccount
        open={openDialog}
        setOpen={setOpenDialog}
        account={account}
        setAccount={setAccount}
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background: "#9DC183",
          }}
        >
          <Toolbar sx={{ paddingLeft: "0 !important", position: "relative" }}>
            <Toolbar sx={{ position: "absolute;", top: "0px;", left: "0px;", height: '100%' }}>
              <Drawer />

              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "black" }}
              >
                Classroom
              </Typography>
            </Toolbar>
            {params.id !== undefined && (
              <ColorToggleButton
                sx={{
                  margin: "0px auto;",
                  "@media (max-width: 670px)": {
                    alignItems: 'flex-end',
                    height: '150px'

                  },
                }}
              />
            )}
            <div style ={{width:75}}>
              <SimpleBadge sx={{
                ml: 2,
                mr: 2,
                position: "absolute",
                top: "0px;",
                right: "100px",
                height: "100%",
              }} />
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{
                  ml: 2,
                  mr: 2,
                  position: "absolute",
                  top: "0px;",
                  right: "0px;",
                  height: "100%",
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                  }}
                >
                  M
                </Avatar>
              </IconButton>

            </div>
            {/*  */}

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
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
              <MenuItem
                sx={{
                  color: "black",
                  justifyContent: "center",
                  display: "flex",
                }}
                disabled
              >
                <Avatar>M</Avatar>

              </MenuItem>

              <MenuItem
                disabled
                sx={{
                  color: "black",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  title="Free Web tutorials"
                >
                  <Typography
                    gutterBottom
                    noWrap
                    variant="subtitle1"
                    sx={{
                      color: "black",
                      textAlign: "center",
                      width: "80%",
                    }}
                  >
                    {account.username}
                  </Typography>
                </div>
              </MenuItem>

              <Divider sx={{ marginBottom: "7px" }} />

              <MenuItem onClick={editprofile}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={signout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            {/*  */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
