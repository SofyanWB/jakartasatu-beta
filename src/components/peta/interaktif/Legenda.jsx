import React from "react";
import MapIcon from '@mui/icons-material/Map';
import { Box, IconButton, Tooltip } from "@mui/material";

const Legenda = ({ view }) => {
  const handleLegenda = () => {
    console.log("Legenda Clicked");
  };
  return(
  <Box sx={{display: "flex", flexDirection: "column", borderRadius: 2, backgroundColor: "white", rowGap: 2, maxWidth: "48px"}}>
    <Tooltip title="Legenda" placement="left">
      <IconButton onClick={handleLegenda} sx={{ height: "48px", width: "48px", padding: 0 }}>
        <MapIcon />
      </IconButton>
    </Tooltip>
  </Box>
  );
};

export default Legenda;