"use client"

import styles from "../../components/page.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';

import PetaHome from '../../app/peta/interaktif/page';

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    List,
    ListItem,
    ListItemText,
    OutlinedInput,
    Stack,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

import { useRouter } from 'next/navigation'
import Link from "next/link";
import { memo, useEffect, useMemo, useState } from "react";
import axios from "axios";

function petadashboard() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobile1000 = useMediaQuery(theme.breakpoints.down("1000"));

    const menu = [
        {
            id: 1,
            text: 'Dashboard Ruang Terbuka Hijau',
            externalLink: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=aa91a84fab5b4f0caa554398793d1ab4'
        },
        {
            id: 2,
            text: 'Dashboard Luas Zona RDTR 2014',
            externalLink: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/e3739aa48ffa4d3cbd8ec89e6a1e5eab'
        },
        {
            id: 3,
            text: 'Dashboard Penggunaan Lahan Wilayah',
            externalLink: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/4ca614e10b3a4493951e50b739849147'
        },
        {
            id: 4,
            text: 'Dashboard Informasi Banjir',
            externalLink: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205'
        },
        {
            id: 5,
            text: 'Dashboard Aset',
            externalLink: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67'
        },
        {
            id: 6,
            text: 'Dashboard Persebaran Lokasi JakWifi',
            externalLink: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0'
        },
        {
            id: 7,
            text: 'Dashboard Persebaran Lokasi Halte',
            externalLink: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd'
        },
        {
            id: 8,
            text: 'Dashborad Lokasi Sekolah',
            externalLink: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177'
        },
        {
            id: 9,
            text: 'Dashboard Persebaran Utilitas',
            externalLink: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4'
        },
        // Add more menu items as needed
    ];

    const router = useRouter();

    const petaComponent = useMemo(() => <PetaHome />, []);

    const [simpulJaringanTop5, setSimpulJaringanTop5] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);

    const handleImageClick = (item) => {
        setSelectedItem(item);
    };

    useEffect(() => {
        document.title = "Peta & Dashboard | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getSimpulJaringanList = async () => {
            const response = await axios.get('https://jakartasatu.jakarta.go.id/apimobile/app/web/simpul-jaringan');
            const slicedData = response.data.data.slice(0, 5);
            setSimpulJaringanTop5(slicedData);
        };

        getSimpulJaringanList();
    }, []);

    return (
        <>
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container}
                    style={{
                        paddingTop: "100px",
                        textAlign: "center",
                    }}>
                    <Button id="btnRouteBackPetaDashboard" onClick={() => router.back()}
                        sx={{ position: "absolute", marginTop: "10px", marginLeft: "-1300px" }}>
                        <ArrowBackRoundedIcon style={{ color: "black" }} />
                    </Button>
                    <section id="petaDashboardTop5skpd" style={{ paddingTop: "50px", paddingBottom: isMobile ? "75px" : "100px", margin: "auto", width: isMobile ? "90vw" : "", maxWidth: "1440px" }}>
                        <img
                            src='/assets/Partikel-1.png'
                            alt="Gambar"
                            draggable="false"
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                width: isMobile ? '70vw' : '539px',
                                height: isMobile ? '80vw' : '695px',
                                opacity: "70%",
                                position: "absolute",
                                zIndex: "-99",
                                left: "0",
                                top: "0"
                            }} />
                        <Typography variant="p"
                            style={{
                                color: "#003577",
                                textAlign: "center",
                                fontSize: "36px",
                                fontWeight: "800",
                            }}>
                            Top 5 SKPD
                        </Typography>
                        <Divider
                            style={{
                                margin: '15px auto 50px auto',
                                backgroundColor: "#003577",
                                height: 5,
                                width: '75px',
                                borderRadius: '4px',
                            }}
                        />
                        <Box
                            sx={{
                                alignItems: "center",
                                maxWidth: isMobile ? "99vw" : "1000px",
                                // columnGap: "25px",
                                mt: 6,
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr 1fr',
                                    md: '35% 1fr 1fr'
                                },

                                "& :first-of-type": {
                                    gridRow: isMobile ? "none" : "span 2",
                                }
                            }}>
                            {simpulJaringanTop5.map((simpulJaringan, i) => (
                                <Card key={i} elevation={0}
                                    sx={{
                                        background: "none",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                    <CardActionArea id="btnPetaDashboard5SimpulJaringan" href={simpulJaringan.link} target='_blank' disableRipple
                                        sx={{
                                            padding: "10px",
                                            borderRadius: "25px",
                                            height: "100%",

                                            "&:hover": {
                                                // border: "1px solid #DFE6E9",
                                                // backgroundColor: "white",
                                            },
                                        }}>
                                        <CardMedia component='div' sx={{ textAlign: 'center' }}>
                                            {i === 0 ? (
                                                <img
                                                    alt=""
                                                    src={simpulJaringan.icon}
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: isMobile ? "100px" : "300px",
                                                        alignSelf: 'center'
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    alt=""
                                                    src={simpulJaringan.icon}
                                                    style={{
                                                        width: "auto",
                                                        maxWidth: "100%",
                                                        maxHeight: isMobile ? "100px" : '124px',
                                                        alignSelf: 'center'
                                                    }}
                                                />
                                            )}
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
                                                fontSize: isMobile ? "14px" : "18px",
                                                fontWeight: 500,
                                                lineHeight: "171.3%",
                                                letterSpacing: "0.027px",
                                                mb: 1,
                                            }}>{simpulJaringan.judul}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                        <Link id="btnPetaDashboardSemuaSKPD" href='/skpd'>
                            <Button variant="contained"
                                sx={{
                                    margin: "40px 0 80px 0",
                                    background: "#003577",
                                    borderRadius: "40px",
                                    width: "212px",
                                    height: "50px",
                                    boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",

                                    color: "white",
                                    fontFamily: "inherit",
                                    textTransform: "none",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                }}>
                                Lihat lainnya
                                <KeyboardArrowRightRoundedIcon
                                    style={{
                                        borderRadius: "20px",
                                        backgroundColor: "#DFE6E9",
                                        color: "#003577",
                                        width: "56px",
                                        height: "32px",
                                        marginLeft: "15px"
                                    }} />
                            </Button>
                        </Link>
                    </section>
                    <section id="aplikasi"
                        style={{
                            background: "linear-gradient(180deg, rgba(141, 188, 246, 0.02) 12.2%, rgba(141, 188, 246, 0.37) 55.5%, rgba(186, 216, 255, 0.03) 96%)",
                            paddingTop: "50px",
                            marginBottom: "100px",
                        }}>
                        <div style={{
                            width: "100vw",

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Typography variant="p"
                                style={{
                                    color: "#003577",
                                    textAlign: "center",
                                    fontSize: "36px",
                                    fontWeight: "800",
                                }}>
                                Aplikasi
                            </Typography>
                            <Divider
                                style={{
                                    margin: '15px auto 50px auto',
                                    backgroundColor: "#003577",
                                    height: 5,
                                    width: '75px',
                                    borderRadius: '4px',
                                }}
                            />
                            <Grid container
                                spacing={12}
                                direction={isMobile1000 ? "column" : "row"}
                                justifyContent="space-between"
                                alignItems="stretch"
                                sx={{ width: isMobile1000 ? "100vw" : "90vw", maxWidth: "1355px" }}>
                                <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <Box sx={{
                                        background: "white",
                                        borderRadius: "15px",
                                        // border: "1px solid #DFE6E9",
                                        padding: "25px",
                                        boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                                        width: isMobile1000 ? "90vw" : "100%",
                                        height: "100%",
                                    }}>
                                        <Stack
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{ height: "100%" }}>
                                            <Typography variant="p"
                                                style={{
                                                    color: "#003577",
                                                    fontSize: "26px",
                                                    fontWeight: "600",
                                                    textAlign: "left"
                                                }}>
                                                SMART RDTR
                                            </Typography>
                                            <Box sx={{ minHeight: "107px", alignItems: "center" }}>
                                                <img
                                                    src='/assets/smartrdtr.png'
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        width: "143px",
                                                        height: "107px",
                                                    }} />
                                            </Box>
                                            <Box sx={{ minHeight: "130px" }}>
                                                <Typography variant="p" paragraph
                                                    style={{
                                                        textAlign: "left",
                                                        color: "rgba(0, 0, 0, 0.80)",
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                        lineHeight: "160%",
                                                    }}>
                                                    Mengakselerasi Transformasi Jakarta sebagai Pusat Bisnis dan Kota Global yang Berketahanan, Berbasis Transit dan Digital
                                                </Typography>
                                            </Box>
                                            <Button variant="contained"
                                                sx={{
                                                    width: "179px",
                                                    height: "44px",
                                                    borderRadius: "40px",
                                                    background: "#F7941D",
                                                    boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                    textTransform: "none",
                                                    color: "white",
                                                    fontFamily: "inherit",
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                }}>
                                                Lihat detail
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Grid>
                                <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <Box sx={{
                                        background: "white",
                                        borderRadius: "15px",
                                        // border: "1px solid #DFE6E9",
                                        padding: "25px",
                                        boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                                        width: isMobile1000 ? "90vw" : "100%",
                                        height: "100%"
                                    }}>
                                        <Stack
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{ height: "100%" }}>
                                            <Typography variant="p"
                                                style={{
                                                    color: "#003577",
                                                    fontSize: "26px",
                                                    fontWeight: "600",
                                                    textAlign: "left"
                                                }}>
                                                DBDKlim
                                            </Typography>
                                            <Box sx={{ minHeight: "107px", alignItems: "center" }}>
                                                <img
                                                    src='/assets/aplikasi-dbdklim.png'
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        width: "132px",
                                                        height: "98px",
                                                    }} />
                                            </Box>
                                            <Box sx={{ minHeight: "130px" }}>
                                                <Typography variant="p" paragraph
                                                    style={{
                                                        textAlign: "left",
                                                        color: "rgba(0, 0, 0, 0.80)",
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                        lineHeight: "160%",
                                                    }}>
                                                    Peta prediksi kelembaban udara (relative humidity, RH) menunjukkan probabilitas kesesuaian RH untuk vektor DBD.
                                                </Typography>
                                            </Box>
                                            <Button variant="contained"
                                                sx={{
                                                    width: "179px",
                                                    height: "44px",
                                                    borderRadius: "40px",
                                                    background: "#F7941D",
                                                    boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                    textTransform: "none",
                                                    color: "white",
                                                    fontFamily: "inherit",
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                }}>
                                                Lihat detail
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Grid>
                                <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <Box sx={{
                                        background: "white",
                                        borderRadius: "15px",
                                        // border: "1px solid #DFE6E9",
                                        padding: "25px",
                                        boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                                        width: isMobile1000 ? "90vw" : "100%",
                                        height: "100%"
                                    }}>
                                        <Stack
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{ height: "100%" }}>




                                            <Typography variant="p"
                                                style={{
                                                    color: "#003577",
                                                    fontSize: "26px",
                                                    fontWeight: "600",
                                                    textAlign: "left"
                                                }}>
                                                Surveilans
                                            </Typography>
                                            <Box sx={{ minHeight: "107px", alignItems: "center" }}>
                                                <img
                                                    src='/assets/aplikasi-surveilans.png'
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        width: "169px",
                                                        height: "71px",
                                                    }} />
                                            </Box>
                                            <Box sx={{ minHeight: "130px" }}>
                                                <Typography variant="p" paragraph
                                                    style={{
                                                        textAlign: "left",
                                                        color: "rgba(0, 0, 0, 0.80)",
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                        lineHeight: "160%",
                                                    }}>
                                                    Data yang dikumpulkan oleh Dinas Kesehatan DKI Jakarta bersumber dari Rumah sakit dan Puskesmas di Provinsi DKI Jakarta
                                                </Typography>
                                            </Box>
                                            <Button variant="contained"
                                                sx={{
                                                    width: "179px",
                                                    height: "44px",
                                                    borderRadius: "40px",
                                                    background: "#F7941D",
                                                    boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                    textTransform: "none",
                                                    color: "white",
                                                    fontFamily: "inherit",
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                }}>
                                                Lihat detail
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                            <img
                                src='/assets/Partikel-1.png'
                                alt="Gambar"
                                draggable="false"
                                style={{
                                    userDrag: "none",
                                    userSelect: "none",

                                    width: '500px',
                                    height: 'auto',
                                    marginTop: "-550px",
                                    position: "absolute",
                                    zIndex: "-99",
                                    right: "0",
                                    transform: "scaleX(-1)",
                                }}
                            />


                        </div>
                    </section>
                </div >

                <Footer />

            </main >
            <ScrollTop />
        </>
    );
}

export default petadashboard;