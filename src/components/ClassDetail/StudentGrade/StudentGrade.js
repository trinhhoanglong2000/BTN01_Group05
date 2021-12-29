import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { getGradeOfStudentFromClass } from "../../../api";
import GradeTable from "./GradeTable/GradeTable"
export const StudentGrade = () => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(true);
    const params = useParams();

    const [value, setValue] = useState([]);

    useEffect(() => {
        GetAllGrade();
        return () => {
            setAuth(false);
            setValue({})
            setLoading(false)
        };
    }, []);
    const GetAllGrade = async () => {
        setLoading(true);
        let data = {};

        try {
            data = await getGradeOfStudentFromClass(params.id);
        } catch (error) {
            console.log(error);
        }
        if (data.success) {
            
             await setValue(data.data);
        } else {
            if (data.message === "jwt expired") localStorage.clear();
            setAuth(false);
        }
        setLoading(false);
    };
    return (
        <div>
        {!auth && <Navigate to="/login" />}

        {loading && <LinearProgress sx={{ position: "fixed", top: 64, width: '100vw' }} />}

        <Container sx={{ width: "80vw" }}>
            <Container>
                <Typography dx={{ marginTop: '10px' }} variant="h4">All Grade</Typography>
                <GradeTable data= {value} />
            </Container>
        </Container>
        <div></div>
    </div>
    );
};