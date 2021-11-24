import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions({data, homework}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(homework)
  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
            {data.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>{data.grade}</Typography>
        </AccordionSummary >
        <AccordionDetails>
          {homework.filter(element=>element.idgradestructure===data.id).map((value,index)=><Typography variant="caption">{value.name}</Typography>)}
       
          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}