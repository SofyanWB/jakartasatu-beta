import React from "react";
import NearMeIcon from '@mui/icons-material/NearMe';
import { Box, IconButton, Tooltip } from "@mui/material";

const NearMe = ({ view }) => {
  const handleNearMe = () => {
    console.log("Near Me Clicked");
  };
  return(
  <Box sx={{borderRadius: 2, backgroundColor: "white", maxWidth: "48px", }}>
    <Tooltip title="Near Me" placement="left">
      <IconButton onClick={handleNearMe} sx={{ height: "48px", width: "48px", padding: 0 }}>
        <NearMeIcon />
    </IconButton>
    </Tooltip>
  </Box>
  );
};

export default NearMe;