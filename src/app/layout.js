import { Inter } from 'next/font/google'
import './globals.css'
import Loading from './loading';

export const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)',
  description: 'Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      </body>
    </html>
  )
}
