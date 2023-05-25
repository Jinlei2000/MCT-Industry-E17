'use client'
import SideBar from '@/components/SideBar'
import useFireStore from '@/hooks/useFireStore'
import { useEffect, useRef } from 'react'
import Youtube from 'react-youtube'

export default function Home() {
  const { listenToChangeConfig } = useFireStore()
  const videoRef = useRef(null)
  const opts = {
    
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    listenToChangeConfig(() => {}, '/detail')
    
  
  }, [videoRef])

  return (
    <main className="flex  h-screen flex-col items-center justify-end">
      <div className='fixed w-screen h-screen z-0'>
        <iframe
        
          src={"https://www.youtube.com/embed/Q3bMHbJLhCE?autoplay=1&loop=1&controls=0&mute=1&playlist=Q3bMHbJLhCE"}
          allow="autoplay; loop; controls; mute;"
          width={"100%"}
          height={"100%"}
          
          allowFullScreen
          
        ></iframe>
      </div>
      <div className='z-10 font-normal text-white text-4xl flex justify-center items-center w-screen h-48 bg-gradient-to-t from-black to-transparent'>
        Kijk in de toekomst van de E17 via de tablet
      </div>
      
      <SideBar title="EXPO 50 JAAR E3/E17" />
    </main>
  )
}
