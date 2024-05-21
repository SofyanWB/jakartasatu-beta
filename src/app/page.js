'use client'

import ChatBot from '../../src/components/chatBot';
import ScrollTop from '../../src/components/scrollTop';
import Navbar from '../../src/components/navbar/navbar';
import LandingPage from '../../src/components/home/home';
import Box from '../../src/components/box/box';
import Footer from '../../src/components/footer/footer';
import styles from '../../src/components/page.module.css'
import { useState } from 'react';

export default function Home() {
  const [halamanBeranda, setHalamanBeranda] = useState(true);

  return (
    <>
      <main className={styles.main}>
      <Navbar halamanBeranda={halamanBeranda} />
        <LandingPage />
        <Box />
        <Footer />
        <ChatBot />
        <ScrollTop />
      </main>
    </>
  )
}
