import { Delete, Layers } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import Catalog from "./Catalog";
import LayerList from "./LayerList";

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

const MejaKerja = ({ view, addedLayers, setAddedLayers, setInfoLayerOpen, setLayerInfo, setTableOpen, layerTable, setLayerTable, tableRef, catalogOpen, setCatalogOpen, handleCatalogOpen, isMobile, setHandleSetQueryTour, tourState}) => {
  const handleRemoveAll = () => {
    setAddedLayers([]);
    view.map.removeMany(view.map.layers.items.filter(layer => layer.title !== "Locate User"));
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: "white", borderRadius: 4, alignItems: "center"}} id="isi-meja-kerja">
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", width: "90%", height: "10%"}} >
        <Button onClick={handleCatalogOpen} endIcon={<Layers/>} sx={{ color: "white", width: "100%", backgroundColor: "#ffc425", borderRadius: 2, "&:hover": { backgroundColor: "#ffc425", color: "white" }}} id="tombol-catalog-layer">
          KATALOG LAYER
        </Button>
        { tourState.run ? (
          <Catalog view={view} addedLayers={addedLayers} setAddedLayers={setAddedLayers} catalogOpen={catalogOpen} setCatalogOpen={setCatalogOpen} isMobile={isMobile} tourState={tourState}/>
        ) : (
          <Modal open={catalogOpen} onClose={() => setCatalogOpen(false)}>
            <Catalog view={view} addedLayers={addedLayers} setAddedLayers={setAddedLayers} catalogOpen={catalogOpen} setCatalogOpen={setCatalogOpen} isMobile={isMobile} tourState={tourState}/>
          </Modal>
        )}
      </Box>
      <Box sx={{display: "flex", flexDirection: "column", width: "90%", height: "80%"}}>
        <LayerList view={view} addedLayers={addedLayers} setAddedLayers={setAddedLayers} setInfoLayerOpen={setInfoLayerOpen} setLayerInfo={setLayerInfo} layerTable={layerTable} setLayerTable={setLayerTable} setTableOpen={setTableOpen} tableRef={tableRef} isMobile={isMobile} setHandleSetQueryTour={setHandleSetQueryTour} tourState={tourState}/>
      </Box>
      <Box sx={{display:"flex", alignItems: "center", justifyContent: "center", width: "90%", height: "10%"}}>
        <Button onClick={handleRemoveAll} endIcon={<Delete/>} sx={{color: "white", width: "100%", backgroundColor:"#ff1a1a", borderRadius: 2, "&:hover": { backgroundColor: "#ff1a1a", color: "white" }}}>
          Remove All
        </Button>
      </Box>
    </Box>
  );
};

export default MejaKerja;
