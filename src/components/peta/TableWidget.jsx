import { Toc } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";

export default function TableWidget({
  tableOpen,
  tableOpenHandle,
  expandTableHandle,
  expandedTable,
  isMobile,
  widgetHeight,
}) {
  return (
    <>
      {isMobile ? (
        <>
          <Button
            onClick={tableOpenHandle}
            variant="contained"
            sx={{
              position: "absolute",
              top: "25%",
              left: "2%",
              color: tableOpen ? "#1976D2" : "white",
              bgcolor: tableOpen ? "white" : "#1976D2",
              minWidth: "40px",
              width: "40px",
              height: "40px",
              "&:hover": {
                bgcolor: "#E1D3C1",
              },
            }}
          >
            <Toc sx={{ width: "32px", height: "32px" }} />
          </Button>
          <Box
            sx={{
              position: "absolute",
              display: tableOpen ? "block" : "none",
              bgcolor: "white",
              width: "100%",
              height: widgetHeight,
              bottom: "0px",
              left: "0px",
              color: "black",
            }}
          >
            <div id="tableBoxDesktop" style={{ width: "100%", height: "100%" }}>
              <Typography
                sx={{
                  height: "100%",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                Klik Ikon Table pada Layer List<br></br>untuk memunculkan Table
                Layer
              </Typography>
            </div>
          </Box>
        </>
      ) : (
        <>
          <Button
            onClick={expandTableHandle}
            variant="contained"
            sx={{
              position: "absolute",
              top: "31%",
              left: "2%",
              color: expandedTable ? "#1976D2" : "white",
              bgcolor: expandedTable ? "white" : "#1976D2",
              height: "32px",
              width: "32px",
              minWidth: "32px",
              "&:hover": {
                bgcolor: "#E1D3C1",
              },
            }}
          >
            <Toc />
          </Button>
          <Box
            sx={{
              position: "absolute",
              display: expandedTable ? "block" : "none",
              bgcolor: "white",
              width: "100%",
              height: widgetHeight,
              bottom: "0px",
              left: "0px",
              color: "black",
            }}
          >
            <div id="tableBoxMobile" style={{ width: "100%", height: "100%" }}>
              <Typography
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Klik Ikon Table pada Layer List<br></br>untuk memunculkan Table
                Layer
              </Typography>
            </div>
          </Box>
        </>
      )}
    </>
  );
}

{
  /* <Box
        id="tableWidget"
        sx={{
          position: "absolute",
          top: { xs: "260px", sm: "280px" },
          left: "2%",
        }}
      >
        <Button //Desktop Button
          variant="contained"
          onClick={tableOpenHandle}
          sx={{
            color: tableOpen ? "#1976D2" : "white",
            bgcolor: tableOpen ? "white" : "#1976D2",
            minWidth: "40px",
            width: "40px",
            height: "40px",
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
            "&:hover": {
              bgcolor: "#E1D3C1",
            },
          }}
        >
          <Toc sx={{ width: "32px", height: "32px" }} />
        </Button>
        <Button //Mobile Button
          variant="contained"
          onClick={expandTableHandle}
          sx={{
            color: expandedTable ? "#1976D2" : "white",
            bgcolor: expandedTable ? "white" : "#1976D2",
            minWidth: "32px",
            height: "32px",
            width: "32px",
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
            "&:hover": {
              bgcolor: "#E1D3C1",
            },
          }}
        >
          <Toc />
        </Button>
      </Box>
      <Box //Table Mobile
        sx={{
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            width: "100%",
            height: "30%",
            bottom: "0px",
            left: "0px",
            position: "fixed",
            display: expandedTable ? "block" : "none",
          }}
        >
          <div id="tableBoxMobile" style={{ position: "relative" }}>
            <Typography
              sx={{
                textAlign: "center",
                top: "50%",
                paddingTop: "8%",
                position: "relative",
              }}
            >
              Klik Ikon Table pada Layer List<br></br>untuk memunculkan Table
              Layer
            </Typography>
          </div>
        </Box>
      </Box>
      <Box //Table Desktop
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            width: "100%",
            height: "30%",
            bottom: "0px",
            left: "0px",
            zIndex: 2,
            position: "fixed",
            display: tableOpen ? "block" : "none",
          }}
        >
          <div id="tableBoxDesktop" style={{ position: "relative" }}>
            <Typography
              sx={{
                textAlign: "center",
                top: "50%",
                paddingTop: "8%",
                position: "relative",
              }}
            >
              Klik Ikon Table pada Layer List<br></br>untuk memunculkan Table
              Layer
            </Typography>
          </div>
        </Box>
      </Box> */
}
