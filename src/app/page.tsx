'use client'
import SideBar from '@/components/SideBar'
import useFireStore from '@/hooks/useFireStore'
import { useEffect } from 'react'

export default function Home() {
  const { listenToChangeConfig } = useFireStore()

  useEffect(() => {
    listenToChangeConfig(() => {}, '/detail')
  }, [])

  return (
    <main className="flex  h-screen flex-col items-center justify-end">
      <div className="fixed z-0 h-screen w-screen">
        {/* <iframe
          src={
            'https://www.youtube.com/embed/Q3bMHbJLhCE?autoplay=1&loop=1&controls=0&mute=1&playlist=Q3bMHbJLhCE'
          }
          allow="autoplay; loop; controls; mute;"
          width={'100%'}
          height={'100%'}
          allowFullScreen
        ></iframe> */}

        <video
          src="/video.mov"
          autoPlay
          muted
          loop
          id="E17 highway"
          className="h-screen w-screen object-cover"
        />
      </div>
      <div className="z-10 flex h-48 w-screen items-center justify-center bg-gradient-to-t from-black to-transparent text-4xl font-normal text-white">
        Kijk in de toekomst van de E17 via de tablet
      </div>

      <SideBar title="EXPO 50 JAAR E3/E17" />
    </main>
  )
}
