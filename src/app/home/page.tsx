'use client'
import SideBar from '@/components/SideBar'
import VideoSkeleton from '@/components/VideoSkeleton'
import useFireStore from '@/hooks/useFireStore'
import { useEffect, useState } from 'react'

export default () => {
  const { listenToChangeConfig } = useFireStore()
  const [isLoadedVideo, setIsLoadedVideo] = useState(false)

  useEffect(() => {
    listenToChangeConfig(() => {})
  }, [])

  const customTitle = () => {
    return (
      <>
        <p className="rotate-90 text-center text-5xl font-black text-white">
          <span className="text-stroke">EXPO </span> <br />
          50 JAAR
          <br />
          E3/E17
        </p>
      </>
    )
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <SideBar title={customTitle} />

      {/* skeleton video */}
      {!isLoadedVideo && <VideoSkeleton className="h-full w-5/6" />}

      {/* video */}
      <video
        autoPlay
        muted
        loop
        id="E17 highway"
        className="h-screen w-screen object-cover"
        onLoadedData={() => {
          // set timer 1 sec and set false
          setTimeout(() => {
            setIsLoadedVideo(true)
          }, 1000)
        }}
      >
        <source src="/video.mov" />
        {/* <source src="/video.mp4" />
        <source src="/video.webm" /> */}
      </video>

      <div className="absolute bottom-0 left-0 z-[1] flex h-1/6 w-screen justify-between bg-gradient-to-t from-[#545454] to-transparent">
        <p className="my-auto w-full text-center text-5xl font-semibold text-white">
          Verbeeld hier jouw visie op de toekomst van de snelweg
        </p>
        <div className="w-1/6" />
      </div>
    </main>
  )
}
