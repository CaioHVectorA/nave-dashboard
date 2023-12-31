import type { Metadata } from 'next'
import { Fira_Sans, Glory, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/context/Session'

const inter = Fira_Sans({ subsets: ['latin'], weight: '400'})


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
