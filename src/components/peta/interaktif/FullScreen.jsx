import React, { useState } from "react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

const FullScreen = ({buttonSize}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) { 
        document.documentElement.webkitRequestFullscreen(); /* Safari */
      } else if (document.documentElement.msRequestFullscreen) { 
        document.documentElement.msRequestFullscreen(); /* IE11 */
      }
      setIsFullScreen(true);
    }
  };

  const handleFullScreenExit = () => {
    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen(); /* Safari */
      } else if (document.msExitFullscreen) { 
        document.msExitFullscreen(); /* IE11 */
      }
      setIsFullScreen(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", borderRadius: 2, backgroundColor: "white", rowGap: 2, maxWidth: buttonSize, maxHeight: buttonSize }}>
      <Tooltip title="Fullscreen" placement="bottom">
        { !isFullScreen ? (
          <IconButton sx={{ height: buttonSize, width: buttonSize, padding: 0 }} onClick={handleFullScreen}>
            <Fullscreen />
          </IconButton>
        ) : (
          <IconButton sx={{ height: buttonSize, width: buttonSize, padding: 0 }} onClick={handleFullScreenExit}>
            <FullscreenExit />
          </IconButton>
        )}
      </Tooltip>
    </Box>
  );
};

export default FullScreen;