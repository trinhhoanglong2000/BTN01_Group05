import * as React from 'react';
import { Container } from "@mui/material";
import DataElement from './DataElement'
import { SortableContainer } from 'react-sortable-hoc'
const DataList = SortableContainer(({ data, homework, setData }) => {
   
    return (
        <Container sx={{ width: "60vw" }}>
            {data.map((item, key) => {

                return (
                    
                        <DataElement key={key} data = {item} homework = {homework} index = {key} setData = {setData} fullData = {data}/> 
                );
            })}
        </Container>
    )
})
export default DataList