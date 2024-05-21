import { Typography } from "@mui/material"
import Link from "next/link"

const NotFound = () => {
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center"
    }}>
      <Typography variant="p" paragraph
        sx={{
          fontWeight: "500",
          fontSize: "1.5em",
          marginTop: "-80px",
          letterSpacing: "2px"
        }}>
        OPPS !!! HALAMAN TIDAK DITEMUKAN
      </Typography>
      <Typography variant="p" paragraph
        sx={{
          fontWeight: "500",
          fontSize: "1.5em",
          marginTop: "-15px",
          letterSpacing: "2px"
        }}>
        SILAHKAN KEMBALI KE HALAMAN UTAMA
      </Typography>
      <Link href="/"
        style={{
          marginTop: "20px",
          fontWeight: "700",
          letterSpacing: "2px",
          color: "white",
          backgroundColor: "#ED783E",
          fontSize: "1em",
          borderRadius: "30px",
          padding: "10px 20px 10px 20px",
        }}>
        GO BACK HOME
      </Link>
    </div >
  )
}

export default NotFound
