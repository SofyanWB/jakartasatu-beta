"use client"

import styles from "../../components/page.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';

import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Divider, Grid, OutlinedInput, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from "axios";

function skpd() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("690"));

    const router = useRouter();

    const [simpulJaringanList, setSimpulJaringanList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [visibleDataCount, setVisibleDataCount] = useState(20);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadMoreClicked, setLoadMoreClicked] = useState(false);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

    useEffect(() => {
        document.title = "Simpul Jaringan | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getSimpulJaringanList = async () => {
            const response = await axios.get('https://jakartasatu.jakarta.go.id/apimobile/app/web/simpul-jaringan');
            const allList = response.data.data;
            setSimpulJaringanList(allList);
            setTotalDataCount(allList.length);
        };

        getSimpulJaringanList();
    }, []);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleScroll = () => {
        if (
            !loadMoreClicked ||
            window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
            visibleDataCount === totalDataCount
        ) {
            return;
        }
        if ((visibleDataCount + 10) % 10 === 0) {
            setLoading(true);
            setTimeout(() => {
                setVisibleDataCount((prevCount) => {
                    const nextCount = prevCount + 10;
                    return nextCount > totalDataCount ? totalDataCount : nextCount;
                });
                setLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleDataCount, totalDataCount, loadMoreClicked]);

    const filteredSimpulJaringanList = simpulJaringanList
        .filter((simpulJaringan) => simpulJaringan.judul.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, visibleDataCount);

    const handleLoadMoreClick = () => {
        setLoadMoreClicked(true);
        setShowLoadMoreButton(false);
    };

    return (
        <>
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container}
                    style={{
                        paddingTop: "100px",
                        textAlign: "center",
                    }}>
                    <Button id="btnRouteBackSKPD" onClick={() => router.back()}
                        sx={{ position: "absolute", marginTop: "50px", marginLeft: "-1300px" }}>
                        <ArrowBackRoundedIcon style={{ color: "black" }} />
                    </Button>
                    <section id="allSpkd" style={{ width: "90vw", maxWidth: "1230px" }}>
                        <Stack
                            direction={isMobile ? "column" : "row"}
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={isMobile ? 3: 6}
                            sx={{ width: "90vw", maxWidth: "1230px", marginBottom: isMobile ? "20px" : "80px" }}>
                            <div>
                                <Typography variant="p"
                                    style={{
                                        color: "#003577",
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Semua SKPD
                                </Typography>
                                <Divider
                                    style={{
                                        backgroundColor: "#003577",
                                        height: 5,
                                        width: '113px',
                                        borderRadius: '4px',
                                        margin: isMobile ? "15px auto" : "18px 0 0 0"
                                    }}
                                />
                            </div>
                            <OutlinedInput
                                type="search"
                                placeholder="Cari..."
                                value={searchValue}
                                onChange={handleSearchChange}
                                sx={{
                                    fontFamily: "inherit",
                                    width: isMobile ? '90vw' : '342px',
                                    height: '49px',
                                    paddingLeft: '1%',
                                    borderRadius: '40px',
                                    background: 'white',
                                    border: "2px solid rgba(0, 69, 129, 0.30)",
                                    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                                }}
                            />
                        </Stack>
                        <Grid container
                            justifyContent="center"
                            alignItems="flex-start">
                            {filteredSimpulJaringanList.map((simpulJaringan, i) => (
                                <Grid key={i} item xs={4} sm={3} md={12/5} lg={12/5} xl={12/5}>
                                    <Card key={i} elevation={0} sx={{ background: "none", height: "100%" }}>
                                        <CardActionArea id="btnSKPDDetailSimpulJaringan" href={simpulJaringan.link} target='_blank' disableRipple
                                            sx={{
                                                padding: isMobile ? "0" : "10px",
                                                borderRadius: "25px",
                                                height: "100%",

                                                "&:hover": {
                                                    // border: "1px solid #DFE6E9",
                                                    // backgroundColor: "white",
                                                },
                                            }}>
                                            <CardMedia component='div' sx={{ textAlign: 'center' }}>
                                                <img
                                                    alt=""
                                                    src={simpulJaringan.icon}
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: '81px',
                                                        alignSelf: 'center'
                                                    }}
                                                />
                                            </CardMedia>
                                            <CardContent
                                                sx={{
                                                    // maxWidth: "100%",
                                                    // display: "flex",
                                                    textAlign: "center",
                                                    alignItems: 'center',
                                                }}>
                                                <Typography variant="p" paragraph sx={{
                                                    color: "rgba(0, 0, 0, 0.90)",
                                                    fontSize: isMobile ? "14px" : "16px",
                                                    fontWeight: 400,
                                                    // lineHeight: "171.3%",
                                                    letterSpacing: "0.027px",
                                                    mb: 1,
                                                }}>{simpulJaringan.judul}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Button id="btnSKPDLihatLebihBanyakSimpulJaringan" variant="contained" onClick={handleLoadMoreClick}
                            sx={{
                                mt: 4,
                                borderRadius: "40px",
                                background: "#003577",
                                boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                textTransform: "none",
                                color: "white",
                                fontFamily: "inherit",
                                fontSize: "16px",
                                fontWeight: "400",
                                display: showLoadMoreButton ? "" : "none",
                            }}>
                            Load more (?)
                        </Button>

                        {loading && (
                            <Typography variant="p" paragraph sx={{
                                color: "rgba(0, 0, 0, 0.90)",
                                fontSize: "16px",
                                fontWeight: 400,
                                mt: 2,
                            }}> <CircularProgress size={15} /> Lihat lainnya</Typography>
                        )}
                        <img
                            src='/assets/Partikel-1.png'
                            alt="Gambar"
                            draggable="false"
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                width: isMobile ? '70vw' : '539px',
                                height: isMobile ? '80vw' : '695px',
                                marginTop: "-550px",
                                position: "absolute",
                                zIndex: "-99",
                                right: "0",
                                transform: "scaleX(-1)",
                            }}
                        />
                    </section>
                </div >

                <Footer />
            </main>
            <ScrollTop />
        </>
    );
}

export default skpd;