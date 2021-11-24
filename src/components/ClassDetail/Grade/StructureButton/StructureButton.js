import * as React from 'react';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "react-router-dom";
import { addStructure } from "../../../../api"
import { Divider } from "@mui/material";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function FormDialog({ data, set }) {
    const params = useParams();
    const navigate = useNavigate();
    const handleClickOpen = () => {
        navigate(`/ClassDetail/${params.id}/GradeStructure`)
    };
  
  
    return (
        <div>
            <Container
                sx={{width: "71%", marginTop: "5px", marginBottom: "10px" }}
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
                        
                        // position: "absolute",
                        // right: 0
                    }}
                    variant="outlined"
                >
                    Grade Structure
                </Button>
                <Divider sx={{ marginY: "10px", background: "black" }} />
            </Container>
        </div>
    );
}