import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import LayerListMobile from '@/components/peta/smartrdtr/LayerListMobile';
import JenisKegiatanMobile from '@/components/peta/smartrdtr/JenisKegiatanMobile';
import PerhitunganIntensitasMobile from '@/components/peta/smartrdtr/PerhitunganIntensitasMobile';
import Zoom from '@/components/peta/interaktif/Zoom';

const CustomTabPanel = (props) => {
    const { children, value, index } = props;
    return (
      <Box hidden={value !== index} sx={{height: "87%"}}>
        {children}
      </Box>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Mobile = ({mapRef, view, tabValue, handleChangeTab, icons, rdtrlayers, setRdtrLayers, kegiatan, layerView, isHitung, setIsHitung, luasLahan, setLuasLahan}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", width: "100vw", height: "100vh", backgroundColor: "white"}}>
        <Box sx={{position: "relative", display: "flex", width: "100%", height: "60%", border: "1px black solid"}} ref={mapRef}>
            <Box sx={{display: "flex", position: "absolute", top: "4%", right: "4%"}}>
                <Zoom view={view} />
            </Box>
        </Box>
            <Box sx={{width: "100%", height: "40%"}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider', height: "13%"}}>
                    <Tabs value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
                        <Tab label="Layer List" {...a11yProps(0)} sx={{fontSize: "10pt"}}></Tab>
                        <Tab label="Perhitungan Intensitas" {...a11yProps(1)} sx={{fontSize: "10pt"}}></Tab>
                        <Tab label="Jenis Kegiatan" {...a11yProps(2)} sx={{fontSize: "10pt"}}></Tab>
                    </Tabs>
                </Box>
            <CustomTabPanel value={tabValue} index={0}>
                <LayerListMobile icons={icons} layerGroups={rdtrlayers} setLayerGroups={setRdtrLayers} />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <JenisKegiatanMobile dataKegiatan={kegiatan} layerView={layerView} />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
                <PerhitunganIntensitasMobile isHitung={isHitung} setIsHitung={setIsHitung} luasLahan={luasLahan} setLuasLahan={setLuasLahan}/>
            </CustomTabPanel>
        </Box>
    </Box>
  )
}

export default Mobile
