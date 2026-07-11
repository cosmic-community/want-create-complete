import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Future Fashion ERP',
  description: 'Enterprise Resource Planning for Future Fashion Ready-Made Garments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧵</text></svg>"
        />
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6a5267b267f2f6a3f805a091"></script>
      </head>
      <body className="font-sans">
        <div className="min-h-screen">
          <Sidebar />
          <main className="md:ml-64 p-4 md:p-8">{children}</main>
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}