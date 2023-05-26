'use client'
import SideBar from '@/components/SideBar'
import useFireStore from '@/hooks/useFireStore'
import { useEffect } from 'react'

export default function Home() {
  // const { listenToChangeConfig } = useFireStore()

  // useEffect(() => {
  //   listenToChangeConfig(() => {}, '/detail')
  // }, [])

  return (
    <main className="relative overflow-hidden">
      <video
        src="/video.mov"
        autoPlay
        muted
        loop
        id="E17 highway"
        className="h-screen w-screen object-cover"
      />

      <div className="absolute bottom-0 left-0 z-10 flex w-screen justify-between bg-gradient-to-t from-black to-transparent">
        <p className="py-8 pl-5 text-5xl font-semibold text-white">
          Kijk in de toekomst van de E17 via de tablet
        </p>
        <div className="w-1/6"></div>
      </div>

      <SideBar title="EXPO 50 JAAR E3/E17" />
    </main>
  )
}
