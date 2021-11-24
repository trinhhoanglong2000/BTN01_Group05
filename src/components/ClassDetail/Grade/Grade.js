import React, { useEffect, useState } from "react";

import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import {getGradeStructure} from '../../../api'
import StructureButton from './StructureButton/StructureButton'
export const Grade = () => {

    const params = useParams();
    const [auth, setAuth] = useState(true);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        GetGrade();
        return () => {
            setAuth(false);
            setLoading(false)
        };
    }, []);
    const GetGrade = async () => {
        setLoading(true);
        let data = {};
        
        try {
            data = await getGradeStructure(params.id)
        } catch (error) {
            console.log(error);
        }
        if (data.success) {
            console.log(data.data)

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
            <StructureButton/> 
        </div>
    );
};