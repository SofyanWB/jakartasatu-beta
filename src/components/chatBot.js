"use client"

import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";

import OpenWithIcon from '@mui/icons-material/OpenWith';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-icon"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

function ChatBot() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    const [scrollPosition, setScrollPosition] = useState(0);

    const [openAI, setOpenAI] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleClickOpenAI = () => {
        setOpenAI(true);
    };

    const handleCloseAI = () => {
        setOpenAI(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Box sx={{
                position: 'fixed',
                bottom: scrollPosition >= 403 ? 75 : 25,
                transition: "bottom 0.2s ease-in-out",
                right: 28,
            }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    spacing={-2}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="207" height="138" viewBox="0 0 207 138" fill="none" style={{ display: isHovered ? 'block' : 'none' }}>
                        <g filter="url(#filter0_d_15231_102)">
                            <path d="M152.237 101.538L193 122V13.8462C193 12.2957 192.036 10.8087 190.32 9.7123C188.604 8.61593 186.277 8 183.85 8H19.15C16.7233 8 14.3959 8.61593 12.68 9.7123C10.964 10.8087 10 12.2957 10 13.8462V95.6923C10 97.2428 10.964 98.7298 12.68 99.8262C14.3959 100.923 16.7233 101.538 19.15 101.538H152.237Z" fill="white" />
                        </g>
                        <defs>
                            <filter id="filter0_d_15231_102" x="0" y="0" width="207" height="138" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="2" dy="4" />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15231_102" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15231_102" result="shape" />
                            </filter>
                        </defs>

                        <foreignObject x="28" y="20" width="150" height="100">
                            <div xmlns="http://www.w3.org/1999/xhtml">
                                <Typography variant="p"
                                    style={{
                                        color: "#003577",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        lineHeight: "210%",
                                        letterSpacing: "-0.3px",
                                    }}>
                                    Hai! Ada yang bisa Jesica bantu?
                                </Typography>
                            </div>
                        </foreignObject>
                    </svg>
                    <Button disableRipple onClick={handleClickOpenAI}>
                        <img
                            src='/jakartasatu-beta/assets/ChatBot.png'
                            alt="Gambar"
                            draggable="false"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                width: "45px",
                                height: "45px",
                            }} />
                    </Button>
                </Stack>
            </Box>
            <Dialog
                open={openAI}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                hideBackdrop={true}
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: "30px"
                    }
                }}
            >
                <DialogTitle style={{ background: "#F7941D", padding: "10px 20px" }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                                src='/assets/ChatBot.png'
                                alt="Gambar"
                                draggable="false"
                                style={{
                                    userDrag: "none",
                                    userSelect: "none",

                                    width: "40px",
                                    height: "40px",
                                }} />

                            <Typography variant="p" sx={{ fontSize: "22px", fontWeight: "500", color: "white", marginLeft: "10px" }}>Jesica</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <OpenWithIcon id="draggable-icon" sx={{ cursor: "move", color: "white", marginRight: "10px" }} />
                            <CloseRoundedIcon onClick={handleCloseAI} sx={{ cursor: "pointer", color: "white", fontSize: "30px" }} />
                        </Box>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ padding: "0", overflow: "hidden" }}>
                    <div style={{ width: isMobile ? '80vw' : '600px', height: "80vh" }}>
                        <embed src="https://jakartasatu.bahasalab.com/ai" width="100%" height="100%" style={{ border: 'none' }} />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ChatBot;