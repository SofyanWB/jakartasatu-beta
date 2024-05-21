import { ExpandMore, Layers, TableRowsSharp } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControlLabel, FormGroup, IconButton, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'

const LayerListMobile = ({layerGroups, icons, setLayerGroups}) => {
  const handleVisible = (groupIndex, layerIndex) => (event) => {
    const updatedLayerGroups = [...layerGroups];
    updatedLayerGroups[groupIndex].layers.items[layerIndex].visible =
      event.target.checked;
    setLayerGroups(updatedLayerGroups);
  };

  return (
    <Box sx={{backgroundColor: "white", width: "100%", height: "100%", overflowY: "auto"}}>
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
  )
}

export default LayerListMobile
