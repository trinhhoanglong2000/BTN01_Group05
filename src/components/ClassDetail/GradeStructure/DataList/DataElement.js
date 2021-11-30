import * as React from 'react';
import Accordion from '../Accordion/Accordion'
import { SortableElement,sortableHandle } from 'react-sortable-hoc'
const DataElement = SortableElement(({ data, homework }) => {
    const DragHandle = sortableHandle(() => <span>::</span>);

    return (
        <div style={{}}>
            {/* <DragHandle/> */}
            <Accordion data={data} homework = {homework} />
        </div>
    )
})
export default DataElement