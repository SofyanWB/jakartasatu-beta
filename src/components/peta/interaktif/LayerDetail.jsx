import { Delete, FilterAlt, GridOn, Info, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, Slider, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";
import LayerQuery from "./LayerQuery";
import FeatureTable from "@arcgis/core/widgets/FeatureTable";

const LayerDetail = ({view, layer, addedLayers, setAddedLayers, setInfoLayerOpen, setLayerInfo, setTableOpen, tableRef, isMobile, setHandleSetQueryTour, tourState}) => {
  const [queryOpen, setQueryOpen] = useState(false);
  const handleOpenQuery = () => {
    setQueryOpen(true)
  };
  const handleCloseQuery = () => setQueryOpen(false);
  const [opacity, setOpacity] = useState(layer.opacity);

  const handleInfo = (layer) => {
    setInfoLayerOpen(true);
    setLayerInfo(layer);
    console.log(view)
  };
  const handleTable = (layer, view) => {
    tableRef.current.innerHTML = "";
    setTableOpen(true);
    const tabelfitur = new FeatureTable({
      view: view,
      layer: layer,
      container: tableRef.current
    });
  };
  const handleDelete = (layer) => {
    const layerIndexToRemove = addedLayers.findIndex((addedLayer) => addedLayer.id == layer.id);
    if(layerIndexToRemove !== -1) {
      view.map.remove(addedLayers[layerIndexToRemove]);
      setAddedLayers((prevLayers) => {
        const updatedLayers = [...prevLayers];
        updatedLayers.splice(layerIndexToRemove, 1);
        return updatedLayers;
      })
    }
  };
  const sliderHandle = (layer, value) => {
    setOpacity(value);
    layer.opacity = opacity;
  };

  return (
    <Box sx={{ display: "grid", flexDirection: "column"}}>
      <Box sx={{display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-evenly"}}>
        <Tooltip title="Info" placement="top">
          <IconButton onClick={() => handleInfo(layer)} id={`layer-info-${layer.id}`}>
            <Info/>
          </IconButton>
        </Tooltip>
        <Box>
          <Tooltip title="Table" placement="top">
            <IconButton onClick={() => handleTable(layer, view)} id={`layer-table-${layer.id}`}>
              <GridOn/>
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Query" placement="top">
            <IconButton onClick={handleOpenQuery} id={`layer-query-${layer.id}`}>
              <FilterAlt/>
            </IconButton>
          </Tooltip>
          <LayerQuery view={view} layer={layer} isMobile={isMobile} queryOpen={queryOpen} handleCloseQuery={handleCloseQuery} tourState={tourState} setHandleSetQueryTour={setHandleSetQueryTour} />
        </Box>
        <Tooltip title="Remove" placement="top">
          <IconButton onClick={() => handleDelete(layer)}>
            <Delete/>
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{display: "flex", width: "auto", justifyContent: "start", paddingLeft: 2}}>
        {layer && (
          <Stack spacing={2} direction="row" sx={{ width: "100%", paddingRight: 2 }} alignItems="center">
            <VisibilityOff sx={{color: "#757575", width: "20px"}}/>
            <Slider valueLabelDisplay="auto" value={opacity} min={0} max={1} step={0.1} onChange={(event, value) => sliderHandle(layer, value)} sx={{width: "80%"}}/>
            <Visibility sx={{color: "#757575", width: "20px"}}/>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default LayerDetail;
