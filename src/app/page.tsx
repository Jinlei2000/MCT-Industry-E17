'use client'
import SideBar from '@/components/SideBar'
import VideoSkeleton from '@/components/VideoSkeleton'
import useFireStore from '@/hooks/useFireStore'
import { useEffect, useState } from 'react'

export default function Home() {
  const { listenToChangeConfig } = useFireStore()
  const [isLoadedVideo, setIsLoadedVideo] = useState(false)

  useEffect(() => {
    listenToChangeConfig(() => {})
  }, [])

  const customTitle = () => {
    return (
      <>
        <div className="rotate-90 text-center text-5xl font-black text-white">
          <span className="text-stroke">EXPO </span> <br />
          50 JAAR
          <br />
          E3/E17
        </div>
      </>
    )
  }

  return (
    <main className="relative overflow-hidden">
      <SideBar title={customTitle} />

      {/* skeleton video */}
      {!isLoadedVideo && <VideoSkeleton className="h-screen w-5/6" />}

      {/* video */}
      <video
        src="/video.mov"
        autoPlay
        muted
        loop
        id="E17 highway"
        className="h-screen w-screen object-cover"
        onLoadedData={() => setIsLoadedVideo(true)}
      />

      <div className="absolute bottom-0 left-0 z-[1] flex w-screen justify-between bg-gradient-to-t from-black to-transparent">
        <p className="py-8 pl-5 text-5xl font-bold text-white">
          Kijk in de toekomst van de E17 via de tablet
        </p>
        <div className="w-2/6" />
      </div>
    </main>
  )
}
