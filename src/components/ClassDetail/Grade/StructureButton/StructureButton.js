import * as React from "react";
import Button from "@mui/material/Button";

import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "react-router-dom";
import { addStructure } from "../../../../api";
import { Divider } from "@mui/material";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradeIcon from '@mui/icons-material/Grade';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import XLSX from "xlsx";
import * as TemplateXML from "../../../../FileTemplate"
export default function FormDialog({ data, set,onClick,disabled, dataExport }) {
  const params = useParams();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    navigate(`/ClassDetail/${params.id}/GradeStructure`);
  };
  //LONG-TP 2021/1/1 ADD START
  const FileSaver = require("file-saver");
  const exportData = () => {
    FileSaver.saveAs(TemplateXML.ExportGrade(dataExport.homework, dataExport.student, dataExport.grades), "StudentGrade.xlsx");
  } 
  //LONG-TP 2021/1/1 ADD START
  return (
    <div>
      <Container sx={{ width: "100%", marginTop: "5px", marginBottom: "10px",padding:'0!important',marginLeft:'10px!important',marginRight:'0!important'  }}>
      <Button
          onClick={onClick}
          sx={{
            fontSize: "12px",

            borderRadius: 5,
            color: "white",
            textTransform: "none",
            background: "#3C403D",
            "&:hover": {
              background: "#3C403D",
            },
            marginBottom: 1,
            marginTop: 3,
            
            // position: "absolute",
            // right: 0
          }}
          disabled={disabled}
          variant="outlined"
        >
          <SaveIcon sx={{marginRight:'5px'}}/>
          Save
        </Button>
        <Button
          onClick={handleClickOpen}
          sx={{
            fontSize: "12px",

            borderRadius: 5,
            color: "white",
            textTransform: "none",
            background: "#3C403D",
            "&:hover": {
              background: "#3C403D",
            },
            marginBottom: 1,
            marginTop: 3,
            marginLeft: '50px!important',
            
            // position: "absolute",
            // right: 0
          }}
          disabled={disabled}

          variant="outlined"
        >
          <GradeIcon/>
          Grade Structure
        </Button>
        {/*LONG-TP ADD START 2021/12/30*/}
        <Button
          onClick={exportData}
          sx={{
            fontSize: "12px",
            borderRadius: 5,
            color: "white",
            textTransform: "none",
            background: "#3C403D",
            "&:hover": {
              background: "#3C403D",
            },
            marginBottom: 1,
            marginTop: 3,
            marginLeft: '50px!important',
            
            // position: "absolute",
            // right: 0
          }}
          disabled={disabled}
          variant="outlined"
        >
          <DownloadIcon/>
          Export Grade
        </Button>
        {/*LONG-TP ADD END 2021/12/30*/}
        {/* <Divider sx={{ marginY: "10px", background: "black" }} /> */}
      </Container>
    </div>
  );
}
