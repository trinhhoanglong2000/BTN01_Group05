import * as React from 'react';
import Accordion from '../Accordion/Accordion'
import { SortableElement } from 'react-sortable-hoc'
const DataElement = SortableElement(({ data }) => {

    return (
        <div>

            <Accordion data={data} />
        </div>
    )
})
export default DataElement