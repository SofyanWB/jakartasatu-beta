import FeatureTable from "@arcgis/core/widgets/FeatureTable";
import { ExpandMore, TableRowsSharp } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";

export default function Drawer({ layerGroups, icons, setLayerGroups }) {
  const handleVisible = (groupIndex, layerIndex) => (event) => {
    const updatedLayerGroups = [...layerGroups];
    updatedLayerGroups[groupIndex].layers.items[layerIndex].visible =
      event.target.checked;
    setLayerGroups(updatedLayerGroups);
  };

  const openTable = (layer) => (event) => {
    const tableBoxMobile = document.getElementById("tableBoxMobile");
    if (tableBoxMobile) {
      tableBoxMobile.innerHTML = "";
      new FeatureTable({
        layer: layer,
        container: tableBoxMobile,
      });
    }

    const tableBoxDesktop = document.getElementById("tableBoxDesktop");
    if (tableBoxDesktop) {
      tableBoxDesktop.innerHTML = "";
      new FeatureTable({
        layer: layer,
        container: tableBoxDesktop,
      });
    }
  };

  return (
    <Box>
      {layerGroups &&
        layerGroups.map((layerGroup, groupIndex) => (
          <Accordion
            key={groupIndex}
            style={{ backgroundColor: "#adbce6" }}
            id={"accordion" + groupIndex}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              {icons.find((icon) => icon.title === layerGroup.title)?.src && (
                <img
                  src={
                    icons.find((icon) => icon.title === layerGroup.title).src
                  }
                  alt={layerGroup.title}
                  style={{ width: "24px", height: "24px" }}
                />
              )}
              <Typography>{layerGroup.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "lightgray" }}>
              <FormGroup>
                {layerGroup.layers.items.map((layer, layerIndex) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    key={layerIndex}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={layer.visible}
                          onChange={handleVisible(groupIndex, layerIndex)}
                        />
                      }
                      label={layer.title}
                    />
                    <IconButton
                      aria-label="Table"
                      size="small"
                      onClick={openTable(layer)}
                    >
                      <TableRowsSharp />
                    </IconButton>
                  </Box>
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
