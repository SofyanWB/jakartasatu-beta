import React from "react";
import { Box } from "@mui/material";
import Search from "@/components/peta/interaktif/Search";
import Bahasa from "@/components/peta/interaktif/Bahasa";
import InfoMap from "@/components/peta/interaktif/InfoMap";
import FullScreen from "@/components/peta/interaktif/FullScreen";

const TopRight = ({ view, startTour }) => {
  return (
    <Box sx={{display: "flex", flexDirection: "row", columnGap: 2}}>
      <Search view={view }/>
      <InfoMap view={view} startTour={startTour}/>
      <Bahasa view={view}/>
      <FullScreen buttonSize="48px"/>
    </Box>
  );
};

export default TopRight;
