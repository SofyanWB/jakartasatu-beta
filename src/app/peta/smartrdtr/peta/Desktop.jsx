import JenisKegiatan from '@/components/peta/smartrdtr/JenisKegiatan'
import LayerList from '@/components/peta/smartrdtr/LayerList'
import PerhitunganIntensitas from '@/components/peta/smartrdtr/PerhitunganIntensitas'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import "./SmartrdtrStyleDesktop.css"
import MeasurementArea from '@/components/peta/interaktif/MeasurementArea'
import MeasurementLine from '@/components/peta/interaktif/MeasurementLine'

const desktopStyle = {
    position: "absolute",
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    width: "98vw",
    height: "98vh",
    backgroundColor: "white"
}

const Desktop = ({mapRef, rdtrlayers, icons, setRdtrLayers, isHitung, setIsHitung, kegiatan, layerView, luasLahan, setLuasLahan, view, activeMeasurement, areaWidget, lineWidget, setActiveMeasurement, setAreaWdiget, setLineWidget, areaHasil, setAreaHasil}) => {
  return (
    <Box sx={desktopStyle}>
        <Box sx={{display: "flex", flexDirection: "row", width: "100%", height: "100%", justifyContent: "space-between", alignItems: "center"}}>
            <Box sx={{position: "relative", display: "flex", width: "70%", height: "100%", borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,.3)"}} ref={mapRef}>
                <Box sx={{ position: "absolute", display: "flex", left: "2%", top: "2%"}}>
                    <LayerList layerGroups={rdtrlayers} icons={icons} setLayerGroups={setRdtrLayers}/>
                </Box>
                <Box sx={{ position: "absolute", display: "flex", right: "2%", top: "2%", flexDirection: "column", rowGap: 2}}>
                    <MeasurementArea view={view} activeMeasurement={activeMeasurement} areaWidget={areaWidget} lineWidget={lineWidget} setActiveMeasurement={setActiveMeasurement} setAreaWdiget={setAreaWdiget} areaHasil={areaHasil} setAreaHasil={setAreaHasil}/>
                    <MeasurementLine view={view} activeMeasurement={activeMeasurement} areaWidget={areaWidget} lineWidget={lineWidget} setActiveMeasurement={setActiveMeasurement} setLineWidget={setLineWidget}/>
                </Box>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", rowGap: "1%", width: "29%", height: "100%"}}>
                <JenisKegiatan dataKegiatan={kegiatan} layerView={layerView} isHitung={isHitung}/>
                <PerhitunganIntensitas isHitung={isHitung} setIsHitung={setIsHitung} areaHasil={areaHasil} setAreaHasil={setAreaHasil}/>
            </Box>
        </Box>
    </Box>
  )
}

export default Desktop
