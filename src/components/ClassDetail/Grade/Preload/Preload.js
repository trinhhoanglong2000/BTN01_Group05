import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from "@mui/material/Typography";
import DialogTitle from '@mui/material/DialogTitle';
import { Container, Divider } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import * as api from "../../../../api"

export default function AlertDialog({ newData, setDialog, student, classId, homework }) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
        setDialog(false);
    };

    const handleAgree = async () => {
        var data = await api.postListStudent(newData, classId)
        console.log(data)

        setOpen(false);
        setDialog(false);

    }
    return (

        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ style: { width: '1000px' } }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"New Grade List!"}
                </DialogTitle>
                <DialogContent>
                    <Container>
                        <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 500, maxHeight:600 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Student ID</TableCell>

                                        <TableCell align="right">Homework: {homework.name}</TableCell>
                                        

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {newData && newData.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.StudentID}
                                            </TableCell>
                                            <TableCell align="right">{row.Grade}</TableCell>
                                        </TableRow>
                                    ))}
                                    {student && student.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.student_id}
                                            </TableCell>
                                            <TableCell align="right">{row.grade}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}