import * as React from 'react';
import Accordion from '../Accordion/Accordion'
import { SortableElement } from 'react-sortable-hoc'
const DataElement = SortableElement(({ data, homework }) => {

    return (
        <div>

            <Accordion data={data} homework = {homework} />
        </div>
    )
})
export default DataElement