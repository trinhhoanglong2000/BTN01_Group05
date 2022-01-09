import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Button from "@mui/material/Button";
import { height } from '@mui/system';
import Review from '../Review'
import { getGradeStructure,getReviewGrade } from "../../../../api";
import { el } from "date-fns/locale";
import moment from "moment"
export default function GradeTable({data}) {
  const getData = async () =>{
    if(gradeStruct== null && data!=null){
      await getGradeStructure(data[0].idclass).then( res => {
        var dataRes = [...res.data];
        setGradeStruct(dataRes)
      })
    }
    
  }
  const OpenReview = async (e) => {
    await getData().then(async ()=>{
      let index = e.target.getAttribute("index")
      setassignmentData(data[index])
      if(data[index]!=null){
            setReviewData(data[index])
            setOpenDialog(true)
      }
    })
    
    
  }

  const [gradeStruct, setGradeStruct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [assignmentData, setassignmentData] = useState(null)
  const [reviewData, setReviewData] = useState(null);
   
  return (
    <div>
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Homework</TableCell>
            <TableCell align="left">From</TableCell>
            <TableCell align="left">Createdate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {row.name}</TableCell>
              <TableCell component="th" scope="row"  align="left"> {row.student_id}</TableCell>
              <TableCell align="left" component="th"   sx={{
                    position: 'relative',
                    
                  }}>
                {row.createdate==null? null:moment(row.createdate).format("hh:mm DD/MM/YYYY")}
                <Button
                  onClick={OpenReview}
                  index = {index}
                  sx={{
                    position: 'absolute',
                    width: 'auto',
                    height: '2px',
                    right: '10px',
                    margin: '8px 0px 0px 0px',
                    padding: '0px 0px 0px 0px',
                  
                  }}
                >
                  
                <RateReviewIcon
                 sx={{
                  width: '10x',
                  height: '30px',
                   
                  }}/>
                {'review'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Review data={assignmentData} openDialog = {openDialog} gradeStruct = {gradeStruct} setOpenDialog = {setOpenDialog} reviewData = {reviewData} />
    </div>
  );
}