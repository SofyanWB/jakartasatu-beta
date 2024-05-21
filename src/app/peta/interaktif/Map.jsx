import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import EsriSearch from "@arcgis/core/widgets/Search";
import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, IconButton, InputAdornment, List, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import "@arcgis/core/assets/esri/themes/light/main.css";
import BottomLeft from "./component/BottomLeft";
import TopRight from "./component/TopRight";
import BottomRight from "./component/BottomRight";
import TopLeft from "./component/TopLeft";
import Popup from "@arcgis/core/widgets/Popup";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import TourContent from "/tourContent";
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import Mobile from "./Mobile";
import Navbar from "@/components/navbar/navbar";

import './petahome.css';

import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Link from "next/link";

const MapComponent = ({ isWidget }) => {
  const theme = useTheme();
  const isMobile2 = useMediaQuery(theme.breakpoints.down("431"));

  const tableRef = useRef();
  const mapRef = useRef();
  const [view, setView] = useState();
  const [layerTable, setLayerTable] = useState();
  const [tableOpen, setTableOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [addedLayers, setAddedLayers] = useState([]);
  const [mobileBottomContentOpen, setMobileBottomContentOpen] = useState(false);
  const [infoLayerOpen, setInfoLayerOpen] = useState(false);
  const [layerInfo, setLayerInfo] = useState();
  const [tabValue, setTabValue] = useState(0);
  const [mejaKerjaVisible, setMejaKerjaVisible] = useState(false);
  const [handleSetQueryTour, setHandleSetQueryTour] = useState();
  const [center, setCenter] = useState([106.826959, -6.176923]);
  const [zoom, setZoom] = useState(15);
  const handleCatalogOpen = () => setCatalogOpen(true);
  const handleOpenMejaKerja = () => setMejaKerjaVisible(true);
  const handleCloseMejaKerja = () => setMejaKerjaVisible(false);
  const handleToggleTable = () => setTableOpen(!tableOpen);
  const isMobile = useMediaQuery("(min-width:600px)");

  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState();
  const [suggestions, setSuggestions] = useState([]);

  const zoomIn = () => {
    view.goTo({ zoom: view.zoom + 1 });
  };

  const zoomOut = () => {
    view.goTo({ zoom: view.zoom - 1 });
  };

  useEffect(() => {
    if (isWidget) {
      const map = new Map({
        basemap: "osm",
      });
      const view = new MapView({
        map: map,
        container: mapRef.current,
        center: center,
        zoom: zoom,
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
      setView(view);
    } else {
      const map = new Map({
        basemap: "osm",
      });
      const view = new MapView({
        map: map,
        container: mapRef.current,
        center: [106.826959, -6.176923],
        zoom: 15,
        navigation: {
          gamepad: {
            enabled: false
          },
          browserTouchPanEnabled: true,
          momentumEnabled: false,
          mouseWheelZoomEnabled: false
        },
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
      setView(view);
    }
  }, [isWidget]);

  useEffect(() => {
    if (view) {
      const searchWidget = new EsriSearch({
        view: view,
        allPlaceholder: "Jalan/Bangunan/RT/RW",
        includeDefaultSources: false,
        locationEnabled: false,
        sources: [
          {
            url: "https://tataruang.jakarta.go.id/server/rest/services/Locator_DKI/GeocodeServer",
            singleLineFieldName: "SingleLine",
            name: "Jakarta Geocoding Service",
            placeholder: "Jalan/Bangunan/RT/RW",
          },
        ],
        maxSuggestions: 15,
      });
      setSearch(searchWidget);
    }
  }, [view]);

  const handleTextChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    search.searchTerm = newSearchText;

    search.suggest(newSearchText).then((value) => {
      if (value) {
        const searchSuggestion = value.results[0].results;
        setSuggestions(searchSuggestion);
      }
    });
  };

  const handleSearchIcon = () => {
    search.search();
  };

  const handleClearIcon = () => {
    search.clear();
    setSearchText("");
    setSuggestions([]);
  };

  const handleListClick = (suggestionText) => {
    setSearchText(suggestionText);
    search.searchTerm = suggestionText;
    search.search();
    setSuggestions([]);
  };

  const handleBottomContentOpen = () => {
    setMobileBottomContentOpen(!mobileBottomContentOpen);
  }

  const CustomTabPanel = (props) => {
    const { children, value, index } = props;
    return (
      <Box sx={{ display: value != index ? "none" : "flex", height: "100%", width: "100%" }}>
        {children}
      </Box>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  }

  const nextHandle = () => {
    setTourState((prevState) => {
      if (prevState.stepIndex < 19) {
        if (prevState.stepIndex === 0) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 1) {
          handleOpenMejaKerja();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 2) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 3) {
          document.getElementById("tombol-catalog-layer").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 4) {
          document.getElementById("list-catalog-group-4").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 5) {
          const buttons = document.getElementsByClassName("button-catalog-11")
          if (buttons[0].childNodes[1].data === "Tambah") {
            buttons[0].click();
          }
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 6) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 7) {
          document.getElementById("close-catalog-button").click();
          document.getElementById("colapse-layer-button-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 8) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 9) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 10) {
          document.getElementById("layer-info-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 11) {
          document.getElementById("layer-info-content-close-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 12) {
          document.getElementById("layer-table-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 13) {
          const buttons = document.getElementsByClassName("open-table")
          buttons[0].click()
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 14) {
          document.getElementById("layer-query-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 15) {
          const boxQuery = document.getElementById("box-expression-11-0").childNodes
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 16) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 17) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
        if (prevState.stepIndex === 18) {
          document.getElementById("apply-query-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps
          }
          return newState
        }
      } else {
        document.getElementById("close-query-11").click()
        const newState = {
          run: false,
          stepIndex: 0,
          steps: prevState.steps
        }
        return newState
      }
    });
  }

  const tourSteps = [
    {
      content: <TourContent index={0} nextHandle={nextHandle}></TourContent>,
      placement: 'center',
      target: '#map-view',
      hideFooter: true,
    },
    {
      content: <TourContent index={1} nextHandle={nextHandle}></TourContent>,
      placement: 'bottom',
      target: '.meja-kerja',
      hideFooter: true,
    },
    {
      content: <TourContent index={2} nextHandle={nextHandle}></TourContent>,
      placement: 'right',
      target: '#isi-meja-kerja',
      hideFooter: true,
    },
    {
      content: <TourContent index={3} nextHandle={nextHandle}></TourContent>,
      placement: 'right',
      target: '#tombol-catalog-layer',
      hideFooter: true,
    },
    {
      content: <TourContent index={4} nextHandle={nextHandle}></TourContent>,
      placement: 'top',
      target: '#box-catalog',
      hideFooter: true,
    },
    {
      content: <TourContent index={5} nextHandle={nextHandle}></TourContent>,
      placement: 'right',
      target: '#list-catalog-group-4',
      hideFooter: true,
    },
    {
      content: <TourContent index={6} nextHandle={nextHandle}></TourContent>,
      placement: 'bottom',
      target: '.button-catalog-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={7} nextHandle={nextHandle}></TourContent>,
      placement: 'bottom',
      target: '#close-catalog-button',
      hideFooter: true,
    },
    {
      content: <TourContent index={8} nextHandle={nextHandle}></TourContent>,
      placement: 'right',
      target: '#colapse-layer-button-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={9} nextHandle={nextHandle}></TourContent>,
      placement: 'bottom',
      target: '#checkbox-layer-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={10} nextHandle={nextHandle}></TourContent>,
      placement: 'bottom',
      target: '#layer-info-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={11} nextHandle={nextHandle}></TourContent>,
      placement: 'top',
      target: '#layer-info-content-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={12} nextHandle={nextHandle}></TourContent>,
      placement: 'top',
      target: '#layer-table-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={13} nextHandle={nextHandle}></TourContent>,
      placement: 'top',
      target: '#layer-table-content',
      hideFooter: true,
    },
    {
      content: <TourContent index={14} nextHandle={nextHandle}></TourContent>,
      placement: 'top',
      target: '#layer-query-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={15} nextHandle={nextHandle}></TourContent>,
      placement: 'top',
      target: '#layer-query-content-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={16} nextHandle={nextHandle}></TourContent>,
      placement: 'right',
      target: '#box-expression-11-0',
      hideFooter: true,
    },
    {
      content: <TourContent index={17} nextHandle={nextHandle}></TourContent>,
      placement: 'right',
      target: '#add-query-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={18} nextHandle={nextHandle}></TourContent>,
      placement: 'right',
      target: '#reset-query-11',
      hideFooter: true,
    },
    {
      content: <TourContent index={19} nextHandle={nextHandle}></TourContent>,
      placement: 'right',
      target: '#apply-query-11',
      hideFooter: true,
    }
  ]

  const [tourState, setTourState] = useState({
    run: false,
    stepIndex: 0,
    steps: tourSteps
  });

  const startTour = () => {
    setTourState((prevState) => {
      const newState = {
        run: true,
        stepIndex: prevState.stepIndex,
        steps: prevState.steps
      }
      return newState
    });
  }

  return (
    <>
      {isWidget ? (
        <>
          <Navbar />
          <Box ref={mapRef} sx={{ width: "100%", height: "100%", color: "black" }} id="map-view">
            {isMobile ? (
              <>
                <Joyride continuous run={tourState.run} stepIndex={tourState.stepIndex} steps={tourState.steps} disableScrolling hideCloseButton />
                <Box sx={{ position: "absolute", top: "10%", left: "2%", width: "20%", height: "80%" }}>
                  <TopLeft view={view} setTableOpen={setTableOpen} layerTable={layerTable} setLayerTable={setLayerTable} tableRef={tableRef} catalogOpen={catalogOpen} setCatalogOpen={setCatalogOpen} handleCatalogOpen={handleCatalogOpen} addedLayers={addedLayers} setAddedLayers={setAddedLayers} isMobile={isMobile} infoLayerOpen={infoLayerOpen} layerInfo={layerInfo} setInfoLayerOpen={setInfoLayerOpen} setLayerInfo={setLayerInfo} mejaKerjaVisible={mejaKerjaVisible} handleCloseMejaKerja={handleCloseMejaKerja} handleOpenMejaKerja={handleOpenMejaKerja} setHandleSetQueryTour={setHandleSetQueryTour} tourState={tourState} />
                </Box>
                <Box sx={{ position: "absolute", top: "10%", right: "2%", maxWidth: "25%" }}>
                  <TopRight view={view} startTour={startTour} />
                </Box>
                <Box sx={{ position: "absolute", bottom: "2%", left: "2%", width: "30%", display: "flex", columnGap: "1%", flexWrap: "nowrap", flexDirection: "row" }}>
                  <BottomLeft view={view} />
                </Box>
                <Box sx={{ position: "absolute", bottom: "2%", right: "2%", maxWidth: "30%" }}>
                  <BottomRight view={view} center={center} zoom={zoom} />
                </Box>
                <Box sx={{ position: "absolute", display: "flex", flexDirection: "column", bottom: 0, left: 0, width: "100%", height: tableOpen ? "30%" : "28px", alignItems: "center", justifyContent: "flex-start" }} id={`layer-table-content`}>
                  <Box sx={{ display: "flex", width: "120px", height: "28px", justifyContent: "center", alignItems: "center", textAlign: "center", backgroundColor: "white", borderRadius: "10px 10px 0px 0px" }}>
                    {tableOpen ? (
                      <IconButton onClick={handleToggleTable} sx={{ color: "black", backgroundColor: "white", width: "100%", height: "100%" }} className="open-table">
                        <KeyboardArrowDown />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleToggleTable} sx={{ color: "black", backgroundColor: "white", width: "100%", height: "100%" }} className="open-table">
                        <KeyboardArrowUp />
                      </IconButton>
                    )
                    }
                  </Box>
                  <Box sx={{ display: tableOpen ? "flex" : "none", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "white" }}>
                    <Box sx={{ width: "100%", height: "100%" }} ref={tableRef} />
                  </Box>
                </Box>
              </>
            ) : (
              <Mobile
                view={view}
                addedLayers={addedLayers}
                catalogOpen={catalogOpen}
                handleBottomContentOpen={handleBottomContentOpen}
                handleCatalogOpen={handleCatalogOpen}
                handleChangeTab={handleChangeTab}
                layerTable={layerTable}
                mobileBottomContentOpen={mobileBottomContentOpen}
                setAddedLayers={setAddedLayers}
                setCatalogOpen={setCatalogOpen}
                setInfoLayerOpen={setInfoLayerOpen}
                setLayerInfo={setLayerInfo}
                setLayerTable={setLayerTable}
                setTableOpen={setTableOpen}
                tabValue={tabValue}
                tableRef={tableRef}
                a11yProps={a11yProps}
                CustomTabPanel={CustomTabPanel}
              />
            )}
          </Box>
        </>
      ) : (
        <Box ref={mapRef} sx={{ width: "100%", height: "100%" }}>
          <>
            <Stack
              sx={{
                padding: "15px",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <OutlinedInput
                type="search"
                id="searchInput"
                value={searchText}
                onChange={handleTextChange}
                placeholder="Cari Peta"
                // endAdornment={
                //     <InputAdornment position="end">
                //         {searchText && (
                //             <IconButton
                //                 aria-label="clear"
                //                 edge="end"
                //                 size="small"
                //                 onClick={() => {
                //                     setSearchText('');
                //                 }}
                //             >
                //                 <ClearRoundedIcon size="small" onClick={handleClearIcon} />
                //             </IconButton>
                //         )}
                //     </InputAdornment>
                // }
                sx={{
                  fontFamily: "inherit",
                  fontSize: "0.9em",
                  width: isMobile2 ? '80vw' : '543px',
                  height: '39px',
                  paddingLeft: '1%',
                  borderRadius: '40px',
                  background: 'white',
                  boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                }}
              />
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background: "white",
                border: "1px solid #DFE6E9",
                borderRadius: "20px",
              }}>
                {suggestions && suggestions.length > 0 && (
                  <List sx={{ display: "grid", maxWidth: "543px", boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)', }}
                    style={{
                      padding: "10px 20px"
                    }}>
                    {suggestions.map((suggestion, index) => (
                      <Typography variant="p"
                        key={index}
                        onClick={() => handleListClick(suggestion.text)}
                        sx={{
                          fontSize: "0.9em",
                          backgroundColor: "white",
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#e4e4e4" },
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          paddingTop: "2px",
                          paddingBottom: "2px"
                        }}
                      >
                        {suggestion.text}
                      </Typography>
                    ))}
                  </List>
                )}
              </Box>
            </Stack>

            <Link href="/peta/interaktif">
              <Stack
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "white",
                  width: "39px",
                  position: "absolute",
                  marginLeft: "-60px",
                  marginTop: isMobile2 ? "340px" : "20px",
                  boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                  border: "1px solid #DFE6E9",
                }}>
                <Tooltip placement="top-end" arrow title="Untuk fitur lainnya dapat dilihat dalam bentuk fullscreen"
                  slotProps={{
                    popper: {
                      sx: {
                        [`&.${tooltipClasses.popper}[data-popper-placement*="top-end"] .${tooltipClasses.tooltip}`]: {
                          background: "#003577",
                          boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.10)',
                          maxWidth: "249px",
                          color: "white",
                          fontFamily: "inherit",
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "150%",
                        },
                      },
                    },
                  }}>
                  <IconButton disableRipple>
                    <OpenInFullRoundedIcon
                      style={{
                        color: "#003577",

                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Link>

            <Stack
              direction="column"
              spacing={1}
              sx={{
                borderRadius: "5px",
                backgroundColor: "white",
                width: "39px",
                position: "absolute",
                marginLeft: "-60px",
                marginTop: isMobile2 ? "393px" : "80px",
                boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                border: "1px solid #DFE6E9",
              }}>
              <Tooltip placement="left" title="Perbesar"
                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                      {
                        background: "#003577",
                        boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.10)',
                        color: "white",
                        fontFamily: "inherit",
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "150%",
                      },
                    },
                  },
                }}>
                <IconButton onClick={zoomIn} disableRipple>
                  <AddRoundedIcon style={{ color: "#003577" }} />
                </IconButton>
              </Tooltip>
              <Tooltip placement="left" title="Perkecil"
                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                      {
                        background: "#003577",
                        boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.10)',
                        color: "white",
                        fontFamily: "inherit",
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "150%",
                      },
                    },
                  },
                }}>
                <IconButton onClick={zoomOut} disableRipple>
                  <RemoveRoundedIcon style={{ color: "#003577" }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </>
        </Box>
      )}
    </>
  );
};

export default MapComponent;
