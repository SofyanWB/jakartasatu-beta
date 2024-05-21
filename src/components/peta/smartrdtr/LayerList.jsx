import { ExpandMore, Layers, TableRowsSharp } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControlLabel, FormGroup, IconButton, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'

const LayerList = ({layerGroups, icons, setLayerGroups}) => {
  const [layerListOpen, setLayerListOpen] = useState(false);

  const handleLayerList = () => setLayerListOpen(!layerListOpen);

  const handleVisible = (groupIndex, layerIndex) => (event) => {
    const updatedLayerGroups = [...layerGroups];
    updatedLayerGroups[groupIndex].layers.items[layerIndex].visible =
      event.target.checked;
    setLayerGroups(updatedLayerGroups);
  };

  return (
    <Box sx={{display: "flex", flexDirection: "row", columnGap: 1}}>
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", color: "black", borderRadius: 2, width: "48px", height: "48px"}}>
        <IconButton onClick={handleLayerList}>
          <Layers />
        </IconButton>
      </Box>
      { layerListOpen && (
        <Box sx={{backgroundColor: "white", width: "300px", height: "240px", borderRadius: 2, overflowY: "auto"}}>
          {layerGroups && layerGroups.map((layerGroup, groupIndex) => (
            <Accordion key={groupIndex} sx={{backgroundColor: "#adbce6"}}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                {icons.find((icon) => icon.title === layerGroup.title)?.src && (
                  <img src={icons.find((icon) => icon.title === layerGroup.title).src} alt={layerGroup.title} style={{width: "24px", height: "24px"}}/>
                )}
                <Typography>{layerGroup.title}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{bgcolor: "lightgray"}}>
                <FormGroup>
                  {layerGroup.layers.items.map((layer, layerIndex) => (
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}} key={layerIndex}>
                      <FormControlLabel control={<Switch checked={layer.visible} onChange={handleVisible(groupIndex, layerIndex)}/>} label={layer.title}>
                        <IconButton size="small" aria-label="Table">
                          <TableRowsSharp />
                        </IconButton>
                      </FormControlLabel>
                    </Box>
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default LayerList
