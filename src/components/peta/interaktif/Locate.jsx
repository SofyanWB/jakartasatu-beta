import { MyLocation, MyLocationOutlined, Remove } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";

const Locate = ({ view }) => {
  const [userLayer, setUserLayer] = useState();
  const [isWidgetActive, setIsWidgetActive] = useState(false);

  const handleButtonAdd = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const userGraphic = new Graphic({
        geometry: new Point({
          latitude: latitude,
          longitude: longitude,
        }),
        symbol: {
          type: "simple-marker",
          color: [29,161,242],
          size: 12,
          outline: {
            color: [255, 255, 255],
            width: 2
          }
        },
      });
      const myLocateLayer = new GraphicsLayer({
        graphics: [userGraphic],
        title: "Locate User",
      });
      setUserLayer(myLocateLayer);
      if (view) {
        view.map.addMany([myLocateLayer]);
        view.goTo({
          target: myLocateLayer.graphics.items[0].geometry,
          zoom: 15,
        });
      }
    });
    setIsWidgetActive(!isWidgetActive);
  };

  const handleButtonRemoved = () => {
    if (userLayer && view) {
      view.map.removeMany([userLayer]);
    }
    setIsWidgetActive(!isWidgetActive);
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
      {isWidgetActive ? (
        <Tooltip title="Locate" placement="left">
          <IconButton
          sx={{
            height: "48px",
            width: "48px",
            padding: 0,
            backgroundColor: "#e4e4e4",
          }}
          onClick={() => handleButtonRemoved()}
          >
            <MyLocationOutlined />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Locate" placement="left">
          <IconButton
          sx={{
            height: "48px",
            width: "48px",
            padding: 0,
            backgroundColor: "white",
          }}
          onClick={() => handleButtonAdd()}
          >
            <MyLocation />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default Locate;
