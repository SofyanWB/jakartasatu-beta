import { Close, Straighten } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import Graphic from '@arcgis/core/Graphic';
import Polyline from "@arcgis/core/geometry/Polyline.js";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";

const MeasurementLine = ({ view, draw, drawStatus, setDrawStatus, drawingType, setDrawingType }) => {
  const [graphics, setGraphics] = useState();

  const handleDraw = () => {
    if(view && !drawStatus && draw) {
      setDrawStatus(true);
      setDrawingType("polyline")
      const action = draw.create("polyline");
      view.focus();
      action.on(["vertex-add", "vertex-remove", "draw-complete", "cursor-update"], (event) => {
        view.graphics.removeAll();
        const vertices = event.vertices;

        const polyline = new Polyline({
          paths: [vertices],
          hasM: false,
          hasZ: false,
          spatialReference: view.spatialReference
        });
        const length = geometryEngine.planarLength(polyline, "meters");

        const graphic = new Graphic({
          geometry: polyline,
          symbol: {
            type: "simple-line",
            color: [51, 51, 204, 1],
            width: "4pt"
          }
        });

          const midpoint = polyline.getPoint(0, (polyline.paths[0].length - 1).toFixed(0));
          const label = new Graphic({
            visible: true,
            geometry: midpoint,
            symbol: {
              type: "text",
              color: "white",
              haloColor: "black",
              haloSize: "1px",
              text: `${length.toFixed(0)}m`,
              font: {
                size: 12,
                family: "Josefin Slab",
                weight: "bold"
              }
            }
          });
        
        view.graphics.addMany([graphic, label]);
        setGraphics([graphic, label]);
      })
    }
  };

  const handleClear = () => {
    view.graphics.removeMany(graphics);
    setDrawStatus(false);
    setDrawingType("");
  };
  
  return (
    <Box sx={{display: "flex", borderRadius: 2, backgroundColor: "white", rowGap: 2, maxWidth: "48px"}}>
        <Tooltip title="Ukur Panjang" placement="left">
          {drawStatus && drawingType === "polyline" ? (
            <IconButton sx={{height: "48px", width: "48px", padding: 0}} onClick={handleClear} disabled={drawingType === "polygon"}>
              <Close />
            </IconButton>
          ) : (
            <IconButton sx={{height: "48px", width: "48px", padding: 0}} onClick={handleDraw} disabled={drawingType === "polygon"}>
              <Straighten />
            </IconButton>
          )}
        </Tooltip>
    </Box>
  )
}

export default MeasurementLine