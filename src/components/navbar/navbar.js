import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import Drawer from "./drawerNavbar";
import { useState } from "react";

import MapRoundedIcon from '@mui/icons-material/MapRounded';

export default function Navbar(props) {
    const { halamanBeranda } = props;
    const { halamanTentang } = props;
    const { halamanKatalogPeta } = props;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("1181"));

    const [halamanBeranda1, setHalamanBeranda] = useState(false);
    const [halamanTentang1, setHalamanTentang] = useState(false);
    const [halamanKatalogPeta1, setHalamanKatalogPeta] = useState(false);

    return (
        <>
            <div style={{
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                borderRadius: "50px",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                position: "fixed",
                height: "67px",
                width: "90vw",
                maxWidth: "1361px",
                marginTop: isMobile ? "20px" : "28px",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: "14px",
                zIndex: "999"
            }}>
                <Box sx={{
                    alignItems: "center",
                    display: "flex",
                    marginLeft: isMobile ? "auto" : "0",
                    marginRight: "0",
                }}>
                    <Link href="/">
                        <Image
                            src="/assets/logo-jakartasatu-orange.png"
                            alt="Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            style={{
                                width: isMobile ? "40vw" : "180px",
                                maxWidth: "180px",
                                height: "auto",
                                alignItems: "center",
                                display: "flex",
                            }}
                        />
                    </Link>
                </Box>
                {isMobile ? (<Drawer halamanBeranda={halamanBeranda} halamanTentang={halamanTentang} halamanKatalogPeta={halamanKatalogPeta} />) : (
                    <>
                        <ul style={{
                            color: "#003577",
                            fontSize: "20px",
                            fontWeight: "450",
                            height: "inherit",
                            listStyleType: "none",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "80px",
                            margin: "0 40px 0 auto",
                        }}>
                            <li>
                                <Link id="btnNavbarToPetaInteraktif" href="/" onClick={() => setHalamanBeranda(true)}>
                                    <p style={{ color: props.halamanBeranda ? '#F7941D' : '#003577', display: "flex", alignItems: "center" }}>
                                        Beranda
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link id="btnNavbarToPetaInteraktif" href="/peta/interaktif">
                                <p style={{ display: "flex", alignItems: "center" }}>
                                        Peta Jakarta <MapRoundedIcon style={{ marginLeft: "5px" }} />
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link id="btnNavbarToPetaDashbord" href="/katalog-peta" onClick={() => setHalamanKatalogPeta(true)}>
                                    <p style={{ color: props.halamanKatalogPeta ? '#F7941D' : '#003577', display: "flex", alignItems: "center" }}>
                                        Katalog Peta
                                    </p>

                                </Link>
                            </li>
                            <li>
                                <Link id="btnNavbarToTentang" href="/tentang" onClick={() => setHalamanTentang(true)}>
                                    <p style={{ color: props.halamanTentang ? '#F7941D' : '#003577' }}>Tentang</p>
                                </Link>
                            </li>
                        </ul>
                    </>
                )}
                <Link href="https://jakartasatu.jakarta.go.id/apimobile/internal/admin/sign-in" target="_blank" style={{ display: "block" }}>
                    <Button id="btnHomeToLogin" variant="contained"
                        sx={{
                            width: isMobile ? "20vw" : "112px",
                            maxWidth: "112px",
                            height: "41px",
                            borderRadius: "40px",
                            background: "#F7941D",
                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                            textTransform: "none",
                            color: "white",
                            fontSize: "20px",
                            padding: "4px 25px",
                        }}>
                        Login
                    </Button>
                </Link>
            </div>
        </>
    )
}
