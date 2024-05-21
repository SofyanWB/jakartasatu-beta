import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useState } from "react";

const PerhitunganIntensitasMobile = ({ luasLahan, setLuasLahan, isHitung, setIsHitung }) => {
  const [kdbValue, setKDBValue] = useState("");
  const [klbValue, setKLBValue] = useState("");
  const [kdhValue, setKDHValue] = useState("");

  const [luasDasarBangunan, setLuasDasarBangunan] = useState();
  const [luasLantaiBangunan, setLuasLantaiBangunan] = useState();
  const [jumlahLantaiBangunan, setJumlahLantaiBangunan] = useState();
  const [lahanHijau, setLahanHijau] = useState();

  const resetPerhitungan = () => {
    setLuasLahan("");
    setKDBValue("");
    setKLBValue("");
    setKDHValue("");
    setLuasDasarBangunan("");
    setLuasLantaiBangunan("");
    setJumlahLantaiBangunan("");
    setLahanHijau("");
    setIsHitung(false);
  };

  const hitung = () => {
    const totalkdb = (luasLahan * (kdbValue / 100)).toFixed(2);
    setLuasDasarBangunan(totalkdb);
    const totalklb = (luasLahan * klbValue).toFixed(2);
    setLuasLantaiBangunan(totalklb);
    const tinggibangunan = Math.floor(totalklb / totalkdb);
    setJumlahLantaiBangunan(tinggibangunan);
    const totalkdh = (luasLahan * (kdhValue / 100)).toFixed(2);
    setLahanHijau(totalkdh);
    setIsHitung(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "flex-start", width: "100%", height: "100%", rowGap: 0.5 }}>
      <Box sx={{height: "15%"}}>
        <Typography sx={{ color: "#099c11", fontSize: "10pt" }}>
          *Pilih Zona pada Peta untuk mendapatkan nilai intensitas dan tentukan luasan area
        </Typography>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", columnGap: 0.5, height: "15%"}}>
        <TextField size="small" label="Luas Lahan" variant="filled" value={luasLahan} onChange={(e) => setLuasLahan(e.target.value)}/>
        <TextField size="small" label="KDB" variant="filled" value={kdbValue} onChange={(e) => setKDBValue(e.target.value)}/>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", columnGap: 0.5, height: "15%"}}>
        <TextField size="small" label="KLB" variant="filled" value={klbValue} onChange={(e) => setKLBValue(e.target.value)}/>
        <TextField size="small" label="KDH" variant="filled" value={kdhValue} onChange={(e) => setKDHValue(e.target.value)}/>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", columnGap: 0.5, height: "15%", justifyContent: "space-evenly"}}>
        <Button variant="contained" sx={{ backgroundColor: green["A700"], marginBottom: 1 }} onClick={hitung}>
          Hitung
        </Button>
        <Button variant="contained" sx={{ backgroundColor: red["700"], marginBottom: 1 }} onClick={resetPerhitungan}>
          Reset
        </Button>
      </Box>
      {isHitung && (
        <Box sx={{display: "flex", flexDirection: "row", height: "35%", width: "100%"}}>
          <Box sx={{display: "flex", flexDirection: "column", width: "50%", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 2}}>
            <Typography sx={{ textAlign: "left", fontSize: "10pt" }}>
              Luas Dasar Bangunan(m2):
            </Typography>
            <Typography sx={{ textAlign: "left", fontSize: "10pt" }}>
              Luas Lantai Bangunan(m2):
            </Typography>
            <Typography sx={{ textAlign: "left", fontSize: "10pt" }}>
              Jumlah Lantai Bangunan
            </Typography>
            <Typography sx={{ textAlign: "left", fontSize: "10pt" }}>
              Lahan Hijau
            </Typography>
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", width: "50%", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 2}}>
            <Typography sx={{fontSize: "10pt"}}>{luasDasarBangunan}</Typography>
            <Typography sx={{fontSize: "10pt"}}>{luasLantaiBangunan}</Typography>
            <Typography sx={{fontSize: "10pt"}}>{jumlahLantaiBangunan}</Typography>
            <Typography sx={{fontSize: "10pt"}}>{lahanHijau}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PerhitunganIntensitasMobile;
