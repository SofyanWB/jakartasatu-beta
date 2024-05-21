"use client"

import styles from "../../../components/page.module.css";
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import ScrollTop from '../../../components/scrollTop';

import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    useMediaQuery
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useEffect, useState } from "react";

import { useParams, useRouter } from 'next/navigation';

function detailBerita() {
    const router = useRouter();

    const isMobile = useMediaQuery("(max-width: 960px)");

    const { id } = useParams();

    const [newsLatest, setnewsLatest] = useState([]);
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        document.title = "Detail Berita | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getLatestList = async () => {
            const response = await axios.get(
                "https://jakartasatu.jakarta.go.id/apimobile/app/v4/news/" + id
            );
            const newsLatest = response.data.data;
            setnewsLatest(newsLatest);
        };
        getLatestList();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getNewsList = async () => {
            // Ambil data berita terbaru untuk mendapatkan category_id
            const latestResponse = await axios.get(
                "https://jakartasatu.jakarta.go.id/apimobile/app/v4/news/" + id
            );
            const latestNews = latestResponse.data.data;
            const categoryId = latestNews.category.id;

            // Ambil daftar berita dengan category_id yang sama
            const response = await axios.get(
                "https://jakartasatu.jakarta.go.id/apimobile/app/v4/news/"
            );
            const beritaTerbaru = response.data.data.items;

            // Filter berita yang tidak ada di berita terbaru yang sedang ditampilkan
            const filteredNews = beritaTerbaru.filter(news => news.category.id === categoryId && news.id !== latestNews.id);
            const beritaTerbaruBaru = filteredNews.slice(0, 4);

            setNewsList(beritaTerbaruBaru);
        };
        getNewsList();
    }, [id, newsLatest]);

    return (
        <>
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container}
                    style={{
                        marginTop: "200px",
                        marginBottom: "200px",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center"
                    }}>
                    <Button id="btnRouteBackDetailBerita" onClick={() => router.back()}
                        sx={{ position: "absolute", marginTop: "-70px", marginLeft: "-1300px" }}>
                        <ArrowBackRoundedIcon style={{ color: "black" }} />
                    </Button>
                    <div>
                        <Grid container
                            spacing={isMobile ? 5 : 1}
                            justifyContent="space-between"
                            sx={{ maxWidth: "1500px", margin: "0 auto", }}>
                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                <CardMedia>
                                    <img
                                        style={{
                                            width: "100%",
                                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                            backgroundColor: "grey",
                                        }} src={newsLatest.source_image} alt='' />
                                </CardMedia>
                                <Box sx={{ textAlign: "left", marginTop: "30px" }}>
                                    <Typography variant="p" paragraph sx={{
                                        fontSize: "14px",
                                        color: "rgba(0, 0, 0, 0.40)",
                                        mb: 2,
                                    }}>{newsLatest.created_at}</Typography>
                                    <Typography variant="p" paragraph sx={{
                                        fontSize: "26px",
                                        fontWeight: 500,
                                        color: "#003577",
                                    }}>{newsLatest.title}</Typography>
                                </Box>
                                <Typography variant="p" paragraph
                                    sx={{
                                        fontSize: "16px",
                                        color: "rgba(0, 0, 0, 0.80)",
                                        textAlign: "justify",
                                        lineHeight: "195.3%",
                                    }}
                                    dangerouslySetInnerHTML={{ __html: newsLatest.content }}></Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                                <Divider orientation={isMobile ? "horizontal" : "vertical"} variant="middle"
                                    sx={{
                                        display: "inline-block",
                                        justifyContent: "center",
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                <Box>
                                    <Typography variant="p"
                                        style={{
                                            color: "black",
                                            fontSize: "24px",
                                            fontWeight: "500",
                                            lineHeight: "171.3%",
                                            letterSpacing: "0.036px",
                                        }}>
                                        Berita Terkait
                                    </Typography>
                                    <Divider
                                        style={{
                                            margin: '15px auto 35px auto',
                                            backgroundColor: "#003577",
                                            height: 3,
                                            width: '138px',
                                            borderRadius: '5px',
                                        }}
                                    />
                                    <Grid
                                        sx={{
                                            display: "Grid",
                                            objectFit: "cover",
                                            gridAutoFlow: isMobile ? "column" : "",
                                            gridAutoColumns: isMobile ? "1fr" : "",
                                            gap: isMobile ? 1 : 4,
                                        }}>
                                        {newsList.map((news) => (
                                            <Card key={news.id} elevation={0} square={true} sx={{ background: "none" }}>
                                                <CardActionArea id="btnDetailBeritaOtherNews" href={`/berita/${news.id}`} disableRipple>
                                                    <CardMedia sx={{ mb: -1 }}>
                                                        {news.source_image && (
                                                            <img
                                                                style={{
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
                                                            marginRight: "-14px"
                                                        }}>
                                                        <Typography variant="p" paragraph sx={{
                                                            fontSize: isMobile ? "12px" : "14px",
                                                            lineHeight: "185.5%",
                                                            fontWeight: 500,
                                                            mb: 1
                                                        }}>{news.title}</Typography>
                                                        <Typography variant="p" paragraph sx={{
                                                            fontSize: isMobile ? "10px" : "12px",
                                                            textAlign: "justify",
                                                            hyphens: "auto",
                                                            webkitHyphens: "auto",
                                                            lineHeight: "195.3%"
                                                        }}>{news.short_content}</Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        ))}
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Footer />
            </main>
            <ScrollTop />
        </>
    );
}

export default detailBerita;