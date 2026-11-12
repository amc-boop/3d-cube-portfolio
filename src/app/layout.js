import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const title = 'Alexandre Mc Namara · Business & IA'
const description = "Étudiant à Eugenia School, je combine stratégie commerciale et maîtrise de l'IA. Découvrez mes projets et ma stack."

export const metadata = {
  metadataBase: new URL('https://portfolio-alexandre-mcnamara.vercel.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Alexandre Mc Namara',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
