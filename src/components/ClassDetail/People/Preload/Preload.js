import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from "@mui/material/Typography";
import DialogTitle from '@mui/material/DialogTitle';
import { Container, Divider } from "@mui/material";
import List from "../List/List"
export default function AlertDialog({ newData, setDialog, student }) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        setDialog(false);
    };

    return (

        <div>
            {console.log(newData)}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"New Student List!"}
                </DialogTitle>
                <DialogContent>
                    <Container>
                        <Typography variant="h4">Student</Typography>
                        <List data={student} type = {true} />
                        <List data ={newData} type = {false}/>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}