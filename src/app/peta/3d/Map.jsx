import { Box } from "@mui/material";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import Home from "@/components/peta/interaktif/Home";

const MapComponent = () => {
  const sceneRef = useRef();
  const [scene, setScene] = useState();
  const [center, setCenter] = useState([106.826959, -6.176923]);
  const [zoom, setZoom] = useState(15);
  useEffect(() => {
    const map = new Map({
        basemap: "satellite",
        ground: "world-elevation"
    });
    const scene = new SceneView({
        camera: {
            position: {
                latitude: -6.184224637961806,
                longitude: 106.82775459616906, 
                z: 1000,
            },
            heading: 0,
            tilt: 45,
        },
        container: sceneRef.current,
        map: map,
        ui: {
          components: ["zoom", "compass", "navigation-toggle"]
        },
        viewingMode: "local"
    });
    setScene(scene);
  }, [])
  return (
    <Box ref={sceneRef} sx={{width: "100%", height: "100%"}}>
      <Box sx={{display: "flex", position: "absolute" ,flexDirection: "column", bottom: "2%", right: "2%"}}>
        <Home view={scene} center={center} zoom={zoom}/>
      </Box>
    </Box>
  );
};

export default MapComponent;
