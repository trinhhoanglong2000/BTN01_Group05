import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { sortableHandle } from "react-sortable-hoc";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export default function ControlledAccordions({ data, homework }) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const DragHandle = sortableHandle(() => <DragHandleIcon sx={{ marginRight: '5px' }} />);

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <DragHandle />

          <Typography variant="subtitle1" sx={{ width: "33%", flexShrink: 0 }}>
            {data.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {data.grade}
          </Typography>
    
        </AccordionSummary>
        <AccordionDetails>
          {homework
            .filter((element) => element.idgradestructure === data.id)
            .map((value, index) => (
              <Typography variant="caption">{value.name}</Typography>
            ))}
        </AccordionDetails>

      </Accordion>
    </div>
  );
}
