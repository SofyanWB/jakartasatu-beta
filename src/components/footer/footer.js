"use client"

import styles from '../page.module.css';

import { Box, Typography, Grid, Skeleton, Divider, Stack, useMediaQuery, Button, useTheme } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    const today = new Date();
    const year = today.getFullYear();

    return (
        <main style={{
            margin: "150px auto 0 auto",
            maxWidth: "90vw",
            maxWidth: "1260px",
            color: "rgba(0, 0, 0, 0.7)",
            lineHeight: "2",
        }}>
            <div style={{
                margin: "0 auto",
                position: "relative",
                fontSize: "0.8em",
            }}>
                <Grid container
                    spacing={isMobile ? 2 : 8}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ maxWidth: "90vw" }}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Image
                            src="/assets/logo-jakartasatu-orange.png"
                            alt="Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            style={{ width: "267px", height: "auto" }}
                        />
                        <Typography variant='p' paragraph className={styles.FooterTitleDecription}>Situs ini merupakan sarana komunikasi dan visualisasi peta dan data dari program Jakarta Satu baik untuk Pemerintah Provinsi DKI Jakarta ataupun untuk masyarakat.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ textAlign: "center" }}>
                        <Typography variant='p' sx={{
                            color: "#000",
                            fontSize: "20px",
                            fontWeight: "500",
                            lineHeight: "204.182%",
                            letterSpacing: "-0.3px",
                            textAlign: "center"
                        }}>
                            Informasi Kontak
                        </Typography>
                        <Typography variant='p' paragraph
                            style={{
                                color: "rgba(0, 0, 0, 0.80)",
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "180%",
                                letterSpacing: "-0.3px",
                                textAlign: "justify"
                            }}>
                            Kirimkan Surat Elektronik ke alamat berikut: jakartasatu@jakarta.go.id
                        </Typography>
                        <Grid container
                            spacing={1}
                            direction="row"
                            alignItems="center">
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                    }}>
                                    <Link id="btnFooterLinkYoutube" href="https://www.youtube.com/@JakartaSatuDKI/" target="_blank"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            textDecoration: "none",
                                            color: "black"
                                        }}>
                                        <img src="https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/d150f441e939441a9c229bb7e95765f3/data"
                                            style={{ height: "18px" }} alt="" />
                                        <Typography variant="p"
                                            style={{
                                                marginLeft: "10px",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                            }}>
                                            Jakarta Satu DKI
                                        </Typography>
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                    }}>
                                    <Link id="btnFooterLinkTwitter" href="https://www.twitter.com/jakartasatudki/" target="_blank"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            textDecoration: "none",
                                            color: "black"
                                        }}>
                                        <img src="https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/b24f7dd6b91c4be18df88a6616d368b3/data"
                                            style={{ height: "16px" }} alt="" />
                                        <Typography variant="p"
                                            style={{
                                                marginLeft: "10px",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                            }}>
                                            Jakarta Satu
                                        </Typography>
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                    }}>
                                    <Link id="btnFooterLinkInstagram" href="https://www.instagram.com/jakartasatudki/" target="_blank"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            textDecoration: "none",
                                            color: "black"
                                        }}>
                                        <img src="https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/510e8e1269dd4658ac3a518217356553/data"
                                            style={{ height: "18px" }} alt="" />
                                        <Typography variant="p"
                                            style={{
                                                marginLeft: "10px",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                            }}>
                                            jakartasatudki
                                        </Typography>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div style={{
                width: "90vw",
                maxWidth: "1260px",
                margin: "3% auto 1% auto",
            }}>
                <Divider
                    sx={{
                        display: isMobile ? "block" : "none",
                        padding: "10px 0",
                    }} />
                <Typography variant='p'
                    sx={{
                        display: isMobile ? "block" : "none",
                        textAlign: "center",
                        color: "rgba(0, 0, 0, 0.70)",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "204.182%",
                        letterSpacing: "-0.3px",
                    }}>
                    © Hak Cipta {year}. Pemerintah Provinsi Daerah Khusus Ibu Kota Jakarta.
                </Typography>
                <Divider className={styles.FooterTitleDecription}
                    sx={{
                        display: isMobile ? "none" : "flex",
                        fontSize: "14px",
                        color: "rgba(0, 0, 0, 0.70)",

                        "&::before, &::after": {
                            borderTopColor: "rgba(0, 0, 0, 0.40)",
                        },
                    }}>
                    © Hak Cipta {year}. Pemerintah Provinsi Daerah Khusus Ibu Kota Jakarta.
                </Divider>
            </div>
        </main>
    )
}
