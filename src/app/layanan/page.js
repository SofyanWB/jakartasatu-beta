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
// import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
// import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";

function dataJakartaSatu() {
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
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/dashboard%20banjir.JPG?v=1689646656901',
            title: 'Dashboard Informasi Banjir',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/ASET.png?v=1689646656902',
            title: 'Dashboard Aset',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/JAKWIFI.png?v=1689646656904',
            title: 'Dashboard Persebaran Lokasi JakWifi',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/HALTE.png?v=1689646656906',
            title: 'Dashboard Persebaran Lokasi Halte',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/SEKOLAH.png?v=1689646656908',
            title: 'Dashborad Lokasi Sekolah',
            link: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/UTILITAS.png?v=1689646656909',
            title: 'Dashboard Persebaran Utilitas',
            link: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4',
        },
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
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/dashboard%20banjir.JPG?v=1689646656901',
            title: 'Dashboard Informasi Banjir',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/ASET.png?v=1689646656902',
            title: 'Dashboard Aset',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/JAKWIFI.png?v=1689646656904',
            title: 'Dashboard Persebaran Lokasi JakWifi',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/HALTE.png?v=1689646656906',
            title: 'Dashboard Persebaran Lokasi Halte',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/SEKOLAH.png?v=1689646656908',
            title: 'Dashborad Lokasi Sekolah',
            link: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/UTILITAS.png?v=1689646656909',
            title: 'Dashboard Persebaran Utilitas',
            link: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4',
        },
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
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/dashboard%20banjir.JPG?v=1689646656901',
            title: 'Dashboard Informasi Banjir',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/ASET.png?v=1689646656902',
            title: 'Dashboard Aset',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/JAKWIFI.png?v=1689646656904',
            title: 'Dashboard Persebaran Lokasi JakWifi',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/HALTE.png?v=1689646656906',
            title: 'Dashboard Persebaran Lokasi Halte',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/SEKOLAH.png?v=1689646656908',
            title: 'Dashborad Lokasi Sekolah',
            link: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/UTILITAS.png?v=1689646656909',
            title: 'Dashboard Persebaran Utilitas',
            link: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4',
        },
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
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/dashboard%20banjir.JPG?v=1689646656901',
            title: 'Dashboard Informasi Banjir',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/ASET.png?v=1689646656902',
            title: 'Dashboard Aset',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/JAKWIFI.png?v=1689646656904',
            title: 'Dashboard Persebaran Lokasi JakWifi',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/HALTE.png?v=1689646656906',
            title: 'Dashboard Persebaran Lokasi Halte',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/SEKOLAH.png?v=1689646656908',
            title: 'Dashborad Lokasi Sekolah',
            link: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/UTILITAS.png?v=1689646656909',
            title: 'Dashboard Persebaran Utilitas',
            link: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4',
        },
    ];

    const [unduhList, setUnduhList] = useState([
        {
            title: 'mm-peta-taman-jakarta-barat',
            titleLeft: 'MM Peta Taman Jakarta Barat | ',
            titleRight: 'Badan Penanggulangan Bencana Daerah',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'xx-peta-taman-jakarta-barat',
            titleLeft: 'XX Peta Taman Jakarta Barat',
            titleRight: '',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'ccc-peta-taman-jakarta-barat',
            titleLeft: 'CCC Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat',
            titleRight: '',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'z-peta-taman-jakarta-barat',
            titleLeft: 'Z Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'kkk-peta-taman-jakarta-barat',
            titleLeft: 'KKK Peta Taman Jakarta Barat',
            titleRight: '',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'ppp-peta-taman-jakarta-barat',
            titleLeft: 'PPP Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat',
            titleRight: '',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat',
            titleRight: '',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Badan Pertanahan Nasional',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'dddd-peta-taman-jakarta-barat',
            titleLeft: 'DDDD Peta Taman Jakarta Barat | ',
            titleRight: 'Badan Penanggulangan Bencana Daerah',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Badan Pertanahan Nasional',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Badan Pengelolaan Aset Daerah',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat',
            titleRight: '',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Publik'
        },
        {
            title: 'peta-taman-jakarta-barat',
            titleLeft: 'Peta Taman Jakarta Barat | ',
            titleRight: 'Dinas Sumber Daya Air',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
        {
            title: 'uuuuuu-peta-taman-jakarta-barat',
            titleLeft: 'Uuuuuu Peta Taman Jakarta Barat | ',
            titleRight: 'Badan Pengelolaan Aset Daerah',
            desc: 'Deskripsi Peta',
            button: 'Detail Info',
            type: 'Privat'
        },
    ]);

    useEffect(() => {
        document.title = "Data | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

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

    const filteredItems = unduhList.filter((item) =>
        (item.titleLeft.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.titleRight.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (accessTypeFilter === 'semua' || item.type.toLowerCase() === accessTypeFilter.toLowerCase()) &&
        (simpulJaringanFilter === 'Badan Pendapatan Daerah' || item.titleRight.toLowerCase() === simpulJaringanFilter.toLowerCase())
    );

    const searchNotFound = searchTerm && filteredItems.length === 0;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const [sortOrder, setSortOrder] = useState('asc');

    const currentItems = filteredItems
        .sort((a, b) => (sortOrder === 'asc' ? a.titleLeft.localeCompare(b.titleLeft) : b.titleLeft.localeCompare(a.titleLeft)))
        .slice(indexOfFirstItem, indexOfLastItem);

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
                    <section id="dataJakartaSatu" style={{ width: "90vw", maxWidth: "1260px", paddingTop: "50px" }}>
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
                            Data Jakarta Satu
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
                        <section id="dataPencarian" style={{ width: "90vw", maxWidth: "1260px" }}>
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
                                            {currentItems.map((unduh, i) => (
                                                <Link key={i} href={`/katalog-peta/${unduh.title}`}>
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
                                                </Link>
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
                            <section id="OpenDataDanRequestData" style={{ width: "90vw", maxWidth: "1260px", paddingTop: "80px", paddingBottom: isMobile ? "75px" : "100px" }}>
                                <Grid container
                                    spacing={isMobile ? 2 : 8}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Grid xs={12} sm={12} md={6} lg={5} xl={5}>
                                        <Box sx={{
                                            maxWidth: "456px",
                                            height: "315px",
                                            boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                                            border: "1px solid #DFE6E9",
                                            borderRadius: "7px"
                                        }}>
                                            <Stack direction="column"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                gap={3}
                                                sx={{ height: "100%", marginTop: "-28px" }}>
                                                <Box sx={{
                                                    // marginTop: "-185px",
                                                    width: "304px",
                                                    height: "55px",
                                                    borderRadius: "40px",
                                                    background: "#003577",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <Stack direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        gap={2}>
                                                        <Typography variant="p" sx={{
                                                            color: "white",
                                                            fontSize: "26px",
                                                            fontWeight: "600",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.494px",
                                                        }}>
                                                            Open Data
                                                        </Typography>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                            <path d="M8.83301 2.33325H4.49967C3.92504 2.33325 3.37394 2.56152 2.96761 2.96785C2.56128 3.37418 2.33301 3.92528 2.33301 4.49992V17.4999C2.33301 18.0746 2.56128 18.6257 2.96761 19.032C3.37394 19.4383 3.92504 19.6666 4.49967 19.6666H17.4997C18.0743 19.6666 18.6254 19.4383 19.0317 19.032C19.4381 18.6257 19.6663 18.0746 19.6663 17.4999V13.1666M10.9997 10.9999L19.6663 2.33325M19.6663 2.33325V7.74992M19.6663 2.33325H14.2497" stroke="white" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </Stack>
                                                </Box>
                                                <Stack direction="column" gap={2} sx={{ marginLeft: "-20px" }}>
                                                    <Stack direction="row" gap={3}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                                            <path d="M10.5 11.6668L14.301 14.5182C14.5365 14.6948 14.83 14.7758 15.1228 14.7451C15.4155 14.7144 15.6858 14.5741 15.8795 14.3525L23.3333 5.8335" stroke="#F7941D" stroke-width="2.33333" stroke-linecap="round" />
                                                            <path d="M24.5 14.0001C24.5 16.194 23.8128 18.3329 22.5349 20.1162C21.257 21.8996 19.4526 23.2378 17.3751 23.943C15.2976 24.6482 13.0513 24.685 10.9519 24.0481C8.85239 23.4112 7.00516 22.1326 5.66962 20.392C4.33408 18.6514 3.57731 16.5362 3.50561 14.3434C3.43391 12.1506 4.05088 9.99046 5.26986 8.16632C6.48884 6.34219 8.2486 4.9457 10.302 4.17301C12.3554 3.40032 14.5992 3.29023 16.7183 3.85822" stroke="#F7941D" stroke-width="2.33333" stroke-linecap="round" />
                                                        </svg>
                                                        <Typography variant="p" sx={{
                                                            color: "rgba(0, 0, 0, 0.60)",
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.342px",
                                                        }}>
                                                            Format data : shp, xls, json
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction="row" gap={3}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                                            <path d="M10.5 11.6668L14.301 14.5182C14.5365 14.6948 14.83 14.7758 15.1228 14.7451C15.4155 14.7144 15.6858 14.5741 15.8795 14.3525L23.3333 5.8335" stroke="#F7941D" stroke-width="2.33333" stroke-linecap="round" />
                                                            <path d="M24.5 14.0001C24.5 16.194 23.8128 18.3329 22.5349 20.1162C21.257 21.8996 19.4526 23.2378 17.3751 23.943C15.2976 24.6482 13.0513 24.685 10.9519 24.0481C8.85239 23.4112 7.00516 22.1326 5.66962 20.392C4.33408 18.6514 3.57731 16.5362 3.50561 14.3434C3.43391 12.1506 4.05088 9.99046 5.26986 8.16632C6.48884 6.34219 8.2486 4.9457 10.302 4.17301C12.3554 3.40032 14.5992 3.29023 16.7183 3.85822" stroke="#F7941D" stroke-width="2.33333" stroke-linecap="round" />
                                                        </svg>
                                                        <Typography variant="p" sx={{
                                                            color: "rgba(0, 0, 0, 0.60)",
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.342px",
                                                        }}>
                                                            Data terupdate
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction="row" gap={3}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                                            <path d="M10.5 11.6668L14.301 14.5182C14.5365 14.6948 14.83 14.7758 15.1228 14.7451C15.4155 14.7144 15.6858 14.5741 15.8795 14.3525L23.3333 5.8335" stroke="#F7941D" stroke-width="2.33333" stroke-linecap="round" />
                                                            <path d="M24.5 14.0001C24.5 16.194 23.8128 18.3329 22.5349 20.1162C21.257 21.8996 19.4526 23.2378 17.3751 23.943C15.2976 24.6482 13.0513 24.685 10.9519 24.0481C8.85239 23.4112 7.00516 22.1326 5.66962 20.392C4.33408 18.6514 3.57731 16.5362 3.50561 14.3434C3.43391 12.1506 4.05088 9.99046 5.26986 8.16632C6.48884 6.34219 8.2486 4.9457 10.302 4.17301C12.3554 3.40032 14.5992 3.29023 16.7183 3.85822" stroke="#F7941D" stroke-width="2.33333" stroke-linecap="round" />
                                                        </svg>
                                                        <Typography variant="p" sx={{
                                                            color: "rgba(0, 0, 0, 0.60)",
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.342px",
                                                        }}>
                                                            Unduh secara online
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Link id="btnLayananToOpenData" href="/">
                                                    <Button variant="contained"
                                                        sx={{
                                                            fontFamily: "inherit",
                                                            width: isMobile ? "100px" : "145px",
                                                            height: isMobile ? "30px" : "44px",
                                                            borderRadius: "40px",
                                                            background: "#F7941D",
                                                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                            textTransform: "none",
                                                            color: "white",
                                                            fontSize: isMobile ? "15px" : "18px",
                                                            padding: "4px 35px",
                                                        }}>
                                                        Lihat
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={5} xl={5}>
                                        <Box sx={{
                                            maxWidth: "456px",
                                            height: "315px",
                                            boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                                            border: "1px solid #DFE6E9",
                                            borderRadius: "7px"
                                        }}>
                                            <Stack direction="column"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                gap={3}
                                                sx={{ height: "100%", marginTop: "-28px" }}>
                                                <Box sx={{
                                                    // marginTop: "-185px",
                                                    width: "304px",
                                                    height: "55px",
                                                    borderRadius: "40px",
                                                    background: "#003577",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <Stack direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        gap={2}>
                                                        <Typography variant="p" sx={{
                                                            color: "white",
                                                            fontSize: "26px",
                                                            fontWeight: "600",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.494px",
                                                        }}>
                                                            Request Data
                                                        </Typography>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                                            <path d="M22.4286 4.07134L18.9286 0.571338C18.8067 0.448978 18.6618 0.351892 18.5022 0.285647C18.3427 0.219403 18.1716 0.185303 17.9989 0.185303C17.8262 0.185303 17.6551 0.219403 17.4956 0.285647C17.336 0.351892 17.1912 0.448978 17.0692 0.571338L6.56922 11.0713C6.32394 11.318 6.18665 11.652 6.1875 11.9999V15.4999C6.1875 15.848 6.32578 16.1819 6.57192 16.428C6.81806 16.6741 7.1519 16.8124 7.5 16.8124H11C11.1724 16.8126 11.3432 16.7787 11.5025 16.7129C11.6618 16.647 11.8066 16.5504 11.9286 16.4285L22.4286 5.92852C22.5506 5.80663 22.6474 5.66188 22.7135 5.50254C22.7795 5.3432 22.8135 5.17241 22.8135 4.99993C22.8135 4.82745 22.7795 4.65666 22.7135 4.49732C22.6474 4.33799 22.5506 4.19323 22.4286 4.07134ZM18 3.35931L19.6406 4.99993L18.4375 6.20306L16.7969 4.56243L18 3.35931ZM10.4531 14.1874H8.8125V12.5468L14.9375 6.42181L16.5781 8.06243L10.4531 14.1874ZM21.9375 13.3748V20.7499C21.9375 21.3301 21.707 21.8865 21.2968 22.2967C20.8866 22.707 20.3302 22.9374 19.75 22.9374H2.25C1.66984 22.9374 1.11344 22.707 0.703204 22.2967C0.292968 21.8865 0.0625 21.3301 0.0625 20.7499V3.24993C0.0625 2.66977 0.292968 2.11337 0.703204 1.70314C1.11344 1.2929 1.66984 1.06243 2.25 1.06243H9.62516C9.97325 1.06243 10.3071 1.20071 10.5532 1.44685C10.7994 1.693 10.9377 2.02683 10.9377 2.37493C10.9377 2.72303 10.7994 3.05687 10.5532 3.30301C10.3071 3.54915 9.97325 3.68743 9.62516 3.68743H2.6875V20.3124H19.3125V13.3748C19.3125 13.0267 19.4508 12.6928 19.6969 12.4467C19.9431 12.2006 20.2769 12.0623 20.625 12.0623C20.9731 12.0623 21.3069 12.2006 21.5531 12.4467C21.7992 12.6928 21.9375 13.0267 21.9375 13.3748Z" fill="white" />
                                                        </svg>
                                                    </Stack>
                                                </Box>
                                                <Stack direction="column" gap={2} sx={{ marginLeft: "-20px", maxWidth: "320px", textAlign: "left" }}>
                                                    <Stack direction="row" gap={3}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                                            <path d="M10.5 11.6668L14.301 14.5182C14.5365 14.6948 14.83 14.7758 15.1228 14.7451C15.4155 14.7144 15.6858 14.5741 15.8795 14.3525L23.3333 5.8335" stroke="#F7941D" stroke-width="2.33333" stroke-linecap="round" />
                                                            <path d="M24.5 14.0001C24.5 16.194 23.8128 18.3329 22.5349 20.1162C21.257 21.8996 19.4526 23.2378 17.3751 23.943C15.2976 24.6482 13.0513 24.685 10.9519 24.0481C8.85239 23.4112 7.00516 22.1326 5.66962 20.392C4.33408 18.6514 3.57731 16.5362 3.50561 14.3434C3.43391 12.1506 4.05088 9.99046 5.26986 8.16632C6.48884 6.34219 8.2486 4.9457 10.302 4.17301C12.3554 3.40032 14.5992 3.29023 16.7183 3.85822" stroke="#F7941D" stroke-width="2.33333" stroke-linecap="round" />
                                                        </svg>
                                                        <Typography variant="p" sx={{
                                                            color: "rgba(0, 0, 0, 0.60)",
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.342px",
                                                        }}>
                                                            Data disediakan berdasarkan permintaan data
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Link id="btnLayananToOpenData" href="/">
                                                    <Button variant="contained"
                                                        sx={{
                                                            fontFamily: "inherit",
                                                            width: isMobile ? "100px" : "145px",
                                                            height: isMobile ? "30px" : "44px",
                                                            borderRadius: "40px",
                                                            background: "#F7941D",
                                                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                            textTransform: "none",
                                                            color: "white",
                                                            fontSize: isMobile ? "15px" : "18px",
                                                            padding: "4px 35px",
                                                        }}>
                                                        Lihat
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                </Grid>
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

export default dataJakartaSatu;