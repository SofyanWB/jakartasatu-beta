import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { PlaylistAdd, PlaylistRemove } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography} from "@mui/material";

const catalogStyle = {
  height: "100%",
  overflowY: "scroll",
  justifyContent: "center",
  scrollbarWidth: "thin",
  scrollbarColor: "#888 #f1f1f1",
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
  }
};

const CatalogContent = ({ group, searchInput, view, addedLayers, setAddedLayers, isMobile }) => {

  const addLayer = (layer) => {
    const selectedLayer = new FeatureLayer({
      url: layer.service_url,
      id: layer.id,
      title: layer.name,
      opacity: layer.opacity
    });
    view.map.add(selectedLayer);
    setAddedLayers((prevLayers) => [...prevLayers, selectedLayer]);
  };

  const removeLayer = (layer) => {
    const layerIndexToRemove = addedLayers.findIndex((addedLayer) => addedLayer.id == layer.id);
    if (layerIndexToRemove !== -1) {
      view.map.remove(addedLayers[layerIndexToRemove]);
      setAddedLayers((prevLayers) => {
        const newLayers = [...prevLayers];
        newLayers.splice(layerIndexToRemove, 1);
        return newLayers;
      });
    }
  };

  return (
    <Box sx={catalogStyle}>
      <Grid container rowGap={1} columnGap={0} sx={{ paddingBottom: "8px", paddingTop: "8px" }}>
        {group && group.layers.map((layer, index) => {
          const showCard = !searchInput || layer.name.toLowerCase().includes(searchInput.toLowerCase());
          return showCard &&(
            <Grid item xs={isMobile ? 4 : 6} sx={{ display: "flex", justifyContent: "center" }} key={index}>
              <Card sx={{ width: "90%", display: "grid", alignContent: "normal" }} >
                <CardMedia sx={{ height: 110, width: "100%" }} image={`https://fakeimg.pl/300x200?text=${layer.name}`} title="card-sample"/>
                <CardContent sx={{textAlign: isMobile? "start" : "center"}}>
                  <Typography gutterBottom sx={{fontSize: isMobile ? "12pt" : "10pt"}} component="div">
                    {layer.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center", alignItems: "self-end" }}>
                  {addedLayers.length > 0 && addedLayers.some((e) => e.id == layer.id) ? (
                    <Button onClick={() => removeLayer(layer)} startIcon={<PlaylistRemove />} sx={{ backgroundColor: "#ff1a1a", width: "100%", color: "white", "&:hover": { backgroundColor: "#ff1a1a" }}} className={`button-catalog-${layer.id}`} name="Hapus">
                      Hapus
                    </Button>
                  ) : (
                    <Button onClick={() => addLayer(layer)} startIcon={<PlaylistAdd />} sx={{ backgroundColor: "#ffc425", width: "100%", color: "white", "&:hover": { backgroundColor: "#ffc425" }}} className={`button-catalog-${layer.id}`}name="Tambah">
                      Tambah
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          )})}
      </Grid>
    </Box>
  );
};

export default CatalogContent;
