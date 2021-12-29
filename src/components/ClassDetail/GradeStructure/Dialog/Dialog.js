import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "react-router-dom";
import { addStructure } from "../../../../api"
import { Divider } from "@mui/material";
import { Container } from "@mui/material";

export default function FormDialog({ data, set }) {
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState({
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    setOpen(false);
    setLoading(true);
    let result = {};
    try {
      result = await addStructure(
        params.id,
        submit.description,
        submit.grade
      );
    } catch (err) {
      console.log(err);
    }

    if (result.success) {
      //handle close
      setOpen(false);
      setLoading(false);
      let structureCopy = [...data]
      set(structureCopy.concat(result.data))

    } else {
      if (result.message === "jwt expired") {
        localStorage.clear();
      }
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    setSubmit({ ...submit, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Container
          sx={{ width: "71%", marginTop: "5px", marginBottom: "10px" }}
        >
          <Button
            onClick={handleClickOpen}
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
            startIcon={<AddIcon />}
          >
            Create
          </Button>
          <Divider sx={{ marginY: "10px", background: "black", marginBottom: 2}} />
        </Container>
      <Dialog open={open} onClose={handleClose}>
      {loading && (
        <LinearProgress sx={{ position: "fixed", top: 64, width: "100vw" }} />
      )}

        <DialogTitle>New Grade Structure</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a Grade Structure and the points for it
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Description"
            name="description"
            type="Name"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField

            margin="dense"
            id="grade"
            name="grade"
            label="Grade"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}