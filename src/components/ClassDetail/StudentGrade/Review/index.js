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
import MessageIcon from '@mui/icons-material/Message';
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import RuleIcon from '@mui/icons-material/Rule';
import Toolbar from "@mui/material/Toolbar";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import moment from "moment";
import LinearProgress from "@mui/material/LinearProgress";
import { createHomeWork, UpdateHomeWork } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ReviewAssignment({data, setOpenDialog, openDialog, gradeStruct
}) {
    const getTopic = () => {
        if(gradeStruct && data)
            return gradeStruct.find(item => item.id == data.idgradestructure).description
        else 
            return null
    }
    console.log(data)
    const idhomework = data!= null ? data.idhomework: null;
    const idaccount = data!= null ? data.idaccount: null;

    const title = data!= null ? data.name: null;
    const dueDate = data!= null ? data.endday: null;
    const description = data!= null ? data.description: null;
    const grade = data!= null ? data.grade: null;
    const [expectationGrade, SetExpectationGrade ] = useState(grade);
    const [finalGrade, SetFinalGrade ] = useState(null);
    const createDate = null;
    const comfirmDate = null;
    const [expectationMess, SetExpectationMess ] = useState("");
    const [teacherMess, SetTeacherMess] = useState(null)
    const handleClose = () => {
        setOpenDialog(false);
      };
      if(!data){
          handleClose()
      }
    const handleSend = () => {
      console.log(expectationGrade);
      console.log(expectationMess);
      console.log(idhomework);
      console.log(idaccount)
    }
  return (
    <div>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={null}
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
              Assignment review
            </Typography>
            <Button
              onClick={handleSend}
              sx={{ color: "black" }}
              autoFocus
              color="inherit"
            >
              Send Review
            </Button>
          </Toolbar>
        </AppBar>
        <div className="assignment-info-place"> 
        <Grid
          container
          justifyContent="center"
          column={12}
          sx={{ height: "100%", borderTop: "1px solid gray" }}
        >
          {/* xs={12} sm={6} md={3} lg={2} */}
          <Grid item xs={4} md={2}>
            <Container sx={{ marginTop: "20px", marginLeft: "40px" }}>
            <Typography sx={{fontWeight: 'bolder', fontSize: '20px'}}>Homework score</Typography>
              <Box>
                <Typography sx={{marginTop: "20px"}}>Title</Typography>
                <TextField
                  name="grade"
                  disabled
                  defaultValue={title}
                  onChange={null}
                  variant="outlined"
                  sx={{ padding: "0px!important" }}
                  inputProps={{
                    style: {
                      fontSize: 16,
                      paddingBottom: 10,
                      paddingTop: 10,
                      width: "100%",
                    },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                />
              </Box>
              <Box>
                <Typography sx={{ marginTop: "15px" }}>Topic</Typography>
                <TextField
                  name="Topic"
                  disabled
                  defaultValue={getTopic()}
                  onChange={null}
                  variant="outlined"
                  sx={{ padding: "0px!important" }}
                  inputProps={{
                    style: {
                      fontSize: 16,
                      paddingBottom: 10,
                      paddingTop: 10,
                      width: "100%",
                    },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                />
              </Box>
              <Box>
                <Typography sx={{ marginTop: "15px" }}>
                  Done at
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    value={dueDate}
                    disabled
                    onChange={null}
                    defaultValue={dueDate}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <TextField
                        value={dueDate}
                        disabled
                        inputProps={inputProps}
                        InputProps={InputProps}
                        inputRef={inputRef}
                        variant="outlined"
                      ></TextField>
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <Typography sx={{  marginTop: "15px"}}>Grade</Typography>
                <TextField
                  name="grade"
                  disabled
                  defaultValue={grade}
                  onChange={null}
                  variant="outlined"
                  sx={{ padding: "0px!important" }}
                  inputProps={{
                    style: {
                      fontSize: 16,
                      paddingBottom: 10,
                      paddingTop: 10,
                      width: "100%",
                    },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                />
              </Box>
              <Box
              >
                <Typography sx={{  marginTop: "15px"}}>Description</Typography>
                <TextField
                  name="description"
                  disabled
                  defaultValue={description}
                  onChange={null}
                  variant="outlined"
                  sx={{ padding: "0px!important" }}
                  inputProps={{
                    style: {
                      fontSize: 16,
                      paddingBottom: 10,
                      paddingTop: 10,
                      width: "100%",
                    },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                />
              </Box>
            </Container>
          </Grid>
          <Grid item xs={8} md={10} sx={{ borderRight: "0px solid gray"  }}>
            <Container sx={{marginTop: '20px'}}>
            <Typography sx={{fontWeight: 'bolder', fontSize: '20px'}}>Review timeline</Typography>
            <Box sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: "20px",
                  marginBottom: '20px'
                }}>
              <RuleIcon
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                    
                  }}
                />
                  <TextField
                  name="Expectation grade "
                  label= "Expectation grade "
                  type={"number"}
                  value={expectationGrade}
                  onInput={(e) => SetExpectationGrade(e.target.value)}
            
                  rows={1}
                  variant="filled"
                  inputProps={{
                    style: { fontSize: 16 },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input l

                />
                <PublishedWithChangesIcon
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                    marginLeft: "50px",
                    
                  }}
                />
                <TextField
                  sx={{
                    
                  }}
                  disabled
                  name="Final grade "
                  label= "Final grade "
                  defaultValue={grade}
                  type={"number"}
                  value={finalGrade}
                  onInput={(e) => SetFinalGrade(e.target.value)}
            
                  rows={1}
                  variant="filled"
                  inputProps={{
                    style: { fontSize: 16 },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input l

                />
                { createDate &&
                (<CalendarTodayIcon sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                    marginLeft: "50px",
                  }}/>)}
                {createDate &&(<LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    label = "Create At"
                    name = "LastSend"
                    value = {comfirmDate}
                    disabled
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <TextField
                        label = "Create at"
                        disabled
                        name = "LastSend"
                        inputProps={inputProps}
                        InputProps={InputProps}
                        inputRef={inputRef}
                        variant="filled"
                      ></TextField>
                    )}
                  />
                </LocalizationProvider>)}
                { !createDate &&
                (<CalendarTodayIcon sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                    marginLeft: "50px",
                  }}/>)}
                {!createDate &&(<LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    label = "Create At"
                    name = "LastSend"
                    disabled
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <TextField
                        label = "Create at"
                        disabled
                        name = "LastSend"
                        inputProps={inputProps}
                        InputProps={InputProps}
                        inputRef={inputRef}
                        variant="filled"
                      ></TextField>
                    )}
                  />
                </LocalizationProvider>)}
                {comfirmDate&&(<EventAvailableIcon sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                    marginLeft: "50px",
                  }}/>)}
                {comfirmDate && (<LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    disabled
                    value={null}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <TextField
                        label = "Confirm At"
                        disabled
                        value={comfirmDate}
                        inputProps={inputProps}
                        InputProps={InputProps}
                        inputRef={inputRef}
                        variant="filled"
                      ></TextField>
                    )}
                  />
                </LocalizationProvider>)}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: "20px",
                  marginBottom: '20px'
                }}
              >
                <MessageIcon
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                  }}
                />
                
                <TextField
                  label="Explanation message"
                  name = "Explanation message"
                  multiline
                  value={expectationMess}
                  onInput={(e) => SetExpectationMess(e.target.value)}
                  rows={5}
                  variant="filled"
                  inputProps={{
                    style: { fontSize: 16 },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input l
                  fullWidth
                 

                />
                
              </Box>
              {teacherMess && (<Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: "20px",
                  marginBottom: '20px'
                }}
              >
                <MessageIcon
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                  }}
                />
                <TextField
                  label="Teacher message"
                  name = "Explanation message"
                  multiline
                  value={teacherMess}
                  onInput={(e) => SetTeacherMess(e.target.value)}
                  rows={5}
                  variant="filled"
                  inputProps={{
                    style: { fontSize: 16 },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input l
                  fullWidth
               
                />
              </Box>  )}
            </Container>
            <div className="review-place">
            <Container>
            <Typography sx={{fontWeight: 'bolder', fontSize: '20px'}}>Comment</Typography>
            <Box sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: "20px",
                  marginBottom: '20px'
                }}>
            <MessageIcon
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    alignSelf: "flex-start",
                  }}
                />
                <TextField
                  label="New message"
                  name = "New message"
                  multiline
                  rows={3}
                  variant="filled"
                  inputProps={{
                    style: { fontSize: 16 },
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 13 } }} // font size of input l
                  fullWidth
                />
            </Box>
            </Container>
            </div>
          </Grid>
        </Grid>
        </div>
        
      </Dialog>
    </div>
  );
}
