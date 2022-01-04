import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "react-router-dom";
import { updateStructure } from "../../../../api"

export function UpdateDialog({ originalData, data, set, open, setOpen }) {
    const params = useParams();
    const [loading, setLoading] = React.useState(false);
    const [submit, setSubmit] = React.useState({
        description: originalData.description, grade: originalData.grade
    });
    const handleClose = () => {
        setOpen(false);
        setSubmit({
            description: originalData.description, grade: originalData.grade
        })
    };
    const handleAdd = async () => {
        setOpen(false);
        setLoading(true);
        let result = {};
        try {
            result = await updateStructure(
                originalData.id,
                submit
            );


            //setData(newValue)
        } catch (err) {
            console.log(err);
        }
        if (result.success) {
            const Clone = data.slice();
           
            for (var i = 0; i < Clone.length; i ++){
                if (Clone[i].id === originalData.id){
                    Clone[i].description = submit.description
                    Clone[i].grade = submit.grade
                    break
                }
            }
            set(Clone)
        }
        setLoading(false);
    }

    const handleChange = (e) => {
        setSubmit({ ...submit, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Update Grade Structure</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please update a Grade Structure and the points for it
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Description"
                        name="description"
                        type="Name"
                        defaultValue={originalData.description}
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField

                        margin="dense"
                        id="grade"
                        name="grade"
                        label="Grade"
                        defaultValue={originalData.grade}
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}