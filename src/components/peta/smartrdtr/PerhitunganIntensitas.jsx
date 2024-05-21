import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useState } from "react";

const PerhitunganIntensitas = ({ areaHasil, setAreaHasil, isHitung, setIsHitung }) => {
  const [kdbValue, setKDBValue] = useState("");
  const [klbValue, setKLBValue] = useState("");
  const [kdhValue, setKDHValue] = useState("");

  const [luasDasarBangunan, setLuasDasarBangunan] = useState();
  const [luasLantaiBangunan, setLuasLantaiBangunan] = useState();
  const [jumlahLantaiBangunan, setJumlahLantaiBangunan] = useState();
  const [lahanHijau, setLahanHijau] = useState();

  const resetPerhitungan = () => {
    setAreaHasil("");
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
    const totalkdb = (areaHasil * (kdbValue / 100)).toFixed(2);
    setLuasDasarBangunan(totalkdb);
    const totalklb = (areaHasil * klbValue).toFixed(2);
    setLuasLantaiBangunan(totalklb);
    const tinggibangunan = Math.floor(totalklb / totalkdb);
    setJumlahLantaiBangunan(tinggibangunan);
    const totalkdh = (areaHasil * (kdhValue / 100)).toFixed(2);
    setLahanHijau(totalkdh);
    setIsHitung(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", justifyContent: "center", height: isHitung ? "50%" : "40%", borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,.3)" }}>
      <Typography variant="h5" sx={{ margin: 1 }}>
        Perhitungan Intensitas
      </Typography>
      <Typography sx={{ color: "#099c11" }} fontSize={"small"}>
        *Pilih Zona pada Peta untuk mendapatkan nilai intensitas dan tentukan luasan area
      </Typography>
      <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Luas Lahan" variant="filled" value={areaHasil} onChange={(e) => setAreaHasil(e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="KDB" variant="filled" value={kdbValue} onChange={(e) => setKDBValue(e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="KLB" variant="filled" value={klbValue} onChange={(e) => setKLBValue(e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="KDH" variant="filled" value={kdhValue} onChange={(e) => setKDHValue(e.target.value)}/>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" sx={{ backgroundColor: green["A700"], marginBottom: 1 }} onClick={hitung}>
              Hitung
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" sx={{ backgroundColor: red["700"], marginBottom: 1 }} onClick={resetPerhitungan}>
              Reset
            </Button>
          </Grid>
          <Grid container sx={12} spacing={2}>
            {isHitung ? (
              <>
                <Grid item xs={6}>
                  <Typography sx={{ textAlign: "left", paddingLeft: 5 }}>
                    Luas Dasar Bangunan(m2):
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{luasDasarBangunan}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ textAlign: "left", paddingLeft: 5 }}>
                    Luas Lantai Bangunan(m2):
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{luasLantaiBangunan}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ textAlign: "left", paddingLeft: 5 }}>
                    Jumlah Lantai Bangunan
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{jumlahLantaiBangunan}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ textAlign: "left", paddingLeft: 5 }}>
                    Lahan Hijau
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{lahanHijau}</Typography>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PerhitunganIntensitas;
