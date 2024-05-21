import {
    ListItemText,
    List,
    Drawer,
    Divider,
    ListItemButton,
    IconButton
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function DrawerNavbar(props) {
    const [openDrawer, setOpenDrawer] = useState(false);

    const { halamanBeranda } = props;
    const { halamanTentang } = props;
    const { halamanKatalogPeta } = props;

    const [halamanBeranda1, setHalamanBeranda] = useState(false);
    const [halamanTentang1, setHalamanTentang] = useState(false);
    const [halamanKatalogPeta1, setHalamanKatalogPeta] = useState(false);

    return (
        <>
            <IconButton edge="start" onClick={() => setOpenDrawer(!openDrawer)} sx={{
                right: "0",
                left: "0",
                marginLeft: "14px",
                alignItems: "center",
                width: 40,
                height: 40,
                color: "white",
                background: "#ED783E",
                opacity: "90%",
                backdropFilter: "blur(10px)",
                position: "absolute",
            }}>
                <DragHandleRoundedIcon />
            </IconButton>
            <Drawer
                elevation={0}
                anchor={"left"}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                sx={{
                    textAlign: "center",
                    // width: "320px",
                    height: "100%",
                }}>
                <Link href="/">
                    <img
                        src="/jakartasatu-beta/assets/logo-jakartasatu-orange.png"
                        alt="Logo"
                        style={{ width: "280px", height: "auto", padding: "0 10px" }}
                    />
                </Link>
                <Divider
                    sx={{
                        bgcolor: "rgb(229, 234, 242)",
                        height: "1px",
                    }} />
                <List>
                    <Link href="/" onClick={() => setHalamanBeranda(true)}>
                        <ListItemButton>
                            <HomeOutlinedIcon style={{ color: props.halamanBeranda ? '#F7941D' : '#003577', marginRight: "10px" }} />
                            <ListItemText primary="Beranda" disableTypography
                                sx={{
                                    color: props.halamanBeranda ? '#F7941D' : '#00012A',
                                    fontSize: "1.2em",
                                    fontWeight: "600"
                                }} />
                        </ListItemButton>
                    </Link>
                    <Link href="/peta/interaktif">
                        <ListItemButton>
                            <MapOutlinedIcon style={{ marginRight: "10px" }} />
                            <ListItemText primary="Peta Jakarta" disableTypography
                                sx={{
                                    color: "#00012A",
                                    fontSize: "1.2em",
                                    fontWeight: "600"
                                }} />
                        </ListItemButton>
                    </Link>
                    <Link href="/katalog-peta" onClick={() => setHalamanKatalogPeta(true)}>
                        <ListItemButton>
                            <MapRoundedIcon style={{ color: props.halamanKatalogPeta ? '#F7941D' : '#003577', marginRight: "10px" }} />
                            <ListItemText primary="Katalog Peta" disableTypography
                                sx={{
                                    color: props.halamanKatalogPeta ? '#F7941D' : '#00012A',
                                    fontSize: "1.2em",
                                    fontWeight: "600"
                                }} />
                        </ListItemButton>
                    </Link>
                    <Link href="/tentang" onClick={() => setHalamanTentang(true)}>
                        <ListItemButton>
                            <InfoOutlinedIcon style={{ color: props.halamanTentang ? '#F7941D' : '#003577', marginRight: "10px" }} />
                            <ListItemText primary="Tentang" disableTypography
                                sx={{
                                    color: props.halamanTentang ? '#F7941D' : '#00012A',
                                    fontSize: "1.2em",
                                    fontWeight: "600"
                                }} />
                        </ListItemButton>
                    </Link>
                </List>
            </Drawer>
        </>
    )
}
