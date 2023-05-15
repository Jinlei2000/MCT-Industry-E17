import './globals.css'

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
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}
