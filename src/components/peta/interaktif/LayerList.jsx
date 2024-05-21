import { CheckBox, CheckBoxOutlineBlank, ExpandLess, MoreHoriz } from '@mui/icons-material';
import { Box, Button, Checkbox, Collapse, IconButton, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LayerDetail from './LayerDetail';

const LayerList = ({ view, isMobile, addedLayers, setAddedLayers, setLayerInfo, setInfoLayerOpen, setTableOpen, tableRef, tourState, setHandleSetQueryTour }) => {
    const [layerList, setLayerList] = useState([]);

    useEffect(() => {
        if (view?.map?.layers?.items?.filter(layer => layer.listMode === "show" && layer.title !== "Locate User").length > 0) {
            setLayerList((prevState) => {
                return view.map.layers.items.filter(layer => layer.listMode === "show" && layer.title !== "Locate User").map((layer) => {
                    const prevLayer = prevState.find(prev => prev.layer.id === layer.id);
                    const newexpand = prevLayer ? prevLayer.expand : false;
                    const newLayer = prevLayer ? prevLayer.layer : layer;
                    return {
                        ...prevLayer,
                        layer: newLayer,
                        expand: newexpand,
                    };
                });
            });
        }
    }, [view?.map?.layers?.items?.length]);
    
    
    const listStyle = {
        height: "auto",
        overflowY: "scroll",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #f1f1f1",
        width: "100%",
        "&::-webkit-scrollbar": {
            width: "10px",
        },
        "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#888",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
        },
        color: "black"
    }

    const handleCollapse = (index) => {
        setLayerList((prevState) => {
            const updatedState = [...prevState];
            updatedState[index].expand = !updatedState[index].expand;
            return updatedState;
        });
    }

    const handleToggleVisibile = (list, index) => {
        return () => {
            list.layer.visible = !list.layer.visible;
            setLayerList((prevState) => {
                const updatedState = [...prevState];
                updatedState[index].visible = list.layer.visible;
                return updatedState;
            });
        }
    }

    return (
        <Box sx={{display: "flex", width: "100%", height: "100%"}}>
            <List sx={listStyle}>
                { view?.map?.layers?.items?.filter(layer => layer.listMode === "show" && layer.title !== "Locate User")?.length > 0 ? (
                    view?.map?.layers?.items?.filter(layer => layer.listMode === "show" && layer.title !== "Locate User")?.map((layer, index) => (
                        <Box sx={{display: "flex", flexDirection: "row"}} key={`box-${index}`}>
                            <Box key={`checkbox-box-${index}`} >
                                <Checkbox checked={layerList[index]?.layer.visible} defaultChecked onChange={handleToggleVisibile(layerList[index], index)} id={`checkbox-layer-${layerList[index]?.layer?.id}`}/>
                            </Box>
                            <Box key={`collapse-box-${index}`} sx={{width: "100%"}}>
                                <ListItemButton onClick={() => handleCollapse(index)} id={`colapse-layer-button-${layerList[index]?.layer?.id}`}>
                                    <ListItemText primary={layer.title} />
                                    {layerList[index]?.expand ? <ExpandLess /> : <MoreHoriz />}
                                </ListItemButton>
                                <Collapse in={layerList[index]?.expand} key={`colapse${index}`}>
                                    <Box sx={{display: "grid", width: "100%"}}>
                                        <LayerDetail view={view} isMobile={isMobile} addedLayers={addedLayers} setAddedLayers={setAddedLayers} layer={layer} setLayerInfo={setLayerInfo} setInfoLayerOpen={setInfoLayerOpen} setTableOpen={setTableOpen} tableRef={tableRef} tourState={tourState} setHandleSetQueryTour={setHandleSetQueryTour}/>
                                    </Box>
                                </Collapse>
                            </Box>
                        </Box>
                    ))) : (
                        <Typography sx={{display: "flex", position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%)"}}>LAYER LIST</Typography>
                    )
                }
            </List>
        </Box>
    )
}

export default LayerList



