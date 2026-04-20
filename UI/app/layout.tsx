import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { IBM_Plex_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: '--font-montserrat'
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-ibm-plex-mono'
})

export const metadata: Metadata = {
  title: 'Atmos — Atmospheric Intelligence Dashboard',
  description: 'Real-time atmospheric monitoring and climate intelligence platform',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0a0f1e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${ibmPlexMono.variable} font-sans antialiased text-sm`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
