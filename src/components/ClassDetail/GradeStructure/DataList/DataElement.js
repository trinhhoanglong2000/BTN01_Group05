import React, { useEffect, useState } from "react";
import Accordion from '../Accordion/Accordion'
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { removeStructure } from "../../../../api"
import { SortableElement, sortableHandle } from 'react-sortable-hoc'
const DataElement = SortableElement(({ data, homework, index, setData, fullData }) => {
    const DragHandle = sortableHandle(() => <span>::</span>);
    const [count, setCount] = useState(0);
    const [Update, setUpdate] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    //dropdown menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setCount(event.currentTarget.value);

        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const update = (event) => {
        console.log(data)
        setAnchorEl(null);
        setUpdate(true)
        setOpenDialog(true);

    };

    const Delete = async (event) => {
        
        let result = {};
        try {
            result = await removeStructure(data.id)
        } catch (error) {

        }
        if (result.success) {
            const Clone = fullData.slice();
            const newValue = Clone.filter((ele) => ele.id !== data.id)

            setData(newValue)

        }
        setAnchorEl(null);
    };
    return (
        <div>
            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                {/* <DragHandle/> */}
                <Grid xs={11}>
                    <Accordion data={data} homework={homework} />
                </Grid>
                <Grid xs={1}>
                    <IconButton 
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        value={index}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: 48 * 4.5,
                                width: "15ch",
                            },
                        }}
                    >

                        <MenuItem
                            data-my-value={index}
                            onClick={(event) => update(event)}
                        >
                            <UpdateIcon />
                            Update
                        </MenuItem>
                        <MenuItem
                            data-my-value={index}
                            onClick={(event) => Delete(event)}
                        >
                            <DeleteIcon />
                            Delete
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </div >
    )
})
export default DataElement