import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import { Dashboard } from "@mui/icons-material";
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer.js";

export default function BasemapWidget({
  view,
  basemapRef,
  expandBasemapHandle,
  expandedBasemap,
  isMobile,
  widgetHeight,
}) {
  useEffect(() => {
    if (view) {
      const basemap2020 = new Basemap({
        title: "Peta Dasar DKI",
        thumbnailUrl:
          "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/afe064255a184168ae05628587819480/data",
        baseLayers: new TileLayer({
          title: "Peta Dasar 2020",
          url: "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Dasar_DKI_Jakarta/MapServer",
        }),
      });
      new BasemapGallery({
        view: view,
        container: basemapRef.current,
        source: [
          Basemap.fromId("hybrid"),
          Basemap.fromId("satellite"),
          basemap2020,
          Basemap.fromId("topo-vector"),
          Basemap.fromId("streets-vector"),
          Basemap.fromId("osm"),
        ],
      });
    }
  }, [view]);

  return (
    <>
      {isMobile ? (
        <>
          <Button
            onClick={expandBasemapHandle}
            variant="contained"
            sx={{
              position: "absolute",
              top: "20%",
              left: "2%",
              color: expandedBasemap ? "#1976D2" : "white",
              bgcolor: expandedBasemap ? "white" : "#1976D2",
              minWidth: "40px",
              width: "40px",
              height: "40px",
              "&:hover": {
                bgcolor: "#E1D3C1",
              },
            }}
          >
            <Dashboard sx={{ width: "32px", height: "32px" }} />
          </Button>
          <Box
            sx={{
              position: "absolute",
              display: expandedBasemap ? "flex" : "none",
              top: "20%",
              left: "5%",
              height: widgetHeight,
              width: "15%",
              overflow: "hidden",
              bgcolor: "white",
            }}
          >
            <Box ref={basemapRef} />
          </Box>
          <Box />
        </>
      ) : (
        <>
          <Button
            onClick={expandBasemapHandle}
            variant="contained"
            sx={{
              position: "absolute",
              top: "26%",
              left: "2%",
              color: expandedBasemap ? "#1976D2" : "white",
              bgcolor: expandedBasemap ? "white" : "#1976D2",
              height: "32px",
              width: "32px",
              minWidth: "32px",
              "&:hover": {
                bgcolor: "#E1D3C1",
              },
            }}
          >
            <Dashboard />
          </Button>
          <Box
            sx={{
              position: "absolute",
              display: expandedBasemap ? "block" : "none",
              left: "0px",
              bottom: "0px",
              height: widgetHeight,
              width: "100%",
              overflowY: "scroll",
              bgcolor: "white",
            }}
          >
            <Box ref={basemapRef} />
          </Box>
          <Box />
        </>
      )}
    </>
  );
}
