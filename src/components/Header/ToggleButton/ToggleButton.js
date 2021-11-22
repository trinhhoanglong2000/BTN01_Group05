import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
export default function ColorToggleButton({ sx }) {
  const navigate = useNavigate();
  const [alignment, setAlignment] = React.useState("ios");
  const params = useParams();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleClick = (e) => {
    navigate(`/ClassDetail/${params.id}/${e.target.value}`);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={sx}
    >
      <ToggleButton
        value=""
        onClick={handleClick}
        sx={{ color: "white", border: "none" }}
      >
        {" "}
        Stream
      </ToggleButton>
      <ToggleButton
        value="Classwork"
        onClick={handleClick}
        sx={{
          color: "white",
          border: "none",
         
        }}
      >
        {" "}
        ClassWork
      </ToggleButton>
      <ToggleButton
        value="People"
        onClick={handleClick}
        sx={{ color: "white", border: "none" }}
      >
        {" "}
        People
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
