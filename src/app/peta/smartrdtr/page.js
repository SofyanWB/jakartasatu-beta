"use client"

import { Delete, ModeEdit } from "@mui/icons-material"
import { Box, Button, IconButton } from "@mui/material"
import dynamic from "next/dynamic"
import SidePanel from "./components/SidePanel";
import { useEffect, useState } from "react";
import kegiatan from "./asets/ListKegiatan.json";
import layers from "./asets/Layers.json"
import { useRouter } from "next/navigation";
import Draw from "@arcgis/core/views/draw/Draw.js";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Map = dynamic(() => import("./components/Map"), { ssr: false, webpack: false });

const page = () => {
  const router = useRouter();
  const [view, setView] = useState();
  const [layerView, setLayerView] = useState();
  const [icons, setIcons] = useState();
  const [rdtrlayers, setRdtrLayers] = useState();
  const [drawStatus, setDrawStatus] = useState(false);
  const [luasLahan, setLuasLahan] = useState();
  const [draw, setDraw] = useState();
  const [geoJSON, setGeoJSON] = useState();

  useEffect(() => {
    if(view) {
        const drawInstance = new Draw({
            view: view,
        });
        setDraw(drawInstance);
    }
  }, [view])

  const handleDraw = () => {
    if (view && draw) {
        setDrawStatus(true);
        const action = draw.create("polygon");
        view.focus();
        action.on(["vertex-add", "vertex-remove", "draw-complete", "cursor-update"], (event) => {
            view.graphics.removeAll();
            const vertices = event.vertices;

            const polygon = new Polygon({
                rings: [vertices],
                hasM: false,
                hasZ: false,
                spatialReference: view.spatialReference
            });

            const area = geometryEngine.planarArea(polygon, "square-meters");
            let fixedArea
            if(area < 0) {
                fixedArea = area * -1
            } else {
                fixedArea = area
            }
            setLuasLahan(fixedArea);

            const graphic = new Graphic({
                geometry: polygon,
                symbol: {
                    type: "simple-fill",
                    color: [227, 139, 79, 0.8],
                    outline: {
                        color: [255, 255, 255],
                        width: 1
                    }
                }
            });

            const label = new Graphic({
                visible: true,
                geometry: polygon,
                symbol: {
                    type: "text",
                    color: "white",
                    haloColor: "black",
                    haloSize: "1px",
                    text: `${fixedArea.toFixed(0)}m2`,
                    font: {
                        size: 12,
                        family: "Josefin Slab",
                        weight: "bold"
                    }
                }
            })

            view.graphics.add(graphic);
            view.graphics.add(label);
        });
    }
};

  const handleClear = () => {
    if(view && draw) {
        view.graphics.removeAll();
        draw.reset();
        setDrawStatus(false);
        setLuasLahan(null);
    }
  }

  return (
    <Box sx={{position: "fixed", display: "flex", flexDirection: "column", width: "99vw", height: "98vh", top: "50%", left: "50%", transform: "translate(-50%, -50%)", rowGap: "1%"}}>
        <Box sx={{display: "flex", flexDirection: "row", height: "10%", width: "100%", justifyContent: "space-between", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px", backgroundColor: "#00CED1"}}>
            <Box sx={{display: "flex", width: "20%", justifyContent: "center", alignItems:"center"}}>
                {drawStatus ? (
                    <Button variant="contained" startIcon={<Delete />} size="large" onClick={handleClear} sx={{width: "193px", height: "56px", borderRadius: "40px", color: "white", textTransform: "none", fontFamily: "Inter", backgroundColor: "#F7941D", '&:hover': {backgroundColor: "#F7941D"}}}>
                        Remove
                    </Button>
                ) : (
                    <Button variant="contained" startIcon={<ModeEdit />} size="large" onClick={handleDraw} sx={{width: "193px", height: "56px", borderRadius: "40px", color: "white", textTransform: "none", fontFamily: "Inter", backgroundColor: "#F7941D", '&:hover': {backgroundColor: "#F7941D"}}}>
                        Draw
                    </Button>
                )}
            </Box>
            <Box sx={{display: "flex", width: "45%", alignItems: "center", justifyContent: "space-around"}}>
                <Button startIcon={<DescriptionIcon />} variant="contained" size="large" onClick={() => router.push("./smartrdtr/lampiran")} sx={{width: "193px", height: "56px", borderRadius: "40px", color: "white", textTransform: "none", fontFamily: "Inter", backgroundColor: "#003577", '&:hover': {backgroundColor: "#003577"}}}>
                    Lampiran
                </Button>
                <Button startIcon={<AttachFileIcon sx={{transform: "rotate(315deg)"}}/>} variant="contained" size="large" onClick={() => router.push("./smartrdtr/naskah")} sx={{width: "193px", height: "56px", borderRadius: "40px", color: "white", textTransform: "none", fontFamily: "Inter", backgroundColor: "#0073FF", '&:hover': {backgroundColor: "#0073FF"}}}>
                    Naskah
                </Button>
                <Button variant="contained" size="large" sx={{width: "193px", height: "56px", borderRadius: "40px", color: "white", textTransform: "none", fontFamily: "Inter", backgroundColor: "#3D7ECC", '&:hover': {backgroundColor: "#3D7ECC"}}}>
                    IRK V.2.0
                </Button>
            </Box>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", height: "89%", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px", backgroundColor: "white"}}>
            <Box sx={{width: "20%", height: "100%", padding: 1}}>
                <SidePanel kegiatan={kegiatan} layerView={layerView} view={view} setView={setView} luasLahan={luasLahan} geoJSON={geoJSON} setGeoJSON={setGeoJSON}/>
            </Box>
            <Box sx={{width: "80%", height: "100%", padding: 1}}>
                <Map view={view} setView={setView} layers={layers} layerView={layerView} setLayerView={setLayerView} icons={icons} setIcons={setIcons} rdtrlayers={rdtrlayers} setRdtrLayers={setRdtrLayers}/>
            </Box>
        </Box>
    </Box>
  )
}

export default page