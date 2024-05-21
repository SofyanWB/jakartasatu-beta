import { Typography } from "@mui/material"

function Loading() {

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
        Loading
      </Typography>
    </div >
  )
}

export default Loading