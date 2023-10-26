import { ReduxProvider } from '@/store/provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SnackbarProvider } from '@/components/ui-kit/snackbar'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MotionGUARD',
  description: 'Sistema de controle de acesso',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
