import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";

const Bahasa = ({ view }) => {
  const [isBahasa, setIsBahasa] = useState(true);
  const handleSwitchBahasa = () => {
    setIsBahasa(!isBahasa);
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", borderRadius: 2, backgroundColor: "white", rowGap: 2, maxWidth: "48px", maxHeight: "48px"}}>
      {isBahasa ? (
        <Tooltip title="EN" placement="bottom">
          <IconButton onClick={handleSwitchBahasa} sx={{ height: "48px", width: "48px", padding: 0, fontSize: "1rem" }}>
            EN
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="ID" placement="bottom">
          <IconButton onClick={handleSwitchBahasa} sx={{ height: "48px", width: "48px", padding: 0, fontSize: "1rem" }}>
            ID
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default Bahasa;
