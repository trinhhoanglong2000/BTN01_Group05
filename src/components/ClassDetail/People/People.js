import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import List from "./List/List";
import { Container, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { getAllAccountFromClass, CheckTeacher } from "../../../api";


import * as TemplateXML from "../../../FileTemplate"
import File from "./File/File"
export const People = () => {
  const params = useParams();
  const [auth, setAuth] = useState(true);
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(false);
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
  const getData = () => {
    
  }

  return (
    <div>
      {!auth && <Navigate to="/login" />}


      {loading && <LinearProgress sx={{ position: "fixed", top: 64, width: '100vw' }} />}

      <Container sx={{ width: "80vw" }}>
        <input
          class="displayNone"
          id="upload"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            
            TemplateXML.readExcel(file).then((d) => {

              console.log(d)
            
            });;

          }}
        />
        {teacher && <File student={classes.student} />}
        {teacher && <Divider sx={{ marginY: "10px", background: "black" }} />}
        <Container>
          <Typography variant="h4">Teacher</Typography>
          <List data={classes.teacher} />
        </Container>

        <Container>
          <Typography variant="h4">Student</Typography>
          <List data={classes.student} />
        </Container>
      </Container>
      <div></div>
    </div>
  );
};
