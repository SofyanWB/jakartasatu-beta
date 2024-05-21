import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
import React, { useEffect, useState } from "react";
import "./Ukur.css";
import { Box, Button, Typography } from "@mui/material";
import { Delete, SquareFoot, Straighten } from "@mui/icons-material";

const Ukur = ({ view }) => {
  const [lineMeasurement, setLineMeasurement] = useState();
  const [areaMeasurement, setAreaMeasurement] = useState();
  const [hasil, setHasil] = useState(0);

  useEffect(() => {
    if (view) {
      const lineMeasurement = new DistanceMeasurement2D({
        view: view,
        visible: false,
      });
      setLineMeasurement(lineMeasurement);

      const areaMeasurement = new AreaMeasurement2D({
        view: view,
        visible: false,
      });
      setAreaMeasurement(areaMeasurement);
    }
  }, [view]);

  const lineButtonHandle = (e) => {
    setActiveWidget(null);
    const buttonElement = e.target.closest(".active");
    if (!buttonElement) {
      setActiveWidget("line");
    } else {
      setActiveButton(null);
    }
  };

  const areaButtonHandle = (e) => {
    setActiveWidget(null);
    const buttonElement = e.target.closest(".active");
    if (!buttonElement) {
      setActiveWidget("area");
    } else {
      setActiveButton(null);
    }
  };

  const resetButtonHandle = () => {
    setActiveWidget(null);
    setHasil(0);
    const elements = document.getElementsByClassName("active");
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("active");
      }
    }
  };

  const setActiveWidget = (type) => {
    switch (type) {
      case "line":
        setHasil(0);
        lineMeasurement.watch("viewModel.measurement", (measurement) => {
          if (measurement) {
            const ukur = measurement.length.toFixed(2);
            setHasil(ukur);
          }
        });
        areaMeasurement.visible = false;
        lineMeasurement.visible = true;
        lineMeasurement.viewModel.start();
        setActiveButton(document.getElementById("lineButton"));
        break;
      case "area":
        setHasil(0);
        areaMeasurement.watch("viewModel.measurement", (measurement) => {
          if (measurement) {
            const ukur = measurement.area.toFixed(2);
            setHasil(ukur);
          }
        });
        lineMeasurement.visible = false;
        areaMeasurement.visible = true;
        areaMeasurement.viewModel.start();
        setActiveButton(document.getElementById("areaButton"));
        break;
      case null:
        areaMeasurement.visible = false;
        lineMeasurement.visible = false;
        break;
    }
  };

  const setActiveButton = (selectedButton) => {
    view.focus();
    const elements = document.getElementsByClassName("active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          padding: 2,
          columnGap: 2,
          borderRadius: 2,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          id="areaButton"
          variant="outlined"
          startIcon={<SquareFoot sx={{ height: "24px", width: "auto", textWrap: "nowrap", flexWrap: "nowrap" }}/>}
          onClick={areaButtonHandle}
        >
          Ukur Luas
        </Button>
        <Button
          id="lineButton"
          variant="outlined"
          startIcon={<Straighten sx={{ height: "24px", width: "auto", textWrap: "nowrap", flexWrap: "nowrap" }}/>}
          onClick={lineButtonHandle}
        >
          Ukur Panjang
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
          justifyContent: "space-evenly",
          alignItems: "center",
          columnGap: 2,
        }}
      >
        <Typography>{hasil} m²</Typography>
        <Button
          variant="outlined"
          startIcon={<Delete />}
          onClick={resetButtonHandle}
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "darkred",
              color: "white",
            },
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Ukur;
