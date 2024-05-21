import {Checkbox, FormControlLabel, FormGroup, Paper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const checkboxListStyle = {
  margin: "2vmin",
  height: "100%",
  textAlign: "left",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "1em",
  },
  "::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "darkgrey",
    outLine: "1px solid slategrey",
  },
}

const JenisKegiatanMobile = ({ dataKegiatan, layerView }) => {
  const [listKegiatan, setListKegiatan] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filterKegiatan = (layerView, kegiatan) => {
    const kegiatanExists = listKegiatan.includes(kegiatan);

    const updatedListKegiatan = kegiatanExists
      ? listKegiatan.filter((item) => item !== kegiatan)
      : [...listKegiatan, kegiatan];

    setListKegiatan(updatedListKegiatan);

    const queryWhere =
      updatedListKegiatan.length > 0
        ? updatedListKegiatan.map(
            (selectedKegiatan) => `IZN LIKE '%${selectedKegiatan}%'`
          )
        : ["1=1"];

    layerView.filter = {
      where: queryWhere.join(" OR "),
    };
  };

  const searchKegiatan = () => {
    const input = document.getElementById("searchInput");
    if (input) {
      setSearchInput(input.value);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", width: "100%", height: "100%"}}>
      <Typography sx={{ color: "#099c11" }} fontSize={"small"}>
        Menampilkan zonasi RDTR sesuai dengan kegiatan yang dipilih
      </Typography>
      <Box sx={{backgroundColor: "aqua", width: "auto", marginLeft: 2, marginRight: 2}}>
        <TextField size="small" sx={{ width: "100%" }} id="searchInput" onInput={searchKegiatan} placeholder="Cari Kegiatan ..."/>
      </Box>
      <Box sx={checkboxListStyle}>
        <FormGroup>
          {dataKegiatan && (searchInput === "" ?
            dataKegiatan.kegiatan.map((kegiatan) => (
              <FormControlLabel key={kegiatan} control={<Checkbox checked={listKegiatan.includes(kegiatan)}/>} label={kegiatan} onClick={() => filterKegiatan(layerView, kegiatan)}/>
            ))
            : 
            dataKegiatan.kegiatan.filter((kegiatan) => kegiatan.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())).map((kegiatan) => (
              <FormControlLabel key={kegiatan} control={<Checkbox checked={listKegiatan.includes(kegiatan)}/>} label={kegiatan} onClick={() => filterKegiatan(layerView, kegiatan)}/>
            ))
          )}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default JenisKegiatanMobile;
