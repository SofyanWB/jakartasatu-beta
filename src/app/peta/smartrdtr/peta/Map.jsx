import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Popup from '@arcgis/core/widgets/Popup';
import { Box, useMediaQuery } from '@mui/material';
import "@arcgis/core/assets/esri/themes/light/main.css";
import React, { useEffect, useRef, useState } from 'react';
import layers from "@/components/peta/smartrdtr/Layers.json";
import kegiatan from "@/components/peta/smartrdtr/ListKegiatan.json";
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Desktop from './Desktop';
import Mobile from './Mobile';

const MapComponent = () => {
  const mapRef = useRef();
  const [icons, setIcons] = useState();
  const [rdtrlayers, setRdtrLayers] = useState();
  const [layerView, setLayerView] = useState();
  const [view, setView] = useState();
  const [isHitung,  setIsHitung] = useState(false);
  const [luasLahan, setLuasLahan] = useState();
  const isMobile = useMediaQuery("(min-width:600px)");
  const [tabValue, setTabValue] = useState(0);
  const [activeMeasurement, setActiveMeasurement] = useState("");
  const [areaWidget, setAreaWdiget] = useState();
  const [lineWidget, setLineWidget] = useState();
  const [areaHasil, setAreaHasil] = useState();

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (layers) {
      const iconsArray = [];
      const layerGroups = [];
      layers.forEach((group) => {
        const icon = {
          name: group.name,
          icon: group.icon,
        };
        iconsArray.push(icon);

        if (group.name !== "Peta Dasar Struktur") {
          const layerGroup = new GroupLayer({
            title: group.name,
            visible: true,
          });
          layerGroups.push(layerGroup);

          group.layers.forEach((layer) => {
            const featureLayer = new FeatureLayer({
              url: layer.url,
              title: layer.title,
              visible: layer.is_default,
              popupTemplate: layer.popupTemplate,
            });
            layerGroup.add(featureLayer);
          });
        }
      });

      setRdtrLayers(layerGroups);
      setIcons(iconsArray);

      const map = new Map({
        basemap: "osm",
        layers: layerGroups
      });
      const view = new MapView({
        map: map,
        container: mapRef.current,
        center: [106.826959, -6.176923],
        zoom: 15,
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
      });
      view.whenLayerView(map.layers.items[0].layers.items[0]).then((layerView) => {
        setLayerView(layerView);
      });
      setView(view);
    }
  }, [layers]);

  return (
    <Box sx={{height: "100%", width: "100%", margin: 0, padding: 0}}>
      { isMobile ? (
        <Desktop icons={icons} isHitung={isHitung} mapRef={mapRef} rdtrlayers={rdtrlayers} setIsHitung={setIsHitung} setRdtrLayers={setRdtrLayers} kegiatan={kegiatan} layerView={layerView} luasLahan={luasLahan} setLuasLahan={setLuasLahan} view={view} activeMeasurement={activeMeasurement} areaWidget={areaWidget} lineWidget={lineWidget} setActiveMeasurement={setActiveMeasurement} setAreaWdiget={setAreaWdiget} setLineWidget={setLineWidget} areaHasil={areaHasil} setAreaHasil={setAreaHasil}/>
      ) : (
        <Mobile icons={icons} view={view} handleChangeTab={handleChangeTab} isHitung={isHitung} kegiatan={kegiatan} layerView={layerView} luasLahan={luasLahan} mapRef={mapRef} rdtrlayers={rdtrlayers} setIsHitung={setIsHitung} setLuasLahan={setLuasLahan} setRdtrLayers={setRdtrLayers} tabValue={tabValue}/>
      )}
    </Box>
  )
}

export default MapComponent
