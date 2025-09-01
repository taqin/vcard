import type { Metadata } from 'next'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'VCard - Digital Business Cards',
  description: 'Share your professional information with beautiful digital business cards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
