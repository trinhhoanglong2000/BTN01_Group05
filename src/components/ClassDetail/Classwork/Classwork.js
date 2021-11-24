import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { getAllAccountFromClass } from "../../../api";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Divider } from "@mui/material";
import CreateAssignment from "./Dialog/CreateAssignment";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const Classwork = () => {
  const params = useParams();
  const [auth, setAuth] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [classes, setClasses] = useState({});
  const [topic, setTopic] = useState(["All Topics"]);
  const [loading, setLoading] = useState(false);
  const [alignment, setAlignment] = React.useState("ios");
  const [homework, setHomeWork] = useState([
    
  ]);
  const [count, setCount] = useState(0);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleCreateAssignment = () => {
    setCount(homework.length);
    setOpenDialog(true);
  };

  const handleSubmit = () => {};
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
      {openDialog && (
        <CreateAssignment
          open={openDialog}
          setOpen={setOpenDialog}
          value={homework}
          setValue={setHomeWork}
          current={count}
        />
      )}

      {loading && (
        <LinearProgress sx={{ position: "fixed", top: 64, width: "100vw" }} />
      )}

      <Container sx={{ width: "80vw" }}>
        {/* <Container>
          <Typography variant="h4">Assignment</Typography>

          <Accordion />
        </Container> */}

        <Container
          sx={{ width: "71%", marginTop: "5px", marginBottom: "10px" }}
        >
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
                  <ToggleButton
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
              <List
                sx={{
                  width: "100%",
                  padding: "0px",
                  backgroundColor: " transparent",
                }}
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader sx={{ backgroundColor: " transparent" }}>
                    Nested List Items
                  </ListSubheader>
                }
              ></List>
            </Container>
          </Grid>
          <Grid item xs={2}>
            <Container></Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
