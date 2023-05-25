'use client'
import SideBar from '@/components/SideBar'
import useFireStore from '@/hooks/useFireStore'
import { useEffect, useRef } from 'react'

export default function Home() {
  const { listenToChangeConfig } = useFireStore()
  const videoRef = useRef(null)

  useEffect(() => {
    listenToChangeConfig(() => {}, '/detail')
    if (videoRef && videoRef.current) {
      videoRef.current.play()
    }
  
  }, [videoRef])

  return (
    <main className="flex  h-screen flex-col items-center justify-end">
      <div className='z-10 font-normal text-white text-4xl flex justify-center items-center w-screen h-48 bg-gradient-to-t from-black to-transparent'>
        Kijk in de toekomst van de E17 via de tablet
      </div>
      <video className='fixed z-0 w-screen' ref={videoRef} src="/timelapse.mp4" muted loop></video>
      <SideBar title="EXPO 50 JAAR E3/E17" />
    </main>
  )
}
