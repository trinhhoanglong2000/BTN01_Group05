import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from '@mui/icons-material/Edit';

import { makeStyles } from "@mui/styles";
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import {useState} from 'react'
import GetLink from "../../InvitePeople/GetLink";
import MailInvite from "../../InvitePeople/MailInvite";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import XLSX from "xlsx";
import * as TemplateXML from "../../../../FileTemplate"

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
                CreatedDate: new Date(2017,12,19)
        };
wb.SheetNames.push("Test Sheet");
var ws_data = [['hello' , 'world']];  //a row with 2 columns
var ws = XLSX.utils.aoa_to_sheet(ws_data);
wb.Sheets["Test Sheet"] = ws;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
function s2ab(s) { 
                var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
                var view = new Uint8Array(buf);  //create uint8array as viewer
                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
                return buf;    
}


export default function BasicSpeedDial() {
  const classes = useStyles();
  const [mailInviteDialog, setMailInviteDialog ] =useState(false);
  const [linkInviteDialog, setLinkInviteDialog ] =useState(false);
  const getMailInvite = () =>{
    setMailInviteDialog(true)
  }
  const closeMailInvite = () =>{
    setMailInviteDialog(false)

  }
  const getLinkInvite = ()=>{
    setLinkInviteDialog(true)
  }
  const closeLinkInvite = () =>{
    setLinkInviteDialog(false)
  }
  const downloadStudentGradeTemplate = () => {
    FileSaver.saveAs(TemplateXML.StudentGradeTemplate(), 'StudentGrade.xlsx')
  }
  const actions = [
    { icon: <EmailIcon />, name: "Mail invitation" ,onClick: getMailInvite},
    { icon: <LinkIcon />, name: "Get link invitation" ,onClick: getLinkInvite},
  ];


  
  return (
    <Box
      className={classes.pos}
      sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
    >
       
      <SpeedDial FabProps={{ style: { backgroundColor: '#434343' } }} ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon openIcon={<EditIcon />} />}>
        {actions.map((action) => (
          <SpeedDialAction
            onClick={action.onClick}
            
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={{
              background: "#D4D4D4",
              "&:hover": {
                background: "#808080",
              },
            }}
          />
          
        ))}
      </SpeedDial>
      <MailInvite openMode={mailInviteDialog} onClose={closeMailInvite} />
      <GetLink openMode={linkInviteDialog} onClose={closeLinkInvite} />
     
    </Box>
  
  );
}
