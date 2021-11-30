import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import NotesIcon from "@mui/icons-material/Notes";
import Typography from "@mui/material/Typography";

import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Topics from "../Dropdown/Topics";
import moment from "moment";
import LinearProgress from "@mui/material/LinearProgress";
import { createHomeWork, UpdateHomeWork } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAssignment({
  open,
  setOpen,
  value,
  setValue,
  current,
  gradeStruc,
  update,
}) {
  const params = useParams();
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [errmessage, setErrmessage] = useState("");
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: null,
    description: null,
    grade: "100",
    due: dateTime,
    gradeStruct: null,
  });
  useEffect(() => {
    if (value[current] !== undefined) {
      const copy = value.slice();

      setInput((input) => ({
        ...input,
        title: copy[current].name,
        description: copy[current].description,
        grade: copy[current].grade,
        due: copy[current].endday,
        gradeStruct: copy[current].idgradestructure,
      }));
    }
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handlesubmit = async () => {
    setLoading(true);
    const dueTime = moment(input.due, "dd/MM/yyyy hh:mm:ssa").format(
      "YYYY/MM/DD HH:mm:ss"
    );
    const cpy = {
      idclass: params.id,
      name: input.title,
      description: input.description,
      grade: input.grade,
      endday: input.due,
      idgradestructure: input.gradeStruct,
    };

    let result = {};
    try {
      if (update) {
        result = await UpdateHomeWork({ ...cpy, id: value[current].id });
      } else {
        result = await createHomeWork(cpy);
      }
    } catch (error) {}
    if (result.success) {
      if (update) {
        const newValue = {
          ...cpy,
          startday: value[current].startday,
          id: value[current].id,
        };
        const Clone = value.slice();
        Clone[current] = newValue;
        setValue(Clone);
      } else {
        setValue(
          value.concat([{ ...cpy, startday: new Date(), id: result.data.id }])
        );
      }

      setErr(false);
      setOpen(false);
    } else {
      if (result==="Unauthorized"){
        localStorage.clear();
        navigate('/login')
      }
      alert(result.message);
      if (result.message === "Time error") {
        //Due day must greater than current
        setErr(true);
        setErrmessage("Due Time must greater than current time");
      }
    }

    setLoading(false);
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            background: "#9DC183",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, color: "black" }}
              variant="h6"
              component="div"
            >
              Assignment
            </Typography>
            <Button
              onClick={handlesubmit}
              sx={{ color: "black" }}
              autoFocus
              color="inherit"
            >
              Assign
            </Button>
          </Toolbar>
        </AppBar>
        {loading && <LinearProgress />}

        <Grid
          container
          justifyContent="center"
          column={12}
          sx={{ height: "100%", borderTop: "1px solid gray" }}
        >
          {/* xs={12} sm={6} md={3} lg={2} */}
          <Grid item xs={8} md={10} sx={{ borderRight: "1px solid gray" }}>
            <Container sx={{}}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: "20px",
                }}
              >
                <TopicOutlinedIcon
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                  }}
                />
                <TextField
                  label="Title"
                  variant="filled"
                  sx={{ padding: "0px!important" }}
                  inputProps={{
                    style: { fontSize: 16, paddingBottom: 0, paddingTop: 20 },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                  fullWidth
                  name="title"
                  defaultValue={input.title}
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: "20px",
                }}
              >
                <NotesIcon
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                  }}
                />
                <TextField
                  label="Description"
                  multiline
                  rows={5}
                  variant="filled"
                  inputProps={{
                    style: { fontSize: 16 },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input l
                  fullWidth
                  name="description"
                  defaultValue={input.description}
                  onChange={handleChange}
                />
              </Box>
            </Container>
          </Grid>
          <Grid item xs={4} md={2}>
            <Container sx={{ marginTop: "20px" }}>
              <Box>
                <Typography sx={{ marginBottom: "15px" }}>Grade</Typography>
                <TextField
                  name="grade"
                  defaultValue={input.grade}
                  onChange={handleChange}
                  variant="filled"
                  sx={{ padding: "0px!important" }}
                  inputProps={{
                    style: {
                      fontSize: 16,
                      paddingBottom: 0,
                      paddingTop: 5,
                      width: "75px",
                    },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                />
              </Box>
              <Box>
                <Typography sx={{ marginBottom: "15px", marginTop: "30px" }}>
                  Due
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    value={input.due}
                    onChange={(newValue) => {
                      setInput({ ...input, due: newValue });
                    }}
                    inputFormat="dd/MM/yyyy hh:mm:ssa"
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <TextField
                        inputProps={inputProps}
                        InputProps={InputProps}
                        inputRef={inputRef}
                        variant="filled"
                      ></TextField>
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <Typography sx={{ marginBottom: "15px", marginTop: "30px" }}>
                  Topic
                </Typography>
                <Topics
                  gradeStruc={gradeStruc}
                  input={input}
                  setInput={setInput}
                />
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
