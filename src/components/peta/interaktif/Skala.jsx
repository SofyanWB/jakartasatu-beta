import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

const Skala = ({ view }) => {
  const [scale, setScale] = useState(361.119);
  const [unit, setUnit] = useState("m");

  let debounceTimer;

  const handleMouseWheel = () => {
    const newScale = (view.scale * 4 * 0.01).toFixed(3);
    setScale(newScale);
    if (newScale < 1000.0) {
      setUnit("m");
    } else if (newScale >= 1000.0 && newScale < 1000000.0) {
      setUnit("km");
      setScale((newScale * 0.001).toFixed(3));
    }
  };

  const debounce = (callback, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
  };

  useEffect(() => {
    if (view) {
      reactiveUtils.watch(() => view.updating, (updating) => {
        debounce(() => handleMouseWheel(), 100)
      });
    }
  }, [view]);

  return (
    <Box sx={{display: "flex", backgroundColor: "white", borderRadius: 2, flexDirection: "row", padding: 2, columnGap: 1, flexWrap: "nowrap", textWrap: "nowrap"}}>
      <Typography variant="caption" fontSize={"0.7rem"}>
        {scale} {unit}
      </Typography>
      <img src={"/scale.svg"} style={{ width: "5cm", height: "0.5cm", color: "black" }}/>
    </Box>
  );
};

export default Skala;
