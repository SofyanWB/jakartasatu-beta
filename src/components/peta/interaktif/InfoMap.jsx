import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton, Tooltip } from "@mui/material";

const InfoMap = ({ view, startTour }) => {
  const handleZoom = () => {
    view.goTo({ center: [106.826959, -6.176923], zoom: 15 });
  };
  return (
    <Box sx={{display: "flex", flexDirection: "column", borderRadius: 2, backgroundColor: "white", rowGap: 2, height: "48px", width: "48px",}}>
      <Tooltip title="Info" placement="bottom">
        <IconButton onClick={startTour} sx={{ height: "48px", width: "48px", padding: 0 }}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default InfoMap;
