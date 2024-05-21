import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Shapefile from './Shapefile';
import SquareIcon from '@mui/icons-material/Square';

const Intensitas = ({ luasLahan, klb, setKLB, kdb, setKDB, kdh, setKDH, ldb, setLDB, llb, setLLB, jlb, setJLB, lh, setLH }) => {
  const [unit, setUnit] = useState("meter");
  const [luas, setLuas] = useState(0);
  
  useEffect(() => {
    if(luasLahan) {
        if(unit === "meter") {
            const area = luasLahan.toFixed(0)
            setLuas(area)
        } else if(unit === "hektar") {
            const area = (luasLahan.toFixed(0) * 0.0001).toFixed(4)
            setLuas(area)
        } else {
            const area = (luasLahan.toFixed(0) * 0.000001).toFixed(6)
            setLuas(area)
        }
    } else {
        setLuas(0)
    }
  }, [unit, luasLahan, luas])

  const calculateIntensitas = () => {
    const totalkdb = (luasLahan * (kdb / 100)).toFixed(2)
    if(isNaN(totalkdb)){
        console.log("Test");
        const zero = 0;
        setLDB(zero.toFixed(2))
    } else {
        setLDB(totalkdb);
    }

    const totalklb = (luasLahan * klb).toFixed(2)
    if(isNaN(totalklb)){
        const zero = 0;
        setLLB(zero.toFixed(2))
    } else {
        setLLB(totalklb);
    }

    const lantaibangunan = Math.floor(totalklb / totalkdb)
    if(isNaN(lantaibangunan)){
        const zero = 0;
        setJLB(zero.toFixed(2))
    } else {
        setJLB(lantaibangunan);
    }
    
    const totalkdh = (luasLahan * (kdh / 100)).toFixed(2)
    if(isNaN(totalkdh)){
        const zero = 0;
        setLH(zero.toFixed(2))
    } else {
        setLH(totalkdh);
    }
  };

  const clearIntensitas = () => {
    setLuas(0);
    setKLB(0);
    setKDB(0);
    setKDH(0);
    setLDB();
    setLLB();
    setJLB();
    setLH();
    document.getElementById("input-klb").value = 0
    document.getElementById("input-kdb").value = 0
    document.getElementById("input-kdh").value = 0
  }

  return (
    <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "5%"}}>
        <Box sx={{width: "100%", height: "50%", display: "flex", flexDirection: "column"}}>
            <Box sx={{width: "100%", height: "80%", display: "flex", flexDirection: "row"}}>
                <Box sx={{width: "30%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "center"}}>
                    <Box sx={{height: "25%", display: "flex", alignItems: "center"}}>
                        <Typography sx={{fontSize: "16px", fontFamily: "Inter", fontWeight: 500, color: "#003577"}}>Luas Lahan</Typography>
                    </Box>
                    <Box sx={{height: "25%", display: "flex", alignItems: "center"}}>
                        <Typography sx={{fontSize: "16px", fontFamily: "Inter", fontWeight: 500, color: "#003577"}}>KLB</Typography>
                    </Box>
                    <Box sx={{height: "25%", display: "flex", alignItems: "center"}}>
                        <Typography sx={{fontSize: "16px", fontFamily: "Inter", fontWeight: 500, color: "#003577"}}>KDB</Typography>
                    </Box>
                    <Box sx={{height: "25%", display: "flex", alignItems: "center"}}>
                        <Typography sx={{fontSize: "16px", fontFamily: "Inter", fontWeight: 500, color: "#003577"}}>KDH</Typography>
                    </Box>
                </Box>
                <Box sx={{width: "50%", height: "100%"}}>
                    <Box sx={{height: "25%", display: "flex", alignItems: "center"}}>
                        <TextField variant='outlined' size='small' value={luas} inputMode='numeric' disabled/>
                    </Box>
                    <Box sx={{height: "25%", display: "flex", alignItems: "center"}}>
                        <TextField variant='outlined' size='small' value={klb} onChange={(e) => setKLB(e.target.value)} id='input-klb'/>
                    </Box>
                    <Box sx={{height: "25%", display: "flex", alignItems: "center"}}>
                        <TextField variant='outlined' size='small' value={kdb} onChange={(e) => setKDB(e.target.value)} id='input-kdb'/>
                    </Box>
                    <Box sx={{height: "25%", display: "flex", alignItems: "center"}}>
                        <TextField variant='outlined' size='small' value={kdh} onChange={(e) => setKDH(e.target.value)} id='input-kdh'/>
                    </Box>
                </Box>
                <Box sx={{width: "20%", height: "100%"}}>
                    {unit === "meter" ? (
                        <Box sx={{height: "25%", display: "flex", alignItems: "center", padding: 1}}>
                            <Button variant='contained' onClick={() => setUnit("hektar")}>m2</Button>
                        </Box>
                    ) : unit === "hektar" ? (
                        <Box sx={{height: "25%", display: "flex", alignItems: "center", padding: 1}}>
                            <Button variant='contained' onClick={() => setUnit("kilometer")}>ha</Button>
                        </Box>
                    ) : unit === "kilometer" && (
                        <Box sx={{height: "25%", display: "flex", alignItems: "center", padding: 1}}>
                            <Button variant='contained' onClick={() => setUnit("meter")}>km2</Button>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box sx={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button variant='contained' sx={{width:"114px", height: "36px", borderRadius: "30px", backgroundColor: "#07975C", textTransform: "none"}} onClick={calculateIntensitas}>Hitung</Button>
            </Box>
        </Box>
        <Box sx={{width: "100%", height: "50%", display: "flex", flexDirection: "column"}}>
            <Box sx={{width: "100%", height: "80%", display: "flex", flexDirection: "row"}}>
                <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", rowGap: "10px"}}>
                    <Box sx={{width: "100%", display: "flex", alignItems: "center", flexDirection: "row", columnGap: "10px"}}>
                        <SquareIcon sx={{width: "16px", height: "16px", transform: "rotate(45deg)", color: "white", background: "linear-gradient(90deg, #FFE900 0.02%, #FF5A13 99.98%)"}}/>
                        <Typography sx={{fontSize: "16px", fontFamily: "Inter", fontWeight: 600, color: "black"}}>Luas Dasar Bangunan (m2) :</Typography>
                    </Box>
                    <Box sx={{width: "fit-content", position: "relative", display: "flex", alignItems: "center"}}>
                        <Typography sx={{left: "26px", position: "absolute",  color: "white", fontSize: "16px", fontFamily: "Inter", fontWeight: 600, background: ldb ? "#003577" : "transparent", padding: "3px", borderRadius: "8px"}}>{ldb}</Typography>
                    </Box>
                    <Box sx={{width: "100%", display: "flex", alignItems: "center", flexDirection: "row", columnGap: "10px"}}>
                        <SquareIcon sx={{width: "16px", height: "16px", transform: "rotate(45deg)", color: "white", background: "linear-gradient(90deg, #FFE900 0.02%, #FF5A13 99.98%)"}}/>
                        <Typography sx={{fontSize: "16px", fontFamily: "Inter", fontWeight: 600, color: "black"}}>Luas Lantai Bangunan (m2) :</Typography>
                    </Box>
                    <Box sx={{width: "fit-content", position: "relative", display: "flex", alignItems: "center"}}>
                        <Typography sx={{left: "26px", position: "absolute",  color: "white", fontSize: "16px", fontFamily: "Inter", fontWeight: 600, background: llb ? "#003577" : "transparent", padding: "3px", borderRadius: "8px"}}>{llb}</Typography>
                    </Box>
                    <Box sx={{width: "100%", display: "flex", alignItems: "center", flexDirection: "row", columnGap: "10px"}}>
                        <SquareIcon sx={{width: "16px", height: "16px", transform: "rotate(45deg)", color: "white", background: "linear-gradient(90deg, #FFE900 0.02%, #FF5A13 99.98%)"}}/>
                        <Typography sx={{fontSize: "16px", fontFamily: "Inter", fontWeight: 600, color: "black"}}>Jumlah Lantai Bangunan :</Typography>
                    </Box>
                    <Box sx={{width: "fit-content", position: "relative", display: "flex", alignItems: "center"}}>
                        <Typography sx={{left: "26px", position: "absolute",  color: "white", fontSize: "16px", fontFamily: "Inter", fontWeight: 600, background: jlb ? "#003577" : "transparent", padding: "3px", borderRadius: "8px"}}>{jlb}</Typography>
                    </Box>
                    <Box sx={{width: "100%", display: "flex", alignItems: "center", flexDirection: "row", columnGap: "10px"}}>
                        <SquareIcon sx={{width: "16px", height: "16px", transform: "rotate(45deg)", color: "white", background: "linear-gradient(90deg, #FFE900 0.02%, #FF5A13 99.98%)"}}/>
                        <Typography sx={{fontSize: "16px", fontFamily: "Inter", fontWeight: 600, color: "black"}}>Lahan Hijau :</Typography>
                    </Box>
                    <Box sx={{width: "fit-content", position: "relative", display: "flex", alignItems: "center"}}>
                        <Typography sx={{left: "26px", position: "absolute",  color: "white", fontSize: "16px", fontFamily: "Inter", fontWeight: 600, background: lh ? "#003577" : "transparent", padding: "3px", borderRadius: "8px"}}>{lh}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button variant='contained' sx={{width:"114px", height: "36px", borderRadius: "30px", backgroundColor: "#F32013", textTransform: "none"}} onClick={clearIntensitas}>Reset</Button>
            </Box>
        </Box>
    </Box>
  )
}

export default Intensitas