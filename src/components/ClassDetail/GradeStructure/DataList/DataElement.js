import * as React from 'react';
import Accordion from '../Accordion/Accordion'
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { SortableElement, sortableHandle } from 'react-sortable-hoc'
const DataElement = SortableElement(({ data, homework }) => {
    const DragHandle = sortableHandle(() => <span>::</span>);

    return (
        <div>
            <Grid container spacing={2} sx = {{marginTop:1}}>
            {/* <DragHandle/> */}
            <Grid xs={11}>
                <Accordion data={data} homework={homework} />
            </Grid>
            <Grid xs={1}>
                <Typography>Long</Typography>
            </Grid>
        </Grid>
        </div >
    )
})
export default DataElement