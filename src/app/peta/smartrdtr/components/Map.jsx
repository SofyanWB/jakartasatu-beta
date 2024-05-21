import Basemap from "@/components/peta/interaktif/Basemap";
import Home from "@/components/peta/interaktif/Home";
import Kordinat from "@/components/peta/interaktif/Kordinat";
import "@arcgis/core/assets/esri/themes/light/main.css";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Popup from "@arcgis/core/widgets/Popup";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./style.css"
import FullScreen from "@/components/peta/interaktif/FullScreen";
import Zoom from "@/components/peta/interaktif/Zoom";

const MapComponent = ({ view, setView, layers, layerView, setLayerView, icons, setIcons, rdtrlayers, setRdtrLayers }) => {
  const mapRef = useRef();
  
  useEffect(() => {
    if(layers) {
      const icons = [];
      const layerGroups = [];

      layers.forEach((group, index) => {
        const icon = {
          name: group.name,
          icon: group.icon
        };
        icons.push(icon);

        if(group.name !== "Peta Dasar Struktur") {
          const layerGroup = new GroupLayer({
            title: group.name,
            visible: group.name === "Rencana Detail Tata Ruang" ? true : false,
            id: index
          });
          layerGroups.push(layerGroup);

          group.layers.forEach((layer) => {
            const featureLayer = new FeatureLayer({
              url: layer.url,
              title: layer.title,
              visible: layer.is_default,
              popupTemplate: layer.popupTemplate
            });
            layerGroup.add(featureLayer);
          });
        }
      });

      setRdtrLayers(layerGroups);
      setIcons(icons);

      const map = new Map({
        basemap: "streets",
        layers: layerGroups
      });
      const view = new MapView({
        map: map,
        zoom: 15,
        center: [106.826959, -6.176923],
        ui: {
            components: [],
        },
        popup: new Popup({
          defaultPopupTemplateEnabled: true,
          dockEnabled: false,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
          },
          visibleElements: {
            closeButton: true,
          },
        }),
        container: mapRef.current
      });

      const groupLayerRDTR = view.map.layers.items.find((group) => group.title === "Rencana Detail Tata Ruang");
      view.whenLayerView(groupLayerRDTR.layers.items[0]).then((layerView) => {
        setLayerView(layerView);
      });
      setView(view);
    }
  }, [layers])

  return (
    <Box sx={{display: "flex", position: "relative", width: "100%", height: "100%"}} ref={mapRef}>
      <Box sx={{position: "absolute", left: "2%", bottom: "2%"}}>
        <Kordinat view={view}/>
      </Box>
      <Box sx={{position: "absolute", display: "flex", flexDirection: "column", right: "2%", bottom: "2%", rowGap: 2, alignItems: "flex-end"}}>
        <Basemap view={view}/>
        <FullScreen buttonSize={"48px"}/>
        <Zoom buttonSize={"48px"} view={view}/>
        {/* <Home view={view} center={[106.826959, -6.176923]} zoom={15}/> */}
      </Box>
    </Box>
  );
};

export default MapComponent;
