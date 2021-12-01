import React, { useEffect, useState } from "react";

import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getAllAccountFromClass,
  getHomeWorks,
  CheckTeacher,
  getAllGradeFromClass,
  UpdateGrades
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
import * as api from "../../../api";
var FileSaver = require("file-saver");

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
  const [grades, setGrades] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget.value);
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
    let homeWorkData = await TemplateXML.readExcel(file);
    var classId = homework[count].idclass;
    var homeworkId = homework[count].id;
    console.log(homeWorkData);
    console.log(classId);
    console.log(homeworkId);
    var data = await api.postHomeWordGrade(homeWorkData, classId, homeworkId);
    console.log(data);
  };
  const GetGrade = async () => {
    setLoading(true);

    let data = {};
    let hw = {};
    let teach = {};
    let allgrade = {};
    try {
      data = await getAllAccountFromClass(params.id);
      hw = await getHomeWorks(params.id);
      teach = await CheckTeacher(params.id);
      allgrade = await getAllGradeFromClass(params.id);
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
      let arr = [];
      student.forEach((element) => {
        let tmp = [];
        hw.data.forEach((value) => {
          const temp = allgrade.data.find(
            (ele) =>
              ele.idaccount === element.accountid && ele.idhomework === value.id
          );
          if (temp == undefined) {
            tmp.push(null);
          } else {
            tmp.push(temp.grade);
          }
        });
        arr.push(tmp);
      });

      setGrades(arr);
    } else {
      if (data.message === "jwt expired") localStorage.clear();
      setAuth(false);
    }
    setLoading(false);
  };
  const upload = () => {
    document.getElementById("upload").click();
    document.getElementById("upload").value = "";
  };
  const download = () => {
    FileSaver.saveAs(
      TemplateXML.StudentGradeTemplate(),
      "StudentGradeTemplate.xlsx"
    );
  };
  const saveGrade = () => {
    let arr = [];

    
    grades.forEach((ele,ind)=>{
      ele.forEach((value,index)=>{
        if (value !==null){
          arr.push({
            grade:value,
            idaccount: student[ind].accountid,
            idhomework: homework[index].id,
            idclass: homework[index].idclass,
          })
        }

      })
      
    })
    console.log(arr);

  };
  const handleGradechange = (e,id) => {
    const studentId= e.target.name.split(" ");
    const value = e.target.value;

    const clone = grades.slice();
    
    clone[studentId[0]][studentId[1]] = value;
    setGrades(clone);
    
  };
  return (
    <div>
      {!auth && <Navigate to="/login" />}

      {loading && (
        <LinearProgress sx={{ position: "fixed", top: 64, width: "100vw" }} />
      )}
      <StructureButton onClick={saveGrade} />
      <input
        class="displayNone"
        id="upload"
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          getData(file);
          e.target.value = "";
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
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,

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
                          <MenuItem data-my-value={index} onClick={upload}>
                            <FileUploadIcon />
                            Upload
                          </MenuItem>
                          <MenuItem data-my-value={index} onClick={download}>
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
            {student.map((row, ind) => (
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

                {grades.length !== 0 &&
                  grades[ind].map((value, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        width: "100px",
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        wordBreak: "break-word",
                      }}
                      align="left"
                      onChange={(event,ind)=>handleGradechange(event,ind)}
                    >
                      <TextField
                        name={`${ind.toString()} ${index}`}
                        variant="standard"
                        defaultValue={value}
                        type="number"
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
