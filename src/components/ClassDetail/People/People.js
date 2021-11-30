import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import List from "./List/List";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { getAllAccountFromClass } from "../../../api";
import Button from "@mui/material/Button";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { display } from "@mui/system";
import * as TemplateXML from "../../../FileTemplate"

export const People = () => {
  const params = useParams();
  const [auth, setAuth] = useState(true);
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetAllClass();
    return () => {
        setAuth(false);
        setClasses({})
        setLoading(false)
    };
  }, []);
  const uploadClick = () =>{
    document.getElementById("upload").click()
  }
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

      
      {loading && <LinearProgress sx={{position:"fixed",top:64,width:'100vw'}}/>}
     
      <Container sx={{ width: "80vw" }}>
        <Container>
       
      <input
        class = "displayNone"
        id = "upload"
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          TemplateXML.readExcel(file);
        }}
      />
        <Button
           onClick = {uploadClick}
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
            startIcon={<UploadFileIcon/>}
          >
            Upload File 
          </Button>
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
