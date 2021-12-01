import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import Card from "./Card/Card";
import { TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useParams, Navigate } from "react-router-dom";
import { getAllAccountFromClass } from "../../../api";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

import UploadIcon from '@mui/icons-material/Upload';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const ClassDetail = () => {
  const params = useParams();
  const [auth, setAuth] = useState(true);
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(false);
  const [Thongbao, setThongBao] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    GetAllClass();
    return () => {
      setAuth(false);
      setClasses({});
      setLoading(false);
    };
  }, []);
  const GetAllClass = async () => {
    setLoading(true);
    let data = {};

    try {
      data = await getAllAccountFromClass(params.id);
    } catch (error) {
      console.log(error);
    }
    if (data.success) {
      const teacher = data.data.filter((word) => word.type === true);

      const student = data.data.filter((word) => word.type === false);
      await setClasses({ teacher: teacher, student: student });
    } else {
      if (data.message === "jwt expired") localStorage.clear();
      setAuth(false);
    }
    setLoading(false);
  };

  return (
    <div>
      {!auth && <Navigate to="/login" />}

      {loading && (
        <LinearProgress sx={{ position: "fixed", top: 64, width: "100vw" }} />
      )}
      <Container sx={{ width: "80vw", marginTop: "20px" }}>
        {/* <Container sx={{width: "100%", height: "auto", paddingLeft: '0!important', paddingRight: '0!important',display:'flex',justifyContent:'center',maxWidth:'1000px' }}> */}
        <Container
          sx={{
            width: "100%",
            height: "auto",
            paddingLeft: "0!important",
            paddingRight: "0!important",
            display: "flex",
            justifyContent: "center",
            maxWidth: "1000px",
            position: "relative",
          }}
        >
          {" "}
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            
            sx={{ position: "absolute", top: 0, right: 0, color: "white" }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem>
              <UploadIcon />
              Upload photo
            </MenuItem>
            <MenuItem >
              <ColorLensIcon />
              Select theme
            </MenuItem>
          </Menu>
          <img
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
            src="/images/sSTaa0-dark-energy-4000x1000.jpg"
            alt=""
          />
        </Container>
        <Grid container spacing={2} sx={{ marginTop: "10px" }} columns={20}>
          <Grid item xs={20} sm={5} md={3} sx={{}}>
            <Container
              sx={{
                border: "1px solid gray",
                borderRadius: "10px",
                padding: "16px!important",
                marginRight: "10px",
              }}
            >
              <Typography variant="subtitle2" sx={{ marginBottom: "10px" }}>
                Upcoming
              </Typography>
              <Typography variant="caption" gutterBottom>
                No work due soon
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={20} sm={15} md={17}>
            <Container sx={{ paddingRight: "0!important",paddingLeft: "0!important"}}>
              {Thongbao ? (
                <Container
                  sx={{
                    width: "100%",
                    border: "1px solid gray",
                    borderRadius: "10px",

                    padding: "16px",
                  }}
                >
                  Text Field is here
                </Container>
              ) : (
                <Button
                  sx={{
                    width: "100%",
                    border: "1px solid gray",
                    borderRadius: "10px",

                    padding: "16px",
                  }}
                  onClick={() => {
                    setThongBao(true);
                  }}
                >
                  <Toolbar
                    sx={{
                      height: "32px",
                      minHeight: "32px!important",
                      width: "100%",
                      padding: "0!important",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        marginRight: "10px",
                      }}
                    >
                      M
                    </Avatar>
                    <Typography variant="caption" sx={{ color: "black" }}>
                      Share something with your class...
                    </Typography>
                  </Toolbar>
                </Button>
              )}
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ClassDetail;
