import * as React from 'react';
import { Container } from "@mui/material";
import DataElement from './DataElement'
import { SortableContainer } from 'react-sortable-hoc'
const DataList = SortableContainer(({ data }) => {
   
    return (
        <Container sx={{ width: "80vw" }}>
            {data.map((item, key) => {

                return (
                    
                        <DataElement key={key} data = {item} index = {key} />
                   
                );
            })}
        </Container>
    )
})
export default DataList