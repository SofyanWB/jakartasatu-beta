import HomeIcon from "@mui/icons-material/Home";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";

const Home = ({ view, center, zoom }) => {
  const handleZoom = () => {
    view.goTo({ center: center, zoom: zoom });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        backgroundColor: "white",
        rowGap: 2,
        maxWidth: "48px",
      }}
    >
      <Tooltip title="Home" placement="left">
        <IconButton
          onClick={handleZoom}
          sx={{ height: "48px", width: "48px", padding: 0 }}
        >
          <HomeIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Home;
