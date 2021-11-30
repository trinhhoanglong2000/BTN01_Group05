import React, { useEffect, useState } from "react";

import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getAllAccountFromClass,
  getHomeWorks,
  CheckTeacher,
} from "../../../api";
import StructureButton from "./StructureButton/StructureButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import * as TemplateXML from "../../../FileTemplate";
var FileSaver = require('file-saver');
const rows = [
  {
    name: "Ice cream sandwich",
    calories: 1,
    fat: 2,
    carbs: 3,
    protein: 4,
  },
  {
    name: "Ice cream sandwich 2",
    calories: 12,
    fat: 22,
    carbs: 32,
    protein: 42,
  },
  {
    name: "Ice cream sandwich 1232",
    calories: 12,
    fat: 22,
    carbs: 32,
    protein: 42,
  },
  {
    name: "Ice cream sandwich 12232",
    calories: 12,
    fat: 22,
    carbs: 32,
    protein: 42,
  },
];

export const Grade = () => {
  const params = useParams();
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [homework, setHomeWork] = useState([]);
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState(false);
  const [openUpdate, setOpenUpdate] = useState([]);
  const [count, setCount] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [grades,setGrades] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenUpdate(false);

    setAnchorEl(null);
  };
  useEffect(() => {
    GetGrade();
    return () => {
      setAuth(false);
      setLoading(false);
    };
  }, []);

  const getData = async (file) => {
    let promiseData = await TemplateXML.readExcel(file)
    console.log(homework[count]);
    console.log(promiseData)
  }
  const GetGrade = async () => {
    setLoading(true);

    let data = {};
    let hw = {};
    let teach = {};
    try {
      data = await getAllAccountFromClass(params.id);
      hw = await getHomeWorks(params.id);
      teach = await CheckTeacher(params.id);
    } catch (error) {
      console.log(error);
    }
    if (data.success) {
      setHomeWork(hw.data);
      //const teacher = data.data.filter((word) => word.type === true);

      const student = data.data.filter((word) => word.type === false);
      setTeacher(teach.data[0].type);

      await setStudent(student);

      //set Up grades
      let arr =[]
      student.forEach((element) => {
        let tmp = [];
        hw.data.forEach((value)=>{
          tmp.push(null);
        })
        arr.push(tmp);
      });
    } else {
      if (data.message === "jwt expired") localStorage.clear();
      setAuth(false);
    }
    setLoading(false);
  };
  const upload = () =>{
    //coi thu console log la thay dc du lieu cua homework dc chon
    document.getElementById("upload").click()
    document.getElementById("upload").value=""
   
  }
  const download = ()=>{
    FileSaver.saveAs(TemplateXML.StudentGradeTemplate(), 'StudentGradeTemplate.xlsx')
  }
  return (
    <div>
      {!auth && <Navigate to="/login" />}

      {loading && (
        <LinearProgress sx={{ position: "fixed", top: 64, width: "100vw" }} />
      )}
      <StructureButton />
      <input
          class="displayNone"
          id="upload"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            getData(file);
            e.target.value = ""
          }}
        />
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
          aria-label="caption table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "200px",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  wordBreak: "break-word",
                }}
              >
                Students
              </TableCell>
              <TableCell
                sx={{
                  width: "100px",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  wordBreak: "break-word",
                }}
              >
                Total Score
              </TableCell>
              {homework.map((value, index) => (
                <TableCell
                  key={value.id}
                  onMouseOver={() => {
                    setCount(index);
                    setOpenUpdate(true);
                  }}
                  onMouseLeave={() => {
                    setOpenUpdate(false);
                    setAnchorEl(false);
                  }}
                  sx={{
                    width: "120px",
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    wordBreak: "break-word",
                  }}
                  align="left"
                >
                  <Toolbar sx={{ width: "100%", padding: "0!important" }}>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",

                        padding: 0,
                        display: "-webkit-box",
                        "-webkit-box-orient": "vertical",
                        "-webkit-line-clamp": 2 /* number of lines to show */,
                        lineHeight: "1.5em" /* fallback */,
                        maxHeight: "3em" /* fallback */,
                        flexGrow: 1,
                      }}
                    >
                      {value.name}
                    </Typography>
                    {openUpdate && index === count && (
                      <>
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                          value={index}
                          sx={{ padding: "0!important" }}
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
                              width: "15ch",
                            },
                          }}
                        >
                          <MenuItem
                            data-my-value={index}
                            onClick={upload}
                          >
                            <FileUploadIcon />
                            Upload
                          </MenuItem>
                          <MenuItem
                            data-my-value={index}
                            onClick={download}
                          >
                            <FileDownloadIcon />
                            Download
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                  </Toolbar>
                </TableCell>
              ))}

              <TableCell
                sx={{
                  border: "1px solid black",
                  borderRight: 0,
                  borderLeft: 0,
                  borderCollapse: "collapse",
                  wordBreak: "break-word",
                }}
                align="left"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.map((row) => (
              <TableRow key={row.accountid}>
                <TableCell
                  sx={{
                    width: "200px",
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    wordBreak: "break-word",
                  }}
                  component="th"
                  scope="row"
                >
                  <Typography noWrap>{row.email}</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    width: "100px",
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    wordBreak: "break-word",
                  }}
                  align="left"
                >
                  {"null"}
                </TableCell>
                {homework.map((value, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: "100px",
                      border: "1px solid black",
                      borderCollapse: "collapse",
                      wordBreak: "break-word",
                    }}
                    align="left"
                  >
                    <TextField
                      variant="standard"
                      defaultValue={"Null"}
                      InputProps={{ disableUnderline: true }}

                    />
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    border: "1px solid black",
                    borderRight: 0,
                    borderLeft: 0,
                    borderCollapse: "collapse",
                    wordBreak: "break-word",
                  }}
                  align="left"
                ></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
