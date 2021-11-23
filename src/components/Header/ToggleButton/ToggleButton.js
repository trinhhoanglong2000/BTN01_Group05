import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import { CheckTeacher } from "../../../api";
export default function ColorToggleButton({ sx }) {
  const navigate = useNavigate();
  const [alignment, setAlignment] = React.useState("ios");
  const [teacher, setTeacher] = useState(false);
  const params = useParams();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleClick = (e) => {
    navigate(`/ClassDetail/${params.id}/${e.target.value}`);
  };

  useEffect(() => {
    checkTeacher();
  }, []);
  const checkTeacher = async () => {
    let data = {};
    try {
      data = await CheckTeacher(params.id);
    } catch (error) {
      console.log(error);
    }
    if (data.success) {
      if (data.data[0].type === true) {
        setTeacher(true);
      }
    } else {
      if (data.message === "jwt expired") {
        localStorage.clear();
      }
    }
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
        sx={{
          color: "black",
          border: "none",
          fontSize: "0.7rem",
          textTransform: "none",
        }}
      >
        {" "}
        Stream
      </ToggleButton>
      <ToggleButton
        value="Classwork"
        onClick={handleClick}
        sx={{
          color: "black",
          border: "none",
          fontSize: "0.7rem",
          textTransform: "none",
        }}
      >
        {" "}
        Classwork
      </ToggleButton>
      <ToggleButton
        value="People"
        onClick={handleClick}
        sx={{
          color: "black",
          border: "none",
          fontSize: "0.7rem",
          textTransform: "none",
        }}
      >
        {" "}
        People
      </ToggleButton>
      {teacher && (
        <ToggleButton
          value="Grade"
          onClick={handleClick}
          sx={{
            color: "black",
            border: "none",
            fontSize: "0.7rem",
            textTransform: "none",
          }}
        >
          {" "}
          Grade
        </ToggleButton>
      )}
    </ToggleButtonGroup>
  );
}
