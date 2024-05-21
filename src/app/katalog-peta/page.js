"use client"

import styles from "../../components/page.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';

import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, FormGroup, IconButton, OutlinedInput, Pagination, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import Api from "./Api";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";

function katalogPeta() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

    const router = useRouter();

    const datas = [
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/RTH.png?v=1689646656896',
            title: 'Dashboard Ruang Terbuka Hijau',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=aa91a84fab5b4f0caa554398793d1ab4',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/Informasi%20Luas%20RDTR%202014.JPG?v=1689646656898',
            title: 'Dashboard Luas Zona RDTR 2014',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/e3739aa48ffa4d3cbd8ec89e6a1e5eab',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/-.JPG?v=1689646656899',
            title: 'Dashboard Penggunaan Lahan Wilayah',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/4ca614e10b3a4493951e50b739849147',
        },
    ];

    const [unduhList, setUnduhList] = useState();

    const [halamanKatalogPeta, setHalamanKatalogPeta] = useState(true);

    useEffect(() => {
        document.title = "Katalog Peta | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        if (Api) {
            setUnduhList(Api);
        }
    }, [Api]);

    const [searching, setSearching] = useState(false);

    const handleSearchInputChange = (event) => {
        const searchTerm = event.target.value.trim();
        if (searchTerm) {
            setSearching(true);
            setSearchTerm(event.target.value.trim());
        } else {
            setSearching(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

    const [searchTerm, setSearchTerm] = useState('');
    const [accessTypeFilter, setAccessTypeFilter] = useState('semua');
    const [simpulJaringanFilter, setSimpulJaringanFilter] = useState('Badan Pendapatan Daerah');

    const filteredItems = (unduhList) => {
        const updatedUnduhList = unduhList.filter(
            (unduh) =>
                (unduh.titleLeft.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    unduh.titleRight.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (accessTypeFilter === 'semua' || unduh.type.toLowerCase() === accessTypeFilter.toLowerCase()) &&
                (simpulJaringanFilter === 'Badan Pendapatan Daerah' || unduh.titleRight.toLowerCase() === simpulJaringanFilter.toLowerCase())
        )

        const updateSortedUnduhList = updatedUnduhList.sort((a, b) => (sortOrder === 'asc' ? a.titleLeft.localeCompare(b.titleLeft) : b.titleLeft.localeCompare(a.titleLeft)))
            .slice(indexOfFirstItem, indexOfLastItem);
        return updateSortedUnduhList
    };

    const searchNotFound = searchTerm && filteredItems.length === 0;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle urutan
        setSortOrder(newSortOrder);
        const sortedItems = [...unduhList].sort((a, b) => {
            // Menggunakan ternary operator untuk menentukan urutan sesuai sortOrder
            return newSortOrder === 'asc' ? a.titleLeft.localeCompare(b.titleLeft) : b.titleLeft.localeCompare(a.titleLeft);
        });
        setUnduhList(sortedItems); // Mengupdate state unduhList dengan data yang sudah diurutkan
    };

    return (
        <>
            <main className={styles.main}>
                <Navbar halamanKatalogPeta={halamanKatalogPeta} />
                <div className={styles.container}
                    style={{
                        paddingTop: "100px",
                        textAlign: "center",
                    }}>
                    <Button id="btnRouteBackSKPD" onClick={() => router.back()}
                        sx={{ position: "absolute", marginTop: "50px", marginLeft: "-1300px" }}>
                        <ArrowBackRoundedIcon style={{ color: "black" }} />
                    </Button>
                    <section id="KatalogGeospasial" style={{ width: "90vw", maxWidth: "1260px", paddingTop: "50px" }}>
                        <img
                            src='/jakartasatu-beta/assets/Partikel-1.png'
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
                            Katalog Geospasial
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
                        <OutlinedInput
                            type="search"
                            placeholder="silahkan cari peta atau dashboard"
                            onChange={handleSearchInputChange}
                            endAdornment={
                                <IconButton
                                    disableRipple
                                    aria-label="search"
                                    edge="end"
                                    onChange={handleSearchInputChange}
                                    sx={{
                                        ml: 1,
                                        mr: -2,
                                        background: "#003577",
                                        border: "0",
                                        borderRadius: "0",
                                        borderTopRightRadius: "30px",
                                        borderBottomRightRadius: "30px",

                                        // paddingTop: "12px",
                                        paddingBottom: "5px",
                                        paddingRight: "15px",
                                        paddingLeft: "15px",
                                    }}
                                >
                                    <SearchRoundedIcon sx={{ color: "white", fontSize: "34px" }} />
                                </IconButton>
                            }
                            sx={{
                                fontFamily: "inherit",
                                width: isMobileMD ? '90vw' : '730px',
                                height: '49px',
                                paddingLeft: '1%',
                                borderRadius: '40px',
                                background: 'white',
                                border: "1px solid rgba(0, 69, 129, 0.30)",
                                boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                            }}
                        />
                        <Typography variant="p" paragraph
                            sx={{
                                color: "#003577",
                                fontSize: "14px",
                                fontWeight: "500",
                                margin: "18px 0 20px 0",
                                maxWidth: "819px",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            contoh : Bangunan, RTH, Jalan, dll
                        </Typography>
                    </section>
                    {searching ? (
                        <section id="KatalogGeospasialUnduhList" style={{ width: "90vw", maxWidth: "1260px" }}>
                            {searchNotFound ? (
                                <Typography variant="p" paragraph
                                    sx={{
                                        color: "rgba(0, 0, 0, 0.60)",
                                        fontSize: "24px",
                                        fontWeight: "500",
                                        alignItems: "center",
                                        display: "flex",
                                        justifyContent: "center",

                                        marginTop: "150px"
                                    }}>
                                    <DeleteForeverRoundedIcon sx={{ fontSize: "67px", marginRight: "10px" }} />Peta tidak ditemukan
                                </Typography>
                            ) : (
                                <>
                                    <Box sx={{ display: isMobileMD ? "none" : "flex", justifyContent: "flex-end" }}>
                                        <Button onClick={handleSort} variant="contained" disableElevation disableRipple disableTouchRipple startIcon={<UnfoldMoreRoundedIcon />}
                                            sx={{
                                                fontFamily: "inherit",
                                                fontSize: "18px",
                                                borderRadius: "30px",
                                                textTransform: "none",
                                                // width: "149px",
                                                height: "49px",
                                                color: "white",
                                                background: "#003577",
                                                fontSize: "18px",
                                                fontWeight: "500",
                                            }}>
                                            Urutkan {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
                                        </Button>
                                    </Box>
                                    <Grid container
                                        spacing={4}
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="baseline">
                                        <Grid xs={12} sm={12} md={3.5} lg={3.5} xl={3.5}>
                                            <Box sx={{
                                                borderRadius: "15px",
                                                border: "1px solid #DFE6E9",
                                                marginBottom: "30px",
                                            }}>
                                                <Box sx={{
                                                    borderRadius: "15px 15px 0px 0px",
                                                    background: "#003577",
                                                    padding: "10px 0",
                                                }}>
                                                    <Typography variant="p"
                                                        sx={{
                                                            color: "white",
                                                            fontSize: "20px",
                                                            fontWeight: "600",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.38px",
                                                        }}>Tipe Akses</Typography>
                                                </Box>
                                                <Box sx={{ background: "white" }}>
                                                    <RadioGroup value={accessTypeFilter} onChange={(event) => setAccessTypeFilter(event.target.value)} defaultValue="semua" sx={{ background: "white", padding: "0 20px" }}>
                                                        <FormControlLabel disableTypography value="semua" control={<Radio />} label="Semua" />
                                                        <FormControlLabel disableTypography value="publik" control={<Radio />} label="Publik" />
                                                        <FormControlLabel disableTypography value="privat" control={<Radio />} label="Privat" />
                                                    </RadioGroup>
                                                </Box>
                                            </Box>
                                            <Box sx={{
                                                borderRadius: "15px",
                                                background: "white",
                                                border: "1px solid #DFE6E9",
                                            }}>
                                                <Box sx={{
                                                    borderRadius: "15px 15px 0px 0px",
                                                    background: "#003577",
                                                }}>
                                                    <Typography variant="p"
                                                        sx={{
                                                            color: "white",
                                                            fontSize: "20px",
                                                            fontWeight: "600",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.38px",
                                                        }}> Simpul Jaringan</Typography>
                                                </Box>
                                                <Box sx={{ background: "white" }}>
                                                    <FormGroup value={simpulJaringanFilter} onChange={(event) => setSimpulJaringanFilter(event.target.value)} sx={{ background: "white", padding: "0 20px" }}>
                                                        <FormControlLabel disableTypography control={<Checkbox />} label="Badan Penanggulangan Bencana Daerah" value="Badan Penanggulangan Bencana Daerah" sx={{ textAlign: "left" }} />
                                                        <FormControlLabel disableTypography control={<Checkbox defaultChecked />} label="Badan Pendapatan Daerah" value="Badan Pendapatan Daerah" sx={{ textAlign: "left" }} />
                                                        <FormControlLabel disableTypography control={<Checkbox />} label="Badan Pengelolaan Aset Daerah" value="Badan Pengelolaan Aset Daerah" sx={{ textAlign: "left" }} />
                                                        <FormControlLabel disableTypography control={<Checkbox />} label="Badan Perencanaan Pembangunan Daerah" value="Badan Perencanaan Pembangunan Daerah" sx={{ textAlign: "left" }} />
                                                        <FormControlLabel disableTypography control={<Checkbox />} label="Badan Pertanahan Nasional" value="Badan Pertanahan Nasional" sx={{ textAlign: "left" }} />
                                                    </FormGroup>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={8.5} lg={8.5} xl={8.5}>
                                            <Box sx={{ display: isMobileMD ? "flex" : "none", justifyContent: "flex-end", marginBottom: "-10px" }}>
                                                <Button onClick={handleSort} variant="contained" disableElevation disableRipple disableTouchRipple startIcon={<UnfoldMoreRoundedIcon />}
                                                    sx={{
                                                        fontFamily: "inherit",
                                                        fontSize: "18px",
                                                        borderRadius: "30px",
                                                        textTransform: "none",
                                                        // width: "149px",
                                                        height: "49px",
                                                        color: "white",
                                                        background: "#003577",
                                                        fontSize: "18px",
                                                        fontWeight: "500",
                                                    }}>
                                                    Urutkan {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
                                                </Button>
                                            </Box>
                                            {filteredItems(unduhList).map((unduh, i) => (
                                                <Box key={i} elevation={0}
                                                    sx={{
                                                        background: "white",
                                                        border: "1px solid #DFE6E9",
                                                        borderRadius: "15px",
                                                        padding: isMobile ? "15px" : "20px 40px",
                                                        margin: isMobile ? "20px 0" : "30px 0"
                                                    }}>
                                                    <Grid container
                                                        direction="row"
                                                        alignItems="center">
                                                        <Grid xs={8} sm={10} md={10} lg={10} xl={10} sx={{ textAlign: "start" }}>
                                                            <Typography variant="p"
                                                                sx={{
                                                                    color: "#003577",
                                                                    fontSize: "20px",
                                                                    fontWeight: "600",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.38px",
                                                                }}>
                                                                {unduh.titleLeft} <span style={{ color: "#F7941D" }}>{unduh.titleRight}</span>
                                                            </Typography>
                                                            <Typography variant="p" paragraph
                                                                sx={{
                                                                    color: "rgba(0, 0, 0, 0.60)",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                    lineHeight: "292%",
                                                                    letterSpacing: "-0.38px",
                                                                }}>
                                                                {unduh.desc}
                                                            </Typography>
                                                            <Button disableElevation variant="contained" sx={{
                                                                textTransform: "none",
                                                                width: "138px",
                                                                height: "36px",
                                                                borderRadius: "10px",
                                                                color: "white",
                                                                background: "#F7941D",

                                                                fontSize: "18px",
                                                                fontWeight: "600"
                                                            }}>
                                                                {unduh.button}
                                                            </Button>
                                                        </Grid>
                                                        <Grid xs={4} sm={2} md={2} lg={2} xl={2}>
                                                            {unduh.type === "Privat" ? (
                                                                <>
                                                                    <LockRoundedIcon sx={{ fontSize: "40px", marginBottom: "20px" }} />
                                                                </>
                                                            ) : null}
                                                            <Button variant="contained" sx={{
                                                                textTransform: "none",
                                                                width: "104px",
                                                                height: "30px",
                                                                borderRadius: "10px",
                                                                color: "white",
                                                                background: unduh.type === "Privat" ? "#F32013" : "#07975C",

                                                                fontSize: "16px",
                                                                fontWeight: "600"
                                                            }}>
                                                                {unduh.type}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Pagination
                                        count={Math.ceil(unduhList.length / itemsPerPage)}
                                        page={currentPage}
                                        onChange={paginate}
                                        shape="rounded"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            fontFamily: "inherit",

                                            "&.MuiPagination-root": {
                                                fontFamily: "inherit",
                                            }
                                        }}
                                    />
                                </>
                            )}
                        </section>
                    ) : (
                        <>
                            <section id="KatalogGeospasialTotalDashboardPeta" style={{ width: "90vw", maxWidth: "1260px", paddingTop: "50px", paddingBottom: isMobile ? "75px" : "100px" }}>
                                <Grid container
                                    spacing={isMobile ? 2 : 8}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Grid xs={12} sm={6} md={5} lg={3.7} xl={3.7}>
                                        <Box
                                            sx={{
                                                // width: "342px",
                                                height: "199px",
                                                borderRadius: "15px",
                                                border: "1px solid #DFE6E9",
                                                background: "#003577",
                                                boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                            }}>
                                            <Stack direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                gap={3}
                                                sx={{ height: "100%" }}>
                                                <img
                                                    src='/jakartasatu-beta/assets/gambar-katalog-peta-atas-dashboard.png'
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        marginTop: "10px",
                                                        width: isMobile ? "35vw" : '123px',
                                                        height: 'auto'
                                                    }}
                                                />
                                                <Stack direction="column">
                                                    <Typography variant="p"
                                                        sx={{
                                                            color: "white",
                                                            textAlign: "center",
                                                            fontSize: "64px",
                                                            fontWeight: "500",
                                                            lineHeight: "130%",
                                                            letterSpacing: "-1.216px",
                                                        }}>
                                                        250
                                                    </Typography>
                                                    <Typography variant="p"
                                                        sx={{
                                                            color: "white",
                                                            textAlign: "center",
                                                            fontSize: "22px",
                                                            fontWeight: "600",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.418px",
                                                        }}>
                                                        Dashboard
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={5} lg={3.7} xl={3.7}>
                                        <Box
                                            sx={{
                                                // width: "342px",
                                                height: "199px",
                                                borderRadius: "15px",
                                                border: "1px solid #DFE6E9",
                                                background: "#F7941D",
                                                boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                            }}>
                                            <Stack direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                gap={3}
                                                sx={{ height: "100%" }}>
                                                <img
                                                    src='/jakartasatu-beta/assets/gambar-katalog-peta-atas-peta.png'
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        marginTop: "20px",
                                                        width: isMobile ? "35vw" : '139px',
                                                        height: 'auto'
                                                    }}
                                                />
                                                <Stack direction="column">
                                                    <Typography variant="p"
                                                        sx={{
                                                            color: "white",
                                                            textAlign: "center",
                                                            fontSize: "64px",
                                                            fontWeight: "500",
                                                            lineHeight: "130%",
                                                            letterSpacing: "-1.216px",
                                                        }}>
                                                        110
                                                    </Typography>
                                                    <Typography variant="p"
                                                        sx={{
                                                            color: "white",
                                                            textAlign: "center",
                                                            fontSize: "22px",
                                                            fontWeight: "600",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.418px",
                                                        }}>
                                                        Peta
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </section>
                            <section id="top3KatalogPeta" style={{ width: "90vw", maxWidth: isMobile ? "90vw" : "1260px" }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
                                    <Typography variant="p"
                                        style={{
                                            color: "#003577",
                                            textAlign: "left",
                                            fontSize: "36px",
                                            fontWeight: "800",
                                        }}>
                                        Top 3
                                    </Typography>
                                    <Divider
                                        style={{
                                            margin: '15px 0 80px 0',
                                            backgroundColor: "#003577",
                                            height: 5,
                                            width: '75px',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Box>
                                <Grid container
                                    spacing={8}
                                    direction="row"
                                    justifyContent={isMobile ? "center" : "space-between"}
                                    alignItems="baseline">
                                    {datas.slice(0, 3).map((dashboard, i) => (
                                        <Grid key={i} xs={12} sm={4} md={4} lg={4} xl={4}>
                                            <Card elevation={0}
                                                sx={{
                                                    background: "none",
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center'
                                                }}>
                                                <CardActionArea id="btnDashboardTop3" href={dashboard.link} target='_blank' disableRipple
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
                                                        <img
                                                            alt=""
                                                            src={dashboard.image}
                                                            style={{
                                                                maxWidth: "100%",
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
                                                            fontSize: isMobile ? "14px" : "18px",
                                                            fontWeight: 500,
                                                            lineHeight: "171.3%",
                                                            letterSpacing: "0.027px",
                                                            mb: 1,
                                                        }}>{dashboard.title}</Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                                <img
                                    src='/jakartasatu-beta/assets/Partikel-1.png'
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
                        </>
                    )}
                </div >

                <Footer />
            </main >
            <ScrollTop />
        </>
    );
}

export default katalogPeta;