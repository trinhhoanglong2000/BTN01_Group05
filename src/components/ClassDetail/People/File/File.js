import * as React from 'react';

import Button from "@mui/material/Button";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import XLSX from "xlsx";
import * as TemplateXML from "../../../../FileTemplate";
import { makeStyles } from "@mui/styles";

//File Saver
var FileSaver = require('file-saver');
const useStyles = makeStyles((theme) => ({
    pos: {
        position: "fixed",
        bottom: 40,
        right: 40,

    },
}));

var wb = XLSX.utils.book_new();
wb.Props = {
    Title: "SheetJS Tutorial",
    Subject: "Test",
    Author: "Red Stapler",
    CreatedDate: new Date(2017, 12, 19)
};
wb.SheetNames.push("Test Sheet");
var ws_data = [['hello', 'world']];  //a row with 2 columns
var ws = XLSX.utils.aoa_to_sheet(ws_data);
wb.Sheets["Test Sheet"] = ws;
var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

//Export File
export default function File({student}) {
    const uploadClick = () => {
        document.getElementById("upload").click()
    }

    // Download student List
    const downloadStudentListTemplate = () => {
        FileSaver.saveAs(TemplateXML.StudentListTemplate(), 'StudentListTemplate.xlsx')
      }

    return (
        <div>
            <Button
                onClick={uploadClick}
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
                startIcon={<UploadFileIcon />}
            >
                Upload File
            </Button>
            <Button
                onClick={downloadStudentListTemplate}
                sx={{
                    borderRadius: 5,
                    marginLeft: 10,
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
                startIcon={<FileDownloadIcon />}
            >
                Template
            </Button>
        </div>
    );
}