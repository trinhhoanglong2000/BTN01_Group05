import * as React from "react";
import Button from "@mui/material/Button";

import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "react-router-dom";
import { addStructure } from "../../../../api";
import { Divider } from "@mui/material";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function FormDialog({ data, set }) {
  const params = useParams();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    navigate(`/ClassDetail/${params.id}/GradeStructure`);
  };

  return (
    <div>
      <Container sx={{ width: "100%", marginTop: "5px", marginBottom: "10px",padding:'0!important',marginLeft:'10px!important',marginRight:'0!important'  }}>
   
        <Button
          onClick={handleClickOpen}
          sx={{
            fontSize: "12px",

            borderRadius: 5,
            color: "white",
            textTransform: "none",
            background: "#3C403D",
            "&:hover": {
              background: "#3C403D",
            },
            marginBottom: 1,
            marginTop: 3,
            marginLeft: 'auto!important',
            // position: "absolute",
            // right: 0
          }}
          variant="outlined"
        >
          Grade Structure
        </Button>
        {/* <Divider sx={{ marginY: "10px", background: "black" }} /> */}
      </Container>
    </div>
  );
}
