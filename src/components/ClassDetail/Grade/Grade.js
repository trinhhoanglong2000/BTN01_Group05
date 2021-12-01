import React, { useEffect, useState } from "react";

import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getAllAccountFromClass,
  getHomeWorks,
  CheckTeacher,
  getAllGradeFromClass,
  UpdateGrades,
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
import Preload from "./Preload/Preload";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";

import XLSX from "xlsx";
import * as TemplateXML from "../../../FileTemplate";

var FileSaver = require("file-saver");
var wb = XLSX.utils.book_new();
wb.Props = {
  Title: "SheetJS Tutorial",
  Subject: "Test",
  Author: "Red Stapler",
  CreatedDate: new Date(2017, 12, 19),
};
wb.SheetNames.push("Test Sheet");
var ws_data = [["hello", "world"]]; //a row with 2 columns
var ws = XLSX.utils.aoa_to_sheet(ws_data);
wb.Sheets["Test Sheet"] = ws;
var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
function s2ab(s) {
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf); //create uint8array as viewer
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
}
export const Grade = () => {
  const params = useParams();
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [homework, setHomeWork] = useState([]);
  const [student, setStudent] = useState([]);
  const [oldStudent, setOldStudent] = useState([]);
  const [teacher, setTeacher] = useState(false);
  const [openUpdate, setOpenUpdate] = useState([]);
  const [count, setCount] = useState(null);

  const [grades, setGrades] = useState([]);
  const [newData, setNewData] = useState([]);
  const [Dialog, setDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenUpdate(false);
    setAnchorEl(null);
  };

  const downloadStudentGradeTemplate = () => {
    FileSaver.saveAs(TemplateXML.StudentGradeTemplate(), "StudentGrade.xlsx");
  };

  useEffect(() => {
    GetGrade();
    return () => {
      setAuth(false);
      setLoading(false);
    };
  }, []);

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

  const saveGrade = async () => {
    let arr = [];
    setLoading(true);

    grades.forEach((ele, ind) => {
      ele.forEach((value, index) => {
        if (value !== null) {
          arr.push({
            grade: value,
            idaccount: student[ind].accountid,
            idhomework: homework[index].id,
            idclass: homework[index].idclass,
          });
        }
      });
    });
    let result = {};
    try {
      result = await UpdateGrades(arr);
    } catch (error) {}
    if (result.success) {
    } else {
    }
    setLoading(false);
  };
  const handleGradechange = (e, id) => {
    const studentId = e.target.name.split(" ");
    const value = e.target.value;

    const clone = grades.slice();

    clone[studentId[0]][studentId[1]] = value;
    setGrades(clone);
  };

  //Excel handler
  const upload = () => {
    //coi thu console log la thay dc du lieu cua homework dc chon
    console.log(homework[count]);
    document.getElementById("uploadGrade").click();
    document.getElementById("uploadGrade").value = "";
  };

  const getData = async (file) => {
    let promiseData = await TemplateXML.readExcel(file);

    //filer newData
    promiseData = promiseData.filter(
      (item) => item.StudentID != undefined && item.Grade != undefined
    );
    for (let i = 0; i < promiseData.length; i++) {
      promiseData[i].Grade =
        promiseData[i].Grade > homework[count].grade
          ? homework[count].grade
          : promiseData[i].Grade;
    }

    setNewData(promiseData);
    //
    let dataTemp = promiseData;

    dataTemp = dataTemp.map((item) => {
      return item.StudentID.toString();
    });
    let dataTempStudent = student;
    dataTempStudent = dataTempStudent.filter(
      (item) => !dataTemp.includes(item.student_id)
    );
    setOldStudent(dataTempStudent);

    setDialog(true);
  };
  const reducer = (accumulator, curr) => {
    if (curr !== null && curr !== undefined) return accumulator + curr;
    return accumulator + 0;
  };

  return (
    <div>
      {!auth && <Navigate to="/login" />}

      {loading && (
        <LinearProgress sx={{ position: "fixed", top: 64, width: "100vw" }} />
      )}
      <input
        class="displayNone"
        id="uploadGrade"
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          getData(file);

          e.target.value = "";
        }}
      />
      {Dialog && (
        <Preload
          newData={newData}
          setDialog={setDialog}
          student={oldStudent}
          classId={params.id}
          homework={homework[count]}
        />
      )}
      <StructureButton onClick={saveGrade} disabled={loading} />
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
                          <MenuItem
                            data-my-value={index}
                            onClick={downloadStudentGradeTemplate}
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
                  {grades.length !== 0 && grades[ind].reduce(reducer)}
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
                      onChange={(event, ind) => handleGradechange(event, ind)}
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
