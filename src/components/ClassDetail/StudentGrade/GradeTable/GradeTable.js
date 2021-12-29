import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function GradeTable({data}) {
  console.log(data)

  return (
    
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Homework</TableCell>
            <TableCell align="right">Grade</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {row.name}</TableCell>
              <TableCell align="right">{row.grade}</TableCell>
 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}