import './globals.css'
import type { Metadata } from 'next'
import Provider from '@/components/Provider'

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
    <html lang='pt-br'>
      <body className='bg-gray-800 text-white'>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
