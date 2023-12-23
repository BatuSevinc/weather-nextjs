import { Inter } from 'next/font/google'
import './globals.css'
import { CityProvider } from './context';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Türkiye'deki İllerin Hava Durumu",
  description: 'weather app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#292929] static`}>
      <CityProvider>
        {children}
      </CityProvider>
        </body>

    </html>
  )
}
