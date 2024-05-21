import { Close, SelectAll } from "@mui/icons-material";
import { Box, FormControl, IconButton, Input, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CatalogContent from "./CatalogContent";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Catalog = ({ view, addedLayers, setAddedLayers, catalogOpen, setCatalogOpen, isMobile, tourState }) => {
  const [data, setData] = useState();
  const handleCatalogClose = () => setCatalogOpen(false);
  const [group, setGroup] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [allLayer, setAllLayer] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jakartasatu.jakarta.go.id/apimobile/app/web/maps"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        let layers = [];
        data.data[1].maps.map((group, index) => {
          group.layers.map((layer, index) => {
            layers.push(layer);
          })
        })
        const allLayers = {
          "name": "Semua Data",
          "layers": layers
        }
        setAllLayer(allLayers);
        setGroup(allLayers);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchData();
  }, []);

  const modalStyle = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "60vw" : "90vw",
    height: isMobile ? "65vh" : "90vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: 4,
    color: "black",
    justifyContent: "space-between"
  };

  const listStyle = {
    height: "100%",
    width: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
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
    },
  };

  const CustomTabPanel = (props) => {
    const { children, value, index } = props;
    return (
      <Box hidden={value !== index} sx={{height: "100%"}}>
        {children}
      </Box>
    );
  };
  
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
  };
  
  const handleGroup = (group) => {
    setGroup(group);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const searchInputHandle = (e) => {
    setSearchInput(e.target.value)
  };

  return (
    <>
      {catalogOpen && (
        <Box sx={modalStyle} id="box-catalog">
          <Box sx={{display: "flex", flexDirection: "row", height: "5%", justifyContent: "space-between"}}>
            <Typography variant="h6">Catalog Data</Typography>
            <IconButton onClick={handleCatalogClose} sx={{width: "36px", height: "36px"}} id="close-catalog-button">
              <Close />
            </IconButton>
          </Box>
        <Box sx={{display: "flex", height: "10%"}}>
          <FormControl sx={{ m: 1, width: "100%", height: "100%" }} variant="standard">
            <InputLabel htmlFor="search-data">Cari Data ...</InputLabel>
            <Input id="search-data" value={searchInput} onChange={(e) => searchInputHandle(e)}/>
          </FormControl>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", height:"80%", width: "100%"}} id="list-group-layer">
          {isMobile ? (
            <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
              <Box sx={{width: "25%"}}>
                <List sx={listStyle}>
                  <ListItem sx={{padding: 0}}>
                    <ListItemButton onClick={() => handleGroup(allLayer)}>
                      <ListItemIcon>
                        <SelectAll sx={{width: "35px", height: "35px", color: "#579DBC"}}/>
                      </ListItemIcon>
                      <ListItemText primary={allLayer.name} />
                    </ListItemButton>
                  </ListItem>
                  {data && data.data[1].maps.map((group, index) => (
                    <ListItem key={index} sx={{padding: 0}}>
                      <ListItemButton onClick={() => handleGroup(group)} id={`list-catalog-group-${index}`}>
                        <ListItemIcon>
                          <img src={group.icon} style={{width: "35px", height: "35px"}} alt=""/>
                        </ListItemIcon>
                        <ListItemText primary={group.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box sx={{width: "74%"}}>
                <CatalogContent group={group} searchInput={searchInput} view={view} addedLayers={addedLayers} setAddedLayers={setAddedLayers} isMobile={isMobile}/>
              </Box>
            </Box>
          ) : (
            <Box sx={{display: "flex", flexDirection: "column", width: "100%", rowGap: "5%", height: "100%"}}>
              <Box sx={{display: "flex", width: "100%", height: "5%", alignItems: "center"}}>
                <Tabs value={tabValue} onChange={handleChangeTab} sx={{color: "black"}} variant="scrollable" scrollButtons allowScrollButtonsMobile>
                  <Tab label={allLayer.name} {...a11yProps(0)} sx={{fontSize: "10pt", color: "black"}} icon={<SelectAll sx={{width: "35px", height: "35px", color: "#579DBC"}}/>} iconPosition="start"/>
                  {data && data.data[1].maps.map((group, index) => (
                    <Tab label={group.name} {...a11yProps(index + 1)} sx={{fontSize: "10pt", color: "black"}} icon={<img src={group.icon} style={{width: "35px", height: "35px"}} alt=""/>} iconPosition="start"/>
                  ))}
                </Tabs>
              </Box>
              <Box sx={{width: "30%", height: "90%", width: "100%"}}>
                <CustomTabPanel index={0} value={tabValue}>
                  <CatalogContent view={view} group={allLayer} addedLayers={addedLayers} isMobile={isMobile} searchInput={searchInput} setAddedLayers={setAddedLayers} />
                </CustomTabPanel>
                {data && data.data[1].maps.map((group, index) => (
                  <CustomTabPanel index={index + 1} value={tabValue}>
                    <CatalogContent view={view} group={group} addedLayers={addedLayers} searchInput={searchInput} setAddedLayers={setAddedLayers} isMobile={isMobile}/>
                  </CustomTabPanel>
                ))}
              </Box>
            </Box>
          )}
        </Box>
        </Box>
      )}
    </>
  );
};

export default Catalog;