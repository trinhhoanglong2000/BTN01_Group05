import React, { useEffect, useState } from "react";

import DataList from './DataList/DataList'
import Dialog from './Dialog/Dialog'

import { useParams, Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import { arrayMove } from "react-sortable-hoc";
import { getGradeStructure,getHomeWorks } from '../../../api'
export const GradeStructure = () => {


    const params = useParams();
    const [auth, setAuth] = useState(true);
    const [loading, setLoading] = useState(false);
    const [structure, setStructure] = useState([]);
    const [structureHW, setStructureHW] = useState([]);
    useEffect(() => {
        GetStructure();
        return () => {
            setAuth(false);
            setLoading(false)
        };
    }, []);
    const GetStructure = async () => {
        setLoading(true);
        let data = {};
        let homeworks={};
        try {
            data = await getGradeStructure(params.id)
            homeworks = await getHomeWorks(params.id)
            
        } catch (error) {
            console.log(error);
        }
        if (data.success) {

            await setStructureHW(homeworks.data)
            await setStructure(data.data)
        } else {
            if (data.message === "jwt expired") localStorage.clear();
            setAuth(false);
        }
        setLoading(false);
    };
    const onSortEnd = ({ oldIndex, newIndex }) => {

        let structureCopy = [...structure]
        structureCopy = arrayMove(structureCopy, oldIndex, newIndex)
        setStructure(structureCopy)
    }


    return (
        <div>
            {!auth && <Navigate to="/login" />}
            
            {loading && <LinearProgress sx={{ position: "fixed", top: 64, width: '100vw' }} />}
            <Dialog data = {structure} set = {setStructure}/>
            <DataList data={structure} setData = {setStructure} homework = {structureHW} onSortEnd={onSortEnd}  useDragHandle={true}/>

           
        </div>
    );
};