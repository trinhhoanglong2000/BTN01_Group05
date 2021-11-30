import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import List from "./List/List";
import { Container, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { getAllAccountFromClass, CheckTeacher } from "../../../api";
import Preload from "./Preload/Preload"

import * as TemplateXML from "../../../FileTemplate"
import File from "./File/File"
export const People = () => {
  const params = useParams();
  const [auth, setAuth] = useState(true);
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [newData, setNewData] = useState([]);
  const [Dialog, setDialog] = useState(false);
  useEffect(() => {
    GetAllClass();
    return () => {
      setAuth(false);
      setClasses({})
      setLoading(false)
    };
  }, []);

  const GetAllClass = async () => {
    setLoading(true);
    let data = {};
    let teach = {}
    try {
      data = await getAllAccountFromClass(params.id);
      teach = await CheckTeacher(params.id);
    } catch (error) {
      console.log(error);
    }
    if (data.success) {

      const teacher = data.data.filter((word) => word.type === true);

      const student = data.data.filter((word) => word.type === false);
      setTeacher(teach.data[0].type);
      await setClasses({ teacher: teacher, student: student });
    } else {
      if (data.message === "jwt expired") localStorage.clear();
      setAuth(false);
    }
    setLoading(false);
  };
  const getData = async (file) => {
    let promiseData = await TemplateXML.readExcel(file)
    
    promiseData = promiseData.filter(item => item.StudentID != undefined)
    
    //
    let dataTemp = classes.student
    dataTemp = dataTemp.map(item => { return item.student_id })
    promiseData = promiseData.filter(item => !dataTemp.includes(item.StudentID.toString()))
    
    dataTemp = classes.teacher
    dataTemp = dataTemp.map(item => { return item.student_id })
    promiseData = promiseData.filter(item => !dataTemp.includes(item.StudentID.toString()))
    setNewData(promiseData)
    setDialog(true)
  }

  return (
    <div>
      {!auth && <Navigate to="/login" />}
      {Dialog &&
        <Preload newData={newData}
          setDialog={setDialog}
          student={classes.student}
          classId = {params.id}
          />}

      {loading && <LinearProgress sx={{ position: "fixed", top: 64, width: '100vw' }} />}

      <Container sx={{ width: "80vw" }}>
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
        {teacher && <File />}
        {teacher && <Divider sx={{ marginY: "10px", background: "black" }} />}
        <Container>
          <Typography variant="h4">Teacher</Typography>
          <List data={classes.teacher} type = {true} />
        </Container>

        <Container>
          <Typography variant="h4">Student</Typography>
          <List data={classes.student} type = {true} />
        </Container>
      </Container>
      <div></div>
    </div>
  );
};
