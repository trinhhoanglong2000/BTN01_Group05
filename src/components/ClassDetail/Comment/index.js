import React, { useState, useEffect, useContext} from "react";
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
import { createHomeWork, UpdateHomeWork, postReviewRequest, GetReviewComment, AddReviewComment } from "../../../api";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useParams, Navigate } from "react-router-dom";
import {getAllAccountFromClass} from '../../../api'
import { Context } from '../../../Context/context'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Comment({ idhomework, idaccount, isteacher }) {
  const [newCmt, setNewCmt] = useState("")
  const [data, setData] = useState([])
  const params = useParams();
  const context = useContext(Context)
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([])
  const handleSend = async () => {
    await AddReviewComment(idhomework, idaccount, newCmt, isteacher)
    await GetReviewComment(idhomework, idaccount).then(res => setData(res.data))
    if (!isteacher){
      for (var i = 0; i < teachers.length; i++) {

        context.socket?.emit("sendNotification", {
          receiverId: teachers[i].accountid,
          message: "A student has comment from a grade review"
        })
      }
    }
    else {
      context.socket?.emit("sendNotification", {
        receiverId: idaccount,
        message: "Your Grade Review has been commented"
      })
    }
    setNewCmt("")

  }
  useEffect(async () => {
    GetTeacherData();
    let GetData = await GetReviewComment(idhomework, idaccount).then(res => setData(res.data))
    return () => {
      setData(GetData)
      setLoading(false);
    };
  }, []);
  console.log(data)
  const GetTeacherData = async () => {
    setLoading(true);

    let data = {};
    try {
      data = await getAllAccountFromClass(params.id);
      
    } catch (error) {
      console.log(error);
    }
    if (data.success) {
      //const teacher = data.data.filter((word) => word.type === true);
      const teacher = data.data.filter((word) => word.type === true);
      await setTeachers(teacher);
    } else {
      if (data.message === "jwt expired") localStorage.clear();
    }
    setLoading(false);
  };
  return (
    <div className="review-place">
      <Container>
        <Typography sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Comment</Typography>
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
            name="New message"
            multiline
            rows={3}

            onInput={(e) => setNewCmt(e.target.value)}
            variant="filled"
            inputProps={{
              style: { fontSize: 16 },
            }} // font size of input text
            InputLabelProps={{ style: { fontSize: 13 } }} // font size of input l
            fullWidth
          />

        </Box>
        <Box sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "end"
        }}>
          <Button onClick={handleSend}>
            Send
          </Button>
        </Box>

        {data && data.map((item) => (
          <Box sx={{
            display: "flex",
            alignItems: "flex-end",
            marginTop: "20px",
            marginBottom: '20px'
          }}>
            <AccountCircleIcon
              sx={{
                color: "action.active",
                mr: 1,
                my: 0.5,
                alignSelf: "flex-start",
              }}
            />
            <TextField
              label={item.firstname + " " + item.lastname}
              name="New message"
              multiline
              value={item.content}
              defaultValue={item.content}
              disabled
              variant="filled"
              inputProps={{
                style: { fontSize: 16, padding: 10 },
              }} // font size of input text
              InputLabelProps={{ style: { fontSize: 16 } }} // font size of input l
              fullWidth
            />
          </Box>
        ))}

      </Container>
    </div>
  );
}
