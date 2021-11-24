import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

export default function Topics({gradeStruc,input,setInput}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event, index) => {
    setInput({ ...input, gradeStruct: gradeStruc[index].id });
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="fade-button"
        aria-controls="fade-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ width: "100%" ,color:'black'}}
      >
        {input.gradeStruct ? gradeStruc.filter(word =>{return word.id===input.gradeStruct})[0].description:"No topics"}
      </Button>
      <Menu
        PaperProps={{
          style: {
           width:'200px'
          },
        }}
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          Create topic
        </MenuItem>
        {gradeStruc.map((value,index)=> <MenuItem name={index}  onClick={(event) => handleMenuItemClick(event, index)} key={index}>{value.description}</MenuItem>)}

      </Menu>
    </div>
  );
}
