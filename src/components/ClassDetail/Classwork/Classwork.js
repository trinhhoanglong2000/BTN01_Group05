import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Divider } from "@mui/material";
import CreateAssignment from "./Dialog/CreateAssignment";

import { getGradeStructure, getHomeWorks, CheckTeacher, RemoveHomeWork } from "../../../api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import * as TemplateXML from "../../../FileTemplate"
export const Classwork = () => {
  const params = useParams();
  const [auth, setAuth] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [topic, setTopic] = useState(["All Topics"]);
  const [Update, setUpdate] = useState(false)
  const [Upload, setUpload] = useState(false)
  const [gradeStuct, setGradeStruct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alignment, setAlignment] = React.useState("ios");
  const [homework, setHomeWork] = useState([]);
  const [count, setCount] = useState(0);
  const [teacher, setTeacher] = useState(false);

  //dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setCount(event.currentTarget.value);

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleCreateAssignment = () => {
    setCount(homework.length);
    setUpdate(false)

    setOpenDialog(true);
  };
  const update = (event) => {
    setAnchorEl(null);
    setUpdate(true)
    setOpenDialog(true);

  };
  const upload = (event) => {
    document.getElementById("upload").click()
    document.getElementById("upload").value = "";
  }
  const Delete = async (event) => {


    let result = {};
    try {
      result = await RemoveHomeWork({ id: homework[count].id })
    } catch (error) {

    }
    if (result.success) {
      const Clone = homework.slice();
      const newValue = Clone.filter((ele) => ele.id !== homework[count].id)
      setHomeWork(newValue)
    } else {

    }

    setAnchorEl(null);
  };

  useEffect(() => {
    GetData();
    return () => {
      setAuth(false);
      setLoading(false);
    };
  }, []);
  const GetData = async () => {
    setLoading(true);
    let data = {};
    let hw = {};
    let teach = {};
    try {
      data = await getGradeStructure(params.id);
      hw = await getHomeWorks(params.id);
      teach = await CheckTeacher(params.id);
    } catch (error) {
      console.log(error);
    }
    if (data.success) {
      setGradeStruct(data.data);
      setHomeWork(hw.data);
      setTeacher(teach.data[0].type);
    } else {
      if (data.message === "jwt expired") localStorage.clear();
      setAuth(false);
    }
    setLoading(false);
  };
  return (
    <div>

      {!auth && <Navigate to="/login" />}
      {openDialog && (
        <CreateAssignment
          open={openDialog}
          setOpen={setOpenDialog}
          value={homework}
          setValue={setHomeWork}
          current={count}
          gradeStruc={gradeStuct}
          update={Update}
        />
      )}

      {loading && (
        <LinearProgress sx={{ position: "fixed", top: 64, width: "100vw" }} />
      )}

      <Container sx={{ width: "80vw" }}>
        <Container
          sx={{ width: "71%", marginTop: "5px", marginBottom: "10px" }}
        >
          <input
            className="displayNone"
            id="upload"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              TemplateXML.readExcel(file);
            }}
          />
          <Button
            onClick={handleCreateAssignment}
            sx={{
              borderRadius: 5,
              color: "white",
              textTransform: "none",
              background: "#3C403D",
              "&:hover": {
                background: "#3C403D",
              },
              marginBottom: 1,
              marginTop: 3,
            }}
            disabled={!teacher}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Create
          </Button>
          <Divider sx={{ marginY: "10px", background: "black" }} />
        </Container>
        <Grid container spacing={2} justifyContent="center" column={12}>
          <Grid item xs={2}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              orientation="vertical"
            >
              {topic.map((item, key) => {
                return (
                  <ToggleButton key={key}
                    value=""
                    sx={{ color: "black", border: "none", fontSize: "0.7rem" }}
                  >
                    {item}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={8}>
            <Container sx={{ padding: "0px!important" }}>
              {homework.map((value, index) => (
                <Toolbar
                  sx={{ padding: "0px!important", width: "100%" }}
                  key={index}
                >
                  <Accordion
                    sx={{ background: "rgba(255,255,255,0.3)", width: "100%" }}
                  >
                    <AccordionSummary
                      sx={{ color: "black", opacity: "1!important" }}
                      aria-controls="panel1a-content"
                    >
                      <Typography variant="subtitle1">{value.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="caption">
                        {value.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  {/*  */}
                  {teacher && <IconButton IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    value={index}
                  >
                    <MoreVertIcon />
                  </IconButton>}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "15ch",
                      },
                    }}
                  >

                    <MenuItem
                      data-my-value={index}
                      onClick={(event) => update(event)}
                    >
                      <UpdateIcon />
                      Update
                    </MenuItem>
                    <MenuItem
                      data-my-value={index}
                      onClick={(event) => Delete(event)}
                    >
                      <DeleteIcon />
                      Delete
                    </MenuItem>
                  </Menu>
                </Toolbar>
              ))}
            </Container>
          </Grid>
          <Grid item xs={2}>
            <Container></Container>
          </Grid>
        </Grid>
      </Container>
    </div >
  );
};
