"use client";

import { LegendToggle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import Legend from "@arcgis/core/widgets/Legend";

export default function LegendWidget({
  view,
  expandLegendHandle,
  expandedLegend,
  legendRef,
  isMobile,
  widgetHeight
}) {
  useEffect(() => {
    if (view) {
      new Legend({
        view: view,
        container: legendRef.current,
      });
    }
  }, [view]);
  return (
    <>
      {isMobile ? (
        <>
          <Button //Desktop
            onClick={expandLegendHandle}
            variant="contained"
            sx={{
              position: "absolute",
              top: "15%",
              left: "2%",
              color: expandedLegend ? "#1976D2" : "white",
              bgcolor: expandedLegend ? "white" : "#1976D2",
              minWidth: "40px",
              width: "40px",
              height: "40px",
              "&:hover": {
                bgcolor: "#E1D3C1",
              },
            }}
          >
            <LegendToggle sx={{ width: "32px", height: "32px" }} />
          </Button>
          <Box
            ref={legendRef}
            sx={{
              position: "absolute",
              display: expandedLegend ? "block" : "none",
              top: "15%",
              left: "5%",
              height: widgetHeight,
              width: "300px",
              overflowY: "scroll",
              bgcolor: "white",
              color: "black",
            }}
          />
        </>
      ) : (
        <>
          <Button //Mobile
            onClick={expandLegendHandle}
            variant="contained"
            sx={{
              position: "absolute",
              top: "21%",
              left: "2%",
              color: expandedLegend ? "#1976D2" : "white",
              bgcolor: expandedLegend ? "white" : "#1976D2",
              height: "32px",
              width: "32px",
              minWidth: "32px",
              "&:hover": {
                bgcolor: "#E1D3C1",
              },
            }}
          >
            <LegendToggle />
          </Button>
          <Box
            ref={legendRef}
            sx={{
              position: "absolute",
              left: "0px",
              bottom: "0px",
              overflowY: "scroll",
              height: widgetHeight,
              width: "100%",
              display: expandedLegend ? "block" : "none",
              bgcolor: "white",
              color: "black",
            }}
          ></Box>
        </>
      )}
    </>
  );
}

{
  /* <Box
        sx={{
          position: "absolute",
          top: { xs: "180px", sm: "160px" },
          left: "2%",
        }}
      >
        <Button //Desktop Button
          onClick={expandLegendHandle}
          variant="contained"
          sx={{
            color: expandedLegend ? "#1976D2" : "white",
            bgcolor: expandedLegend ? "white" : "#1976D2",
            minWidth: "40px",
            width: "40px",
            height: "40px",
            [theme.breakpoints.down("md")]: { display: "none" },
            "&:hover": {
              bgcolor: "#E1D3C1",
            },
          }}
        >
          <LegendToggle sx={{ width: "32px", height: "32px" }} />
        </Button>
        <Button //Mobile Button
          onClick={expandLegendHandle}
          variant="contained"
          sx={{
            color: expandedLegend ? "#1976D2" : "white",
            bgcolor: expandedLegend ? "white" : "#1976D2",
            height: "32px",
            width: "32px",
            minWidth: "32px",
            [theme.breakpoints.up("md")]: { display: "none" },
            "&:hover": {
              bgcolor: "#E1D3C1",
            },
          }}
        >
          <LegendToggle />
        </Button>
      </Box>
      <Box
        ref={legendRef}
        sx={{
          position: "absolute",
          left: { xs: "0px", sm: "100px" },
          top: { sm: "160px" },
          bottom: { xs: "0px" },
          overflowY: "scroll",
          height: { xs: "30%", sm: "35%" },
          width: { xs: "100%", sm: "300px" },
          display: expandedLegend ? "block" : "none",
          bgcolor: "white",
          color: "black",
        }}
      ></Box> */
}
