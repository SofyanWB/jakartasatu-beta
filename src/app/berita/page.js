"use client"

import styles from "../../components/page.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';

import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Paper,
    Typography,
    Grid
} from "@mui/material";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

function berita() {
    const router = useRouter();

    const arrowStyles = {
        position: 'absolute',
        background: 'transparent',
        color: 'black',
        border: 'none',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
    };

    const indicatorStyles = {
        background: '#D3D3D3',
        borderRadius: 30,
        width: 10,
        height: 10,
        display: 'inline-block',
        margin: '6vw 8px',
        cursor: 'pointer',
    };

    const [newsLatest, setnewsLatest] = useState([]);

    const [newsList, setNewsList] = useState([]);
    const getNewsList = async () => {
        const response = await axios.get(
            "https://jakartasatu.jakarta.go.id/apimobile/app/v4/news/"
        );

        const beritaTerbaru = response.data.data.items;

        setNewsList(beritaTerbaru);

        setnewsLatest(beritaTerbaru[beritaTerbaru.length - 1]);
    };

    useEffect(() => {
        document.title = "Berita | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        getNewsList();
    }, []);

    return (
        <>
            <main className={styles.main}>

                <Navbar />

                {/* <Button onClick={() => router.back()}
                    sx={{ position: "fixed", }}>
                    <ArrowBackRoundedIcon style={{ color: "black" }} />
                </Button> */}

                <div style={{
                    width: "100%",
                }}>
                    <Box
                        sx={{
                            width: "100%",
                        }}>
                        <CardContent className={styles.BeritaSectionAtas}>
                            <CardActionArea id="btnBeritaLatestBerita" href={`/berita/${newsLatest.id}`}
                                sx={{
                                    margin: "-20px",
                                    padding: "20px",
                                    borderRadius: "18px",
                                }}>
                                <Typography variant="p" paragraph sx={{
                                    fontSize: "14px",
                                    lineHeight: "185.5%",
                                    letterSpacing: "0.056px",
                                    mb: 2
                                }}>{newsLatest.created_at}</Typography>
                                <Typography variant="p" paragraph sx={{
                                    fontSize: "25px",
                                    fontWeight: 500,
                                    lineHeight: "157.8%",
                                    mb: 2
                                }}>{newsLatest.title}</Typography>
                                <Typography variant="p" paragraph sx={{
                                    textAlign: "justify",
                                    fontSize: "16px",
                                    lineHeight: "195.3%",
                                    letterSpacing: "0.024px",
                                    mb: 2
                                }}>{newsLatest.short_content}...&nbsp;
                                    <span
                                        style={{
                                            color: "#2F80ED",
                                            textDecorationLine: "underline",
                                        }}>
                                        baca selengkapnya
                                    </span>
                                </Typography>
                            </CardActionArea>
                        </CardContent>
                        <img style={{
                            width: "100%",
                            height: "75vh",
                            objectFit: "cover",
                            filter: "brightness(0.4)",
                            backgroundColor: "grey",
                        }} src={newsLatest.source_image} alt='' />
                    </Box>
                </div>
                <div className={styles.container}>
                    <Paper elevation={0}
                        sx={{
                            margin: "-43px auto 50px auto",
                            position: "relative",
                            display: 'grid',
                            alignItems: 'center',
                            width: 250,
                            height: 70,
                            borderRadius: "40px",
                            boxShadow: "0 1px 15px rgb(0 0 0 / 0.2)",
                        }}>
                        <Typography variant="p" paragraph
                            sx={{
                                marginTop: "2%",
                                lineHeight: 1.5,
                                zIndex: "10",
                                fontSize: "35px",
                                fontWeight: "600",
                                letterSpacing: "0.088px",
                                textAlign: "center",
                                marginBottom: "15px",
                                color: "#003577",
                            }}>
                            Highlight
                        </Typography>
                    </Paper>
                </div>
                <div style={{ maxWidth: "1625px", margin: "50px auto" }}>
                    <Carousel
                        autoPlay={true}
                        showIndicators={false}
                        interval={5000}
                        infiniteLoop
                        preventMovementUntilSwipeScrollTolerance={true}
                        swipeScrollTolerance={50}
                        stopOnHover={false}
                        showStatus={false}
                        showThumbs={false}
                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                            hasPrev && (
                                <KeyboardArrowLeftRoundedIcon
                                    type="button"
                                    onClick={onClickHandler}
                                    title={label}
                                    style={{ ...arrowStyles, left: "2%" }}
                                />
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext, label) =>
                            hasNext && (
                                <KeyboardArrowRightRoundedIcon
                                    type="button"
                                    onClick={onClickHandler}
                                    title={label}
                                    style={{ ...arrowStyles, right: "2%" }}
                                />
                            )
                        }
                    >
                        {newsList.map((step, index) => (
                            <Grid key={index}
                                container
                                spacing={2}
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                sx={{
                                    paddingLeft: "7%",
                                    paddingRight: "7%",
                                }}>
                                <Grid item xs={12} sm={6}>
                                    <CardMedia component='div'>
                                        <Box
                                            component="img"
                                            sx={{
                                                // borderRadius: "18px",
                                                width: '100%',
                                                backgroundColor: "grey",
                                                boxShadow: "2px 2px 20px 0px rgba(0, 0, 0, 0.15)"
                                            }}
                                            src={step.source_image} />
                                    </CardMedia>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <CardActionArea id="btnBeritaCarouselNews" href={`/berita/${step.id}`}
                                        sx={{
                                            padding: "20px",
                                            borderRadius: "18px",
                                        }}>
                                        <CardContent
                                            sx={{
                                                textAlign: "left",
                                                marginLeft: "-14px",
                                                marginRight: "-14px",
                                                marginTop: "-17px",
                                            }}>
                                            <Typography variant="p" paragraph sx={{
                                                color: "rgba(0, 0, 0, 0.70)",
                                                fontSize: "14px",
                                                lineHeight: "185.5%",
                                                letterSpacing: "0.056px",
                                                mb: 1,
                                            }}>{step.created_at}</Typography>
                                            <Typography variant="p" paragraph sx={{
                                                color: "#003577",
                                                fontSize: "26px",
                                                fontWeight: 500,
                                                lineHeight: "160%",
                                                letterSpacing: "0.039px",
                                                mb: 1,
                                            }}>{step.title}</Typography>
                                            <Typography variant="p" paragraph sx={{
                                                fontSize: "16px",
                                                lineHeight: "195.3%",
                                                letterSpacing: "0.024px",
                                            }}>{step.short_content}...&nbsp;
                                                <span
                                                    style={{
                                                        color: "#2F80ED",
                                                        textDecorationLine: "underline",
                                                    }}>
                                                    baca selengkapnya
                                                </span>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                            </Grid>
                        ))}
                    </Carousel>
                </div>
                <div className={styles.container} style={{ marginBottom: "100px" }}>
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="p" paragraph
                                sx={{
                                    marginTop: "2%",
                                    lineHeight: 1.5,
                                    zIndex: "10",
                                    fontSize: "35px",
                                    fontWeight: "600",
                                    letterSpacing: "0.088px",
                                    textAlign: "center",
                                    marginBottom: "15px",
                                    color: "#003577",
                                }}>
                                Semua
                            </Typography>
                            <Divider
                                sx={{
                                    backgroundColor: "#003577",
                                    margin: "auto",
                                    width: "50px",
                                    height: "2px",
                                }} />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            alignItems: "start",
                            mt: 6,
                            display: 'grid',
                            gridTemplateColumns: { md: '60% 1fr 1fr' },

                            "& :first-of-type": {
                                gridRow: "span 2",
                            }
                        }}>
                        {newsList.map((news, i) => (
                            <Card key={i} elevation={0} square={true} sx={{ background: "none" }}>
                                <CardActionArea id="btnBeritaSemuaBerita" href={`/berita/${news.id}`}
                                    sx={{
                                        padding: "20px",
                                        borderRadius: "36px",

                                    }}>
                                    <CardMedia component='div'>
                                        {news.source_image && (
                                            <img
                                                style={{
                                                    // borderRadius: "18px",
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                    backgroundColor: "grey"
                                                }}
                                                alt="" src={news.source_image} />
                                        )}
                                    </CardMedia>
                                    <CardContent
                                        sx={{
                                            textAlign: "left",
                                            marginLeft: "-14px",
                                            marginRight: "-14px",
                                        }}>
                                        <Typography variant="p" paragraph sx={{
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            lineHeight: "171.3%",
                                            letterSpacing: "0.024px",
                                            mb: 1
                                        }}>{news.title}</Typography>
                                        <Typography variant="p" paragraph sx={{
                                            color: "rgba(0, 0, 0, 0.70)",
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            mb: 1
                                        }}>{news.created_at}</Typography>
                                        <Typography variant="p" paragraph sx={{
                                            fontSize: "12px",
                                            textAlign: "justify",
                                            lineHeight: "185.5%",
                                            letterSpacing: "0.048px"
                                        }}>{news.short_content}...&nbsp;
                                            <span
                                                style={{
                                                    color: "#2F80ED",
                                                    textDecorationLine: "underline",
                                                }}>
                                                baca selengkapnya
                                            </span>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </div>
                <Footer />
            </main>
            <ScrollTop />
        </>
    );
}

export default berita;