import { Collections } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const Basemap = ({ view }) => {
  const [basemapOpen, setBasemapOpen] = useState(false);
  const toggleBasemap = () => {
    setBasemapOpen(!basemapOpen);
  };

  const handleBasemapStreets = () => {
    view.map.basemap = "streets";
  };
  const handleBasemapOSM = () => {
    view.map.basemap = "osm";
  };
  const handleBasemapSatellite = () => {
    view.map.basemap = "satellite";
  };
  const handleBasemapHybrid = () => {
    view.map.basemap = "hybrid";
  };

  return (
    <Box sx={{display: "flex", flexDirection: "row", columnGap: 2}}>
      {basemapOpen && (
        <Box sx={{ backgroundColor: "white", borderRadius: 2 }}>
          <Tooltip title="Streets" placement="top">
            <IconButton onClick={handleBasemapStreets} sx={{ height: "48px", width: "48px", padding: 0 }}>
              <Image src={"/assets/Streets-Clip.jpg"} width={40} height={40}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="OSM" placement="top">
            <IconButton onClick={handleBasemapOSM} sx={{ height: "48px", width: "48px", padding: 0 }}>
              <Image src={"/assets/OSM-Clip.jpg"} width={40} height={40}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Satellite" placement="top">
            <IconButton onClick={handleBasemapSatellite} sx={{ height: "48px", width: "48px", padding: 0 }}>
              <Image src={"/assets/Satellite-Clip.jpg"} width={40} height={40}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Hybrid" placement="top">
            <IconButton onClick={handleBasemapHybrid} sx={{ height: "48px", width: "48px", padding: 0 }}>
              <Image src={"/assets/Hybrid-Clip.jpg"} width={40} height={40}/>
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Box sx={{ maxWidth: "48px", backgroundColor: "white", borderRadius: 2 }}>
        <Tooltip title={!basemapOpen && "Basemap"} placement="left">
          <IconButton onClick={toggleBasemap} sx={{ height: "48px", width: "48px", padding: 0 }}>
            <Collections />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Basemap;
