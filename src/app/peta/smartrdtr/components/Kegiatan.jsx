import { Box, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";

const checkboxListStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "90%",
    textAlign: "left",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      width: "1em",
      borderRadius: "5px"
    },
    "::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
      borderRadius: "5px"
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "#003577",
      borderRadius: "5px"
    },
  }

const Kegiatan = ({ kegiatan, layerView, listKegiatan, setListKegiatan, searchInput, setSearchInput }) => {
  

  const filterKegiatan = (layerView, kegiatan) => {
    console.log(layerView, kegiatan);
    const kegiatanExists = listKegiatan.includes(kegiatan);
    const updatedListKegiatan = kegiatanExists ? listKegiatan.filter((item) => item !== kegiatan) : [...listKegiatan, kegiatan]
    setListKegiatan(updatedListKegiatan);
    const queryWhere = updatedListKegiatan.length > 0 ? updatedListKegiatan.map((selectedKegiatan) => `IZN LIKE '%${selectedKegiatan}%'`) : ["1=1"];
    layerView.filter = {
        where: queryWhere.join(" OR ")
    };
  };

  const searchKegiatan = () => {
    const input = document.getElementById("searchInput");
    if (input) {
      setSearchInput(input.value);
    }
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "5%"}}>
      <Box sx={{width: "100%", height: "10%"}}>
        <TextField  sx={{width: "100%"}} onInput={searchKegiatan} id="searchInput" placeholder="Cari Kegiatan ..." value={searchInput} />
      </Box>
      <Box sx={checkboxListStyle}>
        <FormGroup>
          {kegiatan && (searchInput === "" ?
            kegiatan.kegiatan.map((kegiatan) => (
              <FormControlLabel sx={{fontFamily: "Inter", fontWeight: 500, fontSize: "16px", color: "#000000B2"}} key={kegiatan} control={<Checkbox checked={listKegiatan.includes(kegiatan)} sx={{color: "#003577", '&.Mui-checked': {color: "#003577"}}}/>} label={kegiatan} onChange={() => filterKegiatan(layerView, kegiatan)} />
            ))
          : 
            kegiatan.kegiatan.filter((kegiatan) => kegiatan.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())).map((kegiatan) => (
              <FormControlLabel sx={{fontFamily: "Inter", fontWeight: 500, fontSize: "16px", color: "#000000B2"}} key={kegiatan} control={<Checkbox checked={listKegiatan.includes(kegiatan)} sx={{color: "#003577", '&.Mui-checked': {color: "#003577"}}}/>} label={kegiatan} onChange={() => filterKegiatan(layerView, kegiatan)}/>
            ))
          )}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default Kegiatan;
