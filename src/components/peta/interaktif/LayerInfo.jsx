import { Close } from "@mui/icons-material";
import {Box, IconButton, Typography} from "@mui/material";
import React from "react";

const LayerInfo = ({ setInfoLayerOpen, layerInfo }) => {
  const handleClose = () => {
      setInfoLayerOpen(false);
  }
  return (
    <Box sx={{display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: 4, padding: 2, width: "100%"}} id={`layer-info-content-${layerInfo.id}`}>
      {layerInfo && (
        <>
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Typography sx={{color: "black"}} variant="h8" gutterBottom>
                Informasi Layer
              </Typography>
              <IconButton onClick={handleClose} id={`layer-info-content-close-${layerInfo.id}`}>
                <Close/>
              </IconButton>
          </Box>
          <Box sx={{width: "100%"}}>
              <Typography>{layerInfo.title}</Typography>
              <Typography sx={{textOverflow: "ellipsis", overflow: "hidden"}}>{layerInfo.url}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default LayerInfo;
