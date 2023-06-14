'use client'
import { useState } from 'react'
import VideoSkeleton from './VideoSkeleton'

export default ({ fullScreen = true }: { fullScreen?: boolean }) => {
  const [isLoadedVideo, setIsLoadedVideo] = useState(false)
  return (
    <>
      {!isLoadedVideo && (
        <VideoSkeleton
          className={`h-full 
        ${fullScreen ? 'w-screen' : 'w-5/6'}
      `}
        />
      )}
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
    </>
  )
}
