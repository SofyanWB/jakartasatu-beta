import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, Layers } from "@mui/icons-material";
import FullScreen from "@/components/peta/interaktif/FullScreen";
import Zoom from "@/components/peta/interaktif/Zoom";
import Catalog from "@/components/peta/interaktif/Catalog";
import LayerList from "@/components/peta/interaktif/LayerList";

const Mobile = ({ view, handleCatalogOpen, catalogOpen, setCatalogOpen, addedLayers, setAddedLayers, mobileBottomContentOpen, handleBottomContentOpen, tabValue, handleChangeTab, tableRef, setTableOpen, setLayerTable, setInfoLayerOpen, setLayerInfo, layerTable, a11yProps, CustomTabPanel }) => {
  return (
    <>
        <Box sx={{position: "absolute", display: "flex", flexDirection: "row", top: "2%", width: "96%", justifyContent: "space-between", left: "50%", transform: "translate(-50%)"}}>
            <Box sx={{display: "flex",flexDirection: "column", width: "36px", rowGap: 2}}>
              <Zoom view={view} buttonSize="36px"/>
              <Box sx={{width: "36px", height: "36px", backgroundColor: "white", borderRadius: 2}}>
                <IconButton sx={{width: "36px", height: "36px"}} onClick={handleCatalogOpen}>
                  <Layers />
                </IconButton>
                <Catalog view={view} catalogOpen={catalogOpen} setCatalogOpen={setCatalogOpen} addedLayers={addedLayers} setAddedLayers={setAddedLayers} />
              </Box>
            </Box>
            <Box sx={{display: "flex", height: "36px", backgroundColor: "white", borderRadius: 2}}>
              <Button sx={{display: "flex", height: "36px", backgroundColor: "white", borderRadius: 2}}>
                JAKARTA SATU
              </Button>
            </Box>
            <Box sx={{display: "flex", width: "36px", height: "36px", backgroundColor: "white",  borderRadius: 2, justifyContent: "center", alignItems: "center"}}>
              <FullScreen buttonSize="36px"/>
            </Box>
        </Box>
        <Box sx={{position: "absolute", display: "flex", flexDirection: "column", width: "100%", left: "0px", bottom: "0%"}}>
            <Box sx={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
              <Box sx={{display: "flex", width: "70px", height: "30px", backgroundColor: "white", borderRadius: "10px 10px 0px 0px", justifyContent: "center"}}>
                {mobileBottomContentOpen ? (
                  <IconButton onClick={handleBottomContentOpen} sx={{color: "black", backgroundColor: "white"}}>
                    <KeyboardArrowDown />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleBottomContentOpen} sx={{color: "black", backgroundColor: "white"}}>
                    <KeyboardArrowUp />
                  </IconButton>
                )}
              </Box>
              <Box sx={{display: mobileBottomContentOpen ? "flex" : "none", width: "100%", height: "5vh", alignItems: "center", backgroundColor: "white"}}>
                <Tabs value={tabValue} onChange={handleChangeTab} sx={{color: "black"}} variant="scrollable" scrollButtons allowScrollButtonsMobile>
                  <Tab label="Layer List" {...a11yProps(0)} sx={{fontSize: "10pt", color: "black"}}/>
                  <Tab label="Table Layer" {...a11yProps(1)} sx={{fontSize: "10pt", color: "black"}}/>
                </Tabs>
              </Box>
              <Box sx={{display: mobileBottomContentOpen ? "flex" : "none", height: "30vh",width: "100%", backgroundColor: "white"}}>
                <CustomTabPanel index={0} value={tabValue}>
                  <LayerList view={view} addedLayers={addedLayers} setAddedLayers={setAddedLayers} tableRef={tableRef} setTableOpen={setTableOpen} setLayerTable={setLayerTable} setInfoLayerOpen={setInfoLayerOpen} setLayerInfo={setLayerInfo} layerTable={layerTable}/>
                </CustomTabPanel>
                <CustomTabPanel index={1} value={tabValue}>
                  <Box sx={{display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}} ref={tableRef}/>
                </CustomTabPanel>
              </Box>
            </Box>
        </Box>
    </>
  )
}

export default Mobile
