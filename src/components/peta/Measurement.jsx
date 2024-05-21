import React from "react";
import StraightenIcon from '@mui/icons-material/Straighten';
import { Box, IconButton, Tooltip } from "@mui/material";

const Measurement = ({ view }) => {
    const handleZoom = () => {
        view.goTo({ center: [106.826959, -6.176923], zoom: 15 });
      };
    return(
    <Box
        sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        backgroundColor: "white",
        rowGap: 2,
        maxWidth: "48px",
      }}
    ><Tooltip title="Measurement" placement="left">
    <IconButton
      onClick={handleZoom}
      sx={{ height: "48px", width: "48px", padding: 0 }}
    >
      <StraightenIcon />
    </IconButton>
  </Tooltip>

    </Box>
    );
};

export default Measurement;