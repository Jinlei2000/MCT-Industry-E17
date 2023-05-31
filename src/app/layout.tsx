import '../assets/globals.css'
import localFont from '@next/font/local'

const proximanova = localFont({
  src: [
    {
      path: '../../public/fonts/Proxima Nova Regular.otf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Proxima Nova Medium.otf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Proxima Nova Semibold.otf',
      weight: '600',
    },
    {
      path: '../../public/fonts/Proxima Nova Bold.otf',
      weight: '700',
    },
    {
      path: '../../public/fonts/Proxima Nova Extrabold.otf',
      weight: '800',
    },
    {
      path: '../../public/fonts/Proxima Nova Black.otf',
      weight: '900',
    },
  ],
  variable: '--font-proxima-nova',
})

export const metadata = {
  title: 'E17 Expo',
  description: 'Dit jaar staan we stil bij de 50ste verjaardag van de E3/E17',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${proximanova.variable} font-proxima`}>
      <body>{children}</body>
    </html>
  )
}
