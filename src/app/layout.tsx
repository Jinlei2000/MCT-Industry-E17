import '../assets/globals.css'
import localFont from '@next/font/local'

const proximanova = localFont({
  src: [
    {
      path: '../../public/fonts/Fontspring-DEMO-proximanova-black.ttf',
      weight: '700'
    },
    {
      path: '../../public/fonts/Fontspring-DEMO-proximanova-bold.ttf',
      weight: '500'
    },
    {
      path: '../../public/fonts/Fontspring-DEMO-proximanova-extrabold.ttf',
      weight: '600'
    },
    {
      path: '../../public/fonts/Fontspring-DEMO-proximanova-medium.ttf',
      weight: '300'
    },
    {
      path: '../../public/fonts/Fontspring-DEMO-proximanova-regular.ttf',
      weight: '200'
    },
    {
      path: '../../public/fonts/Fontspring-DEMO-proximanova-semibold.ttf',
      weight: '400'
    }
  ],
  variable: '--font-proxima-nova'
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
